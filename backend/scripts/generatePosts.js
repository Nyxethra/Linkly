const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/mxh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Danh sách background cho bài viết
const postBackgrounds = [
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&w=800", // Abstract blue
  "https://images.pexels.com/photos/2088170/pexels-photo-2088170.jpeg?auto=compress&w=800", // Gradient pink
  "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&w=800", // Sunset colors
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=60", // Gradient mesh
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=60", // Purple waves
  "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=800&q=60", // Colorful mesh
  "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&w=800", // Nature abstract
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=60" // Geometric
];

// Danh sách hình ảnh theo chủ đề
const imagesByProfession = {
  "Nhiếp ảnh gia": [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=60", // Portrait
    "https://images.pexels.com/photos/1840611/pexels-photo-1840611.jpeg?auto=compress&w=800", // Camera gear
    "https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&w=800", // City photography
    "https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&w=800", // Studio setup
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=60" // Portrait shoot
  ],
  "Food Reviewer": [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800", // Pasta dish
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=60", // Food styling
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&w=800", // Coffee setup
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=800", // Restaurant interior
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=60" // Food plating
  ],
  "Senior Developer": [
    "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=800", // Coding screen
    "https://images.unsplash.com/photo-1552308995-2baac1ad5490?auto=format&fit=crop&w=800&q=60", // Setup
    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=800", // Team meeting
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=800", // Office workspace
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60" // Laptop
  ],
  "Giáo viên": [
    "https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&w=800", // Teaching class
    "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=800", // Online teaching
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=60", // Writing
    "https://images.pexels.com/photos/8423145/pexels-photo-8423145.jpeg?auto=compress&w=800", // Student activity
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=60" // Books
  ],
  "Kiến trúc sư": [
    "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&w=800", // Blueprint
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=800", // Modern building
    "https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?auto=format&fit=crop&w=800&q=60", // City
    "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=800", // Architecture office
    "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=60" // Interior
  ],
  "Bác sĩ": [
    "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&w=800", // Medical exam
    "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&w=800", // Doctor office
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=60", // Work
    "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=800", // Medical equipment
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=60" // Hospital
  ],
  "Musician": [
    "https://images.pexels.com/photos/4087991/pexels-photo-4087991.jpeg?auto=compress&w=800", // Recording studio
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=60", // Concert
    "https://images.pexels.com/photos/4087992/pexels-photo-4087992.jpeg?auto=compress&w=800", // Guitar session
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=60", // Studio
    "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&w=800" // Piano
  ],
  "Artist": [
    "https://images.pexels.com/photos/374054/pexels-photo-374054.jpeg?auto=compress&w=800", // Painting process
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=60", // Studio
    "https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&w=800", // Paint supplies
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=60", // Art
    "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&w=800" // Gallery
  ],
  "Chef": [
    "https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&w=800", // Chef cooking
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60", // Food plating
    "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&w=800", // Food preparation
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=60", // Kitchen
    "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=800" // Restaurant
  ],
  "Fashion Designer": [
    "https://images.pexels.com/photos/1266139/pexels-photo-1266139.jpeg?auto=compress&w=800", // Fashion sketching
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=60", // Studio
    "https://images.pexels.com/photos/4620769/pexels-photo-4620769.jpeg?auto=compress&w=800", // Sewing machine
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=60", // Style
    "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&w=800" // Fashion show
  ],
  "Mechanical Engineer": [
    "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=800", // Workshop
    "https://images.pexels.com/photos/3912372/pexels-photo-3912372.jpeg?auto=compress&w=800", // Machine parts
    "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=60", // Engineering
    "https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&w=800", // Blueprint
    "https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&w=800&q=60" // Tools
  ],
  "Yoga Teacher": [
    "https://images.pexels.com/photos/3822727/pexels-photo-3822727.jpeg?auto=compress&w=800", // Yoga pose
    "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=800", // Meditation
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=60", // Class
    "https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&w=800", // Studio
    "https://images.unsplash.com/photo-1593810450967-f9c42aa22912?auto=format&fit=crop&w=800&q=60" // Practice
  ],
  "Lawyer": [
    "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=800", // Office
    "https://images.pexels.com/photos/5668788/pexels-photo-5668788.jpeg?auto=compress&w=800", // Documents
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=60", // Law books
    "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&w=800", // Meeting
    "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=60" // Courthouse
  ],
  "Writer": [
    "https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg?auto=compress&w=800", // Writing
    "https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&w=800", // Workspace
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=60", // Books
    "https://images.pexels.com/photos/3059749/pexels-photo-3059749.jpeg?auto=compress&w=800", // Library
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=60" // Coffee shop
  ],
  "Game Developer": [
    "https://images.pexels.com/photos/7915257/pexels-photo-7915257.jpeg?auto=compress&w=800", // Gaming setup
    "https://images.pexels.com/photos/7915255/pexels-photo-7915255.jpeg?auto=compress&w=800", // Code
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60", // Testing
    "https://images.pexels.com/photos/7915254/pexels-photo-7915254.jpeg?auto=compress&w=800", // Team
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=60" // Console
  ],
  "Pharmacist": [
    "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&w=800", // Pharmacy
    "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&w=800", // Medicine
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=60", // Lab
    "https://images.pexels.com/photos/4021777/pexels-photo-4021777.jpeg?auto=compress&w=800", // Consultation
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=60" // Store
  ],
  "Film Director": [
    "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&w=800", // Film set
    "https://images.pexels.com/photos/2873487/pexels-photo-2873487.jpeg?auto=compress&w=800", // Camera
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=60", // Action
    "https://images.pexels.com/photos/2873488/pexels-photo-2873488.jpeg?auto=compress&w=800", // Equipment
    "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=800&q=60" // Behind scenes
  ],
  "Scientist": [
    "https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg?auto=compress&w=800", // Laboratory
    "https://images.pexels.com/photos/3825367/pexels-photo-3825367.jpeg?auto=compress&w=800", // Research
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60", // Experiment
    "https://images.pexels.com/photos/3825366/pexels-photo-3825366.jpeg?auto=compress&w=800", // Equipment
    "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&w=800&q=60" // Study
  ],
  "Marketing Manager": [
    "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&w=800", // Meeting
    "https://images.pexels.com/photos/7688335/pexels-photo-7688335.jpeg?auto=compress&w=800", // Strategy
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60", // Planning
    "https://images.pexels.com/photos/7688334/pexels-photo-7688334.jpeg?auto=compress&w=800", // Analytics
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60" // Presentation
  ],
  "Financial Analyst": [
    "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&w=800", // Charts
    "https://images.pexels.com/photos/7567442/pexels-photo-7567442.jpeg?auto=compress&w=800", // Analysis
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=60", // Trading
    "https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&w=800", // Reports
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60" // Office
  ]
};

