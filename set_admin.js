import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iuozmafmbhyfggxwyfhh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1b3ptYWZtYmh5ZmdneHd5ZmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDI1MzYsImV4cCI6MjA4ODk3ODUzNn0.pgU2e5fNqJLXSvmuuweSTty2r0NigAdm8IASW5nzD48";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function setAdmin() {
  console.log("Setting admin role...");
  const { data, error } = await supabase
    .from('user_roles')
    .insert([{ user_id: 'f54c794b-4ed5-48ae-a76f-65868def0f83', role: 'admin' }]);
    
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success:", data);
  }
}

setAdmin();
