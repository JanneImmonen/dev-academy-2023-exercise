// src/components/JourneyList/JourneyList.tsx
import React, { useEffect, useState } from "react";
import { getJourneys } from "../../utils/api";
import "./JourneyList.module.css";

interface Journey {
  id: number;
  departure_station_id: number;
  arrival_station_id: number;
  departure_time: string;
  arrival_time: string;
}

interface JourneyListProps {
  stationId: number;
}

const JourneyList: React.FC<JourneyListProps> = ({ stationId }) => {
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      const fetchedJourneys = await getJourneys(stationId);
      setJourneys(fetchedJourneys);
    };
    fetchJourneys();
  }, [stationId]);

  return (
    <div>
      <h2>Journeys</h2>
      <ul>
        {journeys && Array.isArray(journeys) ? (
          journeys.map((journey) => (
            <li key={journey.id}>
              {journey.departure_station_id} &#8594; {journey.arrival_station_id}
            </li>
          ))
        ) : (
          <p>No journeys found.</p>
        )}
      </ul>
    </div>
  );
};

export default JourneyList;