// Tạo nội dung bài viết dựa trên nghề nghiệp
const postContentsByProfession = {
  "Nhiếp ảnh gia": [
    "Bắt trọn khoảnh khắc hoàng hôn tuyệt đẹp 🌅 #Photography #Sunset",
    "Behind the scenes của buổi chụp hôm nay 📸 Mỗi bức ảnh là một câu chuyện #BTS #Photography",
    "Góc nhìn mới về thành phố 🌆 Sài Gòn đẹp nhất về đêm #CityLife #NightPhotography",
    "Chia sẻ một số tips chụp ảnh chân dung 👤 Swipe để xem các góc chụp đẹp nhất #PortraitTips",
    "Khoảnh khắc tự nhiên là đẹp nhất ✨ Càng đơn giản càng đẹp #NaturalBeauty"
  ],
  "Food Reviewer": [
    "Review quán mới khai trương 🍜 Địa chỉ sống ảo mới toanh cho team thích ăn ngon #FoodReview",
    "Món ngon không thể bỏ qua trong tuần này 😋 Swipe để xem full menu #FoodBlogger #Yummy",
    "Food tour cuối tuần 🚶‍♂️ Ăn hết Sài Gòn trong một ngày #FoodTour #Saigon",
    "Khám phá ẩm thực đường phố 🍖 Những món ăn vặt ngon nhất định phải thử #StreetFood",
    "Góc sống ảo với đồ uống 🥤 Quán cafe mới siêu xinh #CoffeeTime #Aesthetic"
  ],
  "Senior Developer": [
    "Code không bug thì không phải code 💻 #Coding #Programming",
    "Setup mới cho workspace 🖥️ Productivity boost 200% #Setup #DeveloperLife",
    "Team building cuối tuần với anh em dev 🎮 Work hard play hard #TeamBuilding",
    "Share kinh nghiệm làm việc remote hiệu quả 🏠 #RemoteWork #DevLife",
    "Side project mới đang trong giai đoạn phát triển 🚀 #SideProject #Coding"
  ],
  "Giáo viên": [
    "Một ngày trong lớp học thật năng động 📚 #Teaching #Education",
    "Chia sẻ phương pháp học tập hiệu quả 📖 #StudyTips #Learning",
    "Hoạt động ngoại khóa cùng học sinh 🎨 #SchoolLife #Activities",
    "Khoảnh khắc đáng yêu của các em học sinh 💕 #TeacherLife",
    "Workshop về phương pháp giảng dạy mới 🎯 #TeachingMethods"
  ],
  "Kiến trúc sư": [
    "Dự án mới đang trong giai đoạn thiết kế ✏️ #Architecture #Design",
    "Công trình đầu tay đã hoàn thiện 🏗️ #Building #Architecture",
    "Chia sẻ ý tưởng thiết kế nội thất 🎨 #InteriorDesign",
    "Behind the scenes của một dự án lớn 📐 #ArchitectLife",
    "Triển lãm kiến trúc quốc tế 🌍 #Exhibition #Design"
  ],
  "Bác sĩ": [
    "Chia sẻ kiến thức về sức khỏe 💊 #Health #Medical",
    "Một ngày làm việc tại bệnh viện 🏥 #DoctorLife",
    "Tips chăm sóc sức khỏe mùa dịch 😷 #Healthcare",
    "Buổi tư vấn sức khỏe cộng đồng 👨‍⚕️ #Community",
    "Khoảnh khắc đáng nhớ với các bệnh nhân nhí 👶 #Pediatrics"
  ],
  "Musician": [
    "Live session mới nhất tại studio 🎵 #Music #Recording",
    "Behind the scenes MV mới 🎬 #MusicVideo #BTS",
    "Đêm nhạc acoustic cuối tuần 🎸 #Acoustic #LiveMusic",
    "Teaser album sắp phát hành 🎼 #NewAlbum #Music",
    "Jam session cùng các nghệ sĩ 🎹 #JamSession #Musicians"
  ],
  "Artist": [
    "Tác phẩm mới nhất của mình 🎨 #Art #Painting",
    "Work in progress - Dự án nghệ thuật mới 🖌️ #WIP #Artist",
    "Triển lãm cá nhân sắp tới 🎭 #Exhibition #Gallery",
    "Behind the scenes trong studio 🎨 #ArtStudio #Creative",
    "Chia sẻ cảm hứng sáng tạo ✨ #Inspiration #Art"
  ],
  "Chef": [
    "Món mới trong thực đơn tuần này 🍽️ #Cooking #Chef",
    "Behind the scenes trong nhà bếp 👨‍🍳 #Kitchen #Culinary",
    "Food styling cho món signature 📸 #FoodStyling",
    "Workshop nấu ăn cuối tuần 🥘 #CookingClass",
    "Chia sẻ công thức món ăn yêu thích 📝 #Recipe"
  ],
  "Fashion Designer": [
    "Preview BST mới nhất 👗 #Fashion #Design",
    "Behind the scenes buổi chụp lookbook 📸 #BTS #Fashion",
    "Quá trình thiết kế một chiếc váy ✨ #Design #Process",
    "Fashion show countdown 🎭 #Runway #FashionShow",
    "Workspace tour - Nơi sáng tạo thời trang 🧵 #Studio"
  ],
  "Software Engineer": [
    "Đang làm việc trên một dự án mới thú vị! 💻 #coding #developer",
    "Debug cả ngày nhưng cuối cùng cũng fix được bug 🎉 #debugging",
    "Học framework mới, rất thú vị! 🚀 #learning #programming",
    "Code review time! Giúp team nâng cao chất lượng code 👨‍💻 #teamwork",
    "Hackathon cuối tuần thật tuyệt! 🏆 #hackathon #innovation"
  ],
  "Graphic Designer": [
    "Hoàn thành một thiết kế mới cho khách hàng 🎨 #design",
    "Tìm cảm hứng từ những màu sắc của thiên nhiên 🌈 #inspiration",
    "Làm việc với typography thật thú vị! ✒️ #typography",
    "Chia sẻ một số concept mới 🎯 #concept #creative",
    "Branding project mới đang tiến triển tốt! 🌟 #branding"
  ],
  "Doctor": [
    "Một ngày bận rộn tại bệnh viện 👨‍⚕️ #healthcare",
    "Hạnh phúc khi giúp đỡ được bệnh nhân 💉 #helping",
    "Nghiên cứu về phương pháp điều trị mới 🔬 #research",
    "Chia sẻ kiến thức y tế 📚 #medical #knowledge",
    "Cập nhật về COVID-19 😷 #healthcare #safety"
  ],
  "Chef": [
    "Thử nghiệm công thức mới trong bếp 👨‍🍳 #cooking",
    "Plating là nghệ thuật! 🍽️ #plating #foodart",
    "Học hỏi về ẩm thực các nước 🌎 #cuisine",
    "Chuẩn bị menu mới cho nhà hàng 📝 #menu",
    "Chia sẻ bí quyết nấu ăn 🥘 #cooking #tips"
  ],
  "Teacher": [
    "Ngày mới với học sinh thân yêu 👩‍🏫 #teaching",
    "Chuẩn bị bài giảng cho tuần tới 📚 #preparation",
    "Rất vui khi thấy học sinh tiến bộ 🎓 #progress",
    "Hoạt động ngoại khóa thú vị! 🎨 #activities",
    "Chia sẻ phương pháp giảng dạy mới 📖 #education"
  ],
  "Photographer": [
    "Chụp ảnh cưới cho cặp đôi hạnh phúc 📸 #wedding",
    "Khám phá góc chụp mới trong thành phố 🌆 #urban",
    "Chia sẻ bộ ảnh mới nhất 🎞️ #portfolio",
    "Behind the scenes của buổi chụp hôm nay 🎭 #bts",
    "Sunset session tuyệt đẹp! 🌅 #sunset #photography"
  ],
  "Architect": [
    "Thiết kế mới cho dự án nhà ở 🏠 #architecture",
    "Nghiên cứu về kiến trúc xanh 🌱 #sustainable",
    "Render 3D cho concept mới 🖥️ #3D #design",
    "Site visit kiểm tra tiến độ 🏗️ #construction",
    "Chia sẻ ý tưởng thiết kế 📐 #design #concept"
  ],
  "Fashion Designer": [
    "Collection mới đang trong quá trình hoàn thiện 👗 #fashion",
    "Sketch những mẫu thiết kế mới ✏️ #design",
    "Chuẩn bị cho fashion show 👠 #runway",
    "Thử nghiệm chất liệu mới 🧵 #fabric",
    "Behind the scenes của buổi fitting 👔 #bts"
  ],
  "Mechanical Engineer": [
    "Làm việc trên dự án mới về robot 🤖 #robotics",
    "CAD modeling cho thiết kế mới 📐 #CAD",
    "Testing prototype 🔧 #prototype",
    "Nghiên cứu về công nghệ mới 🔬 #technology",
    "Chia sẻ về cơ khí hiện đại 🛠️ #engineering"
  ],
  "Yoga Teacher": [
    "Namaste! Buổi sáng tràn đầy năng lượng 🧘‍♀️ #yoga",
    "Chia sẻ tư thế yoga mới 🌸 #asana",
    "Meditation session thật bình yên ✨ #meditation",
    "Workshop yoga cuối tuần 🎋 #workshop",
    "Tips cho người mới tập yoga 🌟 #beginner"
  ],
  "Lawyer": [
    "Case study thú vị 📚 #law",
    "Cập nhật về luật mới 📋 #legal",
    "Chia sẻ kiến thức pháp luật 👨‍⚖️ #knowledge",
    "Tham dự hội thảo về luật 🏛️ #seminar",
    "Pro bono work là niềm vui ⚖️ #probono"
  ],
  "Writer": [
    "Đang viết chương mới cho cuốn sách 📖 #writing",
    "Writer's block nhưng vẫn cố gắng ✍️ #struggle",
    "Chia sẻ quá trình sáng tác 📝 #creative",
    "Book signing event sắp tới! 📚 #author",
    "Research cho dự án mới 🔍 #research"
  ],
  "Game Developer": [
    "Level design cho game mới 🎮 #gamedev",
    "Bug fixing marathon 🐛 #debugging",
    "Playtesting session 🎲 #testing",
    "Character design update 👾 #design",
    "Dev log update 💻 #development"
  ],
  "Pharmacist": [
    "Nghiên cứu về dược phẩm mới 💊 #pharmacy",
    "Chia sẻ kiến thức về thuốc 🏥 #medicine",
    "Tư vấn sức khỏe online 👨‍⚕️ #health",
    "Cập nhật về vaccine 💉 #vaccine",
    "Tips sử dụng thuốc an toàn 🌿 #safety"
  ],
  "Film Director": [
    "On set! Ngày quay thứ nhất 🎬 #filming",
    "Location scouting cho scene mới 🎥 #location",
    "Script reading với cast 📝 #rehearsal",
    "Behind the scenes 🎭 #bts",
    "Post-production giai đoạn cuối 🎞️ #editing"
  ],
  "Scientist": [
    "Experiment mới có kết quả thú vị! 🔬 #research",
    "Phân tích dữ liệu 📊 #data",
    "Lab work hôm nay 🧪 #laboratory",
    "Nghiên cứu mới được công bố 📑 #publication",
    "Chia sẻ phát hiện khoa học 🔭 #discovery"
  ],
  "Marketing Manager": [
    "Campaign mới đang chạy tốt! 📈 #marketing",
    "Brainstorming session với team 🧠 #teamwork",
    "Social media strategy update 📱 #social",
    "Market research results 📊 #research",
    "Brand awareness tăng trưởng tốt 📢 #branding"
  ],
  "Financial Analyst": [
    "Market analysis hôm nay 📊 #finance",
    "Investment portfolio update 💹 #investment",
    "Risk assessment cho Q2 ⚖️ #risk",
    "Financial modeling 💰 #analysis",
    "Market trends 2024 📈 #trends"
  ]
};

