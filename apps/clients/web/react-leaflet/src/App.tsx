import { useEffect, useRef, useState } from "react";
import type { LatLng, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";

const LocationMarker = () => {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(event) {
      setSelectedPosition(event.latlng);
      map.flyTo(event.latlng, map.getZoom());
    },
  });

  return selectedPosition === null ? null : (
    <Marker position={selectedPosition}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default function App() {
  const [geoData, setGeoData] = useState(null);
  const position: LatLngExpression = [1.2921,34.8219];
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/centralwest.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON", err));
  });

  return (
    <div
      className='bg-emerald-950 text-emerald-300 w-full h-screen flex flex-col items-center gap-9
        p-5'
    >
      <h1>React Leaflet Demo</h1>
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={9}
        scrollWheelZoom={true}
        className='w-300 aspect-video'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <LocationMarker /> */}
        {geoData && (
          <GeoJSON
            data={geoData}
          />
        )}
      </MapContainer>
    </div>
  );
}
