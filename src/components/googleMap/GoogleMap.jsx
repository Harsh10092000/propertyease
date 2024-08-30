// import React from 'react';
// import {APIProvider, Map} from '@vis.gl/react-google-maps';

// const GoogleMap = () => (
//   <APIProvider
//   //apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}
//   apiKey='AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS'
//   >
//     <Map
//       style={{width: '100vw', height: '100vh'}}
//       defaultCenter={{lat: 22.54992, lng: 0}}
//       defaultZoom={3}
//       gestureHandling={'greedy'}
//       disableDefaultUI={true}
//     />
//   </APIProvider>
// );

// https://maps.gomaps.pro/maps/api/geocode/json?address=sector+7 Kurukshetra, Haryana,
// India&language=en&region=en&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS',

// https://maps.gomaps.pro/maps/api/geocode/json?address=sector+7%20Kurukshetra,%20Haryana,%20India&language=en&region=e
// n&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS

// export default GoogleMap;

// import {APILoader, PlacePicker} from '@googlemaps/extended-component-library/react';
// import React from 'react';
// //import './App.css';

// export default function GoogleMap() {
//   const [formattedAddress, setFormattedAddress] = React.useState('');
//   const handlePlaceChange = (e) => {
//     setFormattedAddress(e.target.value?.formattedAddress ?? '');
//   };
//   const countries = [];

//   return (
//     <div>
//       <APILoader apiKey="AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS" solutionChannel="GMP_GCC_placepicker_v1" />
//       <div class="container">
//         <PlacePicker country={countries} placeholder="Enter a place to see its address" onPlaceChange={handlePlaceChange} />
//         <div className="result">
//           {formattedAddress}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// //import data from './locations.json'; // Adjust the path as necessary

// const GoogleMap = () => {

//   const data = [
//     {
//       "id": 1,
//       "name": "Kurukshetra",
//       "lat": 29.9693,
//       "lng": 76.8550
//     },
//     {
//       "id": 2,
//       "name": "Ambala",
//       "lat": 30.3787,
//       "lng": 76.7805
//     }
//   ]

//   const [center, setCenter] = useState([51.505, -0.09]); // Default center position

//   useEffect(() => {
//     if (data.length > 0) {
//       // Optionally, calculate the center of the map based on your data
//       setCenter([data[0].lat, data[0].lng]);
//     }
//   }, []);

//   return (
//     <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//          //url="http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png"
//  //url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
//  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {data.map(location => (
//         <Marker key={location.id} position={[location.lat, location.lng]}>
//           <Popup>
//             {location.name}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default GoogleMap;

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // Example data
// const locations = [
//   {
//     "name": "Location 1",
//     "lat": 29.9692794,
//     "lng": 76.8735374,
//     "formatted_address": "Sector 7, Kurukshetra, Haryana 136118, India"
//   },
//   {
//     "name": "Location 2",
//     "lat": 29.9697503,
//     "lng": 76.8736955,
//     "formatted_address": "Sector 7, Urban Estate, Sector 7, Kurukshetra, Haryana 136118, India"
//   }
// ];

// const GoogleMap = () => {
//   // Center the map roughly between the two locations
//   const center = [
//     (locations[0].lat + locations[1].lat) / 2,
//     (locations[0].lng + locations[1].lng) / 2
//   ];

//   return (
//     <>
//     <MapContainer center={center} zoom={14} style={{ height: '50vh', width: '50%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {locations.map((location, index) => (
//         <Marker key={index} position={[location.lat, location.lng]}>
//           <Popup>
//             <strong>{location.name}</strong><br />
//             {location.formatted_address}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>

