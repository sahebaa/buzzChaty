const userRes = await Users.aggregate([
  { $match: { email: user } }, // Step 1: Find the user

  { $lookup: {               // Step 2: Join Chats
    from: "chats",
    localField: "chats",
    foreignField: "_id",
    as: "userChats"
  }},

  { $unwind: "$userChats" }, // Step 3: Unwind array to work with each chat

  { $lookup: {               // Step 4: Find latest message for each chat
    from: "messages",
    let: { messageIds: "$userChats.messages" },
    pipeline: [
      { $match: { $expr: { $in: ["$_id", "$$messageIds"] } } },
      { $sort: { timestamp: -1 } },
      { $limit: 1 },
      { $lookup: {              // Step 5: Add sender info
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderInfo"
      }},
      { $unwind: "$senderInfo" },
      { $project: {
        messageType: 1,
        messageContent: 1,
        timestamp: 1,
        "senderInfo.name": 1,
        "senderInfo.email": 1
      }}
    ],
    as: "lastMessage"
  }},

  { $addFields: {
    "userChats.lastMessage": { $arrayElemAt: ["$lastMessage", 0] }
  }},

  { $addFields: {             // Step 6: Filter to find the *other* user
    "userChats.otherUserId": {
      $filter: {
        input: "$userChats.users",
        as: "uid",
        cond: { $ne: ["$$uid", "$_id"] }
      }
    }
  }},

  { $lookup: {               // Step 7: Lookup the *other* user info
    from: "users",
    localField: "userChats.otherUserId",
    foreignField: "_id",
    as: "userChats.otherUser"
  }},

  { $group: {
    _id: "$_id",
    name: { $first: "$name" },
    email: { $first: "$email" },
    userChats: { $push: "$userChats" }
  }}
]);
