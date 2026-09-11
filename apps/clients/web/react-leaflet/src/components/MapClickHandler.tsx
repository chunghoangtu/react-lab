import { useMapEvents } from "react-leaflet";
import type { LatLng } from "leaflet";

type Props = {
  from: LatLng | null;
  to: LatLng | null;
  setFrom: (point: LatLng | null) => void;
  setTo: (point: LatLng | null) => void;
};

export function MapClickHandler({
  from,
  to,
  setFrom,
  setTo,
}: Props) {
  useMapEvents({
    click(event) {
      if (!from) {
        // Click lần 1
        setFrom(event.latlng);
        return;
      }

      if (!to) {
        // Click lần 2
        setTo(event.latlng);
        return;
      }

      // Click lần 3 → bắt đầu route mới
      setFrom(event.latlng);
      setTo(null);
    },
  });

  return null;
}