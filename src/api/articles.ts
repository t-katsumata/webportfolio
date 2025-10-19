import { client } from "../libs/microcms";

export const getPickupWorks = async () => {
  const data = await client.getList({
    endpoint: "works",
    queries: {
      orders: 'slug',
      filters: "pickup[equals]true"
    },
  });
  return data;
};
