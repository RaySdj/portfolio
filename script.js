// =================================================================
// PROFESSIONAL CORPORATE PORTFOLIO
// Elegant Interactions & Smooth Animations
// =================================================================

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeContactForm();
});

// =================================================================
// LOAD CONTENT FROM LOCALSTORAGE
// =================================================================
function loadPortfolioContent() {
    const config = getConfig();

    // Hero Section
    document.getElementById('heroName').textContent = config.personal.name;
    document.getElementById('heroTitle').textContent = config.personal.title;
    document.getElementById('heroDescription').textContent = config.personal.description;
    document.getElementById('nav-name').textContent = config.personal.name;

    // Add social links to hero
    const heroSocial = document.getElementById('heroSocial');
    heroSocial.innerHTML = '';

    if (config.personal.linkedin) {
        const li = document.createElement('a');
        li.href = config.personal.linkedin;
        li.target = '_blank';
        li.rel = 'noopener';
        li.innerHTML = '<i class="fab fa-linkedin"></i>';
        heroSocial.appendChild(li);
    }

    if (config.personal.github) {
        const gh = document.createElement('a');
        gh.href = config.personal.github;
        gh.target = '_blank';
        gh.rel = 'noopener';
        gh.innerHTML = '<i class="fab fa-github"></i>';
        heroSocial.appendChild(gh);
    }

    if (config.personal.twitter) {
        const tw = document.createElement('a');
        tw.href = config.personal.twitter;
        tw.target = '_blank';
        tw.rel = 'noopener';
        tw.innerHTML = '<i class="fab fa-twitter"></i>';
        heroSocial.appendChild(tw);
    }

    // About Section
    document.getElementById('aboutLead').textContent = config.about.lead;

    const aboutParagraphs = document.getElementById('aboutParagraphs');
    aboutParagraphs.innerHTML = '';
    config.about.paragraphs.forEach(para => {
        const p = document.createElement('p');
        p.textContent = para;
        aboutParagraphs.appendChild(p);
    });

    const aboutStats = document.getElementById('aboutStats');
    aboutStats.innerHTML = '';
    config.about.stats.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.className = 'stat-item';
        statDiv.innerHTML = `
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        aboutStats.appendChild(statDiv);
    });

    // Experience Section
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    config.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';

        const responsibilities = exp.responsibilities.map(r => `<li>${r}</li>`).join('');

        expItem.innerHTML = `
            <div class="experience-card">
                <div class="experience-date">${exp.period}</div>
                <h3 class="experience-title">${exp.title}</h3>
                <div class="experience-company">${exp.company}</div>
                <div class="experience-description">
                    <ul>${responsibilities}</ul>
                </div>
            </div>
        `;
        timeline.appendChild(expItem);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    config.skills.categories.forEach(category => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';

        const skillsList = category.skills.map(s =>
            `<li class="skill-item">${s}</li>`
        ).join('');

        // Get an appropriate icon based on category title
        const icon = getCategoryIcon(category.title);

        skillCategory.innerHTML = `
            <h3 class="skill-category-title">
                <i class="${icon}"></i>
                ${category.title}
            </h3>
            <ul class="skill-list">${skillsList}</ul>
        `;
        skillsGrid.appendChild(skillCategory);
    });

    // Certifications
    const certGrid = document.getElementById('certGrid');
    certGrid.innerHTML = '';
    config.skills.certifications.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'cert-item';
        certItem.innerHTML = `<div class="cert-name">${cert}</div>`;
        certGrid.appendChild(certItem);
    });

    // Projects Section
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const techTags = project.tech.map(t =>
            `<span class="tech-tag">${t}</span>`
        ).join('');

        const links = `
            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> View Code</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        `;

        projectCard.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techTags}</div>
                <div class="project-links">${links}</div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Contact Section
    document.getElementById('contactDescription').textContent = config.contact.description;

    const contactMethods = document.getElementById('contactMethods');
    contactMethods.innerHTML = '';

    if (config.personal.email) {
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${config.personal.email}`;
        emailLink.className = 'contact-method';
        emailLink.innerHTML = `<i class="fas fa-envelope"></i> <span>${config.personal.email}</span>`;
        contactMethods.appendChild(emailLink);
    }

    if (config.personal.linkedin) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = config.personal.linkedin;
        linkedinLink.className = 'contact-method';
        linkedinLink.target = '_blank';
        linkedinLink.rel = 'noopener';
        linkedinLink.innerHTML = `<i class="fab fa-linkedin"></i> <span>LinkedIn Profile</span>`;
        contactMethods.appendChild(linkedinLink);
    }

    if (config.personal.github) {
        const githubLink = document.createElement('a');
        githubLink.href = config.personal.github;
        githubLink.className = 'contact-method';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener';
        githubLink.innerHTML = `<i class="fab fa-github"></i> <span>GitHub Profile</span>`;
        contactMethods.appendChild(githubLink);
    }

    // Footer
    document.getElementById('footerCopyright').textContent =
        `© ${new Date().getFullYear()} ${config.personal.name}. All rights reserved.`;

    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = '';

    if (config.personal.linkedin) {
        const li = document.createElement('a');
        li.href = config.personal.linkedin;
        li.target = '_blank';
        li.rel = 'noopener';
        li.innerHTML = '<i class="fab fa-linkedin"></i>';
        footerSocials.appendChild(li);
    }

    if (config.personal.github) {
        const gh = document.createElement('a');
        gh.href = config.personal.github;
        gh.target = '_blank';
        gh.rel = 'noopener';
        gh.innerHTML = '<i class="fab fa-github"></i>';
        footerSocials.appendChild(gh);
    }

    if (config.personal.twitter) {
        const tw = document.createElement('a');
        tw.href = config.personal.twitter;
        tw.target = '_blank';
        tw.rel = 'noopener';
        tw.innerHTML = '<i class="fab fa-twitter"></i>';
        footerSocials.appendChild(tw);
    }
}

