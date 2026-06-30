import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bdrbubcyeaidntvxpcte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcmJ1YmN5ZWFpZG50dnhwY3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MDczOTYsImV4cCI6MjA5ODA4MzM5Nn0.0uR3wIZe5-lnXUkdr5GKnRpnofb_9CcEYQBqNESmkCA';

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseConfig = {
  url: `${supabaseUrl}/rest/v1`,
  key: supabaseKey
};
