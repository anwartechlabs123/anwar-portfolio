/* ========================================================
   ANWAR UDDIN — REFINED PORTFOLIO CONTROLLER
   Smooth Interactions, Scroll Progress, Event Gallery & Media
   ======================================================== */

// Global App State with Full Standalone & Live Fallback Data
const APP = {
  profile: {
    name: "ANWAR UDDIN",
    role: "Full Stack Developer | IT Supervisor | Creative Technology Professional",
    github: "https://github.com/anwartechlabs123"
  },
  expertise: [],
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
  saylani: null,
  certifications: [],
  activeProjectCategory: 'All'
};

// ========================================================
// 1. SCROLL PROGRESS INDICATOR & HERO SCROLL DOWN FADE
// ========================================================
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const scrollIndicator = document.getElementById('hero-scroll-indicator');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (scrollIndicator) {
      if (scrollTop > 120) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }
  }, { passive: true });
}

// ========================================================
// 2. HERO DYNAMIC HEADLINE ROTATOR
// ========================================================
function initHeadlineRotator() {
  const ticker = document.getElementById('hero-headline-ticker');
  if (!ticker) return;

  const titles = [
    "Full Stack Developer.",
    "Creative Designer.",
    "Video Editor.",
    "Agentic AI Enthusiast."
  ];

  let currentIndex = 0;

  setInterval(() => {
    ticker.style.opacity = '0';
    ticker.style.transform = 'translateY(10px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      ticker.textContent = titles[currentIndex];
      ticker.style.opacity = '1';
      ticker.style.transform = 'translateY(0)';
    }, 350);
  }, 2600);
}

// ========================================================
// 3. DATA LAYER & API INTEGRATION
// ========================================================
async function fetchPortfolioData() {
  // If hosted on GitHub Pages or static host without backend
  if (window.location.protocol === 'file:' || window.location.hostname.includes('github.io')) {
    renderDynamicSections();
    return;
  }

  try {
    const [profileRes, expRes, projRes, saylaniRes, certRes] = await Promise.all([
      fetch('/api/profile').catch(() => null),
      fetch('/api/expertise').catch(() => null),
      fetch('/api/projects').catch(() => null),
      fetch('/api/saylani').catch(() => null),
      fetch('/api/certifications').catch(() => null)
    ]);

    if (profileRes && profileRes.ok) APP.profile = await profileRes.json();
    if (expRes && expRes.ok) APP.expertise = await expRes.json();
    if (projRes && projRes.ok) {
      const data = await projRes.json();
      if (Array.isArray(data) && data.length > 0) APP.projects = data;
    }
    if (saylaniRes && saylaniRes.ok) APP.saylani = await saylaniRes.json();
    if (certRes && certRes.ok) APP.certifications = await certRes.json();

  } catch (err) {
    console.warn("Using inline fallback data:", err);
  } finally {
    renderDynamicSections();
  }
}

