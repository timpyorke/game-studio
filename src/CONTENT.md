# Content Management Guide

## Adding/Updating Games

1. **Create a new markdown file** in the `games/` folder (e.g., `my-new-game.md`)

2. **Write game content in markdown:**

   ```markdown
   ## My Game Title

   Brief description of the game.

   ### Key Features

   - Feature 1
   - Feature 2

   ### Release Date

   Coming 2027
   ```

3. **Add entry to `games/index.json`:**
   ```json
   {
     "id": "my-new-game",
     "title": "MY GAME TITLE",
     "status": "IN DEVELOPMENT",
     "statusStyle": "",
     "image": "https://your-image-url.jpg",
     "file": "my-new-game.md"
   }
   ```

## Adding News/Updates

1. **Create a markdown file** in `news/` folder (e.g., `2026-02-01-update.md`)

2. **Write your update:**

   ```markdown
   ## Update Title

   Your update content here...

   ### New Features

   - Feature 1
   - Feature 2

   ### Bug Fixes

   - Fix 1
   - Fix 2
   ```

3. **Add entry to `news/index.json` at the top:**
   ```json
   {
     "date": "FEBRUARY 1, 2026",
     "file": "2026-02-01-update.md"
   }
   ```

## File Naming Convention

- **News files:** `YYYY-MM-DD-slug.md` (e.g., `2026-01-17-alpha-release.md`)
- **Game files:** `game-slug.md` (e.g., `starlight-odyssey.md`)

## Tips

- Keep filenames lowercase with hyphens
- First paragraph in game markdown becomes the preview text on cards
- Markdown supports headers, lists, bold, italic, links, etc.
- No HTML needed - pure markdown!
