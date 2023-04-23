// src/components/StationDetails/StationDetails.tsx
import React, { useEffect, useState } from "react";
import { getStationById } from "../../utils/api";
import "./StationDetails.module.css";

interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface StationDetailsProps {
  stationId: number; // Change this from string to number
}

const StationDetails: React.FC<StationDetailsProps> = ({ stationId }) => {
  const [station, setStation] = useState<Station | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      const fetchedStation = await getStationById(stationId);
      setStation(fetchedStation);
    };
    fetchStation();
  }, [stationId]);

  if (!station) {
    return <div>Loading station details...</div>;
  }

  return (
    <div>
      <h2>Station Details</h2>
      <p>ID: {station.id}</p>
      <p>Name: {station.name}</p>
      <p>Latitude: {station.latitude}</p>
      <p>Longitude: {station.longitude}</p>
    </div>
  );
};

export default StationDetails;
