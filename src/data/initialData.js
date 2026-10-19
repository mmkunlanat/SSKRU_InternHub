// Initial sample data for SSKRU InternHub & CoopFlow System

export const INITIAL_STUDENT = {
  id: "6612732138",
  prefix: "นาย",
  firstName: "ศุภชัย",
  lastName: "กลิ่นหอม",
  fullName: "นายศุภชัย กลิ่นหอม",
  degreeLevel: "ปริญญาตรี 4 ปี", // FR-1.1
  faculty: "คณะศิลปศาสตร์และวิทยาศาสตร์",
  major: "สาขาวิชาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
  university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
  address: "99 หมู่ 8 ถนนสุรินทร์-ศรีสะเกษ ตำบลหนองครก อำเภอเมือง จังหวัดศรีสะเกษ 33000",
  phone: "082-345-6789",
  email: "stu6612732138@sskru.ac.th",
  academicYear: "2568",
  term: "ภาคการศึกษาที่ 2/2568",
  periodStart: "2025-11-01",
  periodEnd: "2026-02-28",
  advisorName: "ผศ.ดร. ธีรเดช เจริญผล",
  advisorEmail: "teeradech.c@sskru.ac.th",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  status: "กำลังฝึกปฏิบัติงาน",
  isVoided: false,
  voidReason: "",
  finalGrade: "A"
};

export const INITIAL_COMPANY = {
  companyName: "บริษัท สมาร์ท อินโนเวชั่น จำกัด (Smart Innovation Co., Ltd.)", // FR-1.2
  address: "123/45 อาคารเอ็กซ์โพลเรอร์ ทาวเวอร์ ชั้น 12 ถนนสุขุมวิท 21 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",
  supervisorName: "คุณกุลณัฐ มงคล (Kullunat Mongkol)",
  supervisorPosition: "Lead Software Architect & Engineering Manager",
  department: "ฝ่ายพัฒนาซอฟต์แวร์และนวัตกรรมดิจิทัล (Digital Innovation)",
  email: "kullunat.m@smartinnovation.co.th",
  phone: "02-987-6543 ต่อ 108",
  mobile: "089-112-2334",
  productsServices: "บริการพัฒนาคลาวด์แพลตฟอร์ม, ระบบ Enterprise Web & Mobile Application และโซลูชัน AI วิเคราะห์ข้อมูลธุรกิจ",
  workLocationType: "Hybrid (สำนักงาน 3 วัน / ทำงานทางไกล 2 วัน)"
};

