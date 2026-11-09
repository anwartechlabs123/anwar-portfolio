const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Data Store for Anwar Uddin's Refined Portfolio
const DB = {
  profile: {
    name: "ANWAR UDDIN",
    brandWordmark: "ANWAR UDDIN",
    headline: "Hello, I'm Anwar Uddin.",
    titles: [
      "Full Stack Developer.",
      "Creative Designer.",
      "Video Editor.",
      "Agentic AI Enthusiast."
    ],
    supportingText: "Transforming ideas into powerful digital experiences through technology, creativity, and intelligent solutions.",
    role: "Full Stack Developer | IT Supervisor | Creative Technology Professional",
    currentPosition: "IT Supervisor at Saylani",
    education: [
      {
        degree: "MA",
        title: "Master of Arts",
        institution: "Institution details being updated",
        status: "Completed"
      },
      {
        degree: "DAE Diploma",
        title: "Diploma of Associate Engineering",
        institution: "Technical Board / Engineering Faculty",
        status: "Completed"
      }
    ],
    intro: "I'm Anwar Uddin, an IT graduate and multidisciplinary technology professional with experience in web development, graphic design, video editing, digital marketing, SEO, and Agentic AI.\n\nCurrently working at Saylani as an IT Supervisor, I combine technical expertise, creative thinking, and practical IT operations to build digital solutions and deliver meaningful technology experiences.",
    aboutText: "I'm Anwar Uddin, an IT graduate with a multidisciplinary background in technology, creative design, and digital innovation.\n\nMy professional skills include full-stack web development, graphic design, video editing, SEO, digital marketing, and Agentic AI.\n\nI am currently working at Saylani as an IT Supervisor, where I contribute to IT operations and technical support.\n\nI enjoy exploring modern technologies, solving practical problems, and creating digital experiences that combine functionality with creativity.",
    avatar: "/portrait.png",
    socials: {
      email: "anwartechlabs@gmail.com",
      instagram: "https://www.instagram.com/anwar___uddin?psln=cTIzczljaHk4am03",
      facebook: "https://www.facebook.com/share/1S1wvyuA8q/",
      linkedin: "https://www.linkedin.com/in/anwar-uddin-b20ba431b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      tiktok: "https://www.tiktok.com/@anwar_no0ri",
      github: "https://github.com/anwartechlabs123"
    }
  },

  expertise: [
    {
      num: "01",
      title: "Full Stack Development",
      category: "Engineering",
      icon: "code-2",
      description: "End-to-end web application architecture utilizing modern JavaScript/TypeScript, responsive UI components, robust REST and server runtimes."
    },
    {
      num: "02",
      title: "Frontend & Backend Development",
      category: "Engineering",
      icon: "layers",
      description: "Crafting scalable client interfaces with React, Next.js, and CSS architectures coupled with stable Node.js, Express, and database layers."
    },
    {
      num: "03",
      title: "Graphic Designing",
      category: "Creative Direction",
      icon: "palette",
      description: "Creative visual design, brand guidelines, UI/UX wireframes, digital asset production, and vector illustrations using Figma, Photoshop, and Illustrator."
    },
    {
      num: "04",
      title: "Professional Video Editing",
      category: "Motion & Media",
      icon: "video",
      description: "Dynamic video editing, visual storytelling, rhythm cuts, color grading, audio synchronization, and motion graphics using Premiere Pro and After Effects."
    },
    {
      num: "05",
      title: "Search Engine Optimization",
      category: "Growth & Visibility",
      icon: "search",
      description: "Comprehensive SEO audits, keyword research, on-page optimization, technical structure, schema markup, and performance tuning."
    },
    {
      num: "06",
      title: "Digital Marketing",
      category: "Growth & Visibility",
      icon: "trending-up",
      description: "Performance marketing campaigns, Meta Ads optimization, social media strategy, conversion tracking, and digital audience growth."
    },
    {
      num: "07",
      title: "Agentic AI & AI Agents",
      category: "Intelligence",
      icon: "bot",
      description: "Exploring frontier autonomous agent loops, prompt engineering, multi-agent frameworks, tool integrations, and intelligent AI workflows."
    },
    {
      num: "08",
      title: "IT Operations & Technical Support",
      category: "Operations",
      icon: "server",
      description: "Managing enterprise IT infrastructure, hardware troubleshooting, network support, system maintenance, and technology operations as IT Supervisor at Saylani."
    }
  ],

  // Selected Works — Pure software & creative projects ONLY (Bespoke Generated Showcase Mockups)
  projects: [
    {
      id: "prj-1",
      title: "Full Stack Web Application & Portal",
      category: "Full Stack Web Development",
      subtitle: "Responsive Architecture & Dynamic State",
      description: "A comprehensive full-stack web application featuring modern responsive component architecture, secure API integration, dynamic data handling, and clean database connectivity.",
      techStack: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS"],
      image: "./projects/web-development-showcase.jpg",
      demoUrl: "#",
      githubUrl: "https://github.com/anwartechlabs123"
    },
    {
      id: "prj-2",
      title: "Agentic AI Workflow & Intelligent Automation",
      category: "AI & Agentic AI Solutions",
      subtitle: "Autonomous Tool Calling & Multi-Agent Loops",
      description: "Intelligent agentic workflow designed to automate complex multi-step tasks using modern LLM APIs, autonomous reasoning chains, and structured tool sandboxes.",
      techStack: ["Agentic AI", "Python", "Node.js", "API Integrations", "Automation"],
      image: "./projects/agentic-ai-showcase.jpg",
      demoUrl: "#",
      githubUrl: "https://github.com/anwartechlabs123"
    },
    {
      id: "prj-3",
      title: "Graphic Design Systems & Digital Visuals",
      category: "Graphic Design",
      subtitle: "Brand Identity, Typography & UI Assets",
      description: "Creative visual design showcase encompassing bespoke brand identities, social media assets, marketing banners, and vector design craftsmanship.",
      techStack: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Brand Design"],
      image: "./projects/graphic-design-showcase.jpg",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "prj-4",
      title: "Commercial Video Editing & Motion Showcase",
      category: "Video Editing",
      subtitle: "High-Retention Cuts & Visual Storytelling",
      description: "Professional video editing and motion graphics reel incorporating pacing, cinematic audio design, color correction, and social media video formats.",
      techStack: ["Premiere Pro", "After Effects", "Motion Graphics", "Sound Design"],
      image: "./projects/video-editing-showcase.jpg",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "prj-5",
      title: "Digital Marketing & Meta Ads Strategy",
      category: "Digital Marketing",
      subtitle: "Campaign Optimization & Target Audiences",
      description: "Strategic digital marketing campaigns focused on paid advertising, high-converting creative copies, funnel optimization, and audience targeting.",
      techStack: ["Meta Ads", "Google Analytics", "Campaign Strategy", "Social Media"],
      image: "./projects/digital-marketing-showcase.jpg",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "prj-6",
      title: "Technical SEO & Search Visibility",
      category: "SEO Projects",
      subtitle: "On-Page Optimization & Core Web Vitals",
      description: "Comprehensive SEO implementation focusing on semantic markup, Core Web Vitals performance, site speed, and structured content indexing.",
      techStack: ["Technical SEO", "Schema Markup", "Performance Tuning", "Search Console"],
      image: "./projects/seo-optimization-showcase.jpg",
      demoUrl: "#",
      githubUrl: "#"
    }
  ],

  // Dedicated Saylani Experience, Hackathon Event Photos
  saylaniExperience: {
    organization: "Saylani Welfare International Trust",
    role: "IT Supervisor",
    department: "Information Technology & Technical Operations",
    summary: "As an IT Supervisor at Saylani, I lead technical operations across high-stakes events, oversee university computer labs, direct network infrastructure, and manage technical workflows for major technology gatherings including the flagship Saylani AI Hackathon.",
    highlights: [
      "Supervised lab network uptime and power redundancy for hundreds of hackathon participants.",
      "Delivered keynote orientations and technical guidance to artificial intelligence development teams.",
      "Maintained zero-downtime server operations and multi-subnet connectivity throughout high-intensity hackathon sprints."
    ],
    photos: [
      {
        id: "ev-photo-1",
        title: "Speech & Keynote at Saylani AI Hackathon Event",
        category: "Event Leadership",
        image: "./saylani/i-am-gving-speech-for-ai%20hackathon%20event.jpg",
        caption: "Delivering opening speech, orienting student developer teams, and outlining competition criteria at the Saylani AI Hackathon.",
        tags: ["Keynote Speech", "AI Hackathon", "Team Leadership"]
      },
      {
        id: "ev-photo-2",
        title: "On-Ground Technical Operations & Supervision",
        category: "Infrastructure Supervision",
        image: "./saylani/hackhaton%20click.jpg",
        caption: "Supervising workstation setups, network stability, and operational logistics during live hackathon competition rounds at Saylani.",
        tags: ["Live Supervision", "Network Setup", "Operations Management"]
      }
    ]
  },

  certifications: [
    { title: "Web Development", category: "Software Engineering", icon: "code" },
    { title: "Digital Marketing", category: "Growth & Visibility", icon: "trending-up" },
    { title: "Content Creation", category: "Media & Production", icon: "feather" },
    { title: "Meta Ads", category: "Paid Media", icon: "target" },
    { title: "Video Editing", category: "Multimedia & Motion", icon: "video" },
    { title: "Graphic Designing", category: "Visual Arts", icon: "palette" },
    { title: "Agentic AI", category: "Artificial Intelligence", icon: "bot" }
  ],

  messages: []
};

