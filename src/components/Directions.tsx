import { Disclosure, Popover, Transition, Tab } from "@headlessui/react"
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ClockIcon,
  TrashIcon,
  UserCircleIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"

import {
  MdDirectionsCar,
  MdDirectionsBusFilled,
  MdOutlineDirectionsBike,
  MdDirectionsWalk,
  MdOutlineVisibility,
} from "react-icons/md"
import { BiDirections } from "react-icons/bi"

import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { BsTrash3 } from "react-icons/bs"

function Directions({
  onPlaceChanged,
  handleDestinationAddress,
  handleNewDestinationName,
  handleNewDestinationAddress,
  handleRemoveDestination,
  destinationAddresses,
  selectedTravelMode,
  SetSelectedTravelMode,
  time,
  setTime,
  handlePublicOrigin,
  handlePublicDestination,
  calculateRoute,
  handleDeleteRoute,
  directions,
  hideDirections,
  showDirections,
  isHidden,
}) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="flex h-20 w-20  flex-col items-center justify-center rounded-full bg-lightgray text-orange">
            <BiDirections className="text-xl" />
            <p>Directions</p>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-1"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-1"
          >
            <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl  bg-white p-4 text-black">
              <div className="flex flex-col gap-2">
                <h2>Routes</h2>
                <Tab.Group defaultIndex={1}>
                  <Tab.List className="flex justify-between">
                    <Tab>
                      <MdDirectionsCar className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdDirectionsBusFilled className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdOutlineDirectionsBike className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdDirectionsWalk className="text-xl" />
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    {/* Driving */}
                    <Tab.Panel>
                      <h3>Driving routes</h3>
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <h3>Home</h3>
                          {/* this icons changes color according to user */}
                          <ArrowRightIcon className="h-6" />
                          <h3>Job</h3>
                        </div>
                        <div>
                          <label htmlFor="home-input">Main adress</label>
                          <Autocomplete
                            onPlaceChanged={onPlaceChanged}
                            // onLoad={onLoad}
                          >
                            <input
                              className="w-full  border-b-2 border-lightgray bg-white px-2"
                              type="text"
                              placeholder="Enter Your Home Adress"
                              id="home-input"
                            />
                          </Autocomplete>
                        </div>
                        <div>
                          <div>
                            <button>Eco options</button>
                            <button>Car options</button>
                            <form onSubmit={handleDestinationAddress}>
                              <label htmlFor="job-input">Destinations</label>
                              {/* <Autocomplete> */}
                              <input
                                className="w-full  border-b-2 border-lightgray bg-white px-2"
                                type="text"
                                placeholder="Add a name for the destination"
                                id="job-input"
                                onChange={handleNewDestinationName}
                              />{" "}
                              {/* </Autocomplete> */}
                              <input
                                className="w-full  border-b-2 border-lightgray bg-white px-2"
                                type="text"
                                placeholder="Add a destination adress"
                                id="job-input"
                                onChange={handleNewDestinationAddress}
                              />
                              <input
                                className="w-full  border-b-2 border-lightgray bg-white px-2"
                                type="number"
                                placeholder="Number of travels per month"
                                id="job-input"
                                onChange={handleNewDestinationAddress}
                              />
                              <button type="submit">Add destinations</button>
                              <div>
                                {" "}
                                <label htmlFor="travelMode">
                                  Pick travel mode:
                                </label>
                                <select
                                  id="travelMode"
                                  value={selectedTravelMode}
                                  onChange={SetSelectedTravelMode}
                                  className="w-full rounded-lg border-2 bg-white"
                                >
                                  <option value="WALK">Walk</option>
                                  <option value="BICYCLE">Bycicle</option>
                                  <option value="TWO_WHEELER">
                                    Two-wheeled, motorized vehicle
                                  </option>
                                  <option value="DRIVE">Drive</option>
                                </select>
                              </div>
                              <h3> Fuel consumption</h3>
                              <div>
                                <label htmlFor="typeEngine">
                                  Type of engine
                                </label>
                                <select
                                  value={selectedTravelMode}
                                  onChange={SetSelectedTravelMode}
                                  className="w-full rounded-lg border-2 bg-white"
                                  id="typeEngine"
                                >
                                  <option value="WALK">Diesel</option>
                                  <option value="BICYCLE">Unleaded</option>
                                  <option value="TWO_WHEELER">
                                    Super-unleaded
                                  </option>
                                  <option value="DRIVE">Premium diesel</option>
                                  <option value="DRIVE">Electric</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="consumption">Consumption</label>
                                <input
                                  type="number"
                                  placeholder="l/km"
                                  className="w-full  border-b-2 border-lightgray bg-white px-2"
                                  id="consumption"
                                />
                                {/* if eletrci is selected */}
                                <input
                                  type="number"
                                  placeholder="w/km"
                                  className="w-full  border-b-2 border-lightgray bg-white px-2"
                                  id="consumption"
                                />
                              </div>
                              <div>
                                <label htmlFor="traffic">Live traffic:</label>
                                <select
                                  id="traffic"
                                  className="flex flex-wrap"
                                  value={selectedTravelMode}
                                  onChange={SetSelectedTravelMode}
                                >
                                  <option value="WALK">TRAFFIC_AWARE</option>
                                  <option value="BICYCLE">
                                    TRAFFIC_AWARE_OPTIMAL
                                  </option>
                                </select>
                              </div>
                              <div>
                                <div className="flex gap-2">
                                  <label htmlFor="tolls">Avoid tolls</label>
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="tolls"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <label htmlFor="highways">
                                    Avoid Highways
                                  </label>
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="highways"
                                  />
                                </div>

                                <div className="flex gap-2">
                                  <label htmlFor="ferries">Avoid ferries</label>
                                  <input
                                    type="checkbox"
                                    name=""
                                    id="ferries"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="units">Units</label>
                                  <select
                                    value={selectedTravelMode}
                                    onChange={SetSelectedTravelMode}
                                    id="units"
                                  >
                                    <option value="WALK">METRIC</option>
                                    <option value="BICYCLE">IMPERIAL</option>
                                  </select>
                                </div>

                                <div className="flex justify-center gap-2">
                                  {" "}
                                  <button>Get Routes</button>
                                  <button>Clear selection</button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="pt-4">
                            <ul className="flex flex-col gap-2">
                              {destinationAddresses.map(
                                ({ id, name, address }) => (
                                  <li
                                    className="border-b-2 pb-4"
                                    key={id}
                                  >
                                    <div className="flex gap-2">
                                      <span>{name}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className=" flex justify-between">
                                        <span>{address}</span>
                                        <button
                                          onClick={handleRemoveDestination}
                                          className="rounded-md  px-2"
                                        >
                                          <TrashIcon className="h-6 text-orange" />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    {/* Public transport */}
                    <Tab.Panel>
                      <h3>Public transport routes</h3>
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <h3>Home</h3>
                          {/* this icons changes color according to user */}
                          <ArrowRightIcon className="h-6" />
                          <h3>Job</h3>
                        </div>
                        <div>
                          <label htmlFor="home-input">Main adress</label>
                          <Autocomplete
                          // onPlaceChanged={handlePublicOrigin}
                          // onLoad={onLoad}
                          >
                            <input
                              className="w-full  border-b-2 border-lightgray bg-white px-2"
                              type="text"
                              placeholder="Enter Your Home Adress"
                              id="home-input"
                              ref={handlePublicOrigin}
                            />
                          </Autocomplete>
                        </div>
                        <div>
                          <div>
                            <form onSubmit={handleDestinationAddress}>
                              <label htmlFor="job-input">Destinations</label>
                              <Autocomplete
                              // onPlaceChanged={handlePublicDestination}
                              >
                                <input
                                  className="w-full  border-b-2 border-lightgray bg-white px-2"
                                  type="text"
                                  placeholder="Add a name for the destination"
                                  id="job-input"
                                  ref={handlePublicDestination}
                                />
                              </Autocomplete>

                              <button onClick={calculateRoute}>
                                Add destinations
                              </button>
                            </form>
                          </div>
                          <div className="pt-4">
                            <ul className="flex flex-col gap-2">
                              {directions.map((direction, index) => (
                                <div key={index}>
                                  {/* <input type="text" /> */}
                                  <p>Route {index + 1}</p>
                                  <p className="font-semibold">Origin:</p>{" "}
                                  <p className="text-xs">
                                    {direction.request.origin.query}
                                  </p>
                                  <p className="font-semibold">Destination:</p>
                                  <p className="text-xs">
                                    {direction.request.destination.query}
                                  </p>
                                  <button
                                    onClick={() => handleDeleteRoute(index)}
                                    className=" border-2  rounded-md p-1"
                                  >
                                    <BsTrash3 />
                                  </button>
                                  {isHidden ? (
                                    <button
                                      onClick={() =>
                                        showDirections(
                                          direction.request.destination.query
                                        )
                                      }
                                      className=" border-2  rounded-md p-1"
                                    >
                                      <MdOutlineVisibility />
                                    </button>
                                  ) : (
                                    
                                    <button
                                      onClick={() =>
                                        hideDirections(
                                          direction.request.destination.query
                                        )
                                        
                                      }
                                      className=" border-2  rounded-md p-1"
                                    >
                                      <AiOutlineEyeInvisible />
                                    </button>
                                  ) }
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                    <Tab.Panel>Content 4</Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              {/* <div>
                <h3>Summary</h3>
                <ul className="flex flex-col gap-2">
                  {destinationAddresses.map(({ id, name, address }) => (
                    <li
                      className="border-b-2 pb-4"
                      key={id}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span>Home</span>
                          <ArrowRightIcon className="h-6" />
                          <span>{name}</span>
                          <span>24 km</span>
                          <div className="flex gap-2">
                            <ClockIcon className="h-6" />
                            <span>24mins</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Directions
