

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
      const radius = 10000; // 10000 meters (10 km)
      const attRadius = 10000;
      const hosRadius = 2000;
      const unRadius = 10000;
      const spHosRadius = 10000;
      const query = `
      [out:json];
    (
        node(around:${attRadius},${lat},${lon})[tourism~"attraction|viewpoint|theme_park|landmark|monument"];
        way(around:${attRadius},${lat},${lon})[tourism~"attraction|viewpoint|theme_park|landmark|monument"];
        relation(around:${attRadius},${lat},${lon})[tourism~"attraction|viewpoint|theme_park|landmark|monument"];
    
        node(around:${radius},${lat},${lon})[amenity~"bus_station"];
        way(around:${radius},${lat},${lon})[amenity~"bus_station"];
        relation(around:${radius},${lat},${lon})[amenity~"bus_station"];

        // node(around:${radius},${lat},${lon})[public_transport~"station"][!"subway"];
        // way(around:${radius},${lat},${lon})[public_transport~"station"][!"subway"];
        // relation(around:${radius},${lat},${lon})[public_transport~"station"][!"subway"];

        //  node(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"][limit=5];
        // way(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"][limit=5];
        // relation(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"][limit=5];

        node(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"];
        way(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"];
        relation(around:${radius},${lat},${lon})[public_transport~"station"][name~"Junction|Terminus|Terminal|Central"];

        node(around:${hosRadius},${lat},${lon})[amenity~"hospital"];
         way(around:${hosRadius},${lat},${lon})[amenity~"hospital"];
         relation(around:${hosRadius},${lat},${lon})[amenity~"hospital"];

         node(around:${unRadius},${lat},${lon})[amenity~"university"];
         way(around:${unRadius},${lat},${lon})[amenity~"university"];
         relation(around:${unRadius},${lat},${lon})[amenity~"university"];

         node(around:${spHosRadius},${lat},${lon})[amenity~"hospital"][name~"Medanta|Apollo|Indraprastha|Fortis|Manipal|Gleneagles|Ambani|AIIMS|Max|trauma"];
         way(around:${spHosRadius},${lat},${lon})[amenity~"hospital"][name~"Medanta|Apollo|Indraprastha|Fortis|Manipal|Gleneagles|Ambani|AIIMS|Max|trauma"];
         relation(around:${spHosRadius},${lat},${lon})[amenity~"hospital"][name~"Medanta|Apollo|Indraprastha|Fortis|Manipal|Gleneagles|Ambani|AIIMS|Max|trauma"];
        
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
          
          const places = data.elements
          .filter((place) => place.tags.name && place.tags.name.trim() !== "") 
          .map((place) => ({
            name: place.tags.name || "Unnamed place",
            lat: place.lat || place.center.lat,
            lon: place.lon || place.center.lon,
            type: place.tags.tourism || place.tags.amenity || place.tags.public_transport || places.tags.name,
            //category: place.tags.amenity ? "Amenity" : "Tourism",
            category: place.tags.amenity || place.tags.tourism || place.tags.public_transport || places.tags.name,
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
      
      const groupedData = {
        station: [],
        hospital: [],
        attraction: [],
        bus_station: [],
        university: []
      };
    
      // Iterate through the data array and push objects to their respective category arrays
      places.forEach(item => {
        if (groupedData[item.category]) {
          groupedData[item.category].push(item);
        }
      });
    
      console.log('Grouped Data:', groupedData);
  
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
        {console.log("places : " , places)}
        {places.map((e, i) => (
          <div key={i}>{`${e.name} - ${e.type} - ${e.distance.toFixed(
            2
          )} km away`}</div>
        ))}
        <div id="map" style={{ height: "500px", width: "100" }}></div>
      </div>
    );
  }

