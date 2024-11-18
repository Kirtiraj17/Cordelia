import { useEffect, useState } from "react";
import "./App.css";
import Cruise from "./components/Cruise";

function App() {
  const [itinerariesData, setItinerariesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItineraries = () => {
      setLoading(true);
      fetch("https://staging.cordeliacruises.com/api/v2/itineraries")
        .then((res) => res.json())
        .then((res) => {
          console.log(res?.itineraries, "res", res);
          setItinerariesData(res);
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => setLoading(false));
    };

    fetchItineraries();
  }, []);

  return (
    <>
      <Cruise itinerariesData={itinerariesData} loading={loading} />
      <></>
    </>
  );
}

export default App;
