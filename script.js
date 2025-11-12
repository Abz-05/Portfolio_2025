// ===== ENHANCED PORTFOLIO JAVASCRIPT =====
// Retain all original functionality + add new interactive features

// ===== UTILITY FUNCTIONS =====
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  toastMessage.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// ===== SCROLL PROGRESS BAR =====
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link?.classList.add('active-link');
    } else {
      link?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// ===== HEADER BACKGROUND ON SCROLL =====
const header = document.getElementById('header');

function scrollHeader() {
  if (window.scrollY >= 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', scrollHeader);

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollTop() {
  if (window.scrollY >= 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
}

window.addEventListener('scroll', toggleScrollTop);

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== TYPING ANIMATION =====
const roles = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Full-Stack Developer',
  'Data Analyst',
  'Python Developer',
  'AI Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const typingElement = document.getElementById('typing-text');

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }

  setTimeout(typeRole, typingSpeed);
}

// Start typing animation
typeRole();

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target % 1 === 0 ? target : target.toFixed(1);
      clearInterval(counter);
    } else {
      element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
    }
  }, duration / steps);
}

// Trigger counter animation on scroll
const statNumbers = document.querySelectorAll('.stat__number');
let countersAnimated = false;

function checkStatsInView() {
  const statsSection = document.querySelector('.hero__stats');
  if (!statsSection || countersAnimated) return;
  
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    statNumbers.forEach(animateCounter);
    countersAnimated = true;
  }
}

window.addEventListener('scroll', checkStatsInView);
window.addEventListener('load', checkStatsInView);

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ===== SKILLS ACCORDION =====
const skillsHeaders = document.querySelectorAll('.skills__header');

// Open first accordion by default
if (skillsHeaders.length > 0) {
  skillsHeaders[0].parentElement.classList.add('active');
}

skillsHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.skills__item').forEach(skillItem => {
      skillItem.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===== COPY TO CLIPBOARD =====
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const textToCopy = btn.dataset.copy;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('Copied to clipboard!');
      btn.innerHTML = '<i class="bx bx-check"></i>';
      setTimeout(() => {
        btn.innerHTML = '<i class="bx bx-copy"></i>';
      }, 2000);
    }).catch(() => {
      showToast('Failed to copy');
    });
  });
});

