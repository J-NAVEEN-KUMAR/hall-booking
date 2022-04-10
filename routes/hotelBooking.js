import { Router } from "express";
import {
  createRoom,
  createCustomer,
  bookingRoom,
  roomsData,
  customersData,
} from "../controllers/hotelBooking.js";

const router = Router();

router.post("/create-room", createRoom);
router.post("/create-customer", createCustomer);
router.put("/booking-room/:roomBookingId", bookingRoom);
router.get("/roomsData", roomsData);
router.get("/customersData", customersData);

export default router;