export const INITIAL_ATTENDANCE = [
  {
    id: "att-1",
    date: "2026-02-02",
    day: "จันทร์",
    timeIn: "08:25",
    timeOut: "17:35",
    status: "present", // present, sick_leave, personal_leave, holiday
    statusLabel: "มาปฏิบัติงาน",
    notes: "เข้าร่วม Daily Standup และปรับปรุง UI หน้าล็อกอิน",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-2",
    date: "2026-02-03",
    day: "อังคาร",
    timeIn: "08:28",
    timeOut: "17:30",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "เชื่อมต่อ API ข้อมูลรายงานและทดสอบ Unit Test",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-3",
    date: "2026-02-04",
    day: "พุธ",
    timeIn: "08:15",
    timeOut: "17:45",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "ศึกษา Docker compose และติดตั้ง environment จำลอง",
    hasTimeCard: false,
    timeCardImage: null,
    isFraud: false
  },
  {
    id: "att-4",
    date: "2026-02-05",
    day: "พฤหัสบดี",
    timeIn: "08:30",
    timeOut: "17:30",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "แก้ปัญหา State Management ในโมดูลจัดการผู้ใช้",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-5",
    date: "2026-02-06",
    day: "ศุกร์",
    timeIn: "08:20",
    timeOut: "18:00",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "ร่วมประชุม Sprint Review ประจำสัปดาห์",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-6",
    date: "2026-02-09",
    day: "จันทร์",
    timeIn: "-",
    timeOut: "-",
    status: "sick_leave",
    statusLabel: "ลาป่วย",
    notes: "มีอาการไข้หวัด แนบใบรับรองแพทย์ผ่านระบบเรียบร้อย",
    hasTimeCard: false,
    timeCardImage: null,
    isFraud: false
  },
  {
    id: "att-7",
    date: "2026-02-10",
    day: "อังคาร",
    timeIn: "08:29",
    timeOut: "17:32",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "เริ่มพัฒนาโมดูล Export PDF สำหรับรายงาน",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-8",
    date: "2026-02-11",
    day: "พุธ",
    timeIn: "08:24",
    timeOut: "17:40",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "Code Review ร่วมกับพนักงานที่ปรึกษา",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  },
  {
    id: "att-9",
    date: "2026-02-12",
    day: "พฤหัสบดี",
    timeIn: "-",
    timeOut: "-",
    status: "holiday",
    statusLabel: "วันหยุดนักขัตฤกษ์",
    notes: "วันหยุดประจำปีของบริษัท",
    hasTimeCard: false,
    timeCardImage: null,
    isFraud: false
  },
  {
    id: "att-10",
    date: "2026-02-13",
    day: "ศุกร์",
    timeIn: "08:18",
    timeOut: "17:35",
    status: "present",
    statusLabel: "มาปฏิบัติงาน",
    notes: "ทดสอบการเชื่อมต่อ Database Production และสรุปสัปดาห์",
    hasTimeCard: true,
    timeCardImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
    isFraud: false
  }
];

export const INITIAL_MONTHLY_REPORT = [
  {
    id: "rep-1",
    monthName: "พฤศจิกายน 2568 (เดือนที่ 1)",
    workAccomplishment: "ศึกษาโครงสร้างระบบงานของบริษัท ทำความคุ้นเคยกับ Source Code และพัฒนาหน้าจอแบบฟอร์มบันทึกข้อมูลหลัก 3 โมดูลย่อย",
    teamRelationship: "ได้รับคำแนะนำอย่างดีจากพนักงานที่ปรึกษาและพี่ๆ ในแผนก ปรับตัวเข้ากับการทำงานแบบ Agile/Scrum ได้ราบรื่น",
    outstandingWork: "สามารถออกแบบและสร้าง Component Library ที่นำกลับมาใช้ซ้ำได้ ช่วยให้ทีมลดระยะเวลาการเขียนโค้ดซ้ำซ้อน",
    problemsObstacles: "ช่วงแรกยังไม่คุ้นเคยกับคำสั่ง Git rebase และ Git submodule แต่ได้สอบถามพี่เลี้ยงและทำคู่มือสรุปไว้",
    juniorRecommendations: "แนะนำให้น้องๆ ฝึกทักษะการค้นคว้าเอกสารทางเทคนิคภาษาอังกฤษ และฝึกเขียน Clean Code ให้เป็นนิสัย",
    submittedDate: "2025-11-30",
    supervisorApproved: true,
    supervisorComment: "นักศึกษามีความมุ่งมั่นสูง เรียนรู้เร็วและมีปฏิสัมพันธ์ที่ดีกับทีมมาก",
    verifiedAt: "2025-12-02"
  },
  {
    id: "rep-2",
    monthName: "ธันวาคม 2568 (เดือนที่ 2)",
    workAccomplishment: "พัฒนา RESTful API เชื่อมต่อฐานข้อมูล PostgreSQL และสร้างระบบจัดการสิทธิ์ผู้ใช้งาน (RBAC)",
    teamRelationship: "ประสานงานกับทีม QA ในการทดสอบระบบ และสื่อสารผ่าน Daily Standup ทุกเช้าอย่างมีประสิทธิภาพ",
    outstandingWork: "เพิ่มประสิทธิภาพ Query Database ทำให้ลดเวลาการดึงข้อมูลรายงานขนาดใหญ่จาก 4 วินาทีเหลือต่ำกว่า 0.8 วินาที",
    problemsObstacles: "พบข้อจำกัดของ Memory บน Docker Server ระหว่างรัน Batch Process ได้ปรึกษา DevOps เพื่อปรับขยาย Resource",
    juniorRecommendations: "ควรทบทวนเรื่อง Database Indexing และ SQL Optimization มาก่อนเริ่มฝึกงาน จะได้เปรียบมาก",
    submittedDate: "2025-12-31",
    supervisorApproved: true,
    supervisorComment: "ผลงานโดดเด่นมาก มีทักษะการแก้ปัญหาเชิงตรรกะดีเยี่ยม",
    verifiedAt: "2026-01-03"
  },
  {
    id: "rep-3",
    monthName: "มกราคม 2569 (เดือนที่ 3)",
    workAccomplishment: "พัฒนาระบบ Digital Signature และ Certificate Generator สำหรับออกใบรับรองออนไลน์",
    teamRelationship: "ได้รับมอบหมายให้เป็นผู้ช่วยนำเสนอผลงานประจำรอบการปล่อยเวอร์ชันแก่ผู้จัดการฝ่าย",
    outstandingWork: "ออกแบบระบบความปลอดภัยแบบสองชั้นสำหรับข้อมูลลับ (Confidential Lock) ตามมาตรฐานศูนย์ฝึกประสบการณ์ฯ",
    problemsObstacles: "การจัดการฟอนต์ภาษาไทยในการสร้างไฟล์พิมพ์ ต้องใช้ Canvas และ Web Fonts ที่ได้มาตรฐาน",
    juniorRecommendations: "การบริหารจัดการเวลาและการสื่อสารเป็นหัวใจสำคัญ หากติดขัดปัญหาให้รีบแจ้งทีม ไม่ควรเก็บไว้คนเดียว",
    submittedDate: "2026-01-31",
    supervisorApproved: true,
    supervisorComment: "ระบบที่พัฒนาสามารถนำไปใช้งานจริงในโครงการของบริษัทได้เลย ขอชื่นชม",
    verifiedAt: "2026-02-02"
  }
];

