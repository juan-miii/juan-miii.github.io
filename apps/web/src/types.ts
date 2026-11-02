import type { CollectionEntry } from "astro:content";
import type { PageContent } from "./content/schemas/page.schema";

export type FooterContent = PageContent["footer"];
export type NavigationItem = PageContent["navigation"][number];
export type SocialLink = FooterContent["links"][number];
export type Action = PageContent["hero"]["primaryAction"];
export type SectionCopy = PageContent["work"];
export type Method = PageContent["method"];
export type Capabilities = PageContent["capabilities"];
export type ProcessStep = PageContent["process"][number];
export type ProfileContent = PageContent["profile"];

export type ProjectEntry = CollectionEntry<"projects">;

export type ExperienceRole = CollectionEntry<"experience">["data"] & {
	organization: CollectionEntry<"organizations">["data"] | null;
};