// ===== CERTIFICATIONS DATA =====
const certificationsData = {
  'python-data': [
    { title: 'Python Zero to Hero', issuer: 'GUVI', year: '2024', badge: 'GUVI', image: 'Python Zero to Hero.png' },
    { title: 'Basics of Python', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Basics of Python.jpg' },
    { title: 'Object Oriented Programming using Python', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Object Oriented Programming using Python.jpg' },
    { title: 'Foundation of Coding with Python', issuer: 'Naan Mudhalvan & Infosys', year: '2024', badge: 'Government Program', image: 'NM-Foundation of Coding with Python.jpg' },
    { title: 'Python for Data Science - NPTEL Elite Silver', issuer: 'IIT Madras', year: '2024', badge: 'Top 5% Nationally', image: 'Python for Data Science [ELITE SILVER].jpg' },
    { title: 'Python Programming', issuer: 'GUVI', year: '2024', badge: 'GUVI', image: 'GUVI_PYTHON.jpeg' },
    { title: 'ChatGPT for Everyone', issuer: 'GUVI', year: '2024', badge: 'GUVI', image: 'GUVI Certification - CHATGPT FOR EVERYONE.png' },
    { title: 'Computer Vision 101', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Computer Vision 101.jpg' },
    { title: 'Deep Learning for Developers', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Deep Learning for Developers.jpg' },
    { title: 'Introduction to Deep Learning', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Deep Learning.jpg' },
    { title: 'Introduction to Natural Language Processing', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Natural Language Processing.jpg' },
    { title: 'Generative Models for Developers', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Generative models for developers.jpg' },
    { title: 'OpenAI GPT-3 for Developers', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'OpenAI Generative Pre-trained Transformer 3(GPT-3) for developers.jpg' },
    { title: 'Introduction to OpenAI GPT Models', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to OpenAI GPT Models.jpg' },
    { title: 'Generative AI Unleashing', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Generative AI Unleashing.jpg' },
    { title: 'Prompt Engineering', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Prompt Engineering.jpg' },
    { title: 'Basics of R Programming', issuer: 'MRCAS EDGE', year: '2024', badge: 'Grade A++', image: 'Basics of R Programming.jpeg' },
    { title: 'Introduction to Data Science', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Data Science.jpg' },
    { title: 'Database Management System', issuer: 'IIT Kharagpur (NPTEL)', year: '2024', badge: 'NPTEL', image: 'Data Base Management System-NPTEL.jpg' },
    { title: 'Database Fundamentals: Database Concepts', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Database Fundamentals-Database Concepts.jpg' },
    { title: 'Data Collection and Handling', issuer: 'MRCAS', year: '2024', badge: 'Grade A+', image: 'Data Collection and Handling.jpeg' },
    { title: 'Create and Use Analytics Reports with Power BI', issuer: 'Microsoft', year: '2024', badge: 'Microsoft', image: 'Create and use Analytics reports with Power BI.jpeg' },
    { title: 'Distribute Power BI Insights', issuer: 'Microsoft', year: '2024', badge: 'Microsoft', image: 'Distribute Power BI Insights.jpeg' }
  ],
  'web-frontend': [
    { title: 'ReactJS for Beginners', issuer: 'Simplilearn SkillUP', year: '2024', badge: 'Simplilearn', image: 'ReactJs for Beginners.jpg' },
    { title: 'JavaScript for Beginners', issuer: 'Simplilearn SkillUP', year: '2024', badge: 'Simplilearn', image: 'JavaScript for Beginners.jpg' },
    { title: 'Getting Started with NodeJS', issuer: 'Simplilearn SkillUP', year: '2024', badge: 'Simplilearn', image: 'Getting Started with NodeJs.jpg' }
  ],
  'java-backend': [
    { title: 'Java SE 8 Features', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Java SE 8 Features.jpg' },
    { title: 'Java Spring Framework', issuer: 'Naan Mudhalvan & Infosys', year: '2024', badge: 'Government Program', image: 'NM-Java Spring Network .jpg' },
    { title: 'Hibernate Framework - Basics', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Hibernate Framwork - Basics.jpg' },
    { title: 'Spring 5 Basics', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Spring 5 Basic.jpg' },
    { title: 'Spring 5 Basics with Spring Boot', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Spring 5 Basics with Spring Boot.jpg' },
    { title: 'Apache Maven', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Apache Maven.jpg' }
  ],
  'agile-software': [
    { title: 'Software Engineering and Agile Software Development', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Software Engineering and Agile software developement.jpg' },
    { title: 'Software Engineering and Agile Development (2)', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'software engineering and Agile software development.jpg' },
    { title: 'Introduction to Agile Methodology', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Agile methodology.jpg' },
    { title: 'Agile Scrum in Practice', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Agile Scrum in Practice.jpg' }
  ],
  'cloud-ai': [
    { title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate', issuer: 'Oracle', year: '2025', badge: 'Oracle Certified', image: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.jpg' },
    { title: 'Oracle Cloud Infrastructure 2025 Data Science Professional', issuer: 'Oracle', year: '2025', badge: 'Oracle Certified', image: 'Oracle cloud Infrastructure 2025 certified Data Science Professional.jpg' },
    { title: 'Artificial Intelligence', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Artificial Intelligence.jpg' },
    { title: 'Introduction to Artificial Intelligence', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Artificial Intelligence.jpg' },
    { title: 'Develop Solutions with Azure AI Document Intelligence', issuer: 'Microsoft', year: '2024', badge: 'Microsoft', image: 'Develop Solutions with Azure AI Document Intelligence.jpeg' }
  ],
  'security-rpa': [
    { title: 'Introduction to Cyber Security', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Cyber Security.jpg' },
    { title: 'Introduction to Cyber Security (2)', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Cyber Security (2).jpg' },
    { title: 'Introduction to Robotic Process Automation', issuer: 'Infosys Springboard', year: '2024', badge: 'Infosys', image: 'Introduction to Robotic Process Automation.jpg' }
  ],
  'internships-awards': [
    { title: 'ZeAISoft Tech Trainee', issuer: 'ZeAI Soft', year: '2026', badge: 'Internship', image: 'ZeAISoft Tech Trainee.jpg' },
    { title: 'Deloitte Virtual Internship', issuer: 'Deloitte', year: '2024', badge: 'Virtual Internship', image: 'Deloitte Virtual Internship.jpg' },
    { title: 'EKTA Women Resource Centre Social Internship', issuer: 'EKTA', year: '2024', badge: 'Social Impact', image: 'Ekta Resource Centre for Women (social internship).jpeg' },
    { title: 'Web Development Internship', issuer: 'APM Kingstrack India Pvt Ltd', year: '2025', badge: 'Internship', image: 'APM Kingstrack India Private Limited.jpg' },
    { title: 'FIESTA Event', issuer: 'MRCAS', year: '2024', badge: 'Event', image: 'FIESTA.jpeg' },
    { title: 'Flameless Cooking Competition', issuer: 'MRCAS', year: '2024', badge: 'Event', image: 'FLAMELESS COOKING.jpeg' },
    { title: 'Time Management', issuer: 'Infosys Springboard', year: '2024', badge: 'Professional Skills', image: 'Time Management.jpg' },
    { title: 'High Impact Presentations', issuer: 'Infosys Springboard', year: '2024', badge: 'Professional Skills', image: 'High Impact Presentations.jpg' },
    { title: 'Email Writing Skills', issuer: 'Infosys Springboard', year: '2024', badge: 'Professional Skills', image: 'Email Writting Skills.jpg' },
    { title: 'Data-A-Thon 2025 TSM', issuer: 'TSM', year: '2025', badge: '5th Place', image: 'Data-A-Thon-2025-TSM.jpg' },
    { title: 'Game-A-Thon', issuer: 'Competition', year: '2025', badge: 'Participant', image: 'Game-A-Thon.jpeg' },
    { title: 'SRM Game-A-Thon 2025', issuer: 'SRM Chennai', year: '2025', badge: '3rd Place', image: 'Game_a_thon_2K25_SRM_CHENNAI.jpg' },
    { title: 'HackSpora 2K25', issuer: 'Karpagam', year: '2025', badge: 'Participant', image: 'HackSpora_2K25_KARPAGAM.jpg' },
    { title: 'TechThrone 2K25', issuer: 'Hackathon', year: '2025', badge: 'Runner-Up', image: 'TECHTHRONE_2K25.jpg' },
    { title: 'Intramural Tournament (Kho-Kho) - 2nd Prize', issuer: 'MRCAS', year: '2024', badge: 'Sports', image: 'intramural tournament (kho-kho)2nd prize.jpeg' },
    { title: 'English Language Communication', issuer: 'Cambridge & Naan Mudhalvan', year: '2024', badge: 'Government Program', image: 'NM-English Language communication .jpg' }
  ]
};

// Continue in next part...
// ===== PROJECTS DATA =====
const projectsData = [
  {
    id: 'sea-sure',
    category: ['all', 'ml-ai'],
    icon: '🐟',
    badge: '🏆 Academic Research',
    title: 'SEA-SURE: Smart Seafood Freshness Monitoring System',
    tech: 'TensorFlow • Keras • XGBoost • ResNet50 • OpenCV • PostgreSQL • PostGIS • PWA',
    description: 'End-to-end AI platform revolutionizing seafood supply chain transparency through dual ML pipeline architecture.',
    highlights: [
      '<strong>99.47% accuracy</strong> — CNN classifier for 18 fish species using transfer learning (ResNet50)',
      '<strong>R² = 0.804</strong> — XGBoost regression model predicting shelf life from 10,000+ images',
      '<strong>25% latency reduction</strong> — Feature engineering optimizations reducing inference time',
      '<strong>QR-based traceability</strong> — Geo-fencing system ensuring maritime safety compliance',
      '<strong>Progressive Web App</strong> — Offline-first architecture with multi-role access control'
    ],
    techNotes: '<strong>Technical Innovation:</strong> Implemented custom data augmentation pipeline, GridSearchCV hyperparameter optimization, and modular workflow enabling reproducible model training and deployment.',
    metrics: ['10K+ images processed', 'Transfer Learning (ResNet50)', 'Real-time inference'],
    role: null
  },
  {
    id: 'pothole',
    category: ['all', 'ml-ai'],
    icon: '🚗',
    badge: 'CUMTA Contributor',
    title: 'Road Reboot - AI Pothole Detection',
    tech: 'OpenCV • TensorFlow • CNN • Mobile Development • Computer Vision',
    description: 'AI-powered mobile application for real-time pothole detection to improve urban road safety and infrastructure monitoring.',
    highlights: [
      'Real-time computer vision processing optimized for mobile devices',
      'Custom CNN architecture trained on diverse road condition datasets',
      'Geolocation tagging with automated municipal reporting system',
      'On-device inference ensuring privacy and low-latency detection'
    ],
    techNotes: null,
    metrics: null,
    role: '<strong>Role:</strong> ML Model Development, OpenCV Pipeline Implementation'
  },
  {
    id: 'healthcare',
    category: ['all', 'data-analytics', 'hackathon'],
    icon: '🏥',
    badge: '🏆 TSM Datathon - 5th Place',
    title: 'Healthcare Data Analysis Platform',
    tech: 'Python • Power BI • Pandas • Matplotlib • SQL • Statistical Analysis',
    description: 'Comprehensive exploratory data analysis on patient records uncovering cost-saving insights from 10,000+ healthcare records.',
    highlights: [
      '<strong>12+ KPI dashboards</strong> — Interactive visualizations for healthcare administrators',
      'Trend analysis identifying patterns in demographics, treatment outcomes, and resource utilization',
      'Predictive modeling for patient readmission risk assessment',
      'Delivered actionable recommendations reducing operational costs by 15%'
    ],
    techNotes: null,
    metrics: ['10K+ records analyzed', '🏆 Runner-Up Award'],
    role: null
  },
  {
    id: 'trendella',
    category: ['all', 'web-dev'],
    icon: '🛍️',
    badge: 'Industry Project',
    title: 'Trendella E-Commerce Platform',
    tech: 'HTML5 • CSS3 • JavaScript • Bootstrap • Responsive Design',
    description: 'Full-featured e-commerce website for women\'s clothing with dynamic UI, real-time validation, and optimized performance.',
    highlights: [
      '<strong>90+ Lighthouse score</strong> — Optimized for performance, accessibility, and SEO',
      'Interactive carousels and multi-filter product search functionality',
      'Real-time form validation with error handling',
      'Cross-browser compatible, mobile-first responsive design'
    ],
    techNotes: null,
    metrics: null,
    role: '<strong>Contribution:</strong> Full SDLC participation from design to deployment'
  },
  {
    id: 'gameathon',
    category: ['all', 'web-dev', 'hackathon'],
    icon: '🎮',
    badge: '🥉 SRM Game-A-Thon - 3rd Place',
    title: 'Educational Gamification Platform',
    tech: 'React.js • JavaScript • Game Mechanics • UI/UX Design',
    description: 'Interactive learning platform combining game mechanics with educational content for enhanced student engagement (Team Tech Mavericks).',
    highlights: [
      'Immersive storytelling with branching narratives and real-time interactions',
      'Modular React.js component architecture for scalability',
      'Built in 24-hour hackathon sprint with 80+ competing teams',
      'Recognized for innovation in educational technology'
    ],
    techNotes: null,
    metrics: ['🏆 3rd Place Winner', '⏱️ 24-hour build'],
    role: null
  },
  {
    id: 'mechconnect',
    category: ['all', 'hackathon'],
    icon: '🔧',
    badge: '🏆 TechThrone 2k25 - Runner-Up',
    title: 'MechConnect - Real-Time Matching Platform',
    tech: 'Full-Stack • Real-Time Systems • Geolocation • Sustainable Mobility (SDG 11)',
    description: 'Real-time mechanic-driver matching platform addressing sustainable urban mobility, built in 12-hour sprint among 50+ teams.',
    highlights: [
      '<strong>Project Lead</strong> — Led 4-member team through ideation, development, and presentation',
      'Real-time location-based matching algorithm with proximity optimization',
      'Dual-app MVP (mechanic & driver interfaces) completed in 12 hours',
      'Earned internship offer for demonstrated leadership and technical execution'
    ],
    techNotes: null,
    metrics: null,
    role: '<strong>Leadership:</strong> Team coordination, architecture design, pitch presentation'
  }
];

// ===== RENDER PROJECTS =====
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(filter));
  
  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project__card';
    card.dataset.category = project.category.join(' ');
    
    const highlightsHTML = project.highlights.map(h => `<li>${h}</li>`).join('');
    const metricsHTML = project.metrics ? `
      <div class="project__metrics">
        ${project.metrics.map(m => `<span><i class='bx bx-check-circle'></i> ${m}</span>`).join('')}
      </div>
    ` : '';
    const techNotesHTML = project.techNotes ? `<div class="project__tech-notes">${project.techNotes}</div>` : '';
    const roleHTML = project.role ? `<div class="project__role">${project.role}</div>` : '';
    
    card.innerHTML = `
      <div class="project__badge">${project.badge}</div>
      <div class="project__icon">${project.icon}</div>
      <h3 class="project__title">${project.title}</h3>
      <p class="project__tech">${project.tech}</p>
      <p class="project__description">${project.description}</p>
      <ul class="project__highlights">${highlightsHTML}</ul>
      ${techNotesHTML}
      ${metricsHTML}
      ${roleHTML}
    `;
    
    card.addEventListener('click', () => openProjectModal(project.id));
    grid.appendChild(card);
  });
  
  // Animate cards
  animateProjectCards();
}

function animateProjectCards() {
  const cards = document.querySelectorAll('.project__card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 50);
  });
}

// ===== PROJECT FILTERS =====
const projectFilterBtns = document.querySelectorAll('.project__filter-btn');

projectFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    renderProjects(filter);
  });
});

// ===== RENDER CERTIFICATIONS =====
function renderCertifications(category = 'all') {
  const grid = document.getElementById('cert-grid');
  if (!grid) return;
  
  grid.innerHTML = '';

  const categoryTitles = {
    'python-data': 'Python & Data Science',
    'web-frontend': 'Web Development & Frontend',
    'java-backend': 'Java & Backend Development',
    'agile-software': 'Software Engineering & Agile',
    'cloud-ai': 'Cloud, AI Foundations & Data Science',
    'security-rpa': 'Security, RPA & Cyber',
    'internships-awards': 'Internships, Programs, Events & Awards'
  };

  if (category === 'all') {
    Object.entries(certificationsData).forEach(([cat, certs]) => {
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'cert__category';
      categoryHeader.innerHTML = `
        <h3 class="cert__category-title">
          <i class='bx bx-award'></i>
          ${categoryTitles[cat]}
        </h3>
        <p class="cert__category-count">${certs.length} certificates</p>
      `;
      grid.appendChild(categoryHeader);

      certs.forEach(cert => {
        const card = createCertCard(cert);
        grid.appendChild(card);
      });
    });
  } else {
    const certs = certificationsData[category] || [];
    certs.forEach(cert => {
      const card = createCertCard(cert);
      grid.appendChild(card);
    });
  }

  animateCertCards();
}

function createCertCard(cert) {
  const card = document.createElement('div');
  card.className = 'cert__card';
  card.innerHTML = `
    <img 
      src="${cert.image}" 
      alt="${cert.title}" 
      class="cert__image" 
      loading="lazy"
      onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27200%27%3E%3Crect fill=%27%230f172a%27 width=%27300%27 height=%27200%27/%3E%3Ctext fill=%27%2393a8d6%27 font-family=%27Arial%27 font-size=%2714%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dominant-baseline=%27middle%27%3ECertificate%3C/text%3E%3C/svg%3E'"
    />
    <div class="cert__info">
      <h3 class="cert__title">${cert.title}</h3>
      <p class="cert__issuer">${cert.issuer}</p>
      <p class="cert__year">${cert.year}</p>
      <span class="cert__badge">${cert.badge}</span>
    </div>
  `;
  
  card.addEventListener('click', () => openCertModal(cert));
  return card;
}

function animateCertCards() {
  const cards = document.querySelectorAll('.cert__card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 30);
  });
}

// ===== CERTIFICATION FILTERS =====
const certFilterBtns = document.querySelectorAll('.cert__filter-btn');

certFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    renderCertifications(category);
  });
});

// ===== VIEW TOGGLE (GRID/LIST) =====
const viewBtns = document.querySelectorAll('.view__btn');
const certGrid = document.getElementById('cert-grid');

viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const view = btn.dataset.view;
    if (view === 'list') {
      certGrid.classList.add('list-view');
    } else {
      certGrid.classList.remove('list-view');
    }
  });
});

// ===== CERTIFICATE MODAL =====
const certModal = document.getElementById('cert-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');

function openCertModal(cert) {
  modalImg.src = cert.image;
  modalImg.alt = cert.title;
  modalTitle.textContent = cert.title;
  modalIssuer.textContent = `${cert.issuer} • ${cert.year}`;
  certModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

modalClose?.addEventListener('click', closeCertModal);

certModal?.addEventListener('click', (e) => {
  if (e.target === certModal) {
    closeCertModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (certModal.classList.contains('active')) {
      closeCertModal();
    }
    if (document.getElementById('project-modal').classList.contains('active')) {
      closeProjectModal();
    }
  }
});

// ===== PROJECT MODAL =====
const projectModalData = {
  'sea-sure': {
    title: 'SEA-SURE: Smart Seafood Freshness Monitoring System',
    problem: 'Seafood supply chains lack transparency and traceability...',
    approach: 'Dual ML pipeline with ResNet50 and XGBoost...',
    evaluation: 'Species: 99.47% accuracy, Freshness: R²=0.804...',
    lessons: 'Modular design, prompt engineering, reproducibility...'
  }
  // Add other project details as needed
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const data = projectModalData[projectId];
  
  if (!data) return;
  
  modalBody.innerHTML = `
    <h2 style="font-size: 3rem; margin-bottom: 2rem; color: var(--primary-color);">${data.title}</h2>
    <div style="margin-bottom: 3rem;">
      <h3 style="font-size: 2rem; margin-bottom: 1rem;">Problem Statement</h3>
      <p style="color: var(--text-secondary); line-height: 1.8;">${data.problem}</p>
    </div>
    <!-- Add more sections -->
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ===== RESUME VIEWER =====
function openResume(event) {
  event.preventDefault();
  
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    z-index: 3000; padding: 2rem;
  `;
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      this.remove();
      document.body.style.overflow = 'auto';
    }
  });
  
  overlay.innerHTML = `
    <div style="position: relative; max-width: 1000px; width: 100%;">
      <button onclick="this.parentElement.parentElement.remove(); document.body.style.overflow='auto'" 
        style="position: absolute; top: -50px; right: 0; width: 40px; height: 40px; border-radius: 50%; 
        background: rgba(147, 168, 214, 0.2); color: white; font-size: 24px; cursor: pointer; 
        border: 2px solid #93a8d6; display: flex; align-items: center; justify-content: center;">
        ✕
      </button>
      <embed src="Abz_@%@%.pdf" type="application/pdf" width="100%" height="800px" 
        style="border: 2px solid #93a8d6; border-radius: 10px;" />
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  renderCertifications();
  renderProjects();
  
  // Console branding
  console.log('%c🚀 Welcome to Abzana Varhath\'s Portfolio!', 'color: #93a8d6; font-size: 20px; font-weight: bold;');
  console.log('%c📊 Data Science | 🤖 ML | 💻 Full-Stack', 'color: #bbd3fa; font-size: 14px;');
});