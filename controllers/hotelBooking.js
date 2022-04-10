import Customer from "../models/customer.js";
import Room from "../models/room.js";

//creating hotel room
export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    console.log("ROOM CREATED ===>", room);
    res.json({ ok: true, room });
  } catch (error) {
    console.log("ERROR IN CREATING THE ROOM ===>", error);
    res.json("Error in creating the room");
  }
};

//creating customer
export const createCustomer = async (req, res) => {
  try {
    const createCustomer = await new Customer(req.body);
    await createCustomer.save();
    console.log("ROOM CREATED ===>", createCustomer);
    res.json({ ok: true, createCustomer });
  } catch (error) {
    console.log("ERROR IN CREATING A CUSTOMER", error);
    res.json("Error in creating a customer");
  }
};

//booking a room
export const bookingRoom = async (req, res) => {
  try {
    const roomInfo = await Room.findById(req.params.roomBookingId);
    const { date, startTime, endTime, customers } = roomInfo;
    const { _id, roomId } = await Customer.findById(req.body.customers[0]);
    const currentDate = new Date();
    const currentStartTime = new Date();
    const currentEndTime = new Date();
    currentEndTime.setHours(currentEndTime.getHours() + 1);
    if (Date.parse(currentStartTime) > Date.parse(endTime)) {
      const booking = await Room.findByIdAndUpdate(
        req.params.roomBookingId,
        {
          $set: {
            date: currentDate,
            startTime: currentStartTime,
            endTime: currentEndTime,
            customers: _id,
            status: "booked",
          },
        },
        { new: true }
      );
      roomId.push(req.params.roomBookingId);
      const customerStatus = await Customer.findByIdAndUpdate(_id, {
        $set: { roomId: roomId },
      });
      setTimeout(() => {
        res.json({ booking, customerStatus });
      }, 1000);
    } else {
      res.json("This room is already booked.");
    }
  } catch (error) {
    console.log("ERROR IN BOOKING THE ROOM ===>", error);
    res.json("Error in booking the room");
  }
};

export const roomsData = async (req, res) => {
  try {
    const roomInfo = await Room.find();
    const customerInfo = await Customer.find();
    const currentDate = Date.parse(new Date());
    roomInfo.forEach(async (r) => {
      let endTime = Date.parse(r.endTime);
      if (currentDate > endTime) {
        let customerRoom = await Customer.findById(r.customers);
        let roomId = customerRoom;
        await Room.findByIdAndUpdate(r._id, {
          $set: { status: "not-booked", customers: null },
        });
        if (roomId != null) {
          const i = roomId.indexOf(r._id);
          if (i >= 0) {
            roomId.splice(i, 1);
            await Customer.findByIdAndUpdate(
              r.customers,
              { $set: { roomId: roomId } },
              { new: true }
            );
          }
        }
      }
    });
    const roomsData = await Room.find();
    res.json(roomsData);
  } catch (error) {
    res.json("Error getting in rooms data");
    console.log("ERROR IN GETTING ROOMS DATA ===>", error);
  }
};

export const customersData = async (req, res) => {
  try {
    const roomInfo = await Room.find();
    const customerInfo = await Customer.find();
    const currentDate = Date.parse(new Date());
    roomInfo.forEach(async (r) => {
      let endTime = Date.parse(r.endTime);
      if (currentDate > endTime) {
        let customerRoom = await Customer.findById(r.customers);
        let roomId = customerRoom;
        await Room.findByIdAndUpdate(r._id, {
          $set: { status: "not-booked", customers: null },
        });
        if (roomId != null) {
          const i = roomId.indexOf(r._id);
          if (i >= 0) {
            roomId.splice(i, 1);
            await Customer.findByIdAndUpdate(
              r.customers,
              { $set: { roomId: roomId } },
              { new: true }
            );
          }
        }
      }
    });
    const customersData = await Customer.find();
    res.json(customersData);
  } catch (error) {
    res.json("Error getting in customerss data");
    console.log("ERROR IN GETTING CUSTOMERS DATA ===>", error);
  }
};
