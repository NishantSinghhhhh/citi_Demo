export interface Candidate {
  id: number
  name: string
  email: string
  phone: string | null
  institution: string
  degree: string
  cgpa: number | null
  graduationYear: number
  primarySkills: string[]
  experience: string
  projectCount: number
  topProject: string | null
  
}

export const CANDIDATES_DATA: Candidate[] = [
  {
    id: 1,
    name: "Arun Kumar Kushwaha",
    email: "arunsarojkushwaha10@gmail.com",
    phone: "+91-8619020789",
    institution: "Army Institute of Technology",
    degree: "B.E. Electronics and Telecommunications",
    cgpa: 8.44,
    graduationYear: 2025,
    primarySkills: ["React", "Node", "Express", "MongoDB", "TypeScript"],
    experience: "Software Developer Intern at Upheaval Technologies",
    projectCount: 3,
    topProject: "Pull Quest"
  },
  {
    id: 2,
    name: "Nishant Singh",
    email: "nishant.1703.developer@gmail.com",
    phone: "+91-9649959730",
    institution: "Army Institute of Technology",
    degree: "B.E. Computer Science",
    cgpa: 8.94,
    graduationYear: 2027,
    primarySkills: ["Node", "Express", "React", "TypeScript", "GraphQL"],
    experience: "Software Engineering Intern at RavenAi",
    projectCount: 2,
    topProject: "PullQuest"
  },
  {
    id: 3,
    name: "Ujjwal Gupta",
    email: "ujjwal9478@gmail.com",
    phone: "+91-7902080977",
    institution: "Army Institute of Technology",
    degree: "B.Tech Information Technology",
    cgpa: 9.75,
    graduationYear: 2027,
    primarySkills: ["Python", "HTML", "CSS"],
    experience: "Operations Manager at Upheaval Technologies",
    projectCount: 0,
    topProject: null
  },
  {
    id: 4,
    name: "Pradeep Kumar",
    email: "pk4401128@gmail.com",
    phone: null,
    institution: "Army Institute of Technology",
    degree: "Bachelor of Engineering",
    cgpa: null,
    graduationYear: 2028,
    primarySkills: ["React", "Node", "Express", "MongoDB", "Docker"],
    experience: "Finalist at Startup Saga Hackathon",
    projectCount: 3,
    topProject: "StudyMonk"
  },
  {
    id: 5,
    name: "Divyanshi",
    email: "div.official230178@gmail.com",
    phone: "+91-9634246968",
    institution: "Army Institute of Technology",
    degree: "B.E. Computer Science",
    cgpa: 9.67,
    graduationYear: 2027,
    primarySkills: ["React", "Python", "Java", "Javascript", "SQL"],
    experience: "Organiser at Pace & GSSOC'24 Contributor",
    projectCount: 3,
    topProject: "Network Intrusion Detection System"
  },
  {
    id: 6,
    name: "Aayush Kumar",
    email: "ayushkumartopper2@gmail.com",
    phone: "7906960474",
    institution: "Army Institute of Technology",
    degree: "B.E. Computer Engineering",
    cgpa: 8.44,
    graduationYear: 2027,
    primarySkills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    experience: "Core Member ML at Google Developers Group",
    projectCount: 3,
    topProject: "Crop Production Predictor"
  },
  {
    id: 7,
    name: "Shashwat Trivedi",
    email: "shashwatrivedi2005@gmail.com",
    phone: null,
    institution: "Army Institute of Technology",
    degree: "B.E. Information Technology",
    cgpa: 9.27,
    graduationYear: 2028,
    primarySkills: ["Javascript", "React", "Express", "HTML", "CSS"],
    experience: "FE Member at Open Source Software Club",
    projectCount: 3,
    topProject: "Job Dhudho Platform"
  },
  {
    id: 8,
    name: "Srijan Tripathi",
    email: "mail.srijantripathi@gmail.com",
    phone: "+91-7065438418",
    institution: "Army Institute of Technology",
    degree: "B.E. Electronics and Telecommunication",
    cgpa: 8.41,
    graduationYear: 2027,
    primarySkills: ["React", "Node", "Express", "MongoDB", "TypeScript"],
    experience: "Software Development Intern at Upheaval Technologies",
    projectCount: 3,
    topProject: "SocketDraw"
  }
]
