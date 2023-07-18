import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

export default function LeafletMap() {
  const position = [47.41, 21.031];
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "50vh", width: "50vh", padding: "2rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=D60u8Jvr5i4pzOQvXsgs"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </MapWrapper>
  );
}
const MapWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
