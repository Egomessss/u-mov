import React, { useState } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api"

//  Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
// restringir a api somente para o site
// hide the key?

// centers the map
const LIBRARIES = ["places"]

function MapApi({ center, setMap, map, directions }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
    libraries: LIBRARIES,
  })

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>
  }

  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  console.log(directions)
  return (
    <div className="-mx-20  h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={setMap}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          <Marker position={center} />
          {directions.map((direction, index) => {
            return (
              <DirectionsRenderer
                key={index}
                directions={direction}
              />
            )
          })}
        </>
      </GoogleMap>
    </div>
  )
}

export default MapApi

// option to choose an icon
// option to choose a color for the route
