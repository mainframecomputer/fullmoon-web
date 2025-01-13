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

## running the LLM server

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
- Next.js-based applications

## License

MIT
