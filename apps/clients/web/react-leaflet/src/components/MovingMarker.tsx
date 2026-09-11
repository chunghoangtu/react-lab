import { Icon } from "leaflet";
import { type PropsWithChildren } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

type MovingMarkerProps = {
  handleLoc: (loc: ILoc) => void;
  loc: ILoc;
} & PropsWithChildren;

export default function MovingMarker({ handleLoc, loc }: MovingMarkerProps) {
  useMapEvent("click", (event) => {
    handleLoc({ lat: event.latlng.lat, lon: event.latlng.lng });
  });

  if (loc) {
    return (
      <Marker
        position={[loc.lat, loc.lon]}
        icon={
          new Icon({
            iconUrl: "markers/blue_icon.png",
            iconSize: [20, 35],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
      >
        <Popup>
          <div className='flex flex-col'>
            <span>lat: {loc.lat.toFixed(2)}</span>
            <span>lon: {loc.lon.toFixed(2)}</span>
          </div>
        </Popup>
      </Marker>
    );
  }
  return <></>;
}
