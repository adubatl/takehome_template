set shell := ["bash", "-c"]

# List all available recipes
default:
    @just --list

# Add a branch's functionality to your project
add branch:
    #!/usr/bin/env bash
    git fetch origin {{branch}}:{{branch}} || echo "Branch {{branch}} not found, skipping fetch"
    git merge {{branch}} --allow-unrelated-histories || echo "Merge failed, please resolve conflicts"

# Development Commands
# ------------------

# Route commands to framework-specific implementations
[private]
_route command framework:
    #!/usr/bin/env bash
    if [ -f "scripts/{{framework}}.just" ]; then
        just scripts/{{framework}} {{command}}
    else
        echo "⚠️  Framework '{{framework}}' not found in scripts/"
        exit 1
    fi

# Common framework commands
dev framework: (_route "dev" framework)
docker framework: (_route "docker" framework)
install framework: (_route "install" framework)
start framework: (_route "start" framework)

# Import framework scripts
import? "scripts/*.just" 
