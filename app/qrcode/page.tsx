"use client";
import React, { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const MyForm: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [distanceFromGym, setDistanceFromGym] = useState<number | null>(null);

  useEffect(() => {
    if (coordinates) {
      // Calculate distance from the gym when coordinates are available
      const gymCoordinates: Coordinates = {
        latitude: 34.120056,
        longitude: 74.813602,
      };
      const distance = calculateDistance(coordinates, gymCoordinates);
      setDistanceFromGym(distance);
    }
  }, [coordinates]);

  const handleVerify = () => {
    // Get current location of the user and store the coordinates in state
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setIsVerified(true);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const handleSubmit = () => {
    // Log all the data to the console
    console.log("Coordinates:", coordinates);
    // You can add more form data logging here if needed
  };

  const calculateDistance = (
    coords1: Coordinates,
    coords2: Coordinates
  ): number => {
    const earthRadius: number = 6371; // Earth's radius in kilometers
    const { latitude: lat1, longitude: lon1 } = coords1;
    const { latitude: lat2, longitude: lon2 } = coords2;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance * 1000; // Convert distance to meters
  };

  const toRadians = (angle: number): number => {
    return angle * (Math.PI / 180);
  };

  return (
    <div>
      <div>
        <button onClick={handleVerify} disabled={isVerified}>
          {isVerified ? "Verified" : "Verify"}
        </button>
      </div>
      {isVerified && distanceFromGym !== null && (
        <div>
          <p>Distance from the gym: {distanceFromGym.toFixed(2)} meters</p>
          <button onClick={handleSubmit} disabled={!isVerified}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MyForm;