export const INITIAL_SUPERVISION = {
  supervisionDate: "2025-12-18",
  advisorName: "ผศ.ดร. ธีรเดช เจริญผล",
  visitType: "เข้าพบนิเทศ ณ สถานประกอบการ (On-Site)",
  // FR-4.2 Company Evaluation Scale 1-5
  companyScores: {
    q1_understanding: 5, // ความเข้าใจต่อกระบวนการฝึกงาน/สหกิจศึกษา
    q2_work_quantity: 5, // ลักษณะงาน: ปริมาณงานที่เหมาะสม
    q3_work_quality: 5,  // ลักษณะงาน: คุณภาพงานตรงตามสาขาวิชา
    q4_work_safety: 5,   // ลักษณะงาน: สภาพแวดล้อมและความปลอดภัย
    q5_welfare: 4,       // การจัดการสนับสนุน: สวัสดิการและเบี้ยเลี้ยง
    q6_equipment: 5,     // การจัดการสนับสนุน: เครื่องมือ อุปกรณ์ และเทคโนโลยี
    q7_mentorship: 5     // การจัดการสนับสนุน: พนักงานที่ปรึกษาให้คำแนะนำใกล้ชิด
  },
  companyNotes: "สถานประกอบการมีความพร้อมในระดับดีเด่น มีระบบการสอนงานเป็นขั้นตอนและมอบหมายงานจริงที่มีคุณค่า",
  // FR-4.3 Student Evaluation Scale 1-5
  studentScores: {
    q1_responsibility: 5, // ความรับผิดชอบต่อหน้าที่และวินัย
    q2_knowledge: 4,      // ความรู้ความสามารถทางวิชาการ
    q3_problemsolving: 4, // ทักษะการแก้ปัญหาและการปรับตัว
    q4_personality: 5     // คุณลักษณะส่วนบุคคล มนุษยสัมพันธ์ การแต่งกาย
  },
  studentNotes: "นักศึกษาปรับตัวได้ดีมาก มีบุคลิกภาพสุภาพเรียบร้อย ได้รับการชื่นชมอย่างมากจากหัวหน้างาน",
  isApproved: true,
  approvalDate: "2025-12-19"
};