// MIME Types (including MP4 video support)
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

// Helper: Parse Body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API Endpoints
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // GET /api/profile
    if (req.method === 'GET' && pathname === '/api/profile') {
      res.writeHead(200);
      res.end(JSON.stringify(DB.profile));
      return;
    }

    // GET /api/expertise
    if (req.method === 'GET' && pathname === '/api/expertise') {
      res.writeHead(200);
      res.end(JSON.stringify(DB.expertise));
      return;
    }

    // GET /api/projects
    if (req.method === 'GET' && pathname === '/api/projects') {
      res.writeHead(200);
      res.end(JSON.stringify(DB.projects));
      return;
    }

    // GET /api/saylani
    if (req.method === 'GET' && pathname === '/api/saylani') {
      res.writeHead(200);
      res.end(JSON.stringify(DB.saylaniExperience));
      return;
    }

    // GET /api/certifications
    if (req.method === 'GET' && pathname === '/api/certifications') {
      res.writeHead(200);
      res.end(JSON.stringify(DB.certifications));
      return;
    }

    // POST /api/contact
    if (req.method === 'POST' && pathname === '/api/contact') {
      try {
        const body = await parseBody(req);
        const { name, email, subject, service, message } = body;

        if (!name || name.trim().length < 2) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Please enter your name." }));
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Please enter a valid email address." }));
          return;
        }

        if (!message || message.trim().length < 8) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Please include a brief message." }));
          return;
        }

        const newMsg = {
          id: `msg-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          service: service || 'General Inquiry',
          subject: subject ? subject.trim() : 'Project Inquiry',
          message: message.trim(),
          createdAt: new Date().toISOString()
        };

        DB.messages.push(newMsg);

        res.writeHead(201);
        res.end(JSON.stringify({
          success: true,
          message: `Thank you, ${newMsg.name}. Your inquiry has been received. Anwar Uddin will get in touch shortly.`,
          messageId: newMsg.id
        }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Failed to process inquiry: " + err.message }));
      }
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: `Route ${pathname} not found` }));
    return;
  }

  // Static File Serving
  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch (e) {
    decodedPathname = pathname;
  }

  let filePath = path.join(PUBLIC_DIR, decodedPathname === '/' ? 'index.html' : decodedPathname);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Access Denied");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const isHtmlRoute = !path.extname(decodedPathname) || decodedPathname.endsWith('.html');
      if (isHtmlRoute) {
        const spaIndex = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(spaIndex, (err2, content) => {
          if (!err2) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end("<h1>404 Not Found</h1>");
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("404 File Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support Video Range Requests (smooth playback & seeking)
    if (ext === '.mp4') {
      const range = req.headers.range;
      const fileSize = stats.size;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType
        });

        if (req.method === 'HEAD') {
          res.end();
        } else {
          fileStream.pipe(res);
        }
        return;
      }

      res.writeHead(200, {
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType
      });

      if (req.method === 'HEAD') {
        res.end();
      } else {
        fs.createReadStream(filePath).pipe(res);
      }
      return;
    }

    if (req.method === 'HEAD') {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Content-Length': stats.size 
      });
      res.end();
      return;
    }

    res.writeHead(200, { 
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`✨ ANWAR UDDIN - REFINED PORTFOLIO SERVER ACTIVE!`);
  console.log(`🌐 Local Server:  http://localhost:${PORT}`);
  console.log(`📂 Public Root:   ${PUBLIC_DIR}`);
  console.log(`=======================================================`);
});
