# fullmoon: local intelligence

### chat with private and local large language models.

A monorepo containing two versions of the fullmoon web application:

1. A local version using SQLite for storage
2. A web version using IndexedDB for client-side storage live on https://web.fullmoon.app

## Project Structure

```
apps/
  ├── local/          # SQLite-based version
  └── web/            # IndexedDB-based version
packages/
  ├── database/       # Shared database interface
  └── ui/             # Shared UI components
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
pnpm install
```

### Development

To run the local version (with SQLite):

```bash
pnpm dev --filter local
```

To run the web version (with IndexedDB):

```bash
pnpm dev --filter web
```

### Building

To build all apps and packages:

```bash
pnpm build
```

To build a specific app:

```bash
pnpm build --filter local
# or
pnpm build --filter web
```

### Local LLM setup

#### Using MLX server

**with uv**

```bash
# with uv (recommended)
# lets install UV first
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Once installed, restart terminal

```bash
uv venv --python 3.11  # we need this python version for the mlx-omni-server package to work
source .venv/bin/activate
# lets install the mlx-omni-server
uv pip install mlx-omni-server
# start the mlx-omni-server
mlx-omni-server
```

**with pip**

```bash
# with pip

python -m venv venv
source venv/bin/activate

pip install mlx-omni-server

# start the mlx omni server
mlx-omni-server
```

### Running the local (apps/local) locally

lets run the db migrations locally

```bash
npx prisma migrate dev
```

```bash
npm run build
```

and go to localhost:3000

### Using MLX Omni server

```bash
mlx-omni-server
```

### Using Ollama server

```bash
ollama serve
```

## Exposing the local server via ngrok

### with mlx omni server

```bash
ngrok http 10240
```

### with ollama

```bash
ngrok http 11434 --host-header="localhost:11434"
```

## Features

- Chat interface with AI
- Conversation management
- Local storage options:
  - SQLite for desktop/local version
  - IndexedDB for web version
- Shared UI components between versions
- TypeScript support

## License

MIT