// FR-5.1 24 items in 4 categories
export const EVALUATION_24_CRITERIA = [
  // หมวดที่ 1: ผลสำเร็จของงาน (Work Performance) 6 ข้อ
  { id: 1, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "ปริมาณงานที่ปฏิบัติ (Quantity of Work)", max: 5, score: 5 },
  { id: 2, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "คุณภาพและความประณีตของงาน (Quality of Work)", max: 5, score: 5 },
  { id: 3, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "ความถูกต้อง แม่นยำ และเชื่อถือได้ (Accuracy)", max: 5, score: 4 },
  { id: 4, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "ความรวดเร็วและตรงต่อเวลาที่กำหนด (Timeliness)", max: 5, score: 5 },
  { id: 5, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "การปฏิบัติตามขั้นตอนและกระบวนการทำงาน (Process Compliance)", max: 5, score: 5 },
  { id: 6, category: "หมวดที่ 1: ผลสำเร็จของงาน", name: "การใช้ทรัพยากรและอุปกรณ์อย่างคุ้มค่า (Resource Utilization)", max: 5, score: 4 },

  // หมวดที่ 2: ความรู้ความสามารถ (Knowledge & Competence) 6 ข้อ
  { id: 7, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "ความรู้พื้นฐานในวิชาชีพและทฤษฎีที่เกี่ยวข้อง (Fundamental Knowledge)", max: 5, score: 4 },
  { id: 8, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "ทักษะการใช้เครื่องมือ อุปกรณ์ และเทคโนโลยี (Tools & Tech Proficiency)", max: 5, score: 5 },
  { id: 9, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "การเรียนรู้สิ่งใหม่และความเข้าใจงานเร็ว (Learning Agility)", max: 5, score: 5 },
  { id: 10, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "ทักษะการคิดวิเคราะห์และแก้ปัญหา (Analytical Problem Solving)", max: 5, score: 4 },
  { id: 11, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "ความคิดริเริ่มสร้างสรรค์ (Creativity & Initiative)", max: 5, score: 5 },
  { id: 12, category: "หมวดที่ 2: ความรู้ความสามารถ", name: "ทักษะการสื่อสารและการนำเสนอข้อมูล (Communication & Presentation)", max: 5, score: 4 },

  // หมวดที่ 3: ความรับผิดชอบต่อหน้าที่ (Responsibility & Discipline) 6 ข้อ
  { id: 13, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "การตรงต่อเวลาและการปฏิบัติตามระเบียบวินัย (Punctuality & Discipline)", max: 5, score: 5 },
  { id: 14, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "ความขยัน อดทน มุ่งมั่น และตั้งใจจริง (Diligence & Persistence)", max: 5, score: 5 },
  { id: 15, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "ความซื่อสัตย์สุจริตและการรักษาความลับองค์กร (Integrity & Confidentiality)", max: 5, score: 5 },
  { id: 16, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "ความสามารถในการทำงานภายใต้ภาวะกดดัน (Working Under Pressure)", max: 5, score: 4 },
  { id: 17, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "ความรับผิดชอบต่องานที่ได้รับมอบหมายจนสำเร็จ (Accountability)", max: 5, score: 5 },
  { id: 18, category: "หมวดที่ 3: ความรับผิดชอบต่อหน้าที่", name: "ความพร้อมในการรับฟังคำติชมและพัฒนาตนเอง (Receptiveness to Feedback)", max: 5, score: 5 },

  // หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์ (Personality & Interpersonal Skills) 6 ข้อ
  { id: 19, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "กิริยามารยาท การแต่งกาย และบุคลิกภาพ (Professional Grooming & Manners)", max: 5, score: 5 },
  { id: 20, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "การทำงานเป็นทีมและช่วยเหลือผู้อื่น (Teamwork & Collaboration)", max: 5, score: 5 },
  { id: 21, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "มนุษยสัมพันธ์และการสร้างสัมพันธภาพ (Interpersonal Relations)", max: 5, score: 5 },
  { id: 22, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "ภาวะผู้นำและความกล้าในการตัดสินใจ (Leadership & Decisiveness)", max: 5, score: 4 },
  { id: 23, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "ทัศนคติเชิงบวกต่องาน องค์กร และผู้ร่วมงาน (Positive Attitude)", max: 5, score: 5 },
  { id: 24, category: "หมวดที่ 4: ลักษณะส่วนบุคคลและมนุษยสัมพันธ์", name: "จริยธรรมและจรรยาบรรณวิชาชีพ (Professional Ethics)", max: 5, score: 5 }
];

