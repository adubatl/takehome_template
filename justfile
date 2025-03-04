# List all available recipes
default:
    @just --list

# Add a branch's functionality to your project
add branch:
    git fetch origin {{branch}}:{{branch}} || echo "Branch {{branch}} not found, skipping fetch"
    git merge {{branch}} --allow-unrelated-histories || echo "Merge failed, please resolve conflicts"

# Development Commands
# ------------------

# Start development server
dev framework:
    @just --justfile scripts/{{framework}}.just dev

# Run in docker
docker framework:
    @just --justfile scripts/{{framework}}.just docker

# Install dependencies
install framework:
    @just --justfile scripts/{{framework}}.just install

# Quick start: install and run
start framework:
    @just --justfile scripts/{{framework}}.just start

# Import framework scripts
import? "scripts/*.just" 
