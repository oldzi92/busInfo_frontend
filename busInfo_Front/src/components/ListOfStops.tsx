import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStopStore } from "../store";

export interface StopProps {
  stopsList: string[];
}

export const ListOfStops = () => {
  const stopsList = useStopStore((state) => state.stopsList);
  const [selectedStop, setSelectedStop] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStop(event.target.value);
  };

  const handleAddToFav = (stopName: string) => {
    useStopStore.getState().addToFavorite(stopName);
  };

  return (
    <article className="listOfStops">
      <div
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1 className="text-center">Lista Przystanków:</h1>

        <input
          type="text"
          placeholder="Znajdź przystanek"
          value={selectedStop}
          onChange={handleInputChange}
          className="inputFinde"
        />

        <ul>
          {stopsList
            .filter((stop) =>
              stop.toString().toLowerCase().includes(selectedStop.toLowerCase())
            )
            .map((stop) => (
              <div key={stop} className="stopContainer">
                <h2 className="allStops">
                  <Link to={`/stop/${stop}`}>{stop}</Link>
                </h2>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    height: "0px",
                    width: "10%",
                    transform: "translate(450%)",
                  }}
                  onClick={() => {
                    handleAddToFav(stop);
                    alert("dodano");
                  }}
                >
                  <img
                    src="https://inspirion.pl/sites/default/files/imagecache/product_full/56-0402132.jpg"
                    alt="favBtn"
                    style={{
                      width: "35%",
                      height: "auto",
                      paddingBottom: "40px",
                    }}
                  />
                </button>
              </div>
            ))}
        </ul>
      </div>
      <Outlet />
    </article>
  );
};
