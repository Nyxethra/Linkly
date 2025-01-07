const mongoose = require("mongoose");
const Group = require("../models/Group");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách các nhóm mẫu
const groupTemplates = [
  {
    group_name: "Cộng đồng Developer Việt Nam",
    description: "Nơi chia sẻ kiến thức, kinh nghiệm và cơ hội việc làm trong ngành phát triển phần mềm",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60",
    public: true,
    hidden: false,
    approvePosts: true,
    approveMembers: false
  },
  {
    group_name: "Design Community Vietnam",
    description: "Nơi gặp gỡ của những người yêu thích thiết kế tại Việt Nam",
    cover: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=60",
    public: true,
    hidden: false,
    approvePosts: false,
    approveMembers: false
  },
  {
    group_name: "Cộng đồng Âm nhạc Việt Nam",
    description: "Nơi giao lưu và chia sẻ đam mê âm nhạc",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60",
    public: true,
    hidden: false,
    approvePosts: false,
    approveMembers: false
  },
  {
    group_name: "Yêu Bếp - Cộng đồng Ẩm thực",
    description: "Nơi chia sẻ công thức nấu ăn và đam mê ẩm thực",
    cover: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60",
    public: true,
    hidden: false,
    approvePosts: false,
    approveMembers: false
  },
  {
    group_name: "Cộng đồng Thể thao Việt Nam",
    description: "Nơi chia sẻ đam mê thể thao và lối sống lành mạnh",
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=60",
    public: true,
    hidden: false,
    approvePosts: false,
    approveMembers: false
  }
];

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
    // Xóa dữ liệu cũ
    await Group.deleteMany({});
    
    const users = await User.find({});
    const groups = [];

    // Tạo các nhóm
    for (const template of groupTemplates) {
      // Chọn ngẫu nhiên một người dùng làm admin đầu tiên
      const admin = users[Math.floor(Math.random() * users.length)];
      
      // Chọn 11 thành viên (12 - 1 admin)
      const members = getRandomElements(
        users.filter(u => u._id !== admin._id),
        11
      );

      const group = new Group({
        ...template,
        numMembers: 12, // 11 members + 1 admin
        members: [
          { user: admin._id, type: "admin", joinedAt: getRandomDate() },
          ...members.map(u => ({ 
            user: u._id, 
            type: "member", 
            joinedAt: getRandomDate() 
          }))
        ],
        isBaned: false
      });

      groups.push(group);
    }

    // Lưu dữ liệu vào database
    const savedGroups = await Group.insertMany(groups);
    console.log(`Đã tạo ${savedGroups.length} nhóm, mỗi nhóm có 12 thành viên!`);
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

main(); 