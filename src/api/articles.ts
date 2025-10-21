import type { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "../libs/microcms";
import type { Work } from "../types";

export const getAffairsWorks = async (limit = 100): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        orders: 'slug',
        filters: 'workCategory[contains]業務開発',
        limit: limit
      },
    });
    return data;
  } catch(err) {
    console.log("~~ getAffairsWorks ~~");
    console.log(err);
    return undefined;
  }
};

export const getPrivatesWorks = async (limit = 100): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        orders: 'slug',
        filters: 'workCategory[contains]個人開発',
        limit: limit
      },
    });
    return data;
  } catch(err) {
    console.log("~~ getPrivatesWorks ~~");
    console.log(err);
    return undefined;
  }
};

export const getPickupWorks = async (limit = 100): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        orders: 'slug',
        filters: "pickup[equals]true",
        limit: limit
      },
    });
    return data;
  } catch(err) {
    console.log("~~ getPickupWorks ~~");
    console.log(err);
    return undefined;
  }
};

export const getWorksBySlug = async (slug: string): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        filters: `slug[equals]${slug}`
      },
    });
    return data;
  } catch(err) {
    console.log("~~ getWorksBySlug ~~");
    console.log(err);
    return undefined;
  }
}
