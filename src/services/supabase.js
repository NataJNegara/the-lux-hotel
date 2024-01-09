import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ejycsxmlqccsmjgepivu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeWNzeG1scWNjc21qZ2VwaXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NzE1NzIsImV4cCI6MjAxODE0NzU3Mn0.Rtk5ffdxmgoCiVvAVaJOdgaUpEQKwvWsZ6DBF7AnH7M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
