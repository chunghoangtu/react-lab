import Markers from "@/components/Markers";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export default function CurrentPosition() {
  const map = useMap();
  const [position, setPosition] = useState<ILoc>({ lat: 10.84, lon: -253.318 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        setPosition({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Unable to get location", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [map]);

  return (
    <Markers
      title={"You"}
      icon={"markers/current_icon.png"}
      lat={position.lat}
      lon={position.lon}
    />
  );
}
