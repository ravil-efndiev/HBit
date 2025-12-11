import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.STORAGE_URL || "",
  process.env.STORAGE_API_KEY || ""
);
