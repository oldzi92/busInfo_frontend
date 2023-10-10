import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../App";
import { useStopStore } from "../store";

export const OneStop = () => {
  const { busId } = useParams();
  const timetable = useStopStore((state) => state.timetable);
  const stopName = useStopStore((state) => state.stopName);

  console.log("timetabInOneStop", timetable);
  console.log("stopnameInOneStop:", stopName);

  useEffect(() => {
    socket.emit("joinToStopChannel", busId);
  }, [busId]);

  return (
    <>
      <div>
        <h3 className="oneStopH3">Rozkład przyjazdów:</h3>
        {busId ? (
          <>
            {timetable.map((busTimetable, index) => (
              <div key={index}>
                <h2 className="BusNr">Autobus:{busTimetable.busId}</h2>
                <li className="startStop">Przystanek początkowy: {stopName}</li>
                <li className="endStop">
                  Przystanek końcowy: {busTimetable.headsign}
                </li>
                <br></br>
                <p className="arrives">
                  {" Teoretyczny czas przyjazdu: "}
                  {busTimetable.theoreticalTime}
                </p>
                <p className="arrives">
                  {" Szacowany czas przyjazdu: "}
                  {busTimetable.estimatedTime}
                </p>
                <p className="arrives" style={{ color: "red" }}>
                  {" opóźnienie: "}
                  {busTimetable.delayInSeconds}
                </p>
              </div>
            ))}
          </>
        ) : (
          <h2>Not Found</h2>
        )}
      </div>
    </>
  );
};