function getRandomImages(profession) {
  const images = imagesByProfession[profession];
  if (!images || images.length === 0) {
    return [];
  }

  // Shuffle array
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  
  // 70% chance to have images, 30% chance to have background
  const useImages = Math.random() > 0.3;
  
  if (useImages) {
    // Select 1-5 images
    const count = Math.floor(Math.random() * 5) + 1;
    return shuffled.slice(0, count);
  }
  
  // Return empty array to indicate background should be used
  return [];
}

function getRandomContent(job) {
  const contents = postContentsByProfession[job] || [
    "Chia sẻ khoảnh khắc đẹp trong ngày ✨ #Lifestyle",
    "Một ngày làm việc năng suất 💪 #WorkLife",
    "Cuối tuần thật tuyệt vời 🌟 #Weekend",
    "Những điều nhỏ nhặt tạo nên hạnh phúc 🌈 #Happiness",
    "Chia sẻ niềm vui cùng mọi người 🎉 #Sharing"
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function getRandomBackground() {
  return postBackgrounds[Math.floor(Math.random() * postBackgrounds.length)];
}

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mxh');
    await Post.deleteMany({}); // Xóa tất cả bài viết cũ

    const users = await User.find({});
    const posts = [];

    for (const user of users) {
      const numPosts = Math.floor(Math.random() * 8) + 3; // 3-10 posts per user
      
      for (let i = 0; i < numPosts; i++) {
        const images = getRandomImages(user.details.job);
        const useBackground = images.length === 0;
        
        const post = new Post({
          type: null,
          text: getRandomContent(user.details.job),
          images: images.map(url => ({ url })),
          user: user._id,
          background: useBackground ? getRandomBackground() : null,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
        
        posts.push(post);
      }
    }

    await Post.insertMany(posts);
    console.log("Đã tạo xong dữ liệu bài viết!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.connection.close();
  }
}

main(); 