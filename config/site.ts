import type { SiteConfig } from "@/lib/types";
export const siteConfig: SiteConfig = {
  siteName: "Hide From The Hulk Wiki",
  shortName: "HFH",
  siteSlug: "hide-from-the-hulk",
  description: { en: "Hide From The Hulk guides to heroes, controls, maps, cosmetic rolls and team survival, with reviewed gameplay images." },
  siteUrl: "https://www.hidefromthehulkroblox.wiki",
  searchVisibility: "preview",
  architecture: { enabled: true, templates: ["landing", "hub", "comparison", "procedure", "catalog", "troubleshooting"] },
  theme: { accent: "#a3e635", accentSoft: "#d9f99d", background: "#0b1110", panel: "#13201a" },
  brandIcon: { src: "/images/official-icon.png", alt: { en: "Hide From The Hulk official Roblox icon" }, sourceId: "official-game" },
  navigationIcons: { "guides-hub": "guides", heroes: "characters", codes: "codes", updates: "updates", sources: "sources" },
  supportedLocales: ["en"], publishedLocales: ["en"], plannedLocales: [],
  lastVerified: "2026-10-30",
  officialLinks: [
    { label: "Play on Roblox", url: "https://www.roblox.com/games/128913244126628/Hide-From-The-Hulk" },
    { label: "Creator community", url: "https://www.roblox.com/communities/79035740/Hide-From-The-Hulk" },
    { label: "Sushi Deluxe Studios", url: "https://www.sushideluxe.gg/" }
  ],
  heroImage: { src: "/images/official-hero.png", alt: { en: "Official Hide From The Hulk promotional image from Roblox" }, heroMediaType: "official-promotional-image", sourceId: "official-game", ratio: "video" },
  heroVideo: null,
  mediaPresentation: { showImageText: false },
  analytics: { enabled: false },
  ads: { enabled: false, previewPlaceholders: true, desktopChrome: { enabled: true }, placements: { "top-sticky": true, "left-sticky": true, "home-banner": true, "article-banner": true, "sidebar-square": true } },
  evidenceLabels: [ { label: "Official rules", note: { en: "Roblox game identity and creator announcements." } }, { label: "Reviewed gameplay", note: { en: "Community recordings with dated interface examples." } } ],
  disclaimer: { en: "Independent fan guide. Hide From The Hulk is developed by Sushi Deluxe Studios and Clozy. This site is unaffiliated with its developers, Roblox or Marvel." }
} satisfies SiteConfig;