//     <div>
//       <div id="lifestyleMapInpage" class="mapContainer__overFlowContainer mapContainer__deskHeightFull ">
//         <div class="mapContainer__resetBtnWrap  mapContainer__resetInPage pageComponent" data-label="RESET_VIEW">
//           <div class="mapContainer__resetDeskBtn"><img src="https://static.99acres.com/universalapp/img/undo.png" />
//           <span class="hyperlinks_small mapContainer__resetTxtDesktop">Reset View</span>
//           </div></div><div class="mapContainer__zoomBtnWrap  ">
//             <div class="mapContainer__zoomInBtnWrap">
//               <i class="mapContainer__zoomInBtn iconS_Common_24 icon_grayAdd"></i>
//               </div>
//               <div class="mapContainer__zoomOutBtnWrap">
//                 <i class="mapContainer__zoomOutBtn iconS_Common_24 icon_graySub"></i>
//                 </div>
//                 </div>
//                 <div class="mapContainer__mapLogoDeskWrap mapContainer__inpage ">
//                   <img src="https://static.99acres.com/universalapp/img/MMILogo.png" /></div>
//                   <div class="mapContainer__zoomIconDeskWrap  pageComponent" data-label="DETAIL_BOX">
//                     <div class="mapContainer__fullDeskScrn">
//                       <svg class="mapContainer__expandedMapIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5V9H5V5H9V3H5C3.9 3 3 3.9 3 5ZM5 15H3V19C3 20.1 3.9 21 5 21H9V19H5V15ZM19 19H15V21H19C20.1 21 21 20.1 21 19V15H19V19ZM19 3H15V5H19V9H21V5C21 3.9 20.1 3 19 3Z" fill="white"></path></svg>
//                       </div></div>
//    </div></div>
//     </>
//   );
// };

// export default GoogleMap;

// import React from 'react';
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// // Define your map component
// const Map = () => (
//   <GoogleMap defaultZoom={10} defaultCenter={{ lat: 29.9693, lng: 76.8550 }}>
//     {/* Add your markers or other map elements here */}
//     <Marker position={{ lat: 29.9693, lng: 76.8550 }} />
//   </GoogleMap>
// );

// // Wrap the map with Google Maps API functionality
// const MapWrapped = withScriptjs(withGoogleMap(Map));

// export default function GoogleMap1() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <MapWrapped
//         googleMapURL={`https://api.gomaps.pro/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
//}

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { getDistance } from 'geolib';

// // Example data
// const locations = [
//   {
//     "name": "Location 1",
//     "lat": 29.9692794,
//     "lng": 76.8735374,
//     "formatted_address": "Sector 7, Kurukshetra, Haryana 136118, India"
//   },
//   // {
//   //   "name": "Location 2",
//   //   "lat": 29.9697503,
//   //   "lng": 76.8736955,
//   //   "formatted_address": "Sector 7, Urban Estate, Sector 7, Kurukshetra, Haryana 136118, India"
//   // }
// ];

// const GoogleMap1 = () => {
//   // Center the map roughly between the two locations
//   // const center = [
//   //   (locations[0].lat + locations[1].lat) / 2,
//   //   // (locations[0].lng + locations[1].lng) / 2
//   // ];

//   // Calculate the distance between the two locations
//   // const distance = getDistance(
//   //   { latitude: locations[0].lat, longitude: locations[0].lng },
//   //   // { latitude: locations[1].lat, longitude: locations[1].lng }
//   // );

//   return (
//     <MapContainer  zoom={14} style={{ height: '50vh', width: '100%' }}>
//       <TileLayer
//         //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//          //url="https://retina-tiles.p.rapidapi.com/local/osm/v1/{z}/{x}/{y}.png"
//          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

//       />
//       {locations.map((location, index) => (
//         <Marker key={index} position={[location.lat, location.lng]}>
//           <Popup>
//             <strong>{location.name}</strong><br />
//             {location.formatted_address}
//           </Popup>
//         </Marker>
//       ))}
//       {/* Draw a line between the two locations */}
//       <Polyline
//         positions={[
//           [locations[0].lat, locations[0].lng],
//           // [locations[1].lat, locations[1].lng]
//         ]}
//         color="blue"
//         weight={3}
//         opacity={0.7}
//       />
//       {/* Display the distance in meters */}
//       {/* <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '3px' }}>
//         Distance: {distance} meters
//       </div> */}
//     </MapContainer>
//   );
// };

// export default GoogleMap1;
import axios from "axios";
import React from "react";
import { useRef } from "react";
//import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, LayersControl, FeatureGroup, useMap , Marker, Polygon, Popup  } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import "../../custom.css";

