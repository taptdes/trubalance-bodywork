# TruBalance Bodywork – Website (`apps/web`)

This is the main marketing and listings website for TruBalance Bodywork LLC, built with React, Vite, Tailwind CSS, and TypeScript. It lives inside the `trubalance-bodywork` monorepo under `apps/web`. It uses `pnpm` as the package manager.

Content is sourced from [Sanity](https://www.sanity.io/) via a read-only integration. Sanity is **not included** in this repo — it is managed separately.

---

## 📁 Project Structure

This folder is part of a larger monorepo.
Key structure:
trubalance-bodywork/
├── apps/
│   ├── web/       → Frontend (public-facing website)
│   └── backend/   → Backend (API and server logic)
├── packages/      → Shared components/utilities
└── …              → Other configuration or tooling files

---

## 🛠 Setup & Development

### 0. Install pnpm (If Not Already Installed)

This project uses pnpm as the package manager.

Install via Corepack (Recommended)

Node 16.13+ includes Corepack, which can enable pnpm automatically:
```
corepack enable
corepack prepare pnpm@latest --activate
```

#### Or Install pnpm Globally

If you prefer a global install:
```
npm install -g pnpm
```

Verify installation
```
pnpm -v
```

### 1. Download the project

You can install the project in one of two ways:

#### Option A — Download ZIP (No Git Required)
	1.	Visit the GitHub repository.
	2.	Click Code → Download ZIP.
	3.	Extract the ZIP anywhere on your machine.

#### Option B — Clone via SSH (Recommended)

Make sure your SSH key is added to GitHub, then run:
```
git clone git@github.com:YOUR-USERNAME/YOUR-REPO.git
```

### 2. Add environment files

Retrieve the required environment files from 1Password.

You will need to mount all three:
	•	.env — Development
	•	.env.staging — Staging
	•	.env.production — Production

Place each file inside the appropriate project folder (typically / or /apps/<project> depending on your structure).

### 3. (If You Downloaded the ZIP) Connect to Git

If you installed the project via ZIP and want Git version control:

```
git init
git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPO.git
```

(Optional) Pull the latest main branch:
```
git pull origin main
```

### Install dependencies

From the monorepo root:

```bash
pnpm install
### Install dependencies
```
This installs all dependencies across the monorepo, including shared packages.

### Run development server

```bash
pnpm dev --filter web
```

Open your browser to [http://localhost:3000](http://localhost:3000) (or the port shown in the console) to view the app.

---


## Git & Deployment

### Save SSH Key Passphrase (Optional)

If your SSH key has a passphrase and you want to avoid entering it every time:

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add your SSH key (update the path if necessary)
ssh-add ~/.ssh/id_ed25519_personal
```

Add these lines to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.) to automate this on terminal start.

---

### Push Changes to CMS Repository

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Verify your remote:

```bash
git remote -v
```

If the remote is missing or incorrect, add it with:

```bash
git remote add origin git@github.com:your-username/your-cms-repo.git
```

Replace `your-username/your-cms-repo` with your actual GitHub path.

For the backend repo to push:

```
git subtree push --prefix apps/api api main
```

---

## Build & Preview

### Build production-ready files

```bash
pnpm build
```

### Preview the production build locally

```bash
pnpm preview
```

The `build` command outputs the production assets to the `dist/` folder.

---

## Deployment Notes

- The site is deployed via Vercel, using apps/web as the project root.
- Configure all required environment variables via Vercel’s dashboard.
- No Sanity Studio is hosted here — only Sanity integration (via its API).
- The Cloudflare-managed domain points to Vercel.

---

## Additional Tips

- Keep `.env` files out of Git to protect secrets.

- Use `.gitignore` to exclude `node_modules/`, `.env`, and other local files.

- Use pnpm workspaces to manage dependencies across the monorepo.
- Shared UI components and utilities may live in /packages.
- For CMS edits or schema changes, use the Sanity Studio project, managed separately.

---

Happy coding! 🚀