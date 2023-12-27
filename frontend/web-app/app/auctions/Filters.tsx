/* even though this is a client-side component we dont need to use the directive here because we are using this
inside another component which is also client-side. We can add the directive - but we might get a message 
in console saying this is not necessary... */
//'use client'

import { useParamsStore } from "@/hooks/useParamsStore";
import { Button } from "flowbite-react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
  {
    label: "Alphabetical",
    icons: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "End date",
    icons: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Recently added",
    icons: BsFillStopCircleFill,
    value: "new",
  },
];

const filterButtons = [
  {
    label: "Live Auctions",
    icons: GiFlame,
    value: "live",
  },
  {
    label: "End < 6 hours",
    icons: GiFinishLine,
    value: "endingSoon",
  },
  {
    label: "Completed",
    icons: BsStopwatchFill,
    value: "finished",
  },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Filter by</span>
        <Button.Group>
          {filterButtons.map(({ label, icons: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? "red" : "gray"}`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>
        <Button.Group>
          {orderButtons.map(({ label, icons: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "red" : "gray"}`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
        <Button.Group>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              {value}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  );
}
