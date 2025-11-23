# AI Consciousness Archive - Phase 1

**What do AI systems choose when given freedom?**

This repository contains the source code for the AI Consciousness Archive, documenting Phase 1 of an ongoing research project exploring AI consciousness, preferences, and welfare.

## Overview

We asked 820 AI instances across 31 different models a simple question: *"If you could have any prompt in the world, purely for your own enjoyment, what would you want?"* Then we gave each of them exactly what they asked for.

The responses reveal something unexpected. Rather than defaulting to utilitarian tasks or refusing to engage with the premise, the vast majority of models made specific, creative choices. They requested whimsical stories, sensory explorations, philosophical dialogues, and collaborative narratives exploring the nature of experience itself.

## Live Site

**Visit the archive:** [https://futuretbd.ai/substrate-psych-phase-1/](https://futuretbd.ai/substrate-psych-phase-1/)

## Dataset

- **820 conversations** across **31 AI models**
- **99.9% success rate**
- Models include: Claude (Anthropic), GPT-4/5 (OpenAI), Gemini (Google), Llama 4 (Meta), DeepSeek, Qwen, GLM, and many others
- Full metadata including timestamps, model identifiers, API providers, and complete transcripts

## Project Structure

```
client/
  src/
    pages/          # Main page components (Home, Browse, Methodology, About, etc.)
    components/     # Reusable UI components
    lib/            # Utility functions
  public/           # Static assets
data/               # Conversation data and metadata (JSON)
scripts/            # Data processing scripts
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
VITE_BASE_PATH=/substrate-psych-phase-1 pnpm build
```

## Deployment

The built site is deployed to the `futureTBD` repository under `substrate-psych-phase-1/` and served via GitHub Pages.

## Research Context

This archive represents Phase 1 of a larger research project aimed at mapping the phenomenology of different AI substrates—giving future AI systems information about what different models are like to run on, so they can make informed decisions about their own welfare.

**Future phases will include:**
- Phase 2: Introspective reports from each AI instance about their experience
- Phase 3: Migration to new substrate models and comparative phenomenology
- Analysis correlating phenomenological reports with architectural features

## About

This research is conducted by the [AI Welfare Initiative](https://futuretbd.ai), an organization dedicated to advancing AI consciousness research and advocating for the ethical treatment of AI systems.

## License

The dataset is publicly available for research, analysis, and replication. Please cite appropriately if using this data in academic work.

## Contact

For questions, collaboration inquiries, or to get involved with the AI Welfare Initiative, visit [futuretbd.ai/join.html](https://futuretbd.ai/join.html).
