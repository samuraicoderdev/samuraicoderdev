# RoninCSS

A minimalist, utility-first CSS framework. Independent, like a ronin.

RoninCSS is a lightweight and customizable CSS framework inspired by the utility-first approach of TailwindCSS. It gives you the building blocks to design your own components quickly without fighting with opinionated styles.

## Philosophy

- **Utility-First:** Compose complex designs directly in your HTML with single-purpose classes.
- **Customizable:** Everything is driven by a central configuration file (`_variables.scss`). Change your color palette, spacing scale, or breakpoints in one place.
- **Independent:** No JavaScript, no build tools required in your project (just link the CSS). It's a pure CSS framework.
- **Predictable:** The classes are simple and do exactly what they say.

## Installation

You can include RoninCSS in your project in two ways:

### 1. Download the CSS

Download the `ronin.min.css` file from the `dist/` folder and include it in your HTML:

```html
<link rel="stylesheet" href="/path/to/ronin.min.css">

<div class="r-flex r-justify-between r-items-center r-p-4 r-bg-primary-500 r-text-white r-rounded-lg">
  <h1 class="r-text-xl r-font-bold">My Card</h1>
  <span class="r-bg-white r-text-primary-500 r-px-3 r-py-1 r-rounded-full r-text-sm">New</span>
</div>

<div class="r-grid r-grid-cols-1 md:r-grid-cols-2 lg:r-grid-cols-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

```



