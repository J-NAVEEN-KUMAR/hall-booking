import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Customer name is required",
    },
    roomId: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
