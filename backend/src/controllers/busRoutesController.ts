import { Request, Response } from "express";
import firebase from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { routeSchema } from "../zod/routes.schema";
import { Route } from "../../commontypes/busroutes";

const db = getFirestore(firebase);

// CREATE
export const createBusRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = routeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const newRouteData: Route = {
      ...parsed.data,
      createdAt: new Date(), 
    };

    const routeRef = collection(db, "routes");
    const newDocRef = await addDoc(routeRef, newRouteData);

    res.status(201).json({
      message: "Bus route created successfully",
      id: newDocRef.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create bus route", details: error });
  }
};

// READ ALL
export const getAllBusRoutes = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshot = await getDocs(collection(db, "routes"));
    const routes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(routes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve routes", details: error });
  }
};

// READ ONE
export const getBusRouteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const docRef = doc(db, "routes", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      res.status(404).json({ error: "Route not found" });
      return;
    }

    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve route", details: error });
  }
};

// UPDATE
export const updateBusRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = routeSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const docRef = doc(db, "routes", id);
    await updateDoc(docRef, parsed.data);

    res.status(200).json({ message: "Route updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update route", details: error });
  }
};

// DELETE
export const deleteBusRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const docRef = doc(db, "routes", id);
    await deleteDoc(docRef);
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete route", details: error });
  }
};
