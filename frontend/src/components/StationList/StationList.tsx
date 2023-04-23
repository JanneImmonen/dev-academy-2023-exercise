// src/components/StationList/StationList.tsx
import React, { useEffect, useState } from "react";
import { getAllStations } from "../../utils/api";
import "./StationList.module.css";

const StationList: React.FC = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await getAllStations();
      setStations(fetchedStations);
    };

    fetchStations();
  }, []);

  return (
    <div>
      <h2>Stations</h2>
      <ul>
        {stations.map((station: any) => (
          <li key={station.id}>{station.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StationList;
