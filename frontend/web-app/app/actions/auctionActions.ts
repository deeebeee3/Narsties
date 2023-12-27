"use server";

import { Auction, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  //this is an extended version of fetch - also gives us caching
  //this is server side fetching - client won't be aware of this
  const res = await fetch(`http://localhost:6001/search${query}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
