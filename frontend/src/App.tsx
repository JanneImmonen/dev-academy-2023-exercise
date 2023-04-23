// src/App.tsx
import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import StationList from "./components/StationList/StationList";
import JourneyList from "./components/JourneyList/JourneyList";
import Search from "./components/Search/Search";

const StationDetails = React.lazy(() => import("./components/StationDetails/StationDetails"));

const StationDetailsWrapper = () => {
  const { stationId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StationDetails stationId={Number(stationId)} />
    </Suspense>
  );
};


function App() {
  const [stationId, setStationId] = useState<number>(1);

  const handleSearch = (searchTerm: string) => {
    console.log("Search:", searchTerm);
    const stationIdNumber = isNaN(Number(searchTerm)) ? 0 : Number(searchTerm);
    setStationId(stationIdNumber);
  };  

  return (
    <div className="App">
      <Router>
        <Search onSearch={handleSearch} />

        <Routes>
          <Route path="/" element={<JourneyList stationId={stationId} />} />
          <Route path="/stations" element={<StationList />} />
          <Route path="/stations/:stationId" element={<StationDetailsWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

