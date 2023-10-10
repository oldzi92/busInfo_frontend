//moje problemy:
// dodawanie do ulubionych (stop jest ciagle undefined)

import "./App.css";
import "@picocss/pico";
import { io } from "socket.io-client";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import { ListOfStops } from "./components/ListOfStops";
import { useEffect } from "react";
import { OneStop } from "./components/OneStop";
import { StopsReceiveType, TTimetable, useStopStore } from "./store";
import { Favorite } from "./components/Favorite";

//połaczenie sie z backendem
// eslint-disable-next-line react-refresh/only-export-components
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
      <nav className="nav">
        <article className="navArticle">
          <div style={{ display: "flex" }}>
            <NavLink to="/" reloadDocument className="stopsNav">
              PRZYSTANKI
            </NavLink>
            <NavLink to="favorite">
              <img
                src="https://inspirion.pl/sites/default/files/imagecache/product_full/56-0402132.jpg"
                alt="fav"
                className="favoriteLink"
              ></img>
            </NavLink>
          </div>
        </article>
      </nav>
      {location.state}
      <Routes>
        <Route path="/" element={<ListOfStops />} />
        <Route path="/stop/:busId/" element={<OneStop />} />
        <Route path="/favorite/*" element={<Favorite />} />
      </Routes>
    </>
  );
}

export default App;
