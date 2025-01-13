# Fullmoon Chat

A monorepo containing two versions of the Fullmoon chat application:
1. A local version using SQLite for storage
2. A web version using IndexedDB for client-side storage

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
