import { Link, Outlet } from "react-router-dom";
import { useStopStore } from "./store";
import { useState } from "react";

export interface StopProps {
  stopsList: string[];
}

export const ListOfStops = () => {
  const stopsList = useStopStore((state) => state.stopsList);
  const [selectedStop, setSelectedStop] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStop(event.target.value);
  };

  return (
    <article>
      <div>
        <h1 className="text-center">Lista Przystanków</h1>

        <input
          type="text"
          placeholder="Znajdź przystanek"
          value={selectedStop}
          onChange={handleInputChange}
        />

        <ul>
          {stopsList
            .filter((stop) =>
              stop.toString().toLowerCase().includes(selectedStop.toLowerCase())
            )
            .map((stop) => (
              <li key={stop}>
                <h2>
                  <Link to={`/stop/${stop}`}>{String(stop)}</Link>
                </h2>
              </li>
            ))}
        </ul>
      </div>
      <Outlet />
    </article>
  );
};
