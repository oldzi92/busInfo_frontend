import "./App.css";
import "@picocss/pico";
import { io } from "socket.io-client";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import { ListOfStops } from "./ListOfStops";
import { useEffect } from "react";
import { OneStop } from "./OneStop";
import { StopsReceiveType, TTimetable, useStopStore } from "./store";

//połaczenie sie z backendem
export const socket = io("http://localhost:4000", {
  path: "/api",
  transports: ["websocket"],
});

//dostęp do listy wszytskich atobusów
// Network -> Name -> messages
socket.emit("getStops", () => {});

socket.on("timetableReceive", (stopName: string, timetable: TTimetable[]) => {
  useStopStore.getState().setSingleStop(stopName);
  useStopStore.getState().setTimetable(timetable);
  // console.log(" timetable:", timetable);
  // console.log("stopName:", stopName);
});

socket.on("stopsReceive", (data: StopsReceiveType) => {
  useStopStore.getState().setStopsList(Object.keys(data));
});
function App() {
  const location = useLocation();

  // mam dostęp do całej listy przystanków
  useEffect(() => {
    // socket.on("timetableReceive", (stopName: StopsReceiveType) => {
    //   useStopStore.getState().setSingleStop(Object.keys(stopName));
    // });

    return () => {
      socket.off("stopsReceive");
      socket.off("timetableReceive");
    };
  }, []);

  return (
    <>
      <nav>
        <article>
          <ul>
            <li>
              <NavLink to="/" reloadDocument>
                Przystanki
              </NavLink>
            </li>
          </ul>
        </article>
      </nav>
      {location.state}
      <Routes>
        <Route path="/" element={<ListOfStops />} />
        <Route path="/stop/:busId/" element={<OneStop />} />
      </Routes>
    </>
  );
}

export default App;
