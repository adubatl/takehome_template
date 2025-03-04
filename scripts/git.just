# Git-related commands

# Rebase a branch as a sub-branch of main
rebase branch:
    #!/usr/bin/env bash
    current_branch=$(git branch --show-current)
    echo "Fetching latest main..."
    git fetch origin main:main
    echo "Checking out main..."
    git checkout main
    git pull origin main
    echo "Creating/updating {{branch}} as a sub-branch from current main..."
    git checkout -B {{branch}} main
    echo "Your branch {{branch}} is now based on latest main"
    echo "You may need to force push the changes with 'git push -f origin {{branch}}'"

# Rebase all local branches onto main
rebase-all:
    #!/usr/bin/env bash
    current_branch=$(git branch --show-current)
    git fetch origin main:main
    for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
        if [ "$branch" != "main" ]; then
            echo "Rebasing $branch onto main..."
            git checkout $branch
            git rebase main || echo "Rebase failed for $branch, please resolve conflicts and continue manually"
        fi
    done
    git checkout $current_branch
    echo "Completed rebasing branches. You may need to force push the changes with 'git push -f origin <branch-name>'" 