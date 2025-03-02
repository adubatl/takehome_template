# 🚀 Takehome Template

> The repo no one should need, but everyone does.

## 📋 How to Use It

This repo has a variety of templates for different takehome formats.

The main branch is a general template with just a README and a couple of files for languages you might use.

Each sub-branch is designed to be **composable via merge**.

### 🔑 Setup

- Fork the repo for yourself in the web or cli, then clone it.
  ```bash
  git clone https://github.com/<username>/takehome_template.git
  cd takehome_template
  ```

- Now set up a branch for your takehome. Follow your heart here, or try this format.
  ```bash
  git checkout -b <username>/<company-name>/main
  ```


### 🔍 Examples

- If you have a problem with a few algo/DSA challenges, branch off main and get to work!

- If you need a backend, database, or a particular frontend, you can start on any of those branches.
  ```bash
  # For a backend
  git checkout django
  
  # For a database
  git checkout db
  
  # For a frontend
  git checkout react
  ```

- For showcasing CRUD skills in a frontend-focused takehome, start with your frontend branch, then merge in your preferred backend.
  ```bash
  git checkout react
  git merge django
  ```

- For backend-focused or database-heavy takehomes, grab all three branches or just the backend and database ones.
  ```bash
  # Full stack setup
  git checkout django
  git merge db
  
  # Or just backend + database
  git checkout django
  git merge db
  ```

## 🌿 Available Branches

| Branch | Description |
|--------|-------------|
| `main → react` | Scaffolded with a basic React app |
| `main → vue` | Scaffolded with a basic Vue app |
| `main → go` | Scaffolded with a basic Go app |
| `main → django` | Scaffolded with a basic Django app |
| `main → db` | Scaffolded with a basic PostgreSQL database |
| `main → LLM` | Scaffolded with a basic LLM app |