export const FindCoordinates = ({ data, handleCordinates }) => {
  const location = {
    name: data.pro_locality,
    lat: 29.9692794,
    lng: 76.8735374,
    formatted_address: `${data.pro_locality}, ${data.pro_city}, ${data.pro_state}, India`,
  };

  const [cordinates, setCodinates] = useState({
    lat: "",
    lng: "",
    formatted_address: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://maps.gomaps.pro/maps/api/geocode/json?address=${location.formatted_address}&language=en&region=e
            n&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS`
      )
      .then((res) => {
        

        data.pro_locality !== undefined &&
          (setCodinates({
            ...cordinates,
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng,
            formatted_address: res.data.results[0].formatted_address,
          }),
        
           handleCordinates("lat", res.data.results[0].geometry.location.lat),
           handleCordinates("lng",res.data.results[0].geometry.location.lng),
           handleCordinates("formatted_address", res.data.results[0].formatted_address));
      });
  }, [data.pro_locality, location.formatted_address]);

  // return (
  //   <>
  //     {data.pro_locality !== undefined && (
  //       <GoogleMap1 cordinates={cordinates} />
  //     )}
  //   </>
  // );
};



export const GoogleMap2 = () => {
  // Define bounding box coordinates



//   {
//     "bounds" : 
//     {
//        "northeast" : 
//        {
//           "lat" : 29.9761909,
//           "lng" : 76.8448501
//        },
//        "southwest" : 
//        {
//           "lat" : 29.9715953,
//           "lng" : 76.83676659999999
//        }
//     },
//     "location" : 
//     {
//        "lat" : 29.9739549,
//        "lng" : 76.8425455
//     },
//     "location_type" : "APPROXIMATE",
//     "viewport" : 
//     {
//        "northeast" : 
//        {
//           "lat" : 29.9761909,
//           "lng" : 76.8448501
//        },
//        "southwest" : 
//        {
//           "lat" : 29.9715953,
//           "lng" : 76.83676659999999
//        }
//     }
//  },




  const northeast = {
    lat: 29.9761909,
    lng: 76.8448501
  };
  const southwest = {
    lat: 29.9715953,
    lng: 76.83676659999999
  };

  // Define the coordinates for the bounding box polygon
  // const predefinedPolygons = [
  //   [
  //     [northeast.lat, southwest.lng],  // Bottom-left
  //     [northeast.lat, northeast.lng],  // Top-right
  //     [southwest.lat, northeast.lng],  // Bottom-right
  //     [southwest.lat, southwest.lng],  // Top-left
  //     [northeast.lat, southwest.lng]   // Closing the polygon
  //   ]
  // ];

  const predefinedPolygons = [
    [
      [northeast.lat, southwest.lng],  // Bottom-left
      [northeast.lat, northeast.lng],  // Top-right
      [southwest.lat, northeast.lng],  // Bottom-right
      [southwest.lat, southwest.lng],  // Top-left
      [northeast.lat, southwest.lng]   // Closing the polygon
    ]
  ];

  const [polygons, setPolygons] = useState(predefinedPolygons);
  const featureGroupRef = useRef(null);

  const onCreated = (e) => {
    const { layer } = e;
    const layers = featureGroupRef.current.leafletElement;
    layers.addLayer(layer);

    if (layer instanceof L.Polygon) {
      const latLngs = layer.getLatLngs();
      setPolygons((prevPolygons) => [...prevPolygons, latLngs]);
    }
  };

  // Center map based on the geometric center of the bounding box
  const center = [
    (northeast.lat + southwest.lat) / 2,
    (northeast.lng + southwest.lng) / 2
  ];

  return (
    <MapContainer center={center} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            polygon: true,
            polyline: false,
            circle: false,
            rectangle: false,
            marker: false,
          }}
        />
      </FeatureGroup>
      {polygons.map((latLngs, index) => (
        <Polygon key={index} positions={latLngs} />
      ))}
    </MapContainer>
  );
};



const GoogleMap1 = ({ cordinates, pro_locality, img_link, pro_url }) => {
  // const location = {
  //   name: data.pro_locality,
  //   lat: 29.9692794,
  //   lng: 76.8735374,
  //   formatted_address: `${data.pro_locality}, ${data.pro_city}, ${data.pro_state}, India`,
  // };

  // const [cordinates, setCodinates] = useState({
  //   lat: "",
  //   lng: "",
  // });

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://maps.gomaps.pro/maps/api/geocode/json?address=${location.formatted_address}&language=en&region=e
  //           n&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS`
  //       )
  //       .then((res) => {
  //         console.log(res.data.results[0].geometry.location);
  //         setCodinates({
  //           ...cordinates,
  //           lat: res.data.results[0].geometry.location.lat,
  //           lng: res.data.results[0].geometry.location.lng,
  //         });
  //       });
  //   }, [location.formatted_address]);

  // const center = [cordinates.lat, cordinates.lng];



  return (
    <>
      {cordinates && (
        <MapContainer
          // center={center}
          key={`${cordinates.lat}-${cordinates.lng}`}
          center={[cordinates.lat, cordinates.lng]}
          zoom={15}
          style={{ height: "50vh", width: "100%" }}
        >
          
          <TileLayer
            //url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[cordinates.lat, cordinates.lng]}>
            <Popup>
              {/* <strong>{pro_locality}</strong>
              <br />
              {cordinates.formatted_address} */}

<div className="mkdf-info-window">
              <div class="mkdf-info-window-inner">
						<a href={`/${pro_url}`}></a>
						
							<div class="mkdf-info-window-image">
								{/* <img src="https://zuhaus.qodeinteractive.com/wp-content/uploads/2017/10/property-6-featured-img-150x150.jpg" alt="4878 Orange Ave" width="150" height="150" /> */}
                {img_link ? 
                <img
                    src={`${
                      import.meta.env.VITE_BACKEND
                    }/propertyImages/watermark/${img_link}`}
                    alt={`${pro_url}`}  width="150" height="150" 
                  />
                  : 
                  <img className="rec-img" src="https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-6500742f5feb7.jpg?crop=0.688xw:1.00xh;0.157xw,0&resize=1200:*" alt={`${pro_url}`} width="150" height="150"  />
}
              </div>
						
						<div class="mkdf-info-window-details">
							<h5>
              {pro_locality}
							</h5>
							<p> {cordinates.formatted_address}</p>
						</div>
					</div>
          </div>
            </Popup>
          </Marker>
          
        </MapContainer>
      )}
    </>
  );
};

export default GoogleMap1;


const GoogleMap34 = ({ cordinates, pro_locality }) => {
  const center = [cordinates.lat, cordinates.lng];
  
  // Ref to the Popup component
  const popupRef = useRef(null);

  // Hook to open the popup when the map is loaded
  function OpenPopupOnLoad() {
    const map = useMap();
    
    useEffect(() => {
      if (popupRef.current) {
        // Open the popup
        popupRef.current.openOn(map);
      }
    }, [map]);

    return null;
  }

  return (
    <>
      {cordinates && (
        <MapContainer
          center={center}
          zoom={16}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
            <Popup ref={popupRef}>
              <strong>{pro_locality}</strong>
              <br />
              {cordinates.formatted_address}
            </Popup>
          </Marker>
          <OpenPopupOnLoad />
        </MapContainer>
      )}
    </>
  );
};

//export default GoogleMap34;

// import { useState, useEffect } from 'react';

// // GoMaps Pro API key
// const GO_MAPS_PRO_API_KEY = 'AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS';

// // Function to fetch nearby locations
// const fetchNearbyLocations = async (lat, lng) => {
//   const radius = 1000; // Radius in meters

//   try {
//     const response = await axios.get(
//       `https://api.gomaps.pro/v1/place/nearby?location=${lat},${lng}&radius=${radius}&key=${GO_MAPS_PRO_API_KEY}`
//     );
//     return response.data.results.map((place) => ({
//       name: place.name,
//       lat: place.geometry.location.lat,
//       lng: place.geometry.location.lng,
//       formatted_address: place.vicinity || 'No address available',
//     }));
//   } catch (error) {
//     console.error('Error fetching nearby locations:', error);
//     return [];
//   }
// };

import { useState, useEffect } from "react";

export const NearbyPlaces1 = () => {
  const [places, setPlaces] = useState([]);

  const fetchNearbyPlaces = () => {
    // Example coordinates: London
    const lat = 51.505;
    const lon = -0.09;
    const radius = 1000; // 1 km

    //const radius = 10000; // 10000 meters (10 km)
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

    axios
      .get(
        "https://overpass-api.de/api/interpreter?data=" +
          encodeURIComponent(query)
      )
      .then((response) => {
        const places = response.data.elements.map((el) => ({
          lat: el.lat,
          lng: el.lon,
          name: el.tags.name || "Unnamed",
        }));
        setPlaces(places);
      })
      .catch((error) => console.error("Error fetching places:", error));
  };

  return (
    <div>
      <button onClick={fetchNearbyPlaces}>Find Nearby Places</button>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {places.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lng]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// ############# auto complete working #############
export const FetchNearbyLocations = () => {
  const [searchVal, setSearchVal] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchVal) {
      setPlaces([]);
      return;
    }

    const fetchNearbyPlaces = async () => {
      const GO_MAPS_PRO_API_KEY = "AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS"; // Your API Key
      const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(
        searchVal
      )}&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS`;

      try {
        const response = await axios.get(url);
        console.log("response.data : ", response.data);
        setPlaces(response.data.predictions || []);
      } catch (error) {
        console.error("Error fetching nearby locations:", error);
        setError("Failed to fetch nearby places");
        setPlaces([]);
      }
    };

    fetchNearbyPlaces();
  }, [searchVal]);

  return (
    <div>
      <input
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search for places"
      />
      {error && <p>{error}</p>}
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <strong>{place.description}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const NearPlaces = () => {
//   // let config = {
//   //   method: 'get',
//   // maxBodyLength: Infinity,
//   //   //url: 'https://maps.gomaps.pro/v1/place/nearby?location=29.9692794,76.8735374&radius=5000&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS',
//   //   url: `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?keyword=<string>&location=40,-110&radius=1000&type=hospital&language=en&key=AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS`,
//   //   headers: { }
//   // };

//   // let data = "";

//   // let config = {
//   //   method: "get",
//   //   maxBodyLength: Infinity,
//   //   url: "https://places.gomaps.pro/v1/places/ChIJLU7jZClu5kcR4PcOOO6p3I0",
//   //   headers: {
//   //     "X-Goog-Api-Key": "AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS",
//   //     "X-Goog-FieldMask": "*",
//   //     "Content-Type": "application/json",
//   //   },
//   //   data: data,
//   // };

//   let data = "";
//   const params = {
//     location: '51.505,-0.09', // Latitude and Longitude
//     radius: '1000', // Radius in meters
//     type: 'restaurant', // Type of places to search for
//     key: 'YOUR_GMP_API_KEY' // Replace with your actual API key
//   };

//   axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params })
//     .then(response => {
//       console.log('Response Data:', JSON.stringify(response.data, null, 2));
//     })
//     .catch(error => {
//       console.error('Error:', error.response ? error.response.data : error.message);
//     });
// };

// export const NearbyPlaces = () => {
//   const [places, setPlaces] = useState([]);
//   const [error, setError] = useState(null);

//   // Coordinates for the central location
//   const latitude = 29.9692794;
//   const longitude = 76.8735374;
//   const radius = 500; // Radius in meters

//   useEffect(() => {
//     const fetchNearbyPlaces = async () => {
//       try {
//         const response = await axios.post(
//           "https://places.gomaps.pro/v1/places:searchNearby",

//           {
//             locationRestriction: {
//               circle: {
//                 center: {
//                   latitude: latitude,
//                   longitude: longitude,
//                 },
//                 radius: radius,
//               },
//             },
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "X-Goog-Api-Key": "AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS",
//               "X-Goog-FieldMask": "*",
//             },
//           }
//         );

//         // Log the entire response data to the console
//         console.log("Nearby Places Data:", response.data);

//         // Update state with the fetched places
//         setPlaces(response.data.results || []);
//       } catch (err) {
//         console.error("Error fetching nearby places:", err);
//         setError("Failed to fetch nearby places");
//       }
//     };

//     fetchNearbyPlaces();
//   }, [latitude, longitude, radius]);

//   return (
//     <div>
//       <h1>Nearby Places</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {places.map((place, index) => (
//           <li key={index}>
//             <strong>{place.name}</strong>
//             <br />
//             {place.vicinity || "No address available"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export const NearPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with actual latitude and longitude
  const latitude = 51.505;
  const longitude = -0.09;
  const apiKey = "AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS"; // Store your API key in .env file

  const fetchNearbyPlaces = () => {
    setLoading(true);
    setError(null);

    const data = {
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude,
          },
          radius: 500.0, // Radius in meters
        },
      },
      // Optionally add more parameters here
    };

    axios({
      method: "post",
      url: "https://places.gomaps.pro/v1/places:searchNearby",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "*",
      },
      data: data,
    })
      .then((response) => {
        setPlaces(response.data.results || []); // Adjust according to actual response structure
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred");
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={fetchNearbyPlaces} disabled={loading}>
        {loading ? "Loading..." : "Find Nearby Places"}
      </button>
      {error && <div>Error: {error}</div>}
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.name || "Unnamed Place"}</li> // Adjust according to actual data structure
        ))}
      </ul>
    </div>
  );
};

// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// // Example data
// const startLocation = { lat: 29.9692794, lng: 76.8735374 }; // Starting location
// const endLocation = { lat: 29.9697503, lng: 76.8736955 };   // Ending location

// const GoogleMap1 = () => {

//   useEffect(() => {
//     const L = window.L; // Leaflet object

//     // Initialize map
//     const map = L.map('map').setView([startLocation.lat, startLocation.lng], 14);

//     // Add tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Add routing control
//     L.Routing.control({
//       waypoints: [
//         L.latLng(startLocation.lat, startLocation.lng),
//         L.latLng(endLocation.lat, endLocation.lng)
//       ],
//       routeWhileDragging: true,
//       createMarker: () => null, // Disable default markers
//       lineOptions: {
//         styles: [{ color: '#6FA1EC', weight: 4 }]
//       },
//       summaryTemplate: '<b>Duration:</b> {time} <br/><b>Distance:</b> {distance}',
//     }).addTo(map);

//     // Clean up on unmount
//     return () => {
//       map.remove();
//     };
//   }, []);

//   return (
//     <div id="map" style={{ height: '100vh', width: '100%' }} />
//   );
// };

// export default GoogleMap1;

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import L from 'leaflet';
// import 'leaflet-control-geocoder';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine';

// const startLocation = { lat: 29.9692794, lng: 76.8735374 }; // Starting location
// const endLocation = { lat: 29.9697503, lng: 76.8736955 };   // Ending location

// const GoogleMap1 = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     if (map) {
//       // Add geocoder control
//       const geocoder = new L.Control.Geocoder.Nominatim();
//       const searchControl = new L.Control.Geocoder({
//         geocoder: geocoder,
//         placeholder: 'Search for a place',
//         defaultMarkGeocode: false,
//         position: 'topleft'
//       }).addTo(map);

//       searchControl.on('markgeocode', (e) => {
//         const { center } = e.geocode;
//         map.setView(center, 14);
//         L.marker(center).addTo(map).bindPopup('You are here').openPopup();
//       });

//       // Add routing control
//       L.Routing.control({
//         waypoints: [
//           L.latLng(startLocation.lat, startLocation.lng),
//           L.latLng(endLocation.lat, endLocation.lng),
//         ],
//         routeWhileDragging: true,
//         lineOptions: {
//           styles: [{ color: '#6FA1EC', weight: 4 }]
//         }
//       }).addTo(map);
//     }
//   }, [map]);

//   return (
//     <MapContainer
//       center={startLocation}
//       zoom={14}
//       style={{ height: '100vh', width: '100%' }}
//       whenCreated={setMap}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[startLocation.lat, startLocation.lng]}>
//         <Popup>Start Location</Popup>
//       </Marker>
//       <Marker position={[endLocation.lat, endLocation.lng]}>
//         <Popup>End Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default GoogleMap1;

// import React, { useState } from 'react';
// import Select from 'react-select';
// import axios from 'axios';

// // GoMaps Pro API key and endpoint
// const GO_MAPS_PRO_API_KEY = 'AlzaSyPisziFeX4vTtFzhyhjcyW1mVoVzyqEMLS';
// const AUTOCOMPLETE_URL = `https://api.gomaps.pro/v1/place/autocomplete`;

// const fetchPlaces = async (inputValue) => {
//   if (!inputValue) return [];

//   const url = `${AUTOCOMPLETE_URL}?input=${encodeURIComponent(inputValue)}&key=${GO_MAPS_PRO_API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     const places = response.data.predictions.map((place) => ({
//       value: place.place_id,
//       label: place.description,
//     }));
//     return places;
//   } catch (error) {
//     console.error('Error fetching places:', error);
//     return [];
//   }
// };

// const GoogleMap1 = () => {
//   const [options, setOptions] = useState([]);

//   // Handle input change for async search
//   const handleInputChange = async (inputValue) => {
//     if (inputValue) {
//       const places = await fetchPlaces(inputValue);
//       setOptions(places);
//     } else {
//       setOptions([]);
//     }
//   };

//   // Handle option selection
//   const handleChange = (selectedOption) => {
//     console.log('Selected Place:', selectedOption);
//     // Handle selected place here
//   };

//   return (
//     <div style={{ width: '300px', margin: '50px auto' }}>
//       <Select
//         //options={options}
//         onInputChange={(inputValue) => handleInputChange(inputValue)}
//         onChange={handleChange}
//         placeholder="Search for a place"
//       />
//     </div>
//   );
// };

// export default GoogleMap1;
