import BottomNav from "@/components/BottomNav"
import DistanceMatrix from "@/components/RoutesApi"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React, { useRef, useState } from "react"

function MapPage() {
  const newID = (() => {
    let id = 0
    return () => id++
  })()

  const INITIAL_TASKS = [
    {
      id: newID(),
      name: "Job",
      adress: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
    {
      id: newID(),
      name: "Kids school",
      adress: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
    {
      id: newID(),
      name: "Wife",
      adress: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
  ]

  const onPlaceChanged = () => {
    if (origins != null) {
      const place = origins.getPlace()
      setOrigins(place.formatted_address)
    } else {
      alert("Please enter text")
    }
  }
  const [destinationAddresses, setDestinationAddresses] =
    useState(INITIAL_TASKS) // initialize state with an empty array
  console.log(destinationAddresses)

  const [newDestination, setNewDestination] = useState<string>("")
  // console.log(newDestination)

  const handleNewDestinationAdress = (e) => setNewDestination(e.target.value)

  const handleDestinationAddress = () => {
    if (newDestination.trim() !== "") {
      const newAddress = {
        id: Date.now(),
        address: newDestination.trim(),
      }
      setDestinationAddresses([...destinationAddresses, newAddress])
      setNewDestination("")
    }
  }

  const handleRemoveDestination = (index) => {
    const newAdresses = [...destinationAddresses]
    newAdresses.splice(index, 1)
    setDestinationAddresses(newAdresses)
  }

  const [map, setMap] = useState(/** @type google.maps.Map */ null)

  const clearRoute = () => {
    setDirections(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ""
    destinationRef.current.value = ""
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  const handleCenter = () => map.panTo(center)

  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      {/* <DistanceMatrix /> */}
      <div className="relative h-full">
        <Sidebar
          centerMap={handleCenter}
          clearRoute={clearRoute}
          handleDestinationAddress={handleDestinationAddress}
          handleNewDestinationAdress={handleNewDestinationAdress}
          handleRemoveDestination={handleRemoveDestination}
          onPlaceChanged={onPlaceChanged}
          destinationAddresses={destinationAddresses}
        />
        <MapApi
          // directions={directions}
          map={map}
          setMap={(map) => setMap(map)}
          center={center}
        />
      </div>
      <BottomNav />
    </div>
  )
}

export default MapPage
