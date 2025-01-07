const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách thông tin người dùng với ảnh thật
const userProfiles = [
  {
    first_name: "Minh",
    last_name: "Trần",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    cover: "https://images.unsplash.com/photo-1506259091721-347e791bab0f",
    details: {
      bio: "📸 Capturing life's moments ✨ | Travel addict 🌏 | Coffee lover ☕️",
      otherName: "Alex Tran",
      job: "Nhiếp ảnh gia",
      workplace: "Studio Ánh Sáng",
      currentCity: "Hà Nội",
      hometown: "Hải Phòng",
      relationship: "Single",
      instagram: "minhtran.photo",
      phoneNumber: "0901234567",
      interests: ["Photography", "Travel", "Nature", "Art", "Coffee"],
      languages: ["Vietnamese", "English", "Japanese"],
      education: {
        highSchool: "THPT Chu Văn An",
        college: "Đại học Mỹ thuật Việt Nam",
        major: "Nghệ thuật Nhiếp ảnh"
      }
    }
  },
  {
    first_name: "Linh",
    last_name: "Nguyễn",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    cover: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27",
    details: {
      bio: "Foodie vibes only 🍜 | Living my best life 💫 | DMs for collabs 📩",
      otherName: "Bella Linh",
      job: "Food Reviewer",
      workplace: "Tự do",
      currentCity: "TP.HCM",
      hometown: "Đà Lạt",
      relationship: "In a relationship",
      instagram: "linh.foodie",
      phoneNumber: "0912345678",
      interests: ["Cooking", "Food Photography", "Travel", "Coffee", "Writing"],
      languages: ["Vietnamese", "English", "Korean"],
      education: {
        highSchool: "THPT Lê Hồng Phong",
        college: "Đại học Hoa Sen",
        major: "Quản trị Nhà hàng - Khách sạn"
      }
    }
  },
  {
    first_name: "Dũng",
    last_name: "Lê",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    cover: "https://images.unsplash.com/photo-1492138786289-d35ea832da43",
    details: {
      bio: "Code ninja 💻 | Building the future 🚀 | Coffee > Sleep 😴",
      otherName: "David Le",
      job: "Senior Developer",
      workplace: "Tech Solutions",
      currentCity: "Đà Nẵng",
      hometown: "Huế",
      relationship: "Married",
      instagram: "david.coding",
      phoneNumber: "0923456789",
      interests: ["Programming", "AI", "Machine Learning", "Gaming", "Technology"],
      languages: ["Vietnamese", "English"],
      education: {
        highSchool: "THPT Phan Châu Trinh",
        college: "Đại học Bách Khoa Đà Nẵng",
        major: "Khoa học Máy tính"
      }
    }
  },
  {
    first_name: "Hương",
    last_name: "Phạm",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    cover: "https://images.unsplash.com/photo-1501631957818-9f4b96ca2b0f",
    details: {
      bio: "Teaching with passion 📚 | Wanderlust soul ✈️ | Book worm 📖",
      otherName: "Helen Pham",
      job: "Giáo viên",
      workplace: "Trường THPT Chu Văn An",
      currentCity: "Hà Nội",
      hometown: "Nam Định",
      relationship: "Single",
      instagram: "helen.teaching",
      phoneNumber: "0934567890",
      interests: ["Teaching", "Reading", "Travel", "Music", "Languages"],
      languages: ["Vietnamese", "English", "French"],
      education: {
        highSchool: "THPT Chuyên Lê Hồng Phong",
        college: "Đại học Ngoại ngữ - ĐHQGHN",
        major: "Sư phạm Tiếng Anh"
      }
    }
  },
  {
    first_name: "Thắng",
    last_name: "Hoàng",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    cover: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
    details: {
      bio: "Making spaces beautiful ✨ | Art enthusiast 🎨 | Living in 3D 🏗️",
      otherName: "Tom Hoang",
      job: "Kiến trúc sư",
      workplace: "Design Studio",
      currentCity: "TP.HCM",
      hometown: "Vũng Tàu",
      relationship: "In a relationship",
      instagram: "tom.architect",
      phoneNumber: "0945678901",
      interests: ["Architecture", "Design", "Art", "Photography", "Travel"],
      languages: ["Vietnamese", "English"],
      education: {
        highSchool: "THPT Lê Quý Đôn",
        college: "Đại học Kiến trúc TP.HCM",
        major: "Kiến trúc"
      }
    }
  },
  {
    first_name: "Mai",
    last_name: "Vũ",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    cover: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
    details: {
      bio: "Healing hearts 💝 | Kid whisperer 👶 | Spreading smiles 😊",
      otherName: "Mary Vu",
      job: "Bác sĩ",
      workplace: "Bệnh viện Nhi Trung ương",
      currentCity: "Hà Nội",
      hometown: "Thái Bình",
      relationship: "Married",
      instagram: "dr.mai",
      phoneNumber: "0956789012",
      interests: ["Medicine", "Children", "Reading", "Music", "Yoga"],
      languages: ["Vietnamese", "English", "French"],
      education: {
        highSchool: "THPT Chuyên Thái Bình",
        college: "Đại học Y Hà Nội",
        major: "Y khoa Nhi"
      }
    }
  },
  {
    first_name: "Phong",
    last_name: "Đinh",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    details: {
      bio: "Making beats 🎵 | Studio life 🎧 | Music = Life 🎼",
      otherName: "Phoenix D",
      job: "Musician",
      workplace: "Sound Lab Studio",
      currentCity: "TP.HCM",
      hometown: "Nha Trang",
      relationship: "Single",
      instagram: "phoenix.music",
      phoneNumber: "0967890123",
      interests: ["Music", "Production", "Guitar", "Technology", "Art"],
      languages: ["Vietnamese", "English"],
      education: {
        highSchool: "THPT Lê Quý Đôn",
        college: "Học viện Âm nhạc Huế",
        major: "Sản xuất Âm nhạc"
      }
    }
  },
  {
    first_name: "Lan",
    last_name: "Đỗ",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    cover: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2",
    details: {
      bio: "Colors are my language 🎨 | Art speaks louder 🖼️ | Creating magic ✨",
      otherName: "Lily Do",
      job: "Artist",
      workplace: "Art Gallery",
      currentCity: "Đà Nẵng",
      hometown: "Quảng Nam",
      relationship: "Single",
      instagram: "lily.artist",
      phoneNumber: "0978901234",
      interests: ["Painting", "Drawing", "Art History", "Photography", "Nature"],
      languages: ["Vietnamese", "English", "Italian"],
      education: {
        highSchool: "THPT Phan Châu Trinh",
        college: "Đại học Nghệ thuật Huế",
        major: "Hội họa"
      }
    }
  },
  {
    first_name: "Tuấn",
    last_name: "Bùi",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    cover: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    details: {
      bio: "Food = Art 🍳 | Flavor explorer 🌶️ | Living deliciously 😋",
      otherName: "Tony Bui",
      job: "Chef",
      workplace: "Luxury Restaurant",
      currentCity: "TP.HCM",
      hometown: "Cần Thơ",
      relationship: "Married",
      instagram: "chef.tony",
      phoneNumber: "0989012345",
      interests: ["Cooking", "Food Art", "Wine", "Travel", "Photography"],
      languages: ["Vietnamese", "English", "French"],
      education: {
        highSchool: "THPT Châu Văn Liêm",
        college: "Le Cordon Bleu Paris",
        major: "Culinary Arts"
      }
    }
  },
  {
    first_name: "Hoa",
    last_name: "Trương",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    cover: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb3",
    details: {
      bio: "Fashion is my DNA 👗 | Style queen 👑 | Trendsetter vibes 💅",
      otherName: "Flora T",
      job: "Fashion Designer",
      workplace: "Fashion House",
      currentCity: "Hà Nội",
      hometown: "Hải Dương",
      relationship: "In a relationship",
      instagram: "flora.fashion",
      phoneNumber: "0990123456",
      interests: ["Fashion", "Design", "Art", "Travel", "Photography"],
      languages: ["Vietnamese", "English", "French", "Italian"],
      education: {
        highSchool: "THPT Chuyên Nguyễn Trãi",
        college: "London College of Fashion",
        major: "Fashion Design"
      }
    }
  },
  {
    first_name: "Đức",
    last_name: "Ngô",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
    cover: "https://images.unsplash.com/photo-1471201187657-6406da15e43b",
    details: {
      bio: "Car enthusiast 🚗 | DIY master 🔧 | Engineering life 🛠️",
      otherName: "Duke Ngo",
      job: "Mechanical Engineer",
      workplace: "Auto Workshop",
      currentCity: "Hà Nội",
      hometown: "Bắc Ninh",
      relationship: "Single",
      instagram: "duke.engineer",
      phoneNumber: "0901234567",
      interests: ["Cars", "Engineering", "DIY", "Photography", "Travel"],
      languages: ["Vietnamese", "English", "German"],
      education: {
        highSchool: "THPT Chuyên Bắc Ninh",
        college: "Đại học Bách Khoa Hà Nội",
        major: "Kỹ thuật Cơ khí"
      }
    }
  },
  {
    first_name: "Thảo",
    last_name: "Lý",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    cover: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a",
    details: {
      bio: "Zen mode on 🧘‍♀️ | Good vibes only ✨ | Mindfulness guru 🌸",
      otherName: "Tara Ly",
      job: "Yoga Teacher",
      workplace: "Zen Studio",
      currentCity: "TP.HCM",
      hometown: "Đà Lạt",
      relationship: "In a relationship",
      instagram: "tara.yoga",
      phoneNumber: "0912345678",
      interests: ["Yoga", "Meditation", "Health", "Nature", "Reading"],
      languages: ["Vietnamese", "English", "Sanskrit"],
      education: {
        highSchool: "THPT Thăng Long",
        college: "Yoga Alliance International",
        major: "Yoga và Thiền"
      }
    }
  },
  {
    first_name: "Nam",
    last_name: "Phan",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1463453091185-61582044d556",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    details: {
      bio: "Legal eagle ⚖️ | Business mind 💼 | Coffee addict ☕",
      otherName: "Nathan Phan",
      job: "Lawyer",
      workplace: "Law Firm",
      currentCity: "Hà Nội",
      hometown: "Hải Phòng",
      relationship: "Married",
      instagram: "nathan.law",
      phoneNumber: "0923456789",
      interests: ["Law", "Business", "Politics", "Golf", "Reading"],
      languages: ["Vietnamese", "English", "Chinese"],
      education: {
        highSchool: "THPT Chuyên Trần Phú",
        college: "Đại học Luật Hà Nội",
        major: "Luật Kinh tế"
      }
    }
  },
  {
    first_name: "Ngọc",
    last_name: "Mai",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    cover: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d",
    details: {
      bio: "Storyteller 📖 | Coffee & Books 📚 | Living in my own world ✨",
      otherName: "Pearl Mai",
      job: "Writer",
      workplace: "Freelance",
      currentCity: "Đà Lạt",
      hometown: "Huế",
      relationship: "Single",
      instagram: "pearl.writer",
      phoneNumber: "0934567890",
      interests: ["Writing", "Reading", "Poetry", "Coffee", "Travel"],
      languages: ["Vietnamese", "English", "French"],
      education: {
        highSchool: "THPT Quốc Học Huế",
        college: "Đại học Văn hóa Hà Nội",
        major: "Văn học"
      }
    }
  },
  {
    first_name: "Hoàng",
    last_name: "Võ",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    details: {
      bio: "Game dev by day 🎮 | Streamer by night 🎥 | Tech nerd 24/7 💻",
      otherName: "Henry Vo",
      job: "Game Developer",
      workplace: "Game Studio",
      currentCity: "TP.HCM",
      hometown: "Đà Nẵng",
      relationship: "In a relationship",
      instagram: "henry.gaming",
      phoneNumber: "0945678901",
      interests: ["Gaming", "Programming", "Streaming", "Anime", "Technology"],
      languages: ["Vietnamese", "English", "Japanese"],
      education: {
        highSchool: "THPT Lê Quý Đôn",
        college: "Đại học FPT",
        major: "Kỹ thuật Phần mềm"
      }
    }
  },
  {
    first_name: "Quỳnh",
    last_name: "Huỳnh",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    cover: "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
    details: {
      bio: "Health is wealth 💊 | Wellness advocate 🌿 | Living healthy 💪",
      otherName: "Quinn Huynh",
      job: "Pharmacist",
      workplace: "Health Care Center",
      currentCity: "Hà Nội",
      hometown: "Nghệ An",
      relationship: "Single",
      instagram: "quinn.health",
      phoneNumber: "0956789012",
      interests: ["Healthcare", "Medicine", "Research", "Yoga", "Cooking"],
      languages: ["Vietnamese", "English", "Korean"],
      education: {
        highSchool: "THPT Chuyên Phan Bội Châu",
        college: "Đại học Dược Hà Nội",
        major: "Dược học"
      }
    }
  },
  {
    first_name: "Việt",
    last_name: "Đặng",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    details: {
      bio: "Storytelling through lens 🎥 | Visual dreamer 🎬 | Creating magic ✨",
      otherName: "Victor Dang",
      job: "Film Director",
      workplace: "Film Studio",
      currentCity: "TP.HCM",
      hometown: "Nha Trang",
      relationship: "Married",
      instagram: "victor.films",
      phoneNumber: "0967890123",
      interests: ["Filmmaking", "Photography", "Art", "Music", "Travel"],
      languages: ["Vietnamese", "English", "French"],
      education: {
        highSchool: "THPT Lê Quý Đôn",
        college: "Đại học Sân khấu Điện ảnh TP.HCM",
        major: "Đạo diễn Điện ảnh"
      }
    }
  },
  {
    first_name: "Trang",
    last_name: "Dương",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    cover: "https://images.unsplash.com/photo-1507090960745-b32f65d3113a",
    details: {
      bio: "Save the planet 🌍 | Nature lover 🌱 | Science nerd 🔬",
      otherName: "Tracy Duong",
      job: "Scientist",
      workplace: "Research Institute",
      currentCity: "Đà Nẵng",
      hometown: "Quảng Nam",
      relationship: "Single",
      instagram: "tracy.science",
      phoneNumber: "0978901234",
      interests: ["Environment", "Research", "Photography", "Hiking", "Conservation"],
      languages: ["Vietnamese", "English", "German"],
      education: {
        highSchool: "THPT Chuyên Lê Quý Đôn",
        college: "Đại học Khoa học Tự nhiên",
        major: "Khoa học Môi trường"
      }
    }
  },
  {
    first_name: "Vân",
    last_name: "Hồ",
    gender: "female",
    picture: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
    cover: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    details: {
      bio: "Digital nomad 💻 | Social media queen 👑 | Content = Life 📱",
      otherName: "Venus Ho",
      job: "Marketing Manager",
      workplace: "Digital Agency",
      currentCity: "TP.HCM",
      hometown: "Cần Thơ",
      relationship: "In a relationship",
      instagram: "venus.digital",
      phoneNumber: "0989012345",
      interests: ["Marketing", "Social Media", "Photography", "Travel", "Fashion"],
      languages: ["Vietnamese", "English", "Chinese"],
      education: {
        highSchool: "THPT Châu Văn Liêm",
        college: "RMIT Vietnam",
        major: "Marketing"
      }
    }
  },
  {
    first_name: "Khoa",
    last_name: "Trịnh",
    gender: "male",
    picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    cover: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    details: {
      bio: "Money moves 💸 | Investment guru 📈 | Living the dream 🌟",
      otherName: "Kevin Trinh",
      job: "Financial Analyst",
      workplace: "Investment Bank",
      currentCity: "Hà Nội",
      hometown: "Hải Phòng",
      relationship: "Married",
      instagram: "kevin.finance",
      phoneNumber: "0990123456",
      interests: ["Finance", "Investment", "Economics", "Golf", "Travel"],
      languages: ["Vietnamese", "English", "Japanese"],
      education: {
        highSchool: "THPT Chuyên Trần Phú",
        college: "Đại học Kinh tế Quốc dân",
        major: "Tài chính - Ngân hàng"
      }
    }
  }
];

