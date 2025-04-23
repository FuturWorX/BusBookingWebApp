export interface Stop {
  id: string;
  distance: number;
  price: number;
  stopLocation: { latitude: number; longitude: number };
  stopName: string;
}

export interface Route {
  name: string;
  route_id: string;
  startLoc: { latitude: number; longitude: number };
  endLoc: { latitude: number; longitude: number };
  stops: Stop[];
  createdAt: Date;
  calendarId: string;
}

export interface CalendarWeekly {
  type: "weekly";
  weekly: number[]; 
  name?: string;
}

export interface CalendarMonthly {
  type: "monthly";
  monthly: boolean;
  name?: string;
}

export interface CalendarSpecialDays {
  type: "special_days";
  special_days: Date[];
  name?: string;
}

type Calendar = CalendarWeekly | CalendarMonthly | CalendarSpecialDays;
