import { z } from "zod";

const stopSchema = z.object({
  id: z.string(),
  distance: z.number(),
  price: z.number(),
  stopLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  stopName: z.string(),
});

export const routeSchema = z.object({
  name: z.string(),
  route_id: z.string(),
  startLoc: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  endLoc: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  stops: z.array(stopSchema),
  createdAt: z.string(),
  calendarId: z.string(),
});
