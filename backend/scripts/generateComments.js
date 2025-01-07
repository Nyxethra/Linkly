const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách các bình luận mẫu
const commentTemplates = [
  // Bình luận tích cực
  "Tuyệt vời quá! 👏",
  "Rất hay và ý nghĩa 🌟",
  "Cảm ơn bạn đã chia sẻ ✨",
  "Thật truyền cảm hứng 🎯",
  "Quá đẹp luôn 😍",
  "Rất thú vị nha 🤩",
  "Bài viết rất bổ ích 📚",
  "Chất lượng cao 💯",
  "Đỉnh của chóp 🏆",
  "Quá tuyệt vời ạ ⭐",

  // Bình luận thảo luận
  "Bạn có thể chia sẻ thêm về điều này không? 🤔",
  "Mình cũng đang quan tâm vấn đề này 👀",
  "Có thể cho mình xin thêm thông tin được không? 📝",
  "Rất đồng ý với quan điểm của bạn 👍",
  "Mình cũng có trải nghiệm tương tự 🙌",
  "Góc nhìn rất mới mẻ 👌",
  "Chia sẻ rất hữu ích 💡",
  "Làm mình nhớ lại nhiều kỷ niệm 💭",
  "Nhìn rất chuyên nghiệp 👨‍💼",
  "Mình sẽ thử áp dụng 📋",

  // Bình luận hài hước
  "Quá xịn xò luôn 😎",
  "Đúng chuẩn không cần chỉnh 👌",
  "Nhìn mà mê luôn 🤤",
  "Quá đỉnh lun á 🔥",
  "Xịn sò quá bạn ơi 🌟",
  "Nhìn mà ham 😋",
  "Quá cool ngầu 😎",
  "Đúng gu mình luôn 👍",
  "Nhìn phát mê luôn 🤩",
  "Quá là perfect 💯"
];

// Hàm tạo bình luận ngẫu nhiên
function getRandomComment() {
  return commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
}

// Hàm tạo thời gian ngẫu nhiên trong khoảng từ thời điểm tạo post đến hiện tại
function getRandomCommentTime(postCreatedAt) {
  const now = new Date();
  const timeDiff = now - postCreatedAt;
  return new Date(postCreatedAt.getTime() + Math.random() * timeDiff);
}

async function main() {
  try {
    await Comment.deleteMany({}); // Xóa tất cả comment cũ

    const users = await User.find({});
    const posts = await Post.find({});
    const comments = [];

    for (const post of posts) {
      // Mỗi bài viết sẽ có 1-5 comment
      const numComments = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < numComments; i++) {
        // Chọn ngẫu nhiên một user để comment
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Đảm bảo người comment không phải là chủ bài viết
        if (randomUser._id.toString() === post.user.toString()) {
          continue;
        }

        const comment = new Comment({
          comment: getRandomComment(),
          commentBy: randomUser._id,
          commentAt: getRandomCommentTime(post.createdAt),
          postRef: post._id,
          st: null
        });

        comments.push(comment);
      }
    }

    await Comment.insertMany(comments);
    console.log("Đã tạo xong dữ liệu bình luận!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

main(); 