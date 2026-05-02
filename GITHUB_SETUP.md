# GitHub Setup Guide for Portfolio

## 🚀 Quick Setup Instructions

### Step 1: Install Git (if not already installed)

**Windows:**
1. Download Git from https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your command prompt/PowerShell

**Verify Installation:**
```bash
git --version
```

### Step 2: Configure Git (one-time setup)

```bash
git config --global user.name "karim-abd-hussein"
git config --global user.email "karimabdhussein@gmail.com"
```

### Step 3: Initialize Repository

Open PowerShell/CMD in your portfolio directory:

```bash
cd c:/xampp/htdocs/portfolio
git init
```

### Step 4: Add Files to Git

```bash
git add .
```

### Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Professional portfolio website with Bootstrap and jQuery"
```

### Step 6: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Repository name: `portfolio` (or `karim-abd-hussein-portfolio`)
4. Description: "Professional portfolio website showcasing Full-Stack Developer skills and projects"
5. Make it **Public** (for portfolio visibility)
6. **DO NOT** initialize with README, .gitignore, or license (we already have them)
7. Click "Create repository"

### Step 7: Connect Local to GitHub

Copy the repository URL from GitHub (it will look like: `https://github.com/karim-abd-hussein/portfolio.git`)

```bash
git remote add origin https://github.com/karim-abd-hussein/portfolio.git
git branch -M main
git push -u origin main
```

### Step 8: Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" tab
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be live at: `https://karim-abd-hussein.github.io/portfolio`

## 📁 Repository Structure After Setup

```
portfolio/
├── .git/                 # Git repository files
├── .gitignore           # Files to ignore
├── index.html           # Main portfolio page
├── css/
│   └── style.css        # Custom styles
├── js/
│   └── script.js        # JavaScript functionality
├── README.md            # Project documentation
├── GITHUB_SETUP.md      # This setup guide
└── LICENSE              # (optional) MIT license
```

## 🔧 Common Git Commands

### Check Status
```bash
git status
```

### Add Changes
```bash
git add .                    # Add all changes
git add index.html          # Add specific file
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push to GitHub
```bash
git push                    # Push to main branch
```

### Pull from GitHub
```bash
git pull                    # Pull latest changes
```

### View Commit History
```bash
git log --oneline
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment
Once GitHub Pages is enabled, any push to the main branch will automatically update your live site.

### Custom Domain (Optional)
If you want to use a custom domain:
1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Update your DNS settings as instructed

## 📝 Commit Message Best Practices

```
feat: Add contact form validation
fix: Resolve mobile navigation issue
style: Improve button hover effects
docs: Update README with new features
refactor: Optimize JavaScript performance
test: Add form validation tests
chore: Update dependencies
```

## 🔄 Workflow for Updates

1. Make changes to your files
2. Test locally (`php -S localhost:8000`)
3. Add changes: `git add .`
4. Commit: `git commit -m "feat: Add new project showcase"`
5. Push: `git push`
6. GitHub Pages will automatically update

## 🚨 Troubleshooting

### Authentication Issues
If you get authentication errors:
1. Use GitHub Personal Access Token instead of password
2. Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Push Errors
```bash
# If remote exists but wrong URL
git remote set-url origin https://github.com/karim-abd-hussein/portfolio.git

# Force push (use carefully)
git push -f origin main
```

### Merge Conflicts
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts, then:
git add .
git commit -m "Resolve merge conflicts"
git push
```

## 📊 Repository Settings to Consider

### Enable Issues
- Go to Settings → General → Features
- Enable "Issues" for feedback/bug tracking

### Enable Discussions
- Allow community interaction on your portfolio

### Add Topics
- Add tags: `portfolio`, `web-development`, `bootstrap`, `jquery`, `responsive-design`

### Set up Branch Protection
- Protect main branch from accidental deletions

## 🎯 Next Steps

1. **Complete the Git setup** using the commands above
2. **Customize your portfolio** with additional projects or sections
3. **Add a custom domain** if you have one
4. **Share your portfolio** on LinkedIn and other professional networks
5. **Regular updates** as you complete new projects

## 📞 Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Pages Guide: https://docs.github.com/en/pages
- GitHub Support: https://support.github.com

---

**Your portfolio will be live at:** https://karim-abd-hussein.github.io/portfolio