// Helper function to get appropriate icon for skill categories
function getCategoryIcon(title) {
    const iconMap = {
        'Technical': 'fas fa-code',
        'Security': 'fas fa-shield-alt',
        'Tools': 'fas fa-tools',
        'Languages': 'fas fa-language',
        'Frameworks': 'fas fa-layer-group',
        'Database': 'fas fa-database',
        'Cloud': 'fas fa-cloud',
        'DevOps': 'fas fa-cogs',
        'Design': 'fas fa-palette',
        'Soft Skills': 'fas fa-users'
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (title.toLowerCase().includes(key.toLowerCase())) {
            return icon;
        }
    }

    return 'fas fa-star'; // Default icon
}

// =================================================================
// NAVIGATION
// =================================================================
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
}

// =================================================================
// MOBILE MENU
// =================================================================
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// =================================================================
// SCROLL ANIMATIONS
// =================================================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.project-card, .experience-item, .skill-category, .stat-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// =================================================================
// CONTACT FORM
// =================================================================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link with all info
        const config = getConfig();
        const mailtoLink = `mailto:${config.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Optional: Show success message
        alert('Opening your email client...');
    });
}

// =================================================================
// SCROLL PROGRESS (kept from original)
// =================================================================
function initializeScrollProgress() {
    // This function was in the original - keeping for compatibility
    // But not needed for the new design
}

// =================================================================
// GET CONFIGURATION
// =================================================================
function getConfig() {
    const defaultConfig = {
        personal: {
            name: 'Your Name',
            title: 'Professional Title',
            description: 'Brief professional description.',
            email: 'your@email.com',
            linkedin: '',
            github: '',
            twitter: ''
        },
        about: {
            lead: 'Professional summary...',
            paragraphs: [
                'First paragraph about your background.',
                'Second paragraph about your expertise.'
            ],
            stats: [
                { number: '5+', label: 'Years Experience' },
                { number: '20+', label: 'Projects Completed' },
                { number: '15+', label: 'Happy Clients' }
            ]
        },
        experience: [
            {
                title: 'Job Title',
                company: 'Company Name',
                period: '2020 - Present',
                responsibilities: [
                    'Key responsibility 1',
                    'Key responsibility 2',
                    'Key responsibility 3'
                ]
            }
        ],
        skills: {
            categories: [
                {
                    title: 'Technical Skills',
                    skills: ['JavaScript', 'Python', 'HTML/CSS']
                }
            ],
            certifications: ['Certification 1', 'Certification 2']
        },
        projects: [
            {
                title: 'Project Name',
                description: 'Project description goes here.',
                tech: ['Tech1', 'Tech2', 'Tech3'],
                github: '',
                demo: ''
            }
        ],
        contact: {
            description: 'Feel free to reach out for collaborations or inquiries.'
        }
    };

    const saved = localStorage.getItem('portfolioConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
}

function saveConfig(config) {
    localStorage.setItem('portfolioConfig', JSON.stringify(config));
}
