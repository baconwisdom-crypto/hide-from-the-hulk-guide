# Content schema

## Site configuration

`SiteConfig` contains `siteName`, `shortName`, `siteSlug`, localized `description`, `siteUrl`, required `searchVisibility`, `theme`, `brandIcon`, `navigationIcons`, `supportedLocales`, `publishedLocales`, `plannedLocales`, `lastVerified`, `officialLinks`, `heroImage`, `heroVideo`, `mediaPresentation`, `analytics`, `ads`, `evidenceLabels`, and `disclaimer`.

`searchVisibility` is the only indexing strategy switch. `public` requires a real HTTPS site URL, including a confirmed production Vercel alias, and produces indexable metadata, same-origin canonical, hreflang and Open Graph URLs, crawlable robots, and a sitemap limited to published routes. `preview` requires HTTPS, produces noindex, nofollow, and noarchive metadata, disallows crawling, and returns an empty sitemap. The publisher must never submit a preview sitemap.

`brandIcon` is required in `config/site.ts` and contains `src`, localized `alt`, and `sourceId`. `src` must be a local public path to one confirmed square first-party icon source. The source record must use `publicUse: "official-first-party"`. `brandIcon` is a separate contract from `heroImage`; page screenshots, competitor images, fan-wiki images, and third-party media cannot fill this field. The framework generates and validates `public/favicon.ico`, `public/icon-192.png`, and `public/apple-touch-icon.png` from that one source. Root metadata declares all three outputs through `metadata.icons`.

`navigationIcons` is a configuration-layer map keyed by a top-level navigation `page_id` or a stable section key. Values use the restricted `NavigationIconName` set: `overview`, `guides`, `tier-lists`, `codes`, `updates`, `tools`, `database`, `characters`, `maps`, and `sources`. Missing mappings use the stable `overview` fallback and produce a validation warning. Page records keep navigation labels and ordering only.

`mediaPresentation.showImageText` defaults to `false`. In that state, image labels and captions stay in the content record without rendering below the image. Set it to `true` only for a site that explicitly requires visible image text. `mediaPresentation.homeHeroVariant` is optional and accepts `compact-square` or `wide-video`; when omitted, `heroImage.ratio` or `fit: "contain"` selects the compact square presentation and other image or video media uses the wide video presentation. Media names, source URLs, video IDs, timecodes, and screenshot bindings remain internal in either state.

The framework example may keep both `heroImage` and `heroVideo` empty while `searchVisibility` is `preview`; validation emits an explicit empty homepage media warning. A site with `searchVisibility: "public"` and no approved homepage media fails validation, so a new site cannot silently publish a media-free homepage.

## Page registry

Every `PageRecord` contains:

`page_id`, `route`, `section`, localized `title`, localized `description`, `pageType`, localized `pageStatus`, localized `intro`, `quickAnswer`, `sections`, `faq`, `boundary`, `sourceIds`, `evidence`, localized `spoilerLevel`, `images`, `relatedPageIds`, `localeAvailability`, `publicationStatus`, and optional navigation metadata. An optional `primaryAction` carries a localized `label` plus exactly one target, either a registered `pageId` (preferred, locale-aware) or an explicit in-site `href`. A published `Home` page must declare one; other page types may omit it. When it resolves, the quick-answer area renders as a single action card; otherwise the quick answer keeps its reference panel and status badge. The label, page id, and href are content-layer configuration and must never be hardcoded in shared components. A derived game site points its Home `primaryAction` at that game's Getting Started overview or hub, or at the first beginner guide when the game has no hub, and always supplies a localized label rather than English text baked into a component. Page-level `sourceIds` drive the single public source block at the bottom of the page. They may contain at most three unique records, and every referenced record must have `publicUse: "official-first-party"`.

## Evidence

Every `EvidenceRow` contains an ID, localized statement, source ID, evidence type, verification status, spoiler level, and optional notes. Internal provenance fields may retain the source media, original URL, captured source wording, page section, and unverified handling. Evidence remains available to editorial checks without requiring a reader-facing ledger. A source record retains its publisher, public URL, last checked date, status, use note, and `publicUse` classification. Use `internal-only` for competitor guides, fan wikis, third-party videos, community posts, and any other research evidence that must stay out of the public source block. Section-level `sourceIds` are retained for internal traceability and are not rendered.

## Media

Every image keeps a public path or trusted URL, localized alt text, optional in-card label, optional caption, source ID or URL, optional article URL, media name, video ID, timecode, ratio, and fit. Alt text always reaches the rendered image. The remaining provenance fields stay in JSON and internal evidence records. Visible labels and captions require the site-wide opt-in described above.

The shared renderer uses the media record for presentation without changing its provenance contract. Video-ratio images and images without a compact marker render as full-width single-column media with vertical spacing. Square and portrait ratios, plus `fit: "contain"`, render in a compact responsive grid. The renderer passes full-column or compact-column `sizes` values to Next Image so responsive loading matches the actual layout. The table of contents, article measure, mobile behavior, and media content remain unchanged by this presentation rule.

`heroImage` additionally requires `sourceId` and `heroMediaType`, which may be `official-key-art` or `official-promotional-image`. `heroVideo` requires `sourceId` and `heroMediaType: "official-promotional-video"`. The referenced source must be classified `official-first-party`. Page screenshots are never promoted to hero media automatically.

## V2 structure data

`content/structure.json` follows `lib/architecture-types.ts`. PageSection additionally accepts `sourceNote`, `catalog` and conditional `steps`. `scripts/architecture-contract.mjs` validates task relationships and required modules; `check-architecture-build.mjs` checks actual compiled anchors and background indexes. See README.md for field ownership and examples.
