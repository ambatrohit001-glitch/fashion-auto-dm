import { supabase } from "@/lib/supabase";
import { Automation } from "@/types/automation";
import { AutomationFormValues } from "@/lib/validation/automation.schema";
/**
 * Get all automations
 */
export async function getAutomations(): Promise<Automation[]> {
  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Automation[];
}

/**
 * Get single automation
 */
export async function getAutomationById(
  id: string
): Promise<Automation | null> {
  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Automation;
}

/**
 * Create automation
 */
export async function createAutomation(
  automation: AutomationFormValues
) {
  const session = await supabase.auth.getSession();
  console.log("SESSION:", session);

  const userResponse = await supabase.auth.getUser();
  console.log("USER RESPONSE:", userResponse);

  const user = userResponse.data.user;

  if (!user) {
    throw new Error("User not logged in.");
  }

  console.log("Saving automation:", automation);

  const { data, error } = await supabase
    .from("automations")
    .insert([
      {
        user_id: user.id,
        ...automation,
      },
    ])
    .select();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  if (error) throw error;

  return data;
}

/**
 * Update automation
 */
export async function updateAutomation(
  id: string,
  automation: AutomationFormValues
) {
  const { error } = await supabase
    .from("automations")
    .update({
      ...automation,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

/**
 * Delete automation
 */
export async function deleteAutomation(
  id: string
) {
  const { error } = await supabase
    .from("automations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}