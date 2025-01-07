const mongoose = require("mongoose");
const Group = require("../models/Group");
const Post = require("../models/Post");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách nội dung mẫu cho bài viết trong group
const groupPostTemplates = {
  "Cộng đồng Developer Việt Nam": [
    {
      text: "Chia sẻ kinh nghiệm làm việc với React Native 🚀",
      images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Review khóa học Machine Learning trên Coursera 📚",
      images: [
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Tips và tricks khi làm việc với Docker 🐳",
      background: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=60"
    }
  ],
  "Design Community Vietnam": [
    {
      text: "Color Palette đẹp cho dự án mới 🎨",
      images: [
        "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Review tablet vẽ XP-Pen Artist Pro 16 ✏️",
      images: [
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Xu hướng thiết kế UI/UX 2024 🌟",
      background: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?auto=format&fit=crop&w=800&q=60"
    }
  ],
  "Cộng đồng Âm nhạc Việt Nam": [
    {
      text: "Review audio interface mới 🎵",
      images: [
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Tips mix nhạc cho người mới bắt đầu 🎧",
      images: [
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Cover nhạc cùng nhau cuối tuần 🎸",
      background: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=60"
    }
  ],
  "Yêu Bếp - Cộng đồng Ẩm thực": [
    {
      text: "Công thức bánh mì mới thử 🍞",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Review nồi chiên không dầu 🍳",
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Menu nấu ăn cho người bận rộn 🍱",
      background: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=60"
    }
  ],
  "Cộng đồng Thể thao Việt Nam": [
    {
      text: "Lịch tập gym cho người mới 💪",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Review giày chạy bộ mới 👟",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      text: "Tips stretching đúng cách 🧘‍♂️",
      background: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=60"
    }
  ]
};

// Hàm tạo thời gian ngẫu nhiên trong khoảng 30 ngày gần đây
function getRandomDate() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now - thirtyDaysAgo));
}

// Hàm lấy ngẫu nhiên n phần tử từ một mảng
function getRandomElements(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

async function main() {
  try {
    // Lấy danh sách groups và users
    const groups = await Group.find({});
    const posts = [];

    // Tạo bài viết cho mỗi nhóm
    for (const group of groups) {
      const templates = groupPostTemplates[group.group_name];
      if (!templates) continue;

      // Lấy danh sách thành viên của nhóm
      const members = group.members.map(m => m.user);

      // Tạo các bài viết từ template
      for (const template of templates) {
        // Chọn ngẫu nhiên một thành viên để đăng bài
        const poster = members[Math.floor(Math.random() * members.length)];

        const post = new Post({
          type: "group",
          text: template.text,
          user: poster,
          group: group._id,
          createdAt: getRandomDate(),
          background: template.background || null,
          images: template.images ? template.images.map(url => ({ url })) : []
        });

        posts.push(post);
      }
    }

    // Xóa bài viết cũ và lưu bài viết mới
    await Post.deleteMany({ type: "group" });
    const savedPosts = await Post.insertMany(posts);

    console.log(`Đã tạo ${savedPosts.length} bài viết cho các nhóm!`);
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

main(); 