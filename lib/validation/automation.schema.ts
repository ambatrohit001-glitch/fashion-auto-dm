import { z } from "zod";

export const automationSchema = z.object({
  name: z
    .string()
    .min(3, "Automation name must be at least 3 characters"),

  description: z.string().optional(),

  trigger_type: z.string().min(1, "Select trigger type"),

  trigger_value: z
    .string()
    .min(1, "Trigger value is required"),

  message_template: z
    .string()
    .min(5, "Message template is required"),

  status: z.enum(["active", "inactive"]),

  is_enabled: z.boolean(),
});

export type AutomationFormValues =
  z.infer<typeof automationSchema>;