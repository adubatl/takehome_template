# 🚀 Takehome Template

> The repo no one should need, but everyone does.

## 📋 How to Use It

This repo has a variety of templates for different takehome formats.

The main branch is a general template with just a README and a couple of files for languages you might use.

Each sub-branch is designed to be **composable via merge**.

### ⚙️ Setup

- Fork the repo for yourself in the web or cli, then clone it.
  ```bash
  git clone https://github.com/<username>/takehome_template.git
  cd takehome_template
  ```

- Now set up a branch for your takehome. Follow your heart here, or try this format.
  ```bash
  git checkout -b <username>/<company-name>/main
  ```

### 🛠️ Development Commands

Each framework supports these core commands:
```bash
just dev:<framework>     # Start development server
just docker:<framework>  # Run in Docker
just install:<framework> # Install dependencies
just start:<framework>   # Quick start: install + dev
```

For example:
```bash
just dev:node      # Start Node.js server
just docker:react  # Run React app in Docker
just start:django  # Install and start Django
```

### 🔍 Examples

- If you have a problem with a few algo/DSA challenges, branch off main and get to work!

- If you need a backend, database, or a particular frontend, merge in the branch and start coding:
  ```bash
  # Add React frontend
  just add react
  just start:react
  
  # Add Node.js backend
  just add node
  just start:node
  ```

- For full-stack applications, compose multiple branches:
  ```bash
  # React frontend + Node.js backend
  just add react
  just add node
  just start:react  # Start frontend
  just start:node   # Start backend
  ```

- For backend-focused or database-heavy takehomes:
  ```bash
  # Node.js + Database setup
  just add node
  just add db
  just start:node
  just start:db
  ```

## 🌿 Available Branches

| Branch | Description | Commands |
|--------|-------------|----------|
| `main → react` | Scaffolded with a basic React app | `just *:react` |
| `main → vue` | Scaffolded with a basic Vue app | `just *:vue` |
| `main → go` | Scaffolded with a basic Go app | `just *:go` |
| `main → django` | Scaffolded with a basic Django app | `just *:django` |
| `main → node` | Scaffolded with a basic Node.js app | `just *:node` |
| `main → postgres` | Scaffolded with a basic PostgreSQL database | `just *:postgres` |
| `main → mongo` | Scaffolded with a basic MongoDB database | `just *:mongo` |
| `main → LLM` | Scaffolded with a basic LLM app | `just *:llm` |


