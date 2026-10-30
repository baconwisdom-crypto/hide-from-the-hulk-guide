# Brand icon and navigation icon migration

Use this checklist when adopting the current framework in an existing game site. The migration is intentionally per site. It does not batch-rewrite derived projects.

## 1. Add the confirmed brand source

Copy one confirmed first-party square game icon into the derived site's `public/` directory. Keep the original source file. In `config/site.ts`, add:

```ts
brandIcon: {
  src: "/images/game/official-icon.png",
  alt: { en: "Official game icon" },
  sourceId: "official-site",
},
```

The referenced source record must be classified `official-first-party`. Keep this field separate from `heroImage`. Do not point it at an article screenshot, competitor image, fan-wiki image, or third-party video thumbnail.

In an existing Header, replace the old text-only mark:

```tsx
<span className="site-mark">shortName</span>
```

with the shared configured mark:

```tsx
<SiteBrandMark shortName={siteConfig.shortName} />
```

Keep the configured image as the default visual. `SiteBrandMark` uses the short name only after the image fails to load. The image remains decorative inside the named brand link, so its rendered `alt` is empty and the image is hidden from the accessibility tree while the full site name supplies the accessible label.

## 2. Generate the fixed icon outputs

Run this command from the framework or derived site root:

```text
npm run generate:brand-icons
```

The command reads `brandIcon.src` and writes only these exact files:

```text
public/favicon.ico
public/icon-192.png
public/apple-touch-icon.png
```

For a one-off explicit source, use `npm run generate:brand-icons -- --source public/images/game/official-icon.png`. Remote URLs are rejected. The generator checks that the source is square before writing.

## 3. Add top-level navigation icons

Map each top-level navigation page in `config/site.ts`:

```ts
navigationIcons: {
  "guides-hub": "guides",
  "characters-hub": "characters",
  codes: "codes",
  sources: "sources",
},
```

Use only the names in `NavigationIconName`. Content records keep labels and ordering. A missing mapping remains usable through the `overview` fallback and appears as a validation warning.

## 4. Keep long names and article media stable

The Header keeps the full site name in its own brand row. The navigation uses a separate row, which may scroll horizontally on wider narrow layouts, while the mobile menu remains available. The brand name may wrap at very narrow widths and must not be replaced by a truncation utility. Check a 320px viewport for overflow.

Article screenshots with `ratio: "video"` or the default video ratio render as a full-width vertical stack. Square and portrait images, plus images using `fit: "contain"`, render in the compact multi-column grid. `ContentImage` receives layout-specific `sizes` values so a full-column video does not advertise a half-column width to Next Image.

## 5. Verify and review

Run `npm run verify`. Review the Header brand mark and fallback, the favicon requests, Sidebar icon mappings, 44px summary and link hit areas, hover and focus-visible feedback, expanded groups, `aria-current="page"`, and the 320px layout. This migration changes local framework or site files only. It does not authorize deployment, synchronization, or publishing.

For the shared main container, homepage media sizing, and empty homepage media guard, continue with `MIGRATION-LAYOUT.md`.
