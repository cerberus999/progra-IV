import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogPageComponent } from './pages/catalog/catalog-page.component';
import { ModelDetailComponent } from './pages/model-detail/model-detail.component';
import { LoginComponent } from './pages/auth/login.component';
import { GuaranteesPageComponent } from './pages/guarantees/guarantees-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { ClienteHistoryComponent } from './pages/cliente-history/cliente-history.component';
import { AdminPortalComponent } from './pages/admin/admin-portal.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'HirosimaBikeMotors — Home',
    data: { animation: 'home' }
  },
  { 
    path: 'catalogo', 
    component: CatalogPageComponent, 
    title: 'HirosimaBikeMotors — Catálogo',
    data: { animation: 'catalog' }
  },
  { 
    path: 'garantias', 
    component: GuaranteesPageComponent, 
    title: 'HirosimaBikeMotors — Garantías',
    data: { animation: 'guarantees' }
  },
  { 
    path: 'contacto', 
    component: ContactPageComponent, 
    title: 'HirosimaBikeMotors — Contacto',
    data: { animation: 'contact' }
  },
  { 
    path: 'moto/:slug', 
    component: ModelDetailComponent,
    title: 'HirosimaBikeMotors — Modelo',
    data: { animation: 'detail' }
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'HirosimaBikeMotors — Iniciar Sesión',
    data: { animation: 'login' }
  },
  {
    path: 'admin',
    component: AdminPortalComponent,
    canActivate: [adminGuard],
    title: 'HirosimaBikeMotors — Admin',
    data: { animation: 'admin' }
  },
  {
    path: 'mi-historial',
    component: ClienteHistoryComponent,
    canActivate: [authGuard(['cliente', 'admin'])],
    title: 'HirosimaBikeMotors — Mis Unidades',
    data: { animation: 'history' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
