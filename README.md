# SamuraiCoderDev Landing Page

A minimal landing page built with HTMX and Tailwind CSS, showcasing projects deployed on Netlify.

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
  - `index.html` - Main landing page with direct Netlify project links
  - `projects/` - HTMX fragments for project listings  
  - `netlify-list.html` - Direct links to deployed Netlify projects
  - `subprojects/` - Source code for individual projects
  - `css/` - Generated Tailwind CSS (output.css)
- `src/` - Source files for Tailwind CSS
  - `css/input.css` - Tailwind directives
- `tailwind.config.js` - Tailwind configuration
- `package.json` - npm scripts and dependencies

## Available Scripts

- `npm run dev` - Start Tailwind watcher and HTTP server concurrently (port 8080)
- `npm run tailwind` - Watch Tailwind CSS and rebuild on changes
- `npm run tailwind-build` - Build Tailwind CSS for production (minified)
- `npm run serve` - Start static HTTP server on port 8080
- `npm test` - Placeholder (no tests configured)

## Netlify Deployment Notes

This landing page is designed to work with Netlify deployments:
- Projects are deployed independently on Netlify
- No need for local subfolder deployment (projects use external Netlify URLs)
- Clean separation between source code and deployed applications

## Usage

The landing page (`public/index.html`) uses HTMX to load both local subprojects and deployed Netlify projects:
- Local subprojects: Loaded from `public/projects/list.html` (for local development)
- Deployed Netlify projects: Loaded from `public/projects/netlify-list.html` (for live deployment links)

## Netlify Deployment Setup

To add a new Netlify-deployed project:
1. Deploy your project on Netlify
2. Update `public/projects/netlify-list.html` with the Netlify URL
3. The source code should remain in `public/subprojects/` for reference

## Local Development vs Production
- **Local**: Uses subproject folders with their own build systems
- **Production**: Projects are deployed separately on Netlify with direct URLs

This hybrid approach allows for local development while showcasing live deployed projects.

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



