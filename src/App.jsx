import { useEffect, useState } from "react";
import "./App.css";
import Cruise from "./components/Cruise";

function App() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = () => {
      fetch("https://staging.cordeliacruises.com/api/v2/itineraries")
      .then((res) => res.json())
      .then((res) => {
        console.log(res?.itineraries, 'res', res);
        setItineraries(res?.itineraries);
      })
    }

    fetchItineraries();
  }, [])

  return (
    <>
      <Cruise itineraries={itineraries} />
      <></>
    </>
  );
}

export default App;
