import { MapView } from "@aws-amplify/ui-react";
import { NavigationControl, GeolocateControl } from "react-map-gl";
import Markers from "./components/Markers";
import LineOverlay from "./components/LineOverlay";
import useTracker from "./hooks/useTracker";
import Battery from "./components/Battery";
import PolygonsFeature from "./components/PolygonsFeature";

function App() {
  const [trackerPositions] = useTracker({
    DeviceId: "313932316e30740b",
    TrackerName: "CattraxTracker2", // This is the Tracker name, change it according to your own setup
    EndTimeExclusive: new Date(),
    StartTimeInclusive: new Date(
      new Date().getTime() - 1000 * 60 * 60 * 24 * 1
    ),
  });

  return (
    <>
      <MapView
        initialViewState={{
          longitude: -75.20814109999999,
          latitude: 42.5264569,
          zoom: 18,
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <NavigationControl showCompass={false} />
        <GeolocateControl  />
        <Markers trackerPositions={trackerPositions} />
        <LineOverlay trackerPositions={trackerPositions} />
        <PolygonsFeature />
      </MapView>
     </>
  );
}

export default App;
