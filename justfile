set shell := ["bash", "-c"]

# List all available recipes
default:
    @just --list

# Add a branch's functionality to your project
add branch:
    #!/usr/bin/env bash
    git fetch origin {{branch}}:{{branch}} || echo "Branch {{branch}} not found, skipping fetch"
    git merge {{branch}} --allow-unrelated-histories || echo "Merge failed, please resolve conflicts"

# Import other script files - may not be necessary if you have a simple project.
!include scripts/*.just 