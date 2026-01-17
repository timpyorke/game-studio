# CODENOUR

A modern, responsive website for an indie game development studio showcasing their games and projects.

## 🎮 About

CODENOUR is an indie game studio website dedicated to bringing back the golden age of gaming with modern mechanics. The site features a clean, gaming-inspired design with a dark theme and retro aesthetics.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and modern interface with smooth animations and transitions
- **Game Showcase**: Dedicated pages for displaying game projects and details
- **Interactive Elements**: Hover effects, animated buttons, and dynamic navigation
- **Font Awesome Icons**: Professional icons throughout the site

## 📁 Project Structure

```
Game Studio/
├── index.html      # Home page with hero section and latest project
├── games.html      # Games catalog page (dynamically loaded)
├── games/          # Game content folder
│   ├── index.json  # Game list metadata
│   └── *.md        # Individual game pages in markdown
├── news.html       # News and changelog page (dynamically loaded)
├── news/           # News content folder
│   ├── index.json  # News list metadata
│   └── *.md        # Individual news posts in markdown
├── about.html      # About the studio page
├── style.css       # Main stylesheet with all styling
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - pure HTML/CSS/JavaScript

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

```bash
# If using a local server (optional)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open http://localhost:8000 in your browser
```

## 🎨 Design Features

- **Color Scheme**: Dark theme with cyan accent colors
- **Typography**: Orbitron font for headings, clean sans-serif for body text
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Icons**: Font Awesome 6.0.0 for professional iconography

## 📄 Pages

### Home (`index.html`)

- Hero section with call-to-action
- Featured latest project
- Navigation to other sections

### Games (`games.html`)

- Showcase of all game projects
- Game cards with images and descriptions
- Development status tags
- **Click "Learn More" to see full game details in a modal**
- **Dynamically loaded from `games/*.md`** - edit markdown files to update game info!

### News (`news.html`)

- Studio news and updates
- Changelog for game releases
- Development blog posts
- Patch notes and bug fixes
- **Dynamically loaded from `news/*.md`** - just add new markdown files!

### About (`about.html`)

- Studio information
- Team or mission statement

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- Font Awesome Icons

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

This is a personal/studio project. If you'd like to contribute or suggest improvements, feel free to reach out.

## 📝 License

All rights reserved © CODENOUR

## 🎯 Featured Project

**Starlight Odyssey** - A 2D Action-RPG featuring:

- Procedurally generated universe
- Ship building mechanics
- Crew recruitment system
- Ancient mysteries to uncover

Coming 2026

---

Built with ❤️ by CODENOUR | Timp Yorke
