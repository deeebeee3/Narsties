"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Auction, PagedResult } from "@/types";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import queryString from "query-string";
import EmptyFilter from "../components/EmptyFilter";

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();

  /* get all of the state from the store */
  //const params = useParamsStore((state) => state);

  /* better way just get the pieces of state we want from the store */
  /* we pass shallow - which will allow us to get just the state we need from zustand */
  const params = useParamsStore((state) => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
  }));

  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({ url: "", query: params });

  /* Go to our store and set the pageNumber */
  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  /* whenever the url changes, this is called and we go and get our new data 
  with our new query string and update the data in our local state here */
  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.results.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}
