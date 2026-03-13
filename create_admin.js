import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iuozmafmbhyfggxwyfhh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1b3ptYWZtYmh5ZmdneHd5ZmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDI1MzYsImV4cCI6MjA4ODk3ODUzNn0.pgU2e5fNqJLXSvmuuweSTty2r0NigAdm8IASW5nzD48";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signUp() {
  console.log("Signing up user...");
  const { data, error } = await supabase.auth.signUp({
    email: 'yakyakyak1414@gmail.com',
    password: 'SuperSecurePassword123!'
  });
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success:", data);
  }
}

signUp();
