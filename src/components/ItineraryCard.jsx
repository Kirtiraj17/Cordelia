import React from "react";
import { formatDate, itineraryRoute } from "../utils";
import TickIcon from "./TickIcon";
// import Tick from "../assets/tick.svg";

const ItineraryCard = ({ itinerary }) => {
  itineraryRoute(itinerary?.ports);
  return (
    <div className="border border-1 rounded-md relative mb-4 drop-shadow lg:flex">
      <div className="w-full px-3 lg:p-6 lg:w-[44%]">
        <div className="relative z-10">
          <img
            className="w-[435px] h-[170px] lg:h-[270px] rounded-t-lg"
            src={
              itinerary?.image_url ||
              "https://images.cordeliacruises.com/cordelia_v2/public/images/goa-laksh-mumbai-itinerary-desktop-image-01.webp"
            }
            alt=""
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[140px] flex items-end"
            style={{
              background:
                "linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(9, 9, 121, 0) 100%, rgba(0, 212, 255, 0) 100%)",
            }}
          >
            <div className="flex items-center justify-between px-3 lg:px-6 w-full pb-3 lg:pb-6">
              <div className="flex flex-wrap pr-6">
                <p className="text-xs text-white lg:text-lg font-bold">
                  {itineraryRoute(itinerary?.ports)}
                </p>
                <p className="text-xs text-white lg:text-lg font-bold">
                  &nbsp;({itinerary?.nights}N/{itinerary?.nights + 1}D)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-center py-2 flex justify-center rounded-b-lg px-4"
          style={{
            background:
              "linear-gradient(90deg, rgb(233, 212, 232) 0%, rgb(249, 213, 206) 100%)",
          }}
        >
          <div className="flex items-center">
            <p className="text-xs lg:text-base font-bold">
              {formatDate(itinerary?.start_date)}
            </p>
            <img
              className="h-4 lg:h-6 px-2"
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-black-icon.svg"
              alt="backIcon"
            />
            <p className="text-xs lg:text-base font-bold">
              {formatDate(itinerary?.end_date)}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-[56%]">
        <div className="mt-3 lg:mt-9 col-span-3 relative flex lg:-ml-8">
          <span className="group relative w-full pr-4">
            {/* <span
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 shadow-allSide opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-white/0 before:border-t-white before:content-[''] group-hover:opacity-100 text-xs w-[200px] text-wrap z-50"
              style={{ textWrap: "wrap" }}
              >
              A shore excursion is a group tour or activity aimed at cruise
              travelers who can spend time in each port they're visiting on
              their itinerary. <br /> All shore excursions are available at
              an additional cost.
              </span> */}
            <div
              className={`flex ${
                itinerary?.shore_excursions ? "justify-between" : "justify-end"
              } gap-4`}
            >
              {itinerary?.shore_excursions && (
                <div className="px-4 lg:px-6 w-fit py-1.5 rounded-r-full cursor-pointer bg-blue-400/20 flex items-center">
                  <p className="text-xs lg:text-sm text-blue-400 font-semibold">
                    Shore Excursions Available
                  </p>
                  <img
                    className="h-5 ml-1 lg:ml-3"
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/shoreex-info-icon.svg"
                    alt=""
                  />
                </div>
              )}
              <div className="flex justify-end items-center lg:hidden">
                <img
                  className="h-4 lg:h-6 mt-[2px]"
                  src={
                    itinerary?.trip_type === "one_way"
                      ? "https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                      : "https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-purple-icon.svg"
                  }
                  alt=""
                />
                <p className="text-xs lg:text-base ml-2 font-bold">
                  {itinerary?.trip_type === "one_way"
                    ? "One Way Trip"
                    : "Round Trip"}
                </p>
              </div>
            </div>
          </span>
          <div className="absolute right-0 top-1"></div>
        </div>
        <div className="pl-4 lg:pl-0">
          <div className="mt-5 pb-2 border-b mr-4">
            <p className="text-xs lg:text-sm text-gray-500 font-medium">
              Visiting Ports
            </p>
            <div className="flex flex-wrap py-2 lg:flex lg:justify-between">
              <div className="lg:hidden">
                <p className="text-xs lg:text-base font-semibold">
                  {itineraryRoute(itinerary?.ports, " | ")}
                </p>
              </div>
              {/* <div className="lg:hidden">
                <p className="text-xs lg:text-base font-semibold">
                  Lakshadweep <span>{" | "}</span>
                </p>
              </div>
              <div className="lg:hidden">
                <p className="text-xs lg:text-base font-semibold">Mumbai </p>
              </div> */}
              <div className="hidden w-2/3 lg:flex lg:flex-wrap">
                <div>
                  <p className="text-xs lg:text-base font-semibold">
                    {itineraryRoute(itinerary?.ports, " | ")}
                  </p>
                </div>
                {/* <div>
                  <p className="text-xs lg:text-base font-semibold">
                    Lakshadweep <span>{" | "}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-base font-semibold">Mumbai </p>
                </div> */}
              </div>
              <div className="hidden lg:flex lg:justify-end lg:items-center">
                <img
                  className="h-4 lg:h-6 mt-[2px]"
                  src={
                    itinerary?.trip_type === "one_way"
                      ? "https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                      : "https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-purple-icon.svg"
                  }
                  alt=""
                />
                <p className="text-xs lg:text-base ml-2 font-bold">
                  {itinerary?.trip_type === "one_way"
                    ? "One Way Trip"
                    : "Round Trip"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs lg:text-sm text-gray-500 font-medium">
              Inclusions
            </p>
            <div className="flex justify-between gap-4 py-2">
              <div className="flex flex-wrap">
                {itinerary?.inclusions.map((inclusion, idx) => (
                  <div key={`${inclusion}-${idx}`} className="mr-2">
                    <p className="flex items-center gap-1 text-xs lg:text-base font-semibold">
                      <TickIcon />
                      <span>{inclusion}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-1/5 lg:w-auto">
                <p className="text-xs text-blue-500 underline lg:text-base font-semibold pr-4 cursor-pointer">
                  View All{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4 w-[96%] lg:hidden"></div>
          <div className="">
            <div className="grid grid-cols-2 items-center relative mb-3 gap-2">
              <div className="">
                <div>
                  <p className="text-xs text-blue-500 font-semibold mb-1">
                    Available Offers
                  </p>
                  {itinerary?.offers_available.map((offer) => (
                    <div key={offer} className="flex items-center mb-2">
                      <img
                        className="mr-2 h-4"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg"
                        alt=""
                      />
                      <p className="text-xs font-semibold text-green-600">
                        {offer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs bg-orange-600 py-1 px-4 italic text-white font-bold">
                  Fast Selling
                </span>
                <div className="pr-4 py-2 flex flex-col">
                  {/* {itinerary?.actual_starting_fare !==
                    itinerary?.starting_fare && ( */}
                  <span className="text-xs font-medium line-through">
                    ₹{itinerary?.actual_starting_fare}
                  </span>
                  {/* )} */}
                  <span className="text-xl font-bold">
                    ₹{itinerary?.starting_fare}
                  </span>
                  <span className="text-xs font-medium">
                    Per Person/ Excl. GST
                  </span>
                </div>
                <div className="lg:flex lg:justify-between gap-3 my-2 pr-4 mb-4 hidden">
                  <button className="border-2 border-[#92278F] rounded text-[#92278F] font-bold text-xs basis-1/2 py-3 uppercase">
                    Book Now
                  </button>
                  <button className="border-2 border-[#92278F] rounded bg-[#92278F] text-white font-bold text-xs basis-1/2 py-3 uppercase">
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 my-2 pr-4 mb-4 lg:hidden">
              <button className="border-2 border-[#92278F] rounded text-[#92278F] font-bold text-xs basis-1/2 py-3 uppercase">
                Book Now
              </button>
              <button className="border-2 border-[#92278F] rounded bg-[#92278F] text-white font-bold text-xs basis-1/2 py-3 uppercase">
                View Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
