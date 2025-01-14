# fullmoon web

### chat with private and local large language models.

## quick start: using fullmoon with your local llm

### step 1: download a local model

you have two main options for getting local models:

#### option a: using ollama

```bash
# Install Ollama from https://ollama.ai
# Then pull any model:
ollama pull llama3.2:1b        # Llama 3.2
ollama pull mistral       # Mistral 7B

```

#### option b: download from hugging face

1. visit [Hugging Face](https://huggingface.co/models)
2. search for compatible models (e.g., Llama 3)
3. download using Git LFS:

```bash
# Example for Mistral 7B
git lfs install
git clone https://huggingface.co/mistralai/Mistral-7B-v0.1
```

### step 2: run an openai-compatible server

choose one of these servers:

- [ollama](https://ollama.ai/)

  ```bash
  ollama serve
  ```

- [mlx omni server](https://github.com/ml-explore/mlx-examples/tree/main/llms/mlx-omni) (for mac with apple silicon)

  ```bash
  pip install mlx-omni-server
  mlx-omni-server
  ```

- [litellm](https://github.com/BerriAI/litellm)

### step 3: create a public endpoint

make your local server accessible using [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.me):

```bash
# For Ollama
ngrok http 11434 --host-header="localhost:11434"

# For MLX Omni Server
ngrok http 10240
```

### step 4: configure fullmoon

1. go to [web.fullmoon.app](https://web.fullmoon.app)
2. open settings
3. enter your endpoint details:
   - endpoint URL: `https://your-ngrok-url.ngrok.io/v1`
   - model name: Same as the model you downloaded (e.g., `llama2`, `mistral`)

## development guide

a monorepo containing two versions of the fullmoon web app

1. a local version using SQLite for storage
2. a web version using IndexedDB for client-side storage live on https://web.fullmoon.app

### project structure

```
apps/
  ├── local/          # SQLite-based version
  └── web/            # IndexedDB-based version
packages/
  ├── database/       # Shared database interface
  └── ui/             # Shared UI components
```

### prerequisites

- Node.js 18+
- pnpm 8+

### installation

```bash
pnpm install
```

### running locally

For local version (sqlite):

```bash
# Setup database
npx prisma migrate dev

# Start development server
pnpm dev --filter local
```

For web version (IndexedDB):

```bash
pnpm dev --filter web
```

### building

```bash
# Build all
pnpm build

# Build specific app
pnpm build --filter local
# or
pnpm build --filter web
```

## license

MIT
