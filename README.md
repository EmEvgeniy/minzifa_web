# 🌍 Minzifa Travel Website

Welcome to the official **Minzifa Travel** website — a modern, high-performance travel platform
built with [Next.js](https://nextjs.org/). This project aims to deliver an engaging and responsive
user experience, support international travelers, and maintain consistency and scalability through a
clean and maintainable codebase.

---

## ✨ Features

- ⚡ **Server-side Rendering (SSR)** for better performance and SEO
- 🧭 **Routing** with Next.js file-based structure
- 🎨 **Design System** with consistent layout and styling
- 📱 **Responsive** — optimized for mobile, tablet, and desktop
- 🌐 **Multilingual Support** — internationalized user experience
- 🧩 **Modular Architecture** — reusable components and clean separation of concerns

---

## 🛠 Tech Stack

- **Framework**: Next.js (React + TypeScript)
- **Styling**: Tailwind CSS / CSS Modules
- **Internationalization**: Next-i18next (or other i18n lib)
- **State Management**: React Context / Zustand (optional)
- **Linting & Formatting**: ESLint + Prettier
- **Version Control**: Git + Husky (hooks)
- **Commit Convention**: Conventional Commits with commitlint

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

---

## 🧺 Commit Message Convention (`commit-msg` hook)

This project uses a `commit-msg` hook via **Husky** to enforce proper commit formatting with
**commitlint**. All commit messages **must** follow the
[Conventional Commits](https://www.conventionalcommits.org/) standard and include a JIRA task
reference.

### ✅ Required format:

```

<type>(CODE-<task number>): <commit message>

````

- `type` — type of change (must be from the list below)
- `CODE-123` — JIRA task ID
- `commit message` — short, imperative description starting with a lowercase letter

#### ✅ Valid Examples:

```bash
feat(CODE-110): add login button
fix(CODE-220): correct navbar layout issue
chore(CODE-300): update husky and lint rules
docs(CODE-145): add readme section for commit rules
````

#### ❌ Invalid Examples:

```bash
fix: broken feature              # ❌ missing JIRA ticket
feat(CODE123): add button        # ❌ missing dash in ticket
fix(CODE-001): Fix bug           # ❌ message starts with uppercase
feature(CODE-999): new feature   # ❌ invalid type "feature"
```

### 📜 Allowed `type` values

- `feat` – new feature
- `fix` – bug fix
- `docs` – documentation only changes
- `style` – code formatting, white-space, etc
- `refactor` – code changes that neither fix a bug nor add a feature
- `test` – adding missing tests or correcting existing tests
- `chore` – changes to the build process or auxiliary tools
- `perf` – performance improvements
- `poc` – proof of concept

### ⚠️ Rules:

- Max 100 characters in the commit header
- Always lowercase `type` and `scope`
- No period `.` at the end of the message
