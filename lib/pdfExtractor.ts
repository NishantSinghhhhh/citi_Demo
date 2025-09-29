import * as pdfjsLib from 'pdfjs-dist'

// Set worker from CDN with https
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface ExtractedResumeData {
  fileName: string
  name: string
  email: string
  phone: string
  skills: string[]
  education: string[]
  experience: string[]
  projects: string[]
  gpa: number
  fullText: string
}

export async function extractPDFData(file: File): Promise<ExtractedResumeData> {
  if (typeof window === 'undefined') {
    throw new Error('PDF extraction can only run in browser')
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise
    
    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return parseResumeText(fullText, file.name)
  } catch (error) {
    console.error('Error extracting PDF:', error)
    throw error
  }
}

function parseResumeText(text: string, fileName: string): ExtractedResumeData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/g
  const emails = text.match(emailRegex)
  const email = emails ? emails[0] : ''

  const phoneRegex = /(?:\+91[-\s]?)?[6-9]\d{9}|(?:\+91[-\s]?)?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}/g
  const phones = text.match(phoneRegex)
  const phone = phones ? phones[0] : ''

  let name = lines[0] || fileName.replace('.pdf', '')
  if (name.toLowerCase().includes('resume') || name.toLowerCase().includes('cv')) {
    name = lines[1] || name
  }

  const skillKeywords = [
    'python', 'java', 'javascript', 'typescript', 'c\\+\\+', 'c#', 'ruby', 'php',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring',
    'aws', 'azure', 'docker', 'kubernetes', 'git',
    'sql', 'mysql', 'postgresql', 'mongodb', 'redis',
    'machine learning', 'tensorflow', 'pytorch',
    'html', 'css', 'rest api', 'graphql'
  ]
  
  const skills: string[] = []
  const lowerText = text.toLowerCase()
  
  skillKeywords.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'i')
    if (regex.test(lowerText)) {
      skills.push(skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    }
  })

  const educationKeywords = [
    'university', 'institute', 'college',
    'iit', 'nit', 'iiit', 'bits', 'vit',
    'bachelor', 'master', 'b.tech', 'm.tech',
    'computer science', 'information technology', 'software engineering'
  ]
  
  const education: string[] = []
  lines.forEach(line => {
    if (educationKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
      education.push(line)
    }
  })

  const experienceKeywords = ['intern', 'developer', 'engineer', 'analyst']
  const experience: string[] = []
  
  lines.forEach((line, index) => {
    if (experienceKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
      const context = [lines[index - 1], line, lines[index + 1]].filter(Boolean).join(' ')
      if (context.length > 20 && !experience.includes(context)) {
        experience.push(context)
      }
    }
  })

  const projectKeywords = ['project', 'developed', 'built', 'created']
  const projects: string[] = []
  
  lines.forEach((line, index) => {
    if (projectKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
      const context = [lines[index], lines[index + 1]].filter(Boolean).join(' ')
      if (context.length > 20 && !projects.includes(context)) {
        projects.push(context)
      }
    }
  })

  const gpaRegex = /(?:gpa|cgpa)[:\s]*(\d+\.?\d*)/i
  const gpaMatch = text.match(gpaRegex)
  let gpa = gpaMatch ? parseFloat(gpaMatch[1]) : 7.5

  return {
    fileName,
    name,
    email,
    phone,
    skills: [...new Set(skills)].slice(0, 10),
    education: [...new Set(education)].slice(0, 3),
    experience: [...new Set(experience)].slice(0, 5),
    projects: [...new Set(projects)].slice(0, 5),
    gpa: Math.round(gpa * 10) / 10,
    fullText: text
  }
}