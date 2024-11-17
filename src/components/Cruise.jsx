import React from "react";
import ItineraryCard from "./ItineraryCard";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const Cruise = ({ itineraries }) => {
  return (
    <>
      <div className="w-full mx-auto px-4 lg:px-0 lg:max-w-[1024px] xl:max-w-[1100px]">
        <div className="mx-auto px-4 lg:px-32 text-center pt-8 lg:pt-16 pb-6 lg:pb-10">
          <h1 className="font-semibold text-2xl lg:text-3xl playfair-display-600">
            Explore Cruise Holidays
          </h1>
        </div>
        <div className="flex justify-center rounded-sm">
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <div className="w-[300px] drop-shadow rounded-l-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
                <div className="flex items-center">
                  <img
                    className="h-4 lg:h-6 mr-2"
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/destination-upcoming-icon.svg"
                    alt=""
                  />
                  <p className="text-gray-600 text-xs lg:text-lg">
                    Destinations
                  </p>
                </div>
                <img
                  className="h-4 lg:h-6 mr-2"
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg"
                  alt=""
                />
              </div>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="w-[300px] mt-2 drop-shadow border bg-white text-black divide-y divide-white/5 rounded-xl text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold">Insights</p>
                  <p className="">
                    Measure actions your users take
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <div className="w-[300px] drop-shadow rounded-r-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
                <div className="flex items-center">
                  <img
                    className="h-4 lg:h-6 mr-2"
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-upcoming-icon.svg"
                    alt=""
                  />
                  <p className="text-gray-600 text-xs lg:text-lg">Dates</p>
                </div>
                <img
                  className="h-4 lg:h-6 mr-2"
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg"
                  alt=""
                />
              </div>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="w-[300px] mt-2 bg-black divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Insights</p>
                  <p className="text-white/50">
                    Measure actions your users take
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Automations</p>
                  <p className="text-white/50">
                    Create your own targeted content
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Reports</p>
                  <p className="text-white/50">Keep track of your growth</p>
                </a>
              </div>
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Documentation</p>
                  <p className="text-white/50">
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <div className="flex justify-between mt-8">
          <div>
            <p className="text-sm lg:text-lg font-semibold text-gray-600">
              Cruise Search Results <span>({itineraries?.length || 0})</span>
            </p>
          </div>
          <div className="flex items-center cursor-pointer">
            <p className="text-base lg:text-lg font-semibold text-gray-600">
              Filter
            </p>
            <img
              className="h-2.5 lg:h-3.5 ml-2"
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/filter-icon.svg"
              alt=""
            />
          </div>
        </div>
        <div className="my-4">
          {itineraries?.map((itinerary) => {
            return (
              <ItineraryCard
                key={itinerary?.itinerary_id}
                itinerary={itinerary}
              />
            );
          })}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Cruise;
