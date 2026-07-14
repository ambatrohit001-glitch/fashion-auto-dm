export interface Automation { 
  id: string;

  created_at: string;

  updated_at: string;

  user_id: string;

  name: string;

  description: string | null;

  trigger_type: string;

  trigger_value: string;

  message_template: string;

  status: string;

  is_enabled: boolean;
};

export interface AutomationFormData {
  name: string;

  description: string;

  trigger_type: string;

  trigger_value: string;

  message_template: string;

  status: string;

  is_enabled: boolean;
};