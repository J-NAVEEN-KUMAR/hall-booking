import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Room name is required",
    },
    beds: {
      type: Number,
      required: "Number of bed is required",
    },
    amenities: {
      type: Array,
      required: "Amenities are required",
    },
    price: {
      type: Number,
      required: "Price is required",
    },
    status: {
      type: String,
      default: "not-booked",
    },
    date: {
      type: String,
      default: new Date(),
    },
    startTime: {
      type: String,
      default: new Date(),
    },
    endTime: {
      type: String,
      default: new Date(),
    },
    customers: {
      type: ObjectId,
    },
  },
  { timstamps: true }
);

export default mongoose.model("Room", roomSchema);