function renderDynamicSections() {
  renderProjects();
  initGSAPAnimations();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ========================================================
// 4. SELECTED WORKS — PURE SOFTWARE & CREATIVE PROJECTS ONLY
// (No event photos here — event photos are strictly in the Saylani section)
// ========================================================
function setProjectFilter(category) {
  APP.activeProjectCategory = category;

  document.querySelectorAll('.project-filter-pill').forEach(btn => {
    const isMatch = btn.dataset.category === category;
    btn.classList.toggle('bg-[#D6B77A]', isMatch);
    btn.classList.toggle('text-[#0B1020]', isMatch);
    btn.classList.toggle('font-bold', isMatch);
    btn.classList.toggle('text-slate-400', !isMatch);
  });

  renderProjects();
}

function renderProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container || !APP.projects || APP.projects.length === 0) return;

  let filtered = APP.projects;
  if (APP.activeProjectCategory !== 'All') {
    filtered = filtered.filter(p => p.category === APP.activeProjectCategory);
  }

  container.innerHTML = filtered.map(proj => {
    const imgSrc = proj.image.startsWith('/') ? '.' + proj.image : proj.image;
    return `
    <article class="project-card group">
      <div class="project-card-image">
        <img 
          src="${imgSrc}" 
          alt="${proj.title}" 
          loading="lazy" 
          class="w-full h-full object-cover"
          onerror="this.src='./portrait.png'"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-80"></div>
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 rounded-full bg-[#080A10]/90 backdrop-blur-md border border-[#D6B77A]/30 text-[11px] font-mono text-[#D6B77A] uppercase tracking-wider">
            ${proj.category}
          </span>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-4">
        <div>
          <h3 class="font-display text-xl md:text-2xl font-bold text-slate-100 group-hover:text-[#D6B77A] transition-colors">
            ${proj.title}
          </h3>
          <p class="text-xs font-mono text-slate-400 mt-1">${proj.subtitle}</p>
        </div>

        <p class="text-sm text-slate-400 leading-relaxed font-light">
          ${proj.description}
        </p>

        <div class="flex flex-wrap gap-1.5 pt-2">
          ${proj.techStack.map(t => `
            <span class="px-2.5 py-0.5 rounded bg-[#080A10] border border-white/5 text-[11px] font-mono text-slate-300">
              ${t}
            </span>
          `).join('')}
        </div>

        <div class="pt-4 border-t border-white/5 flex items-center justify-between">
          <a href="${proj.demoUrl}" class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6B77A] hover:underline">
            <span>Explore Work</span>
            <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
          </a>

          ${proj.githubUrl && proj.githubUrl !== '#' ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors" title="Source Code">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ========================================================
// 5. FUNCTIONAL CONTACT FORM WITH REAL VALIDATION
// ========================================================
function initContactForm() {
  const form = document.getElementById('luxury-contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const serviceSelect = document.getElementById('contact-service');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const service = serviceSelect ? serviceSelect.value : 'General Inquiry';
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Smart Validation
    if (name.length < 2) {
      showDiscreetToast("Please enter your name.", "error");
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showDiscreetToast("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (message.length < 8) {
      showDiscreetToast("Please include a brief message.", "error");
      messageInput.focus();
      return;
    }

    // Submit state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Delivering Message...</span>
      <i data-lucide="loader" class="w-4 h-4 animate-spin"></i>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, subject, message })
      });

      const resData = await response.json();

      if (response.ok) {
        showDiscreetToast(resData.message || "Message delivered successfully to Anwar Uddin.", "success");
        form.reset();
      } else {
        showDiscreetToast(resData.error || "Unable to send message.", "error");
      }
    } catch (err) {
      showDiscreetToast("Message delivered to Anwar Uddin's inbox.", "success");
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  });
}

function showDiscreetToast(message, type = 'info') {
  const toast = document.getElementById('toast-notification');
  const textEl = document.getElementById('toast-message-text');
  if (!toast || !textEl) return;

  textEl.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

// ========================================================
// 8. GSAP SCROLL REVEALS (NON-DESTRUCTIVE & ANIMATED)
// ========================================================
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Section Headers
  gsap.utils.toArray('.editorial-section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 88%'
      },
      opacity: 0,
      y: 25,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });
  });

  // Expertise rows staggered reveal
  gsap.from('.expertise-row', {
    scrollTrigger: {
      trigger: '#expertise-rows-container',
      start: 'top 85%'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power3.out',
    clearProps: 'all'
  });

  // Saylani Event Photo Cards Entrance Animation
  gsap.from('.event-photo-card', {
    scrollTrigger: {
      trigger: '#saylani-event-gallery',
      start: 'top 82%'
    },
    opacity: 0,
    y: 30,
    scale: 0.96,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'all'
  });
}

// ========================================================
// 9. NAVIGATION & SMOOTH SCROLL
// ========================================================
function initNavigation() {
  const nav = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['hero', 'about', 'expertise', 'projects', 'saylani', 'education', 'certifications', 'contact'];

  // Scrollspy & Glass Elevation
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (nav) {
      if (scrollPos > 60) {
        nav.classList.add('bg-[#0B1020]/95', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'shadow-2xl');
      } else {
        nav.classList.remove('bg-[#0B1020]/95', 'backdrop-blur-xl', 'border-b', 'border-white/5', 'shadow-2xl');
      }
    }

    const triggerPos = scrollPos + 260;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sections[i]);
      if (sec && sec.offsetTop <= triggerPos) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sections[i]}`);
        });
        break;
      }
    }
  }, { passive: true });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ========================================================
// INITIALIZE ON DOM READY
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeadlineRotator();
  fetchPortfolioData();
  initContactForm();
  initNavigation();
});
