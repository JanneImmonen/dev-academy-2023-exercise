// src/utils/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";


export const getAllStations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stations`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStationById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function getStations() {
  const response = await fetch('/api/stations');
  const data = await response.json();
  return data;
};

export const getJourneys = async (stationId: number, page?: number, size?: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/journeys`, {
      params: { stationId, page, size },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Add more API functions as needed
