const RoomMess = require("../models/RoomMess");
const User = require("../models/User");
const Group = require("../models/Group");
const mongoose = require("mongoose");

exports.creatRoomMess = async (req, res) => {
  try {
    let members = [];

    const { room_name, groupRef } = req.body;
    const group = await Group.findById(groupRef);
    // Tạo mảng members chứa các _id
    members = group.members.map((member) => member.user);
    const newRoomMess = await new RoomMess({
      room_name: room_name,
      groupRef: groupRef,
      members: members,
    }).save();

    res.send({
      newRoomMess: newRoomMess,
      message: "Create Room Chat Success !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomMess = async (req, res) => {
  try {
    // Lấy thông tin về các nhóm người dùng đã tham gia
    const user = await User.findById(req.user.id).select("groups_joined");
    const groupsJoined = user.groups_joined;

    // Tìm các RoomMess có groupRef thuộc các nhóm người dùng đã tham gia
    const allRoomMess = await RoomMess.find({
      groupRef: { $in: groupsJoined },
    }).populate("groupRef", "group_name public cover members numMembers id");

    // Trả về kết quả
    res.status(200).json({ roomMess: allRoomMess });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.customRoom = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingRoomMess = await RoomMess.findOne({
      $or: [
        { members: [req.user.id, userId] },
        { members: [userId, req.user.id] },
      ],
      roomUser: true,
    });

    if (existingRoomMess) {
      res.status(200).json({
        color: existingRoomMess.color,
        icon: existingRoomMess.icon,
        media: existingRoomMess.media,
        roomId: existingRoomMess._id,
      });
    } else {
      res.status(200).json({ color: "#0084FF", icon: "👍🏻", media: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { color, icon } = req.body;

    // Check if the chat room exists
    const existingRoom = await RoomMess.findById(req.params.roomId);

    if (!existingRoom) {
      return res.status(404).json({ message: "Chat room not found." });
    }

    // Update chat room information
    await RoomMess.findByIdAndUpdate(req.params.roomId, {
      $set: {
        color: color,
        icon: icon,
      },
    });

    res.status(200).json({ message: "Chat room updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoomMess = async (req, res) => {
  try {
    const roomMessId  = req.params.roomMessId; // Đảm bảo rằng bạn đã cung cấp roomMessId trong URL hoặc body request
    const deletedRoomMess = await RoomMess.findByIdAndRemove(roomMessId);

    if (!deletedRoomMess) {
      return res.status(404).json({ message: "RoomMess not found" });
    }

    res.json({
      message: "RoomMess deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