// Hàm bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

// Tạo người dùng mới
async function createUser(userProfile) {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const firstName = removeVietnameseTones(userProfile.first_name.toLowerCase());
  const lastName = removeVietnameseTones(userProfile.last_name.toLowerCase());
  
  const newUser = new User({
    first_name: userProfile.first_name,
    last_name: userProfile.last_name,
    email: `${firstName}.${lastName}@gmail.com`,
    password: hashedPassword,
    gender: userProfile.gender,
    picture: userProfile.picture,
    cover: userProfile.cover,
    bYear: 1990 + Math.floor(Math.random() * 10),
    bMonth: 1 + Math.floor(Math.random() * 12),
    bDay: 1 + Math.floor(Math.random() * 28),
    verified: true,
    friends: [],
    following: [],
    followers: [],
    requests: [],
    search: [],
    details: {
      bio: userProfile.details.bio,
      otherName: userProfile.details.otherName,
      job: userProfile.details.job,
      workplace: userProfile.details.workplace,
      currentCity: userProfile.details.currentCity,
      hometown: userProfile.details.hometown,
      relationship: userProfile.details.relationship,
      instagram: userProfile.details.instagram,
      phoneNumber: userProfile.details.phoneNumber,
      websites: [
        {
          link: `https://www.${removeVietnameseTones(firstName + lastName)}.com`,
          type: "Personal Website"
        }
      ]
    }
  });

  return newUser;
}

// Tạo dữ liệu người dùng
async function generateData() {
  try {
    // Xóa dữ liệu cũ
    await User.deleteMany({});
    
    // Tạo người dùng mới
    const users = [];
    for (const profile of userProfiles) {
      const user = await createUser(profile);
      await user.save();
      users.push(user);
    }

    // Tạo kết bạn ngẫu nhiên (80% tỉ lệ kết bạn) và follow
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (Math.random() < 0.8) {
          // Kết bạn
          users[i].friends.push(users[j]._id);
          users[j].friends.push(users[i]._id);
          
          // Follow nhau
          users[i].following.push(users[j]._id);
          users[j].following.push(users[i]._id);
          users[i].followers.push(users[j]._id);
          users[j].followers.push(users[i]._id);

          await users[i].save();
          await users[j].save();
        }
      }
    }

    console.log("Đã tạo xong dữ liệu giả lập!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

generateData(); 