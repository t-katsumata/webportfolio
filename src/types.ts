// 略歴
export interface Biography {
  year: number;
  imageUrl: string;
  title: string;
  text: string;
}

// スキル一覧
export interface SkillItem {
  id: number;
  name: string;
  level?: number;
  detail: string;
  iconUrl: string;
}
export interface SkillCategory {
  title: string;
  content: SkillItem[];
}
export interface BasicSkillContent {
  language: SkillCategory;
  framework: SkillCategory;
  development: SkillCategory;
  version: SkillCategory;
  other: SkillCategory;
}
export interface BasicSkill {
  title: string;
  content: BasicSkillContent[];
}
export interface SubSkill {
  id: number;
  name: string;
  type: string;
  level: number;
  detail: string;
  iconUrl: string;
}
export interface Tool {
  id: number;
  name: string;
  type: string;
  detail: string;
  iconUrl: string;
}
export interface Qualification {
  id: number;
  name: string;
  date: string;
}
export interface SkillData {
  basicSkill: BasicSkill;
  subSkill: {
    title: string;
    content: SubSkill[];
  };
  tool: {
    title: string;
    content: Tool[];
  };
  qualification: {
    title: string;
    content: Qualification[];
  };
}

// 成果物ギャラリー
export interface Thumbnail {
  url: string;
  height: number;
  width: number;
}
export interface Work {
  id: string;
  workCategory: string[];
  slug: string;
  title: string;
  thumbnail: Thumbnail;
  summary: string;
  basicSkill: string[];
  subSkill: string[];
  tools: string[];
  period: string;
  devScale: string;
  position: string;
  detail: string;
  feature: string;
  assignment: string;
  siteUrl: string;
}
export interface WorkListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
