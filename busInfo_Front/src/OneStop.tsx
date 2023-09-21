import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./App";
import { useStopStore } from "./store";
import { TTimetable } from "./store";

type TOneStop = {
  busTimetables: TTimetable;
  // Record<
  //   string,
  //   { busId: string; headsign: string; times: string[] }
  // >;
};

export const OneStop = () => {
  const timetable = useStopStore((state) => state.timetable);
  const stopName = useStopStore((state) => state.stopName);
  const { busId } = useParams();
  console.log("timetabInOneStop", timetable);
  console.log("stopnameInOneStop:", stopName);

  useEffect(() => {
    socket.emit("joinToStopChannel", busId);
  }, [busId]);

  const busTimetables: TOneStop["busTimetables"] = {};

  const busTimes = (timetable: TTimetable[]) => {
    // Przyporządkowujemy godziny przyjazdów i odjazdów do odpowiednich przystanków i numerów autobusów
    timetable.forEach((timetableItem) => {
      const { id, busId, headsign, theoreticalTime }: TTimetable =
        timetableItem;

      // Tworzymy klucz w formacie "id-autobusu_do-nazwa-przystanku"
      const key = `${id}_to_${headsign}`;

      // Tworzymy tablicę godzin przyjazdów i odjazdów lub dodajemy do istniejącej
      if (!busTimetables[key]) {
        busTimetables[key] = {
          busId,
          headsign,
          times: [theoreticalTime],
        };
      } else {
        busTimetables[key].times.push(theoreticalTime);
      }
    });
  };

  busTimes(timetable);

  return (
    <>
      <div>
        <p>Przystanek</p>
        {busId ? (
          <>
            {Object.values(busTimetables).map((busTimetable, index) => (
              <div key={index}>
                <h2>Numer autobusu: {busTimetable.busId}</h2>
                <li>Przystanek początkowy: {stopName}</li>
                <li>Przystanek końcowy: {busTimetable.headsign}</li>
                <p>
                  {" Odjazd, przyjazd: "}
                  {busTimetable.times.join(", ")}
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
