import { supabase } from "@/lib/supabase";
import {
  Automation,
  AutomationFormData,
} from "@/types/automation";

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
  automation: AutomationFormData
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("automations")
    .insert([
      {
        user_id: user.id,
        ...automation,
      },
    ]);

  if (error) throw error;
}

/**
 * Update automation
 */
export async function updateAutomation(
  id: string,
  automation: AutomationFormData
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