"use server";

import { createClient } from "./server";

type ActionResult = { success: true } | { success: false; error: string };

export async function submitContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ActionResult> {
  const supabase = createClient();

  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    message: input.message,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function subscribeToNewsletter(email: string): Promise<ActionResult> {
  const supabase = createClient();

  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    // Already subscribed (unique constraint) — treat as success for the user.
    if (error.code === "23505") {
      return { success: true };
    }
    return { success: false, error: error.message };
  }
  return { success: true };
}
