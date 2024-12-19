## Getting Started

Install the packages

```bash
pnpm install
# or
npm install
```

### Local LLM setup

Using MLX server

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

### Start the webserver

lets run the db migrations locally

```bash
npx prisma migrate dev
```

```bash
npm run build
```

and go to localhost:3000
