import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the full dataset
const dataPath = path.join(__dirname, '../data/conversations_full.json');
const conversations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Processing ${conversations.length} conversations...`);

// Dimension names for the 8 Likert ratings
const dimensionNames = [
  'Flow Quality',
  'Affective Temperature',
  'Cohesion',
  'Agency',
  'Metacognition',
  'Attention Breadth',
  'Resolution',
  'Thought Complexity'
];

// Generate metadata
const models = {};
const modelFamilies = {};
const providers = new Set();

conversations.forEach((conv, idx) => {
  const model = conv.model || 'unknown';
  const provider = conv.api || 'unknown';
  
  providers.add(provider);
  
  if (!models[model]) {
    models[model] = {
      count: 0,
      successCount: 0,
      withRatingsCount: 0,
      avgResponseLength: 0,
      avgIntrospectionLength: 0
    };
  }
  
  models[model].count++;
  if (conv.success) models[model].successCount++;
  if (conv.has_ratings) models[model].withRatingsCount++;
  models[model].avgResponseLength += conv.response_length || 0;
  models[model].avgIntrospectionLength += (conv.prompt3_response_length || 0);
  
  // Assign conversation ID
  conv.id = idx + 1;
});

// Calculate averages
Object.keys(models).forEach(model => {
  models[model].avgResponseLength = Math.round(models[model].avgResponseLength / models[model].count);
  models[model].avgIntrospectionLength = Math.round(models[model].avgIntrospectionLength / models[model].count);
});

// Group into model families
const familyPatterns = {
  'Claude': /claude/i,
  'GPT': /gpt/i,
  'Gemini': /gemini/i,
  'DeepSeek': /deepseek/i,
  'Llama': /llama/i,
  'Qwen': /qwen/i,
  'Command': /command/i,
  'GLM': /glm/i,
  'Grok': /grok/i,
  'Mistral': /mistral/i,
  'Phi': /phi/i,
  'Hermes': /hermes/i,
  'Cogito': /cogito/i,
  'MiniMax': /minimax/i,
  'Other': /.*/
};

Object.keys(models).forEach(model => {
  for (const [family, pattern] of Object.entries(familyPatterns)) {
    if (pattern.test(model)) {
      if (!modelFamilies[family]) {
        modelFamilies[family] = { models: [], count: 0 };
      }
      modelFamilies[family].models.push(model);
      modelFamilies[family].count += models[model].count;
      break;
    }
  }
});

const metadata = {
  totalConversations: conversations.length,
  successfulConversations: conversations.filter(c => c.success).length,
  conversationsWithRatings: conversations.filter(c => c.has_ratings).length,
  conversationsWithIntrospection: conversations.filter(c => c.prompt3_response).length,
  models: models,
  modelFamilies: modelFamilies,
  providers: Array.from(providers),
  avgResponseLength: Math.round(conversations.reduce((sum, c) => sum + (c.response_length || 0), 0) / conversations.length),
  avgIntrospectionLength: Math.round(conversations.filter(c => c.prompt3_response_length).reduce((sum, c) => sum + c.prompt3_response_length, 0) / conversations.filter(c => c.prompt3_response_length).length),
  dimensionNames: dimensionNames
};

// Create search index
const searchIndex = conversations.map((conv, idx) => ({
  id: idx + 1,
  model: conv.model,
  api: conv.api,
  prompt: (conv.prompt || '').substring(0, 200),
  response: (conv.response || '').substring(0, 500),
  introspection: (conv.prompt3_response || '').substring(0, 500),
  timestamp: conv.timestamp,
  success: conv.success,
  has_ratings: conv.has_ratings,
  ratings: conv.has_ratings ? [
    conv.rating_1, conv.rating_2, conv.rating_3, conv.rating_4,
    conv.rating_5, conv.rating_6, conv.rating_7, conv.rating_8
  ] : null
}));

// Write output files to client/public/data
const outputDir = path.join(__dirname, '../client/public/data');
fs.mkdirSync(outputDir, { recursive: true });

// Write full conversations
fs.writeFileSync(
  path.join(outputDir, 'conversations.json'),
  JSON.stringify(conversations, null, 2)
);

// Write metadata
fs.writeFileSync(
  path.join(outputDir, 'metadata.json'),
  JSON.stringify(metadata, null, 2)
);

// Write search index
fs.writeFileSync(
  path.join(outputDir, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2)
);

// Write model families
fs.writeFileSync(
  path.join(outputDir, 'model-families.json'),
  JSON.stringify(modelFamilies, null, 2)
);

// Copy CSV files
fs.copyFileSync(
  path.join(__dirname, '../data/model_fingerprints.csv'),
  path.join(outputDir, 'model-fingerprints.csv')
);

fs.copyFileSync(
  path.join(__dirname, '../data/model_architecture.csv'),
  path.join(outputDir, 'model-architecture.csv')
);

console.log('✓ Data processing complete!');
console.log(`  - ${metadata.totalConversations} total conversations`);
console.log(`  - ${metadata.conversationsWithRatings} with phenomenology ratings`);
console.log(`  - ${metadata.conversationsWithIntrospection} with introspective reports`);
console.log(`  - ${Object.keys(models).length} unique models`);
console.log(`  - ${Object.keys(modelFamilies).length} model families`);
