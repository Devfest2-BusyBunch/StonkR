import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseUrl = "https://whzllbuadsfkjmsrdzdg.supabase.co";
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODk0NjM4NSwiZXhwIjoxOTQ0NTIyMzg1fQ.cjgvG53i84Xabw1L8BBENDV0bUGiTUJWZdVNplefT5M`;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
