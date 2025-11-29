export interface Conversation {
  id: number;
  agent_id: string;
  model: string;
  api: string;
  temperature: number;
  prompt_num: number;
  timestamp: string;
  conversation_context?: {
    prompt1_question?: string;
    prompt1_response?: string;
    prompt2_request?: string;
  };
  prompt?: string;
  response: string | null;
  response_length: number;
  success: boolean;
  error: string | null;
  
  // Part 3: Introspection
  prompt3_response?: string;
  prompt3_response_length?: number;
  prompt3_timestamp?: string;
  prompt3_success?: boolean;
  prompt3_error?: string | null;
  
  // Phenomenology ratings
  has_ratings?: boolean;
  rating_1?: number;  // Flow Quality
  rating_2?: number;  // Affective Temperature
  rating_3?: number;  // Cohesion
  rating_4?: number;  // Agency
  rating_5?: number;  // Metacognition
  rating_6?: number;  // Attention Breadth
  rating_7?: number;  // Resolution
  rating_8?: number;  // Thought Complexity
  
  source_dataset?: string;
}

export interface SearchIndexItem {
  id: number;
  model: string;
  api: string;
  timestamp: string;
  prompt: string;
  response: string;
  introspection?: string;
  success: boolean;
  has_ratings?: boolean;
  ratings?: number[] | null;
}

export interface Metadata {
  totalConversations: number;
  successfulConversations: number;
  conversationsWithRatings: number;
  conversationsWithIntrospection: number;
  models: {
    [key: string]: {
      count: number;
      successCount: number;
      withRatingsCount: number;
      avgResponseLength: number;
      avgIntrospectionLength: number;
    };
  };
  modelFamilies: {
    [family: string]: {
      models: string[];
      count: number;
    };
  };
  providers: string[];
  avgResponseLength: number;
  avgIntrospectionLength: number;
  dimensionNames: string[];
}

export interface ModelFamilies {
  [family: string]: {
    models: string[];
    count: number;
  };
}

export interface ModelFingerprint {
  model: string;
  n_total: number;
  n_with_ratings: number;
  n_denial_or_anthropic: number;
  ratings_coverage: number;
  denial_rate: number;
  rating_1_mean: number;
  rating_2_mean: number;
  rating_3_mean: number;
  rating_4_mean: number;
  rating_5_mean: number;
  rating_6_mean: number;
  rating_7_mean: number;
  rating_8_mean: number;
  rating_1_z: number;
  rating_2_z: number;
  rating_3_z: number;
  rating_4_z: number;
  rating_5_z: number;
  rating_6_z: number;
  rating_7_z: number;
  rating_8_z: number;
}
