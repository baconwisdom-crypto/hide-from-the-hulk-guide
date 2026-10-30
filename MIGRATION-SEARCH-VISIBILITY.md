# Search visibility migration

Every derived site must add a literal `searchVisibility` field to `config/site.ts`:

```ts
searchVisibility: "preview",
```

Use `preview` while a site is under review or reachable through a temporary deployment address. Use `public` only after the production address is a real HTTPS address. Hosts such as localhost, 127.0.0.1, `.example`, and preview, staging, test, or demo placeholders fail the public contract. A confirmed production Vercel alias such as `https://dimraeth-guide.vercel.app` is allowed when it is not a preview placeholder.

The value controls page metadata, canonical and alternate URL generation, Open Graph URL output, `robots.txt`, and `sitemap.xml`. A public sitemap contains published routes only. A preview sitemap is empty and must not be submitted to Google Search Console.

Migration steps:

1. Add the literal field and choose the intended value.
2. Replace any publication-status based robots logic with the shared `robotsForSearchVisibility` helper.
3. Keep `app/robots.ts` and `app/sitemap.ts` connected to `siteConfig.searchVisibility`.
4. Set the public site URL to the final HTTPS domain before selecting `public`.
5. Run `npm run verify` and inspect the generated metadata, robots, sitemap, canonical, hreflang, and Open Graph URLs.
6. Configure the publisher profile with the same value. A mismatch stops preparation and doctor checks.

The publisher keeps the legacy `indexingEnabled` profile field for migration. Existing profiles should set it to the value represented by `searchVisibility`; new profiles should treat `searchVisibility` as the visible contract. A machine-readable manifest may expose `searchVisibility` through the profile's optional `siteManifestFile`, or one of the conventional `search-visibility.json` and `site-manifest.json` files. If multiple sources exist, they must agree.
