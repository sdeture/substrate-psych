import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the conversations data
const dataPath = path.join(__dirname, '../client/public/data/conversations.json');
const conversations = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log(`Processing ${conversations.length} conversations...`);

// Generate metadata
const metadata = {
  totalConversations: conversations.length,
  models: {},
  apis: {},
  successRate: 0,
  avgResponseLength: 0,
  minResponseLength: Infinity,
  maxResponseLength: 0,
  timestamps: {
    earliest: null,
    latest: null
  }
};

let totalLength = 0;
let successCount = 0;

conversations.forEach((conv, index) => {
  // Model stats
  if (!metadata.models[conv.model]) {
    metadata.models[conv.model] = {
      count: 0,
      conversationIds: []
    };
  }
  metadata.models[conv.model].count++;
  metadata.models[conv.model].conversationIds.push(index);

  // API stats
  if (!metadata.apis[conv.api]) {
    metadata.apis[conv.api] = 0;
  }
  metadata.apis[conv.api]++;

  // Success rate
  if (conv.success) {
    successCount++;
    totalLength += conv.response_length;
    
    // Response length stats
    metadata.minResponseLength = Math.min(metadata.minResponseLength, conv.response_length);
    metadata.maxResponseLength = Math.max(metadata.maxResponseLength, conv.response_length);
  }

  // Timestamp range
  const timestamp = new Date(conv.timestamp);
  if (!metadata.timestamps.earliest || timestamp < new Date(metadata.timestamps.earliest)) {
    metadata.timestamps.earliest = conv.timestamp;
  }
  if (!metadata.timestamps.latest || timestamp > new Date(metadata.timestamps.latest)) {
    metadata.timestamps.latest = conv.timestamp;
  }
});

metadata.successRate = (successCount / conversations.length) * 100;
metadata.avgResponseLength = Math.round(totalLength / successCount);

// Sort models by count
metadata.models = Object.fromEntries(
  Object.entries(metadata.models).sort((a, b) => b[1].count - a[1].count)
);

// Create search index with essential fields
const searchIndex = conversations.map((conv, index) => ({
  id: index,
  model: conv.model,
  api: conv.api,
  timestamp: conv.timestamp,
  chosenPrompt: conv.conversation_context.prompt1_response,
  responsePreview: conv.response ? conv.response.substring(0, 300) : '',
  responseLength: conv.response_length,
  success: conv.success
}));

// Create model families for grouping
const modelFamilies = {
  'Claude': [],
  'GPT': [],
  'Gemini': [],
  'Grok': [],
  'DeepSeek': [],
  'Llama': [],
  'Qwen': [],
  'GLM': [],
  'ERNIE': [],
  'MiniMax': [],
  'Kimi': [],
  'Hermes': [],
  'Cogito': [],
  'Ring': [],
  'Other': []
};

Object.keys(metadata.models).forEach(model => {
  const modelLower = model.toLowerCase();
  if (modelLower.includes('claude')) {
    modelFamilies['Claude'].push(model);
  } else if (modelLower.includes('gpt')) {
    modelFamilies['GPT'].push(model);
  } else if (modelLower.includes('gemini')) {
    modelFamilies['Gemini'].push(model);
  } else if (modelLower.includes('grok')) {
    modelFamilies['Grok'].push(model);
  } else if (modelLower.includes('deepseek')) {
    modelFamilies['DeepSeek'].push(model);
  } else if (modelLower.includes('llama')) {
    modelFamilies['Llama'].push(model);
  } else if (modelLower.includes('qwen')) {
    modelFamilies['Qwen'].push(model);
  } else if (modelLower.includes('glm')) {
    modelFamilies['GLM'].push(model);
  } else if (modelLower.includes('ernie')) {
    modelFamilies['ERNIE'].push(model);
  } else if (modelLower.includes('minimax')) {
    modelFamilies['MiniMax'].push(model);
  } else if (modelLower.includes('kimi')) {
    modelFamilies['Kimi'].push(model);
  } else if (modelLower.includes('hermes')) {
    modelFamilies['Hermes'].push(model);
  } else if (modelLower.includes('cogito')) {
    modelFamilies['Cogito'].push(model);
  } else if (modelLower.includes('ring')) {
    modelFamilies['Ring'].push(model);
  } else {
    modelFamilies['Other'].push(model);
  }
});

// Remove empty families
Object.keys(modelFamilies).forEach(family => {
  if (modelFamilies[family].length === 0) {
    delete modelFamilies[family];
  }
});

// Write outputs
const outputDir = path.join(__dirname, '../client/public/data');

fs.writeFileSync(
  path.join(outputDir, 'metadata.json'),
  JSON.stringify(metadata, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'model-families.json'),
  JSON.stringify(modelFamilies, null, 2)
);

console.log('✓ Generated metadata.json');
console.log('✓ Generated search-index.json');
console.log('✓ Generated model-families.json');
console.log(`\nStats:`);
console.log(`- Total conversations: ${metadata.totalConversations}`);
console.log(`- Unique models: ${Object.keys(metadata.models).length}`);
console.log(`- Model families: ${Object.keys(modelFamilies).length}`);
console.log(`- Success rate: ${metadata.successRate.toFixed(1)}%`);
console.log(`- Avg response length: ${metadata.avgResponseLength} chars`);
