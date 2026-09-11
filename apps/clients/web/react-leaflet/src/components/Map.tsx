import { MapClickHandler } from "@/components/MapClickHandler";
import Markers from "@/components/Markers";
import MovingMarker from "@/components/MovingMarker";
import Recenter from "@/components/Recenter";
import { RoutingMachine } from "@/components/RoutingMachine";
import type { LatLng } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markersData from "../data/markers.json" with { type: "json" };

export default function Map({ isDark }: Theme) {
  const [loc, setLoc] = useState<ILoc>({ lat: 10.84, lon: 106.682 });
  const [from, setFrom] = useState<LatLng | null>(null);
  const [to, setTo] = useState<LatLng | null>(null);

  const handleLoc = (loc: ILoc) => {
    setLoc(loc);
  };

  return (
    <MapContainer
      center={[10.84, 106.682]}
      zoom={15}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        background: isDark ? "#222" : "#fff",
        zIndex: 1,
      }}
    >
      <TileLayer
        url={
          isDark
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=7b793037-9ccb-4ca8-8088-667624148395"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>'
      />
      <MovingMarker
        handleLoc={handleLoc}
        loc={loc}
      />
      {/* <CurrentPosition /> */}
      {/* <Recenter loc={loc} /> */}

      {markersData.map((marker) => (
        <Markers
          title={marker.title}
          icon={marker.icon}
          lat={marker.loc.lat}
          lon={marker.loc.lon}
          key={`${marker.loc.lat}-${marker.loc.lon}`}
        />
      ))}
      <MapClickHandler
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
      />

      {from && <Marker position={from} />}
      {to && <Marker position={to} />}

      <RoutingMachine
        from={from}
        to={to}
      />
    </MapContainer>
  );
}
