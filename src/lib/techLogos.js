// Logos are picked up automatically from src/pics/logos/, drop in a file named
// after the tech's slug (e.g. java.png, csharp.svg) and it renders on the next build.
const logoModules = import.meta.glob('../pics/logos/*.{png,svg,webp,jpg,jpeg}', { eager: true, import: 'default' })

export const LOGOS = Object.fromEntries(
  Object.entries(logoModules).map(([path, src]) => [
    path.split('/').pop().replace(/\.\w+$/, '').toLowerCase(),
    src,
  ])
)

export const slugify = name => name.toLowerCase().replace(/[^a-z0-9]/g, '')

// Names whose punctuation is the whole distinction: slugify() strips it, so both
// 'C++' and 'C#' collapse to 'c' and would silently miss cpp.png / csharp.png.
const ALIASES = { 'c++': 'cpp', 'c#': 'csharp' }

export const logoFor = name => LOGOS[ALIASES[name.toLowerCase()] ?? slugify(name)]
