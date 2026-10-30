# Page layout and homepage media migration

Use this checklist when moving an existing game site to the current framework shell. It keeps layout changes in the framework and leaves page records, media files, and SEO copy in their existing layers.

## 1. Use the shared main container

Both the default English layout and the locale layout must render the page body through:

```tsx
<main className="page-content min-w-0">{children}</main>
```

Do not replace `page-content` with a site-specific padding utility. The class uses the framework token `--ui-page-content-padding`, which starts at `1rem` on narrow screens and grows toward `2rem` on desktop. Keep `min-w-0` so tables, cards, long titles, and media cannot force page-level horizontal overflow.

The outer shell may keep its sidebar gutter and grid gap. The `page-content` inset protects the PageHeader, homepage media, notices, tables, and cards from touching the main column boundary.

Keep the standard shell classes on both route layouts:

```tsx
<div className="... grid ... px-4 ... sm:px-6 ... lg:grid-cols-[15rem_minmax(0,1fr)]">
  <WikiSidebar locale={locale} />
  <main className="page-content min-w-0">{children}</main>
</div>
```

The `15rem` track belongs to the WikiSidebar. Keep `page-content` on the `main` content container only. Adding it to the sidebar or the outer grid applies the main-column inset to the navigation and makes the visible directory narrower.

The Header remains in normal document flow. Do not add `sticky`, `fixed`, `top-0`, or equivalent fixed-position classes to `components/site-header.tsx`. `WikiSidebar` and the article table of contents keep their existing sticky behavior.

## 2. Choose the homepage media presentation

The renderer derives the image presentation from the configured `heroImage` record:

- `ratio: "square"`, `ratio: "portrait"`, or `fit: "contain"` uses `compact-square`.
- Other image ratios and homepage video use `wide-video`.
- Set `mediaPresentation.homeHeroVariant` to `"compact-square"` or `"wide-video"` when the source ratio is unavailable or the site needs an explicit override.

Square or contained game art is capped near `26rem` on desktop. Wide video media can use the larger video cap. Both variants remain full-width on mobile.

Example override:

```ts
mediaPresentation: {
  showImageText: false,
  homeHeroVariant: "compact-square",
},
```

## 3. Resolve empty homepage media before release

`heroImage` and `heroVideo` are both empty in the neutral preview fixture, so `npm run check:content` emits an explicit warning. A site configured with `searchVisibility: "public"` fails the same check until it has an approved homepage hero image or video. Do not publish a new site with both fields empty.

## 4. Verify responsive widths

Run:

```text
npm run verify
```

Review the homepage at 320px, 768px, and 1440px. Confirm the page has no horizontal overflow, the main content has a visible safe inset, square art is narrower than wide video at desktop widths, and both homepage variants use the available mobile width.
