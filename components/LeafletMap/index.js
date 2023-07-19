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

function ResetCenterView({ selectPosition }) {
  const map = useMap();
  useEffect(() => {
    if (selectPosition) {
      const { lat, lon } = selectPosition;
      map.setView(L.latLng(lat, lon), map.getZoom(), { animate: true });
    }
  }, [selectPosition]);

  return null;
}

export default function LeafletMap({ selectPosition }) {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "30vh", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=D60u8Jvr5i4pzOQvXsgs"
        />
        {selectPosition && (
          <Marker position={locationSelection} icon={icon}></Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </MapWrapper>
  );
}
const MapWrapper = styled.div`
  z-index: 1;
  min-width: 300px;
`;
