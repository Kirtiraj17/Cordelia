import React, { useEffect, useState } from "react";
import ItineraryCard from "./ItineraryCard";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
  Button,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { isMobile } from "react-device-detect";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const Cruise = ({ itinerariesData, loading }) => {
  const itineraries = itinerariesData?.itineraries || [];
  const [filteredItineraries, setFilteredItineraries] = useState(
    itineraries || []
  );
  const [filterTags, setFilterTags] = useState([]);

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [value, setValue] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  // useEffect(() => {
  //   const resize = () => {
  //     if (window.innerWidth >= 768) {
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   };

  //   window.addEventListener("resize", resize);

  //   return () => removeEventListener("resize", resize);
  // }, []);

  useEffect(() => {
    // Update filteredItineraries only when the itineraries array changes
    if (
      itineraries.length > 0 &&
      (filteredItineraries.length !== itineraries.length ||
        !filteredItineraries.every((iti, idx) => iti === itineraries[idx]))
    ) {
      setFilteredItineraries(itineraries);
    }
  }, [itineraries]);

  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      const [start, end] = value;
      setStartDate(start?.format("DD/MM/YYYY") || null);
      setEndDate(end?.format("DD/MM/YYYY") || null);
    }
  }, [value]);

  const toggleDestination = (portName) => {
    setSelectedDestinations((prev) =>
      prev.includes(portName)
        ? prev.filter((name) => name !== portName)
        : [...prev, portName]
    );
  };

  const applyFilters = () => {
    const parseDate = (dateString) => {
      if (!dateString || typeof dateString !== "string") {
        return null;
      }
      const [day, month, year] = dateString?.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const filterStartDate = startDate ? parseDate(startDate) : null;
    const filterEndDate = endDate ? parseDate(endDate) : null;

    const results = itineraries.filter((iti) => {
      const matchesDestination =
        selectedDestinations.length === 0 ||
        iti?.ports?.some((port) => selectedDestinations.includes(port?.name));

      const itineraryStartDate = parseDate(iti?.start_date);
      const itineraryEndDate = parseDate(iti?.end_date);
      const matchesDate =
        (!filterStartDate || itineraryStartDate >= filterStartDate) &&
        (!filterEndDate || itineraryEndDate <= filterEndDate);

      return matchesDestination && matchesDate;
    });

    setFilteredItineraries(results);
    updateFilterTags();
  };

  const updateFilterTags = () => {
    const dateTag = endDate ? `${startDate} - ${endDate}` : null;
    const tags = [...selectedDestinations];
    if (dateTag) tags.push(dateTag);
    setFilterTags(tags);
  };

  const handleClearFilter = () => {
    setFilteredItineraries(itineraries);
    setFilterTags([]);
    setSelectedDestinations([]);
    setStartDate(null);
    setEndDate(null);
    setValue([]);
  };

  return (
    <>
      <div className="w-full mx-auto px-4 lg:px-0 lg:max-w-[1024px] xl:max-w-[1100px]">
        <div className="mx-auto px-4 lg:px-32 text-center pt-8 lg:pt-16 pb-6 lg:pb-10">
          <h1 className="font-semibold text-2xl lg:text-3xl playfair-display-600">
            Explore Cruise Holidays
          </h1>
        </div>
        {!isMobile ? (
          <div className="flex justify-center rounded-sm">
            <Popover className="w-full lg:w-auto">
              <PopoverButton className="w-full lg:w-auto block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                <div className="w-full lg:w-[300px] drop-shadow rounded-l-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
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
                    onClick={applyFilters}
                    className="w-full rounded-md uppercase bg-[#92278F] font-bold text-white py-2"
                  >
                    Apply
                  </CloseButton>
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="w-full lg:w-auto">
              <PopoverButton className="w-full lg:w-auto block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                <div className="w-full lg:w-[300px] drop-shadow rounded-r-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
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
                      weekDays={weekDays}
                    />
                  </div>
                  <CloseButton
                    onClick={applyFilters}
                    className="w-full rounded-md uppercase bg-[#92278F] font-bold text-white py-2"
                  >
                    Apply
                  </CloseButton>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={open} className="w-full">
              <div className="flex justify-center rounded-sm">
                <Popover className="w-full lg:w-auto">
                  <button className="w-full lg:w-auto block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                    <div className="w-full lg:w-[300px] drop-shadow rounded-l-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
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
                  </button>
                </Popover>
                <Popover className="w-full lg:w-auto">
                  <button className="w-full lg:w-auto block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                    <div className="w-full lg:w-[300px] drop-shadow rounded-r-lg overflow-hidden border border-gray-200 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium">
                      <div className="flex items-center">
                        <img
                          className="h-4 lg:h-6 mr-2"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-upcoming-icon.svg"
                          alt=""
                        />
                        <p className="text-gray-600 text-xs lg:text-lg">
                          Dates
                        </p>
                      </div>
                      <img
                        className="h-4 lg:h-6 mr-2"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg"
                        alt=""
                      />
                    </div>
                  </button>
                </Popover>
              </div>
            </Button>
            <Dialog
              open={isOpen}
              as="div"
              className="relative z-10 focus:outline-none"
              onClose={close}
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                      transition
                      className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                      <div>
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
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold">Select Sailing Dates</p>
                        <div className="my-3 flex justify-center">
                          <Calendar
                            format="DD/MM/YYYY"
                            value={value}
                            onChange={setValue}
                            range
                            shadow={false}
                            weekDays={weekDays}
                          />
                        </div>
                        <CloseButton
                          onClick={applyFilters}
                          className="w-full rounded-md uppercase bg-[#92278F] font-bold text-white py-2"
                        >
                          Apply
                        </CloseButton>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </DialogBackdrop>
            </Dialog>
          </>
        )}
        <div className="my-4 flex flex-wrap gap-2">
          {filterTags?.map((tag) => (
            <span
              key={tag}
              className="p-2 rounded-full border border-[#92278F] text-[#92278F] bg-white text-xs lg:text-base font-semibold"
            >
              {tag}
            </span>
          ))}{" "}
          {filterTags?.length > 0 && (
            <span
              onClick={handleClearFilter}
              className="p-2 rounded-full border border-[#92278F] text-[#92278F] bg-white text-xs lg:text-base font-semibold cursor-pointer"
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
            <p>Loading...</p>
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
