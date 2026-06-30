import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { supabase } from '../config/supabase.config';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ensure session is fetched from Supabase storage/cookie
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    router.navigate(['/login']);
    return false;
  }

  // Double check user profile role
  let profile = authService.currentUserProfile;
  if (!profile) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    profile = data as any;
  }

  if (profile && profile.role === 'admin') {
    return true;
  }

  // Not an admin, redirect to login
  router.navigate(['/login']);
  return false;
};
