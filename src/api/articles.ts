import type { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "../libs/microcms";
import type { Work } from "../types";

export const getAllWorks = async (limit = 100): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        orders: "publishedAt",
        limit: limit,
      },
    });
    return data;
  } catch (err) {
    console.log("~~ getAllWorks ~~");
    console.log(err);
    return undefined;
  }
};

export const getPickupWorks = async (limit = 100): Promise<MicroCMSListResponse<Work> | undefined> => {
  try {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: {
        orders: "publishedAt",
        filters: "pickup[equals]true",
        limit: limit,
      },
    });
    return data;
  } catch (err) {
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
        filters: `slug[equals]${slug}`,
      },
    });
    return data;
  } catch (err) {
    console.log("~~ getWorksBySlug ~~");
    console.log(err);
    return undefined;
  }
};

export const getAdjacentWorks = async (publishedAt: string) => {
  const [prev, next] = await Promise.all([
    client.get({
      endpoint: "works",
      queries: {
        filters: `publishedAt[less_than]${publishedAt}`,
        orders: "-publishedAt",
        limit: 1,
      },
    }),
    client.get({
      endpoint: "works",
      queries: {
        filters: `publishedAt[greater_than]${publishedAt}`,
        orders: "publishedAt",
        limit: 1,
      },
    }),
  ]);

  return {
    prev: prev.contents[0] || null,
    next: next.contents[0] || null,
  };
};
