import { create } from "zustand";

export type TTimetable = {
  busId: number;
  id: number;
  delayInSeconds: number;
  estimatedTime: number;
  headsign: string;
  routeId: number;
  status: string;
  theoreticalTime: number;
  timestamp: number;
  trip: number;
  tripId: number;
  vehicleCode: number;
  vehicleId: number;
};

export interface Stop {
  selectedStop: string;
  stopsList: string[];
  singleStop: string | number[];
  timetable: TTimetable[];
  stopName: string;

  setSelectedStop: (stop: string) => void;
  setStopsList: (newStopsList: string[]) => void;
  setSingleStop: (stopName: string) => void;
  setTimetable: (singleTimeTable: TTimetable[]) => void;
}

export interface StopsReceiveType {
  [s: string]: number[];
}

export const useStopStore = create<Stop>((set) => ({
  selectedStop: "",
  stopsList: [],
  singleStop: [],
  timetable: [],
  stopName: "",

  setSelectedStop: (stop) => {
    set(() => ({ selectedStop: stop }));
  },

  setStopsList: (newStopsList) => {
    set(() => ({ stopsList: newStopsList }));
  },

  setSingleStop: (stopName) => {
    set(() => ({ stopName: stopName }));
  },

  setTimetable: (timetable) => {
    set(() => ({ timetable: timetable }));
  },
}));
