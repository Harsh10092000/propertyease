
import axios from "axios";
import React from "react";
import { useRef, useEffect, useState } from "react";

import { mappls} from "mappls-web-maps";

const Map3 = ({ data}) => {
  const loadExternalScripts = () => {
    // Check if the script and CSS are already loaded to prevent reloading
    if (!document.querySelector('link[href="https://unpkg.com/leaflet/dist/leaflet.css"]')) {
      const leafletCSS = document.createElement("link");
      leafletCSS.rel = "stylesheet";
      leafletCSS.href = "https://unpkg.com/leaflet/dist/leaflet.css";
      document.head.appendChild(leafletCSS);
    }

    
  };
  useEffect(() => {
    const location = {
      name: data.pro_locality,
      lat: 29.9692794,
      lng: 76.8735374,
      formatted_address: `${data.pro_locality}, ${data.pro_city}, ${data.pro_state}, India`,
    };

    data.pro_locality !== undefined &&
      axios
        .get(
          `https://maps.gomaps.pro/maps/api/geocode/json?address=${location.formatted_address}&language=en&region=e
        n&key=AlzaSyQObMdDT_7owxq4vy5a-d3vcwOjwmrg7GR`
        )
        .then((res) => {
          setCodinates({
            ...cordinates,
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng,
            formatted_address: res.data.results[0].formatted_address,
          }),
            setCordinatesChanged(true);
          //handleCordinates("lat", res.data.results[0].geometry.location.lat),
          //handleCordinates("lng",res.data.results[0].geometry.location.lng),
          //handleCordinates("formatted_address", res.data.results[0].formatted_address));
        });
  }, [data]);
  
  const [cordinates, setCodinates] = useState({
    lat: "",
    lng: "",
    formatted_address: "",
  });

  //   const handleCordinates = (val1, val2) => {
  //     setCodinates({...cordinates , [val1] : val2})
  //  }

  const handleCordinates = (key, value) => {
    console.log(key, value);
    setCodinates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [cordinatesChanged, setCordinatesChanged] = useState(false);

  useEffect(() => {
    cordinates.lat !== ""
      ? setCordinatesChanged(true)
      : setCordinatesChanged(false);
  }, [cordinates, data]);

  const map = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);
  
  useEffect(() => {
    const mapplsClassObject = new mappls();
    

    if (!mapplsClassObject.current) {
      loadExternalScripts();

    var a = cordinates.lat;
    var b = cordinates.lng;
   var c = cordinates.formatted_address;
    mapplsClassObject.initialize(
      "bf1148c14b7bf6c5466b074f928ce9fc",
      { map: true },
      () => {
        if (map.current) {
          map.current.remove();
        }
        
        map.current = mapplsClassObject.Map({
          id: "map",
          properties: {
           // cordinates.lat, cordinates.lng
           
            //center: [29.9587948, 76.8821849],
            center: [a,b],
            draggable: true,
            zoom: 14,
            //minZoom: 8,
            //maxZoom:100,
            backgroundColor: "#fff",
            //heading: 100,
            traffic: true,
            geolocation: false,
            disableDoubleClickZoom: true,
            fullscreenControl: true,
            scrollWheel: true,
            scrollZoom: true,
            rotateControl: true,
            scaleControl: true,
            zoomControl: true,
            clickableIcons: true,
            indoor: true,
            indoor_position: "bottom-left",
            tilt: 30,
            //pin: 'mmi000',
          },
        });


        
        const geoData = {
          "type": "FeatureCollection",
          "features": [{
                  "type": "Feature",
                  "properties": {
                      "description": c,
                  },
                  "geometry": {
                      "coordinates": [b,a],
                      "type": "Point"
                  }
              },
              
             
          ]
      }
        
        map.current.on("load", () => {
          setIsMapLoaded(true);
          map.current.loadImage(
            'https://apis.mapmyindia.com/map_v3/1.png',
            (error, image) => {
                if (error) throw error;
                map.current.addImage('marker', image);

                map.current.addSource("points", {
                    type: "geojson",
                    data: geoData,
                });
                map.current.addLayer({
                    'id': 'places-layer',
                    'type': "symbol",
                    'source': "points",
                    "layout": {
                        "icon-image": ["coalesce", ["get", "icon"], "common1_blue"],
                    }
                });
            },
        )

        map.current.on('click', 'places-layer', (e) => {
          console.log("e : " , e);
            var coordinates = e.features[0].geometry.coordinates;
            var description = e.features[0].properties.description;
            new mapplsgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map.current);


        
                map.current.flyTo({
                  center: coordinates,
                  zoom: map.current.getZoom() + 2, // Adjust the zoom level as needed
                  essential: true // This ensures the animation is not interrupted
              });
        });
        
    });
          
        });
    }
    //   }
    // );
  }, [cordinates]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "55vh", display: "inline-block" }}
    >
      {isMapLoaded ? null : <p>Loading map...</p>}
      {/* {isMapLoaded && <PinmarkerPlugin map={mapRef.current} />} */}
    </div>
  );
};

export default Map3











