# Git-related commands

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