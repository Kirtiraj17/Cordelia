import React, { useEffect, useState } from "react";
import ItineraryCard from "./ItineraryCard";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Calendar, DateObject } from "react-multi-date-picker";

const Cruise = ({ itinerariesData, loading }) => {
  const { itineraries } = itinerariesData || {};
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [filterTags, setFilterTags] = useState([]);

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [value, setValue] = useState(new DateObject());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  // console.log(value.format("DD/MM/YYYY"), new DateObject())
  // console.log(value[0].day, value[0].month.number, value[0].year)
  // console.log(value[0]?.format("DD/MM/YYYY"), startDate?.getDate(), endDate?.getDate());

  useEffect(() => {
    setFilteredItineraries(itineraries);
  }, [itineraries]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      setStartDate(start?.format("DD/MM/YYYY"));
      setEndDate(end?.format("DD/MM/YYYY"));
    }
  }, [value]);

  const toggleDestination = (portName) => {
    setSelectedDestinations((prev) =>
      prev.includes(portName)
        ? prev.filter((name) => name !== portName)
        : [...prev, portName]
    );
  };

  const handleDestinationApply = () => {
    const filteredItinerariesByDestination = filteredItineraries.filter((iti) =>
      iti?.ports.some((port) => selectedDestinations.includes(port?.name))
    );

    if (filteredItinerariesByDestination?.length === 0) {
      setFilteredItineraries(itineraries);
    } else {
      setFilteredItineraries(filteredItinerariesByDestination);

      if (endDate) {
        const dateFilter = `${startDate} - ${endDate}`;
        setFilterTags([...selectedDestinations, dateFilter]);
      } else {
        setFilterTags([...selectedDestinations]); // No date tag if endDate is absent
      }
    }
  };

  const handleDateApply = () => {
    const parseDate = (dateString) => {
      if (!dateString || typeof dateString !== "string") {
        return null; // Return null if dateString is invalid
      }
      const [day, month, year] = dateString?.split("/").map(Number);
      return new Date(year, month - 1, day); // month is zero-indexed
    };

    const filteredItinerariesByDate = filteredItineraries.filter((iti) => {
      const itineraryStartDate = parseDate(iti?.start_date);
      const itineraryEndDate = parseDate(iti?.end_date);

      const filterItineraryStartDate = parseDate(startDate);
      const filterItineraryEndDate = endDate ? parseDate(endDate) : null;

      return (
        itineraryStartDate >= filterItineraryStartDate &&
        (filterItineraryEndDate
          ? itineraryEndDate <= filterItineraryEndDate
          : true)
      );
    });

    setFilteredItineraries(filteredItinerariesByDate);
    // const dateFilter = endDate ? `${startDate}-${endDate}` : "";
    // setFilterTags([...selectedDestinations, dateFilter]);

    if (endDate) {
      const dateFilter = `${startDate} - ${endDate}`;
      setFilterTags([...selectedDestinations, dateFilter]);
    } else {
      setFilterTags([...selectedDestinations]); // No date tag if endDate is absent
    }
  };

  const handleClearFilter = () => {
    setFilteredItineraries(itineraries);
    setFilterTags([]);
    setSelectedDestinations([]);
    setStartDate(new Date());
    setEndDate(new Date());
    setValue(new DateObject());
  };

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
              className="w-[300px] mt-2 drop-shadow border bg-white text-black divide-y divide-white/5 rounded-lg text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="p-3">
                <p className="font-bold">Select Destination</p>
                <div className="flex flex-wrap gap-2 my-4">
                  {itinerariesData?.ports?.map((port, idx) => (
                    <span
                      key={port?.name}
                      onClick={() => toggleDestination(port?.name)}
                      className={`py-2 px-4 rounded gap-2 cursor-pointer border ${
                        selectedDestinations.includes(port?.name)
                          ? "border-[#92278F] text-[#92278F] bg-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {port?.name}
                    </span>
                  ))}
                </div>
                <CloseButton
                  onClick={handleDestinationApply}
                  className="w-full rounded-md uppercase bg-[#92278F] font-bold text-white py-2"
                >
                  Apply
                </CloseButton>
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
              className="w-[300px] mt-2 drop-shadow border bg-white text-black divide-y divide-white/5 rounded-lg text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="p-3">
                <p className="font-bold">Select Sailing Dates</p>
                <div className="my-3 flex justify-center">
                  <Calendar
                    format="DD/MM/YYYY"
                    value={value}
                    onChange={setValue}
                    range
                    shadow={false}
                  />
                </div>
                <CloseButton
                  onClick={handleDateApply}
                  className="w-full rounded-md uppercase bg-[#92278F] font-bold text-white py-2"
                >
                  Apply
                </CloseButton>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <div className="my-4 flex flex-wrap gap-2">
          {filterTags?.map((tag) => (
            <span
              key={tag}
              className="p-2 rounded-full border border-[#92278F] text-[#92278F] bg-white"
            >
              {tag}
            </span>
          ))}{" "}
          {filterTags?.length > 0 && (
            <span
              onClick={handleClearFilter}
              className="p-2 rounded-full border border-[#92278F] text-[#92278F] bg-white cursor-pointer"
            >
              Clear All X
            </span>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <div>
            <p className="text-sm lg:text-lg font-semibold text-gray-600">
              Cruise Search Results{" "}
              <span>({filteredItineraries?.length || 0})</span>
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
          {loading ? (
            <>Loading...</>
          ) : filteredItineraries?.length > 0 ? (
            filteredItineraries?.map((itinerary) => {
              return (
                <ItineraryCard
                  key={itinerary?.itinerary_id}
                  itinerary={itinerary}
                />
              );
            })
          ) : (
            <p>No results found!</p>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Cruise;
