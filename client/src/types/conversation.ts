export interface Conversation {
  agent_id: string;
  model: string;
  api: string;
  temperature: number;
  prompt_num: number;
  timestamp: string;
  conversation_context: {
    prompt1_question: string;
    prompt1_response: string;
    prompt2_request: string;
  };
  response: string | null;
  response_length: number;
  success: boolean;
  error: string | null;
}

export interface SearchIndexItem {
  id: number;
  model: string;
  api: string;
  timestamp: string;
  chosenPrompt: string;
  responsePreview: string;
  responseLength: number;
  success: boolean;
}

export interface Metadata {
  totalConversations: number;
  models: {
    [key: string]: {
      count: number;
      conversationIds: number[];
    };
  };
  apis: {
    [key: string]: number;
  };
  successRate: number;
  avgResponseLength: number;
  minResponseLength: number;
  maxResponseLength: number;
  timestamps: {
    earliest: string;
    latest: string;
  };
}

export interface ModelFamilies {
  [family: string]: string[];
}
