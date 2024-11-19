import { useEffect, useState } from "react";
import "./App.css";
import Cruise from "./components/Cruise";

function App() {
  const [itinerariesData, setItinerariesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://staging.cordeliacruises.com/api/v2/itineraries"
        );
        const data = await response.json();
        setItinerariesData(data);
      } catch (error) {
        console.error("Failed to fetch itineraries:", error);
      } finally {
        setLoading(false);
      }
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
