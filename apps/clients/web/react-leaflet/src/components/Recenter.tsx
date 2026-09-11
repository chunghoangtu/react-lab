import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Recenter({ loc }: { loc: ILoc }) {
  const map = useMap();
  useEffect(() => {
    map.setView([loc.lat, loc.lon]);
  }, [loc]);

  return null;
}

