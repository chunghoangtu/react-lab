import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

type MarkerProps = {
  title?: string;
  icon?: string;
} & ILoc;

export default function Markers({ lat, lon, icon, title }: MarkerProps) {
  return (
    <>
      <Marker
        position={[lat, lon]}
        icon={
          new Icon({
            iconUrl: icon,
            iconSize: [30, 55],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
      >
        <Popup>
          <span>{title}</span>
        </Popup>
      </Marker>
    </>
  );
}
