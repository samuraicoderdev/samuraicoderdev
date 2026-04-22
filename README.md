# SamuraiCoderDev Landing Page

A minimal landing page built with HTMX and Tailwind CSS, showcasing subprojects as folders.

## Philosophy

- **Utility-First:** Utilizes Tailwind CSS for rapid UI development without leaving HTML.
- **Dynamic but Simple:** Uses HTMX for AJAX, CSS transitions, websockets, and server sent events directly in HTML.
- **Independent:** No complex build pipeline required for basic usage (though Tailwind is used for styling).
- **Predictable:** Straightforward HTML with minimal JavaScript.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
   - This runs Tailwind CSS in watch mode and a static HTTP server on port 8080
4. Visit `http://localhost:8080` in your browser

## Project Structure

- `public/` - Static assets served by the HTTP server
  - `index.html` - Main landing page
  - `projects/` - HTMX fragments loaded into the landing page
  - `subprojects/` - Individual subproject folders (each can be a standalone project)
  - `css/` - Generated Tailwind CSS (output.css)
- `src/` - Source files for Tailwind CSS
  - `css/input.css` - Tailwind directives
- `tailwind.config.js` - Tailwind configuration
- `package.json` - npm scripts and dependencies

## Available Scripts

- `npm run dev` - Start Tailwind watcher and HTTP server concurrently
- `npm run tailwind` - Watch Tailwind CSS and rebuild on changes
- `npm run tailwind-build` - Build Tailwind CSS for production (minified)
- `npm run serve` - Start static HTTP server on port 8080
- `npm test` - Placeholder (no tests configured)

## Usage

The landing page (`public/index.html`) uses HTMX to load project listings from `public/projects/list.html`. Each subproject folder under `public/subprojects/` can contain its own `index.html` and assets, linked from the landing page.

To add a new subproject:
1. Create a folder in `public/subprojects/` (e.g., `my-new-project`)
2. Add an `index.html` and any assets needed
3. Update `public/projects/list.html` to include a link to the new subproject

## Technology Stack

- **HTMX** - For dynamic content loading via HTML attributes (loaded from CDN)
- **Tailwind CSS** - Utility-first CSS framework (built via PostCSS)
- **PostCSS** - With Autoprefixer for vendor prefixing
- **HTTP Server** - Simple static server for development
- **Concurrently** - To run multiple npm scripts simultaneously

## Customization

To customize the Tailwind design:
1. Edit `tailwind.config.js` to modify theme, colors, etc.
2. Modify `src/css/input.css` to add custom CSS layers if needed
3. Run `npm run tailwind` to see changes in real-time during development



