

import React from "react";
import { useState } from "react";
export default function GetNearByAreas() {
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [location, setLocation] = useState("");
    const [places, setPlaces] = useState([]);
  
    function searchLocation() {
  
      
      let searchLocation = "";
  
      if (location === "") {
        searchLocation = `${city}, ${district}, ${state}`;
      } else {
        searchLocation = `${location}, ${city}, ${district}, ${state}`;
      }
  
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        searchLocation
      )}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            fetchNearbyPlaces(lat, lon);
          } else {
            alert("Location not found");
          }
        });
    }



//     node(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
//     way(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
//     relation(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
//     // node(around:${radius},${lat},${lon})[amenity~"hospital|school|restaurant"];
//     // way(around:${radius},${lat},${lon})[amenity~"hospital|school|restaurant"];
//     // relation(around:${radius},${lat},${lon})[amenity~"hospital|school|restaurant"];
//     node(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds>=100];
// way(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds>=100];
// relation(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds>=100];
// node(around:${radius},${lat},${lon})[amenity=school][capacity>=500];
// way(around:${radius},${lat},${lon})[amenity=school][capacity>=500];
// relation(around:${radius},${lat},${lon})[amenity=school][capacity>=500];




  
    


    function fetchNearbyPlaces(lat, lon) {
      const radius = 5000; // 5000 meters (5 km)
      const query = `
      [out:json];

    (
        node(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
        way(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
        relation(around:${radius},${lat},${lon})[tourism~"museum|attraction|viewpoint|zoo|theme_park|gallery|park|landmark|monument"];
    

        node(around:${radius},${lat},${lon})[amenity~"hospital|emergency|school|restaurant"];
        way(around:${radius},${lat},${lon})[amenity~"hospital|emergency|school|restaurant"];
        relation(around:${radius},${lat},${lon})[amenity~"hospital|emergency|school|restaurant"];

        // node(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds>100];  // Removed >=
        // way(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds>100];  // Removed >=
        // relation(around:${radius},${lat},${lon})[amenity=hospital][hospital_beds=100];  // Removed >=
    
        // node(around:${radius},${lat},${lon})[amenity=school][capacity>500];  // Removed >=
        // way(around:${radius},${lat},${lon})[amenity=school][capacity>500];  // Removed >=
        // relation(around:${radius},${lat},${lon})[amenity=school][capacity>500];  // Removed >=
    );
    
    out center;
      `;
  
      fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: new URLSearchParams({ data: query }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => response.json())
        .then((data) => {
          const places = data.elements.map((place) => ({
            name: place.tags.name || "Unnamed place",
            lat: place.lat || place.center.lat,
            lon: place.lon || place.center.lon,
            type: place.tags.tourism || place.tags.amenity,
            category: place.tags.amenity ? "Amenity" : "Tourism",
            distance: getDistance(
              lat,
              lon,
              place.lat || place.center.lat,
              place.lon || place.center.lon
            ),
          }));
          setPlaces(places);
        })
        .catch((error) => console.error("Error:", error));
    }
  
    // function getDistance(lat1, lon1, lat2, lon2) {
    //   const R = 6371; // Radius of the Earth in km
    //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
    //   const dLon = ((lon2 - lon1) * Math.PI) / 180;
    //   const a =
    //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //     Math.cos((lat1  Math.PI) / 180) 
    //       Math.cos((lat2  Math.PI) / 180) 
    //       Math.sin(dLon / 2) *
    //       Math.sin(dLon / 2);
    //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   return R * c; // Distance in km
    // }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
      }
      
  
    return (
      <div>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="specific-location-input"
          type="text"
          placeholder="Enter specific location (optional)"
        ></input>
        <input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          id="city-input"
          type="text"
          placeholder="Enter city"
        />
        <input
          onChange={(e) => setDistrict(e.target.value)}
          value={district}
          id="district-input"
          type="text"
          placeholder="Enter district"
        />
        <input
          onChange={(e) => setState(e.target.value)}
          value={state}
          id="state-input"
          type="text"
          placeholder="Enter state"
        />
  
        <button onClick={searchLocation}>Search</button>
        {places.map((e, i) => (
          <div key={i}>{`${e.name} - ${e.type} - ${e.distance.toFixed(
            2
          )} km away`}</div>
        ))}
        <div id="map" style={{ height: "500px", width: "100" }}></div>
      </div>
    );
  }

