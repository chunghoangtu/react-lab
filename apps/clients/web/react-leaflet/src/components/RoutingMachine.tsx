import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

type Props = {
  from: L.LatLng | null;
  to: L.LatLng | null;
};

export function RoutingMachine({ from, to }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const control = L.Routing.control({
      waypoints: [from, to],

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),

      addWaypoints: false,
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,

      // Ẩn panel directions nếu không cần
      createMarker: () => null,
    } as L.Routing.RoutingControlOptions & {
      createMarker: () => null;
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, from, to]);

  return null;
}