export const INITIAL_SUPERVISOR_EVALUATION = {
  evaluatedBy: "คุณกุลณัฐ มงคล (Job Supervisor)",
  evaluatedDate: "2026-02-15",
  isSubmitted: true,
  isConfidentialLocked: true, // FR-5.4 Confidential Lock
  scores: EVALUATION_24_CRITERIA,
  totalScore: 114, // 114 out of 120 (95%)
  gradeEquivalent: "A",
  // FR-5.2 Qualitative Feedback
  strengths: "นักศึกษามีทักษะการเรียนรู้ที่รวดเร็วมาก สามารถนำเทคโนโลยีสมัยใหม่มาประยุกต์ใช้กับโจทย์งานจริงได้อย่างมีประสิทธิภาพ มีความรับผิดชอบสูงและทำงานร่วมกับทีมได้เป็นอย่างดี",
  improvements: "หากเพิ่มทักษะด้านการนำเสนอภาษาอังกฤษและสถาปัตยกรรมระดับ Microservices จะทำให้มีความพร้อมในระดับ Senior ได้อย่างรวดเร็ว",
  jobOfferInterest: "ยินดีรับเข้าทำงานทันที (High Priority Job Offer)",
  overallQualitySummary: "ดีเยี่ยมอย่างยิ่ง (Excellent)",
  // FR-5.3 Result Utilization
  utilizationAreas: [
    "นำโค้ดและโมดูลไปรวมเข้ากับระบบผลิตจริงของบริษัท (Production Deployment)",
    "ช่วยลดเวลาการประมวลผลรายงานลง 80% และลดขั้นตอนการทำงานซ้ำซ้อนของพนักงาน",
    "จัดทำเป็นเอกสารต้นแบบ (Standard Template) สำหรับทีมพัฒนาในอนาคต"
  ]
};

export const INITIAL_LOGBOOK = [
  {
    id: "log-1",
    date: "2026-02-02",
    day: "จันทร์",
    assignedTask: "ศึกษา Requirements ระบบบันทึกเวลา และเขียน ER-Diagram ความสัมพันธ์ของ Entity",
    methodProcedure: "ใช้โปรแกรม draw.io ออกแบบตาราง Users, Attendances, Supervisors, Evaluations และเชื่อมโยง Foreign Key",
    problemEncountered: "ความซับซ้อนของการเชื่อมโยงสิทธิ์การมองเห็นข้อมูลลับ (Confidential Lock)",
    problemCategory: "ความต้องการระบบ (Requirements)",
    problemSolution: "ปรึกษาหัวหน้างานและตกลงแยก Column สิทธิ์ในระดับ Database View",
    status: "approved", // approved, pending, rejected
    supervisorComment: "การออกแบบฐานข้อมูลครอบคลุมและถูกต้องตามหลัก Relational DB ดีมาก",
    approvedAt: "2026-02-02 18:30"
  },
  {
    id: "log-2",
    date: "2026-02-03",
    day: "อังคาร",
    assignedTask: "เขียน API Endpoint สำหรับ Check-In / Check-Out พร้อมระบุเวลาปัจจุบันของ Server",
    methodProcedure: "ใช้ Node.js Express เขียน Route /api/attendance/checkin พร้อมตรวจสอบ Session Token",
    problemEncountered: "Timezone บน Docker Server ต่างจากเวลาท้องถิ่นไทย (+7 ชม.)",
    problemCategory: "สภาพแวดล้อมระบบ (Environment/Setup)",
    problemSolution: "ตั้งค่า TZ=Asia/Bangkok ใน docker-compose.yml และใช้ Library dayjs จัดรูปแบบเวลา",
    status: "approved",
    supervisorComment: "แก้ปัญหาเรื่อง Timezone ได้ตรงจุดและรวดเร็ว",
    approvedAt: "2026-02-03 18:15"
  },
  {
    id: "log-3",
    date: "2026-02-04",
    day: "พุธ",
    assignedTask: "พัฒนาหน้าจอ React สำหรับให้นักศึกษาเลือกลงเวลาและอัปโหลดภาพตอกบัตร",
    methodProcedure: "ใช้ React State และ FileReader API ในการแปลงภาพบัตรตอกเป็น Base64 Data URL สำหรับแสดงพรีวิวทันที",
    problemEncountered: "ขนาดรูปภาพที่อัปโหลดจากมือถือมีความละเอียดสูงเกินไป (ขนาด 8-12 MB) ทำให้เกิดความล่าช้า",
    problemCategory: "ปัญหาด้านโค้ด (Code Bug)",
    problemSolution: "เพิ่มฟังก์ชัน Image Compression ด้วย HTML5 Canvas เพื่อย่อขนาดภาพลงเหลือไม่เกิน 500 KB ก่อนบันทึก",
    status: "approved",
    supervisorComment: "ไอเดียการย่อขนาดบน Client-side ดีมาก ช่วยประหยัดแบนด์วิดท์เซิร์ฟเวอร์",
    approvedAt: "2026-02-04 18:45"
  },
  {
    id: "log-4",
    date: "2026-02-05",
    day: "พฤหัสบดี",
    assignedTask: "สร้างคอมโพเนนต์ Canvas สำหรับให้พนักงานที่ปรึกษาเซ็นรับรองเวลาแบบดิจิทัล (Digital Signature)",
    methodProcedure: "นำ HTML5 Canvas มาดักจับ Event mousedown, mousemove, mouseup และ Touch Events บนสมาร์ทโฟน",
    problemEncountered: "เส้นลายเซ็นบนหน้าจอมือถือมีรอยหยักและมีอาการดีเลย์เมื่อวาดอย่างรวดเร็ว",
    problemCategory: "ปัญหาด้านโค้ด (Code Bug)",
    problemSolution: "ใช้เทคนิค Quadratic Bezier Curve สำหรับปรับเส้นให้โค้งมนเรียบเนียน และเปิด usePassiveEvent",
    status: "approved",
    supervisorComment: "ทดสอบเซ็นบน iPad ใช้งานลื่นไหล ลายเซ็นสวยงาม",
    approvedAt: "2026-02-05 19:00"
  },
  {
    id: "log-5",
    date: "2026-02-06",
    day: "ศุกร์",
    assignedTask: "เชื่อมต่อระบบแจ้งเตือนการทุจริตเวลา และจำลองการตัดสิทธิ์เป็นเกรด E",
    methodProcedure: "สร้างสถานะ isFraudulent ในโมดูลตรวจสอบเวลา หากมีการปลอมแปลงเวลา จะอัปเดตผลประเมินทันที",
    problemEncountered: "ต้องมีขั้นตอนการยืนยันแบบ Multi-step ป้องกันไม่ให้แอดมินหรือพี่เลี้ยงกดผิดพลาดโดยไม่ได้ตั้งใจ",
    problemCategory: "การสื่อสารและกระบวนการ (Communication)",
    problemSolution: "เพิ่ม Modal ยืนยัน 2 ชั้น พร้อมช่องบังคับระบุเหตุผลการตรวจพบการทุจริตอย่างละเอียด",
    status: "approved",
    supervisorComment: "เป็นไปตามข้อกำหนดความปลอดภัยของศูนย์ฝึกประสบการณ์ฯ",
    approvedAt: "2026-02-06 18:00"
  },
  {
    id: "log-6",
    date: "2026-02-10",
    day: "อังคาร",
    assignedTask: "พัฒนา Dashboard ประมวลผลสถิติความถี่ของปัญหา (FR-7.3)",
    methodProcedure: "เขียนฟังก์ชัน Group by หมวดหมู่ปัญหา และคำนวณร้อยละเพื่อแสดงผลเป็น Bar Chart และ Donut Chart",
    problemEncountered: "การจับคู่หมวดหมู่ที่ไม่ตรงกันเนื่องจากผู้ใช้งานพิมพ์แบบ Free text",
    problemCategory: "การจัดการฐานข้อมูล (Database)",
    problemSolution: "เปลี่ยนอินพุตให้เป็น Select Dropdown หมวดหมู่มาตรฐาน 5 กลุ่มหลัก",
    status: "approved",
    supervisorComment: "ชาร์ตแสดงผลชัดเจน นำไปใช้วิเคราะห์การฝึกงานได้จริง",
    approvedAt: "2026-02-10 18:30"
  },
  {
    id: "log-7",
    date: "2026-02-11",
    day: "พุธ",
    assignedTask: "ออกแบบและสร้างใบประกาศนียบัตรดิจิทัล (Digital Certificate) สำหรับผู้ผ่านการฝึกงาน",
    methodProcedure: "ใช้ CSS Grid, ขอบทองหรูหรา และสไตล์พิมพ์ @media print พร้อม QR Code และลายเซ็นดิจิทัล",
    problemEncountered: "เมื่อกดสั่งพิมพ์ พิกัดของลายเซ็นและตราสัญลักษณ์เบี้ยวในบางเบราว์เซอร์",
    problemCategory: "ปัญหาด้านโค้ด (Code Bug)",
    problemSolution: "กำหนดขนาดหน้ากระดาษเป็น A4 แนวนอน (Landscape) แบบ Fixed Ratio 297mm x 210mm",
    status: "pending", // Pending approval
    supervisorComment: "",
    approvedAt: null
  }
];

