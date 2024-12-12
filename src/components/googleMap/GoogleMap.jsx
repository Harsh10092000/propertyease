
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { mappls } from "mappls-web-maps";

const Map3 = ({ data }) => {
  const [cordinates, setCordinates] = useState({
    lat: "",
    lng: "",
    formatted_address: "",
  });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const map = useRef(null);
  const mapplsClassObject = useRef(null);

  // Load the external scripts only once
  const loadExternalScripts = () => {
    // Check if the script and CSS are already loaded to prevent reloading
    if (!document.querySelector('link[href="https://unpkg.com/leaflet/dist/leaflet.css"]')) {
      const leafletCSS = document.createElement("link");
      leafletCSS.rel = "stylesheet";
      leafletCSS.href = "https://unpkg.com/leaflet/dist/leaflet.css";
      document.head.appendChild(leafletCSS);
    }

    if (!document.querySelector('script[src="https://apis.mappls.com/advancedmaps/api/bf1148c14b7bf6c5466b074f928ce9fc/map_sdk?layer=vector&v=3.0&callback=initMap1"]')) {
      const mapplsScript = document.createElement("script");
      mapplsScript.defer = true;
      mapplsScript.src = "https://apis.mappls.com/advancedmaps/api/bf1148c14b7bf6c5466b074f928ce9fc/map_sdk?layer=vector&v=3.0&callback=initMap1";
      document.body.appendChild(mapplsScript);
    }

    if (!document.querySelector('script[src="https://apis.mappls.com/advancedmaps/api/bf1148c14b7bf6c5466b074f928ce9fc/map_sdk_plugins?v=3.0"]')) {
      const mapplsPluginsScript = document.createElement("script");
      mapplsPluginsScript.defer = true;
      mapplsPluginsScript.src = "https://apis.mappls.com/advancedmaps/api/bf1148c14b7bf6c5466b074f928ce9fc/map_sdk_plugins?v=3.0";
      document.body.appendChild(mapplsPluginsScript);
    }
  };

  // Fetch location coordinates only once
  useEffect(() => {
    if (!data || !data.pro_locality) return;

    const location = {
      name: data.pro_locality,
      lat: 29.9692794,
      lng: 76.8735374,
      formatted_address: `${data.pro_locality}, ${data.pro_city}, ${data.pro_state}, India`,
    };

    axios
      .get(
        `https://maps.gomaps.pro/maps/api/geocode/json?address=${location.formatted_address}&language=en&region=in&key=AlzaSyQObMdDT_7owxq4vy5a-d3vcwOjwmrg7GR`
      )
      .then((res) => {
        if (res.data.results.length > 0) {
          const { lat, lng, formatted_address } = res.data.results[0].geometry.location;
          setCordinates({ lat, lng, formatted_address });
        }
      });
  }, [data]);

  // Initialize the map when coordinates are available
  useEffect(() => {
    if (!cordinates.lat || !cordinates.lng) return; // Wait for coordinates to load

    // Initialize the map only once
    if (!mapplsClassObject.current) {
      loadExternalScripts();

      mapplsClassObject.current = new mappls();
      mapplsClassObject.current.initialize(
        "bf1148c14b7bf6c5466b074f928ce9fc",
        { map: true },
        () => {
          if (map.current) {
            map.current.remove(); // Remove any previous map instance
          }

          map.current = mapplsClassObject.current.Map({
            id: "map",
            properties: {
              center: [cordinates.lat, cordinates.lng],
              zoom: 14,
              draggable: true,
              backgroundColor: "#fff",
              traffic: true,
              geolocation: false,
              disableDoubleClickZoom: true,
              fullscreenControl: true,
              scrollWheel: true,
              scrollZoom: true,
              rotateControl: true,
              scaleControl: true,
              zoomControl: true,
            },
          });

          map.current.on("load", () => {
            setIsMapLoaded(true);
          });
        }
      );
    }
  }, [cordinates]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "55vh", display: "inline-block" }}
    >
      {isMapLoaded ? null : <p>Loading map...</p>}
    </div>
  );
};

export default Map3;



