import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "/locator.png",
  iconSize: [38, 38],
});
const position = [47.41, 21.031];

export default function LeafletMap({ data, selectPosition }) {
  const locationSelection = [
    data?.lat || selectPosition?.lat || position[0],
    data?.lon || selectPosition?.lon || position[1],
  ];

  function ResetCenterView({ locationSelection }) {
    const map = useMap();
    useEffect(() => {
      if (locationSelection) {
        const [lat, lon]  = locationSelection;
        map.setView(L.latLng(lat, lon), 10, {
          animate: true,
        });
      }
    }, [locationSelection]);


    // useEffect-Hook zum Zentrieren der Karte bei Änderung der locationSelection
  useEffect(() => {
    if (selectPosition) {
      const { lat, lon } = selectPosition;
      map.setView(L.latLng(lat, lon), 20, {
        animate: true,
      });
    }
  }, [selectPosition]);


    return null;
  }
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "30vh", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=D60u8Jvr5i4pzOQvXsgs"
        />
        {locationSelection && (
          <Marker position={locationSelection} icon={icon}></Marker>
        )}
        <ResetCenterView locationSelection={locationSelection} />
      </MapContainer>
    </MapWrapper>
  );
}
const MapWrapper = styled.div`
  z-index: 1;
  min-width: 300px;
`;
