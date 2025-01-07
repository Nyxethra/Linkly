const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const React = require("../models/React");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách các loại reaction có thể có
const reactionTypes = ["Like", "Love", "Haha", "Sad", "Angry", "Wow"];

// Tỷ lệ phân bố của các loại reaction
const reactionDistribution = {
  "Like": 0.4,   // 40% là Like
  "Love": 0.3,   // 30% là Love
  "Haha": 0.15,  // 15% là Haha
  "Wow": 0.1,    // 10% là Wow
  "Sad": 0.03,   // 3% là Sad
  "Angry": 0.02  // 2% là Angry
};

// Hàm lấy reaction ngẫu nhiên dựa trên tỷ lệ phân bố
function getRandomReaction() {
  const random = Math.random();
  let sum = 0;
  
  for (const [reaction, probability] of Object.entries(reactionDistribution)) {
    sum += probability;
    if (random <= sum) {
      return reaction;
    }
  }
  
  return "Like"; // Mặc định là Like nếu không rơi vào trường hợp nào
}

// Hàm tạo thời gian reaction ngẫu nhiên từ thời điểm tạo post đến hiện tại
function getRandomReactTime(postCreatedAt) {
  const now = new Date();
  const timeDiff = now - postCreatedAt;
  return new Date(postCreatedAt.getTime() + Math.random() * timeDiff);
}

async function main() {
  try {
    await React.deleteMany({}); // Xóa tất cả reaction cũ

    const users = await User.find({});
    const posts = await Post.find({});
    const reacts = [];

    for (const post of posts) {
      // Mỗi bài viết sẽ có 5-20 reaction
      const numReacts = Math.floor(Math.random() * 16) + 5;
      
      // Tạo một set để theo dõi người đã react
      const reactedUsers = new Set();
      
      // Thêm chủ bài viết vào danh sách đã react (họ thường sẽ thích bài viết của mình)
      reactedUsers.add(post.user.toString());
      reacts.push(new React({
        react: "Like",
        postRef: post._id,
        reactBy: post.user,
        createdAt: post.createdAt
      }));

      let attempts = 0;
      while (reactedUsers.size < numReacts && attempts < numReacts * 2) {
        attempts++;
        
        // Chọn ngẫu nhiên một user
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const userId = randomUser._id.toString();

        // Nếu user này chưa react
        if (!reactedUsers.has(userId)) {
          reactedUsers.add(userId);

          const react = new React({
            react: getRandomReaction(),
            postRef: post._id,
            reactBy: randomUser._id
          });

          reacts.push(react);
        }
      }
    }

    await React.insertMany(reacts);
    console.log("Đã tạo xong dữ liệu reaction!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

main(); 