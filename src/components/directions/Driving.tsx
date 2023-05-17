import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useEffect, useState, useRef } from "react"
import { DrivingContext } from "../../context/DrivingContextProvider"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
import { GrDirections } from "react-icons/gr"
import Tooltip from "../Tooltip"
import { IoSettingsOutline } from "react-icons/io5"
import { FiArrowDown } from "react-icons/fi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import axios from "axios"

import results from "../../../public/results.json"
import drivingData from "../../../public/drivingData.json"
import drivingDataPromise from "../../../public/drivingDataPromise.json"
function Driving() {
  // const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  const [routesFormData, setRoutesFormData] = useState(results)
  console.log(routesFormData)

  const [fetchedDrivingDirections, setFetchedDrivingDirections] = useState()
  // console.log(fetchedDrivingDirections)

  const [multipleHousesComparison, setMultipleHousesComparison] = useState({
    "House 1": [],
    "House 2": [],
    "House 3": [],
  })
  // console.log(multipleHousesComparison)

  // each button click will change the array of the multipleHousesComparison object

  // when i click the hosue button it only add the origin and destination to the first house
  //when i click house 2 after filling out house one, optioon to add the same ddestination and just chang origin
  // after filling out the data we fetch it
  const handleHouseButtonClick = (buttonId) => {
    const houseNumber = `House ${buttonId}`

    const newHouseData = { origin: "Origin", destination: "Destination" }

    setMultipleHousesComparison((prevData) => {
      const newData = { ...prevData }
      newData[houseNumber] = [...newData[houseNumber], newHouseData]
      return newData
    })
  }

  const [compareMultipleHouses, setCompareMultipleHouses] = useState(false)
  // console.log(fetchedDrivingDirections)

  // useEffect(() => {}), []

  // ! origin and destination refs

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginRef = useRef(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef(null)
  // console.log(destinationRef.current.value)

  const numberOfTravelsRef = useRef(null)

  //! units
  const [units, setUnits] = useState("IMPERIAL")
  // console.log(units)

  const handleUnitsMeasure = (e) => {
    setUnits(e.target.value)
  }

  // ! travel mode
  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")
  // console.log(selectedTravelMode)

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  // ! Engine Type
  const [selectedEngineType, SetSelectedEngineType] = useState("GASOLINE")
  // console.log(selectedEngineType)

  const handleSelectedEngineType = (e) => SetSelectedEngineType(e.target.value)

  // ! consumption

  const [litersConsumed, setLitersConsumed] = useState(0)
  // console.log(litersConsumed)

  const handleLitersConsumed = (e) => setLitersConsumed(e.target.value)

  const [wattsConsumed, setWattsConsumed] = useState(0)
  // console.log(wattsConsumed)

  const handleWattsConsumed = (e) => setWattsConsumed(e.target.value)
  //! traffic

  const [trafficPreference, setTrafficPreference] = useState("TRAFFIC_UNAWARE")
  // console.log(trafficPreference)

  const handleTraffic = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setTrafficPreference("TRAFFIC_AWARE")
    } else {
      setTrafficPreference("TRAFFIC_UNAWARE")
    }
  }

  //! tolls
  const [tollsPreference, setTollsPreference] = useState(false)
  // console.log(tollsPreference)

  const handleTolls = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setTollsPreference(true)
    } else {
      setTollsPreference(false)
    }
  }

  //! highways
  const [highwaysPreference, setHighwaysPreference] = useState(false)
  // console.log(highwaysPreference)

  const handleHighways = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setHighwaysPreference(true)
    } else {
      setHighwaysPreference(false)
    }
  }

  const [featuresOpen, setFeaturesOpen] = useState(false)

  // ! fetch route

  // ! add one origin or origins
  // ! add destinations

  // ! button for comparing uses the destinations autocomplete to save autocomplete requests
  //! create an array for the origins
  //! create an array for the destinations

  // ! button to add a new oriign using differnt destinations config
  // ! button to add a new oriign using the same destinations config
  // ! iterate over the origins and destinations and fetch the routes, usin gthe fetch data

  // const fetchData = () => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
  //         "X-Goog-FieldMask":
  //           "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
  //       },
  //     }

  //     const data = {
  //       origin: {
  //         address: mainOriginRef.current.value,
  //       },
  //       destination: {
  //         address: destinationRef.current.value,
  //       },
  //       travelMode: selectedTravelMode,
  //       routingPreference: trafficPreference,
  //       routeModifiers: {
  //         avoidTolls: tollsPreference,
  //         avoidHighways: highwaysPreference,
  //       },
  //       units: units,
  //     }

  //     axios
  //       .post(
  //         "https://routes.googleapis.com/directions/v2:computeRoutes",
  //         data,
  //         config
  //       )
  //       .then((response) => {
  //         const data = response.data

  //         const modifiedData = {
  //           isVisible: true,
  //           origin: mainOriginRef.current.value,
  //           destination: destinationRef.current.value,
  //           duration: data.routes[0].duration,
  //           distance: data.routes[0].distanceMeters,
  //           polyline: data.routes[0].polyline.encodedPolyline,
  //         }
  //         setMultipleHousesComparison((house) => ({
  //           ...house,
  //           "House 1":modifiedData,
  //         }))
  //       }
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }

  const fetchData = async () => {
    try {
      const promises = Object.entries(fetchedData).flatMap(
        ([route, destinations]) => {
          return destinations.map(({ origin, destination }) => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
                "X-Goog-FieldMask":
                  "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
              },
            }
            const data = {
              origin: {
                address: origin,
              },
              destination: {
                address: destination,
              },
              travelMode: "DRIVE",
            }

            const apiUrl =
              "https://routes.googleapis.com/directions/v2:computeRoutes"

            return axios
              .post(apiUrl, data, config)
              .then((response) => {
                const routeData = response.data.routes[0]
                const distance = routeData.distanceMeters
                const duration = routeData.duration
                const encodedPolyline = routeData.polyline.encodedPolyline
                return {
                  route,
                  origin,
                  destination,
                  distance,
                  duration,
                  encodedPolyline,
                  isVisible: true,
                }
              })
              .catch((error) => {
                console.error(
                  `Error fetching data for route ${route}, origin ${origin}, destination ${destination}:`,
                  error
                )
                return {
                  route,
                  origin,
                  destination,
                  distance: null,
                  duration: null,
                  encodedPolyline: null,
                  isVisible: true,
                }
              })
          })
        }
      )

      const results = await Promise.all(promises)
      const updatedRoutesData = results.reduce((acc, result) => {
        const {
          route,
          origin,
          destination,
          distance,
          duration,
          encodedPolyline,
          isVisible,
        } = result
        if (!acc[route]) {
          acc[route] = []
        }
        acc[route].push({
          origin,
          destination,
          distance,
          duration,
          encodedPolyline,
          isVisible,
        })
        return acc
      }, {})
      setFetchedData(updatedRoutesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // Function to hide directions
  const hideDirections = (house, index) => {
    // Update the state using the setRoutesFormData function
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Access the data for the specified house
    const houseData = routesFormData[house]
    console.log(houseData)

    // Create updated directions by mapping over the house data
    const updatedDirections = houseData.map((route) => {
      // If the route's destination matches the index, hide it by updating the isVisible property to false
      if (route.destination === index) {
        return { ...route, isVisible: false }
      }
      return route
    })

    // Create updated routes form data by merging the updated directions with the existing data
    const updatedRoutesFormData = {
      ...routesFormData,
      [house]: updatedDirections,
    }

    // Update the state with the updated routes form data
    setRoutesFormData(updatedRoutesFormData)
  }

  // Function to unhide directions
  const unhideDirections = (house, index) => {
    // Update the state using the setRoutesFormData function
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Access the data for the specified house
    const houseData = routesFormData[house]

    // Create updated directions by mapping over the house data
    const updatedDirections = houseData.map((route) => {
      // If the route's destination matches the index, unhide it by updating the isVisible property to true
      if (route.destination === index) {
        return { ...route, isVisible: true }
      }
      return route
    })

    // Create updated routes form data by merging the updated directions with the existing data
    const updatedRoutesFormData = {
      ...routesFormData,
      [house]: updatedDirections,
    }

    // Update the state with the updated routes form data
    setRoutesFormData(updatedRoutesFormData)
  }

  // ! delete route

  const handleDeleteRoute = (house, indexToDelete) => {
    // Refresh the state to trigger a re-render
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Get the route data for the specific house
    const houseData = routesFormData[house]

    // Remove the route at the specified index
    houseData.splice(indexToDelete, 1)

    // Create an updated object with the modified route data
    const updatedRoutesFormData = { ...routesFormData, [house]: houseData }

    // Update the state with the updated route data
    setRoutesFormData(updatedRoutesFormData)
  }

  return (
    <Tab.Panel>
      <Tab.Group>
        <Tab.List className="flex w-full justify-between">
          <Tab
            onClick={() => setFeaturesOpen((prev) => !prev)}
            // className="btn-success btn w-1/2 gap-x-2"
            className={
              featuresOpen
                ? "btn-success btn flex w-[48%] items-center gap-2"
                : "btn-outline  btn flex w-[48%] items-center gap-2"
            }
          >
            <span>Options</span>
            <IoSettingsOutline className="text-xl" />
          </Tab>
          <Tab
            className="btn-success btn w-1/2 gap-x-2"
            // className={
            //   featuresOpen
            //     ? "bg-blue flex w-1/2 items-center gap-2 rounded-lg border-2 px-4 py-2"
            //     : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            // }
          >
            <span>Routes</span>
            <GrDirections className="text-xl" />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* routes */}
          <Tab.Panel>
            <div>
              <div className="flex flex-col gap-2 py-2">
                <div className="collapse-arrow collapse rounded-xl border-2">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Origin Addresses
                  </div>
                  <div className="collapse-content">
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for House 1
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address..."
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={mainOriginRef}
                        />
                      </Autocomplete>
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for House 2
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address..."
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={mainOriginRef}
                        />
                      </Autocomplete>
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for House 3
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address..."
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={mainOriginRef}
                        />
                      </Autocomplete>
                    </div>
                  </div>
                </div>

                <div className="collapse-arrow collapse rounded-xl border-2">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Destinations Addresses
                  </div>
                  <div className="collapse-content h-[300px] overflow-y-visible">
                    <div className="form-control w-full gap-2 ">
                      <label className="label ">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered  input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>

                    <div className="form-control w-full gap-2 ">
                      <label className="label">
                        <span className="label-text">
                          Add a address for this destination
                        </span>
                      </label>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the address"
                          className="input-bordered input-accent input input-md w-full bg-white"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                      <input
                        type="text"
                        placeholder="No. travels per month"
                        className="input-bordered input-accent input input-md w-full bg-white"
                        ref={numberOfTravelsRef}
                      />
                    </div>
                  </div>
                </div>

                <button className="btn-success btn w-full">Add Routes</button>
              </div>
            </div>
            {/* routes */}
          </Tab.Panel>
          {/* routes */}
          <Tab.Panel className="max-h-[550px] overflow-y-scroll pt-4">
            <Tab.Group>
              <Tab.List className="flex justify-between">
                {[1, 2, 3].map((houseNumber) => (
                  <Tab key={houseNumber}>
                    <button
                      onClick={() => handleHouseButtonClick(houseNumber)}
                      className="btn-success btn-sm btn"
                    >
                      House {houseNumber}
                    </button>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {[1, 2, 3].map((houseNumber) => (
                  <Tab.Panel>
                    <div className="py-4">
                      <div className="flex w-full  flex-col items-center justify-center">
                        <h2>
                          {routesFormData[`House ${houseNumber}`][0].origin}
                        </h2>
                        <FiArrowDown className="text-2xl" />
                      </div>

                      <ul className="flex flex-col gap-2">
                        {routesFormData[`House ${houseNumber}`].map((route) => {
                          return (
                            <li
                              className="border-y-2 pb-4"
                              key={route.distance}
                            >
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span>{route.destination}</span>
                                </div>
                              </div>{" "}
                              <div>
                                <div className="flex flex-wrap items-center">
                                  <div className="form-control w-1/3 ">
                                    <label className="label">
                                      <span className="label-text">
                                        Travel mode:
                                      </span>
                                    </label>
                                    <select
                                      className="select-accent select select-sm w-full bg-white text-xs "
                                      onChange={handleSelectedTravelMode}
                                    >
                                      <option value="DRIVE">Car</option>
                                      <option value="TWO_WHEELER">
                                        Motorcycle
                                      </option>
                                    </select>
                                  </div>
                                  <div className="form-control w-[35%] ">
                                    <label className="label">
                                      <span className="label-text">
                                        Type of engine
                                      </span>
                                    </label>
                                    <select
                                      className="select-accent select select-sm w-full bg-white text-xs "
                                      onChange={handleSelectedEngineType}
                                    >
                                      <option value="GASOLINE">Gasoline</option>
                                      <option value="ELECTRIC">Electric</option>
                                      <option value="HYBRID">Hybrid</option>
                                      <option value="DIESEL"> Diesel</option>
                                    </select>
                                  </div>
                                  <div className="form-control  w-[30%] ">
                                    <label className="label">
                                      <span className="label-text">
                                        Consumption
                                      </span>
                                    </label>
                                    {/* <Tooltip
                                  color={"blue"}
                                  text={"Hellogfdddddddddddddho"}
                                  type={"info"}
                                /> */}

                                    <input
                                      type="text"
                                      placeholder="liters/km"
                                      className="input-bordered input-accent  input input-sm w-full bg-white text-xs"
                                      onChange={handleLitersConsumed}
                                    />
                                  </div>

                                  {(selectedEngineType === "HYBRID" ||
                                    selectedEngineType === "ELECTRIC") && (
                                    <input
                                      type="text"
                                      placeholder="kwh/km"
                                      className="input-bordered input-accent input input-sm w-1/3 bg-white"
                                      onChange={handleWattsConsumed}
                                    />
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="form-control ">
                                    <label className="label cursor-pointer">
                                      <span className="label-text pr-1 text-xs">
                                        Live Traffic
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="checkbox-accent checkbox checkbox-xs"
                                        onChange={handleTraffic}
                                      />
                                    </label>
                                  </div>

                                  <div className="form-control ">
                                    <label className="label cursor-pointer">
                                      <span className="label-text pr-1 text-xs">
                                        Avoid tolls?
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="checkbox-accent checkbox checkbox-xs"
                                        onChange={handleTolls}
                                      />
                                    </label>
                                  </div>

                                  <div className="form-control ">
                                    <label className="label cursor-pointer">
                                      <span className="label-text pr-1 text-xs">
                                        Avoid Highways?
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="checkbox-accent checkbox checkbox-xs"
                                        onChange={handleHighways}
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <button
                                      onClick={() =>
                                        unhideDirections(
                                          "House 1",
                                          route.destination
                                        )
                                      }
                                      className={`rounded-md border-2 p-1 ${
                                        route.isVisible && "bg-green-500"
                                      }`}
                                    >
                                      <MdOutlineVisibility />
                                    </button>
                                    <button
                                      onClick={() =>
                                        hideDirections(
                                          `House ${houseNumber}`,
                                          route.destination
                                        )
                                      }
                                      className={`rounded-md border-2 p-1 ${
                                        !route.isVisible && "bg-red-500"
                                      }`}
                                    >
                                      <AiOutlineEyeInvisible />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleDeleteRoute(
                                        "House 1",
                                        route.destination
                                      )
                                    }
                                    className="rounded-md px-2"
                                  >
                                    <TrashIcon className="text-orange h-6" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Tab.Panel>
  )
}

export default Driving