export const INITIAL_REPORTS_MODULE = {
  // FR-8.1 3-Week Outline
  outline: {
    titleTh: "ระบบบริหารจัดการและติดตามการปฏิบัติงานสหกิจศึกษา มหาวิทยาลัยราชภัฏศรีสะเกษ (SSKRU InternHub)",
    titleEn: "SSKRU InternHub & CoopFlow Management System",
    submissionDate: "2025-11-18", // Within 3 weeks of internship
    advisorStatus: "approved", // approved, pending, revision
    advisorComment: "หัวข้อและขอบเขตมีความเหมาะสม สอดคล้องกับมาตรฐานสหกิจศึกษาและหลักสูตรวิทยาการคอมพิวเตอร์ อนุมัติให้ดำเนินการต่อได้",
    advisorApprovedAt: "2025-11-20",
    objective: "1. เพื่อพัฒนาระบบลงเวลาปฏิบัติงานแบบออนไลน์ที่ตรวจสอบได้\n2. เพื่ออำนวยความสะดวกในการประเมินผล 24 ข้อแบบรักษาความลับ\n3. เพื่อรวบรวมสถิติปัญหาในการฝึกงานเพื่อนำไปปรับปรุงหลักสูตร",
    scope: "รองรับผู้ใช้งาน 4 บทบาท (นักศึกษา, พนักงานที่ปรึกษา, อาจารย์นิเทศ, ศูนย์ฝึกประสบการณ์ฯ) มีระบบ Digital Signature และการออกใบประกาศนียบัตร",
    expectedBenefits: "ลดระยะเวลาในการตรวจสอบเอกสารฝึกงานลง 70% และเพิ่มความโปร่งใสในการประเมินผล"
  },
  // FR-8.2 Full Report & FR-8.3 Confidential dual-version
  finalReport: {
    isSubmitted: true,
    submittedAt: "2026-02-14",
    reportType: "coop", // internship or coop (สหกิจศึกษา)
    // Version 1: For Company (Full confidential with code & internal system detail)
    companyVersionFile: {
      fileName: "SSKRU_Coop_Full_Report_SmartInnovation_Confidential.pdf",
      fileSize: "14.8 MB",
      uploadDate: "2026-02-14 14:20",
      description: "ฉบับสมบูรณ์สำหรับสถานประกอบการ (ประกอบด้วยสถาปัตยกรรมระบบภายใน, API Endpoint และ Source Code ลิขสิทธิ์)"
    },
    // Version 2: For University (Redacted/Sanitized public version)
    universityVersionFile: {
      fileName: "SSKRU_Coop_Report_Public_Sanitized.pdf",
      fileSize: "9.2 MB",
      uploadDate: "2026-02-14 14:25",
      description: "ฉบับเผยแพร่สำหรับมหาวิทยาลัย (เซนเซอร์ข้อมูลความลับทางการค้าและรหัสผ่านตามข้อตกลง NDA)"
    },
    presentationFile: {
      fileName: "SSKRU_Final_Presentation_Slides.pdf",
      fileSize: "6.5 MB",
      uploadDate: "2026-02-14 14:30"
    },
    consentAgreement: {
      agreed: true,
      agreedDate: "2026-02-14 14:35",
      statement: "ข้าพเจ้ายินยอมให้มหาวิทยาลัยราชภัฏศรีสะเกษและสถานประกอบการจัดเก็บและใช้ประโยชน์จากเอกสารรายงานฉบับเผยแพร่เพื่อการศึกษาและการประกันคุณภาพการศึกษา"
    },
    advisorReviewStatus: "approved",
    advisorFeedback: "เล่มรายงานจัดทำได้สมบูรณ์ถูกต้องตามคู่มือการเขียนรายงานสหกิจศึกษา มีการจัดหมวดหมู่ข้อมูลลับได้อย่างรัดกุม"
  }
};

export const INITIAL_CERTIFICATE = {
  certNumber: "SSKRU-COOP-2568-0842",
  issueDate: "2026-02-28",
  studentName: "นายศุภชัย กลิ่นหอม (Mr. Suphachai Klinhom)",
  studentId: "6612732138",
  major: "วิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
  university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
  companyName: "บริษัท สมาร์ท อินโนเวชั่น จำกัด (Smart Innovation Co., Ltd.)",
  periodText: "1 พฤศจิกายน 2568 ถึง 28 กุมภาพันธ์ 2569",
  totalHours: 480,
  performanceGrade: "ดีเยี่ยม (Excellent / Grade A)",
  supervisorName: "คุณกุลณัฐ มงคล",
  supervisorTitle: "Lead Software Architect & Job Supervisor",
  deanName: "รศ.ดร. นันทิยา บุญธรรม",
  deanTitle: "คณบดีคณะศิลปศาสตร์และวิทยาศาสตร์ มหาวิทยาลัยราชภัฏศรีสะเกษ",
  signatureDataUrl: null, // Will use supervisor signature if signed
  isGenerated: true
};
