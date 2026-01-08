// =================================================================
// TERMINAL/HACKER THEMED PORTFOLIO
// Matrix Effects & Terminal Animations
// =================================================================

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
    initializeMatrixRain();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeScrollProgress();
    initializeMobileMenu();
});

// =================================================================
// MATRIX RAIN EFFECT
// =================================================================
function initializeMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - taken from Matrix Rain
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const characters = matrix.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array of drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Drawing the characters
    function draw() {
        // Black background with low opacity for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00'; // Green text
        ctx.font = fontSize + 'px monospace';

        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = characters[Math.floor(Math.random() * characters.length)];
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Start animation
    const matrixInterval = setInterval(draw, 50);

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// =================================================================
// TYPING EFFECT FOR HERO NAME
// =================================================================
function initializeTypingEffect() {
    const config = getConfig();
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const fullName = config.personal.name;
    let index = 0;

    typingText.textContent = '';

    function type() {
        if (index < fullName.length) {
            typingText.textContent += fullName.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// =================================================================
// LOAD CONTENT FROM LOCALSTORAGE
// =================================================================
function loadPortfolioContent() {
    const config = getConfig();

    // Hero Section - Terminal style
    document.getElementById('heroName').querySelector('.typing-text').textContent = '';
    document.getElementById('heroTitle').textContent = config.personal.title;
    document.getElementById('heroDescription').textContent = config.personal.description;
    document.getElementById('nav-name').textContent = config.personal.name;

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

    // Experience Section - Log style
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    config.experience.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.className = 'experience-item reveal';

        const responsibilities = exp.responsibilities.map(r => `<li>${r}</li>`).join('');

        expCard.innerHTML = `
            <div class="exp-header">
                <span class="exp-title">${exp.title}</span>
                <span class="exp-date">${exp.period}</span>
            </div>
            <p class="exp-company">${exp.company}</p>
            <div class="exp-description">
                <ul>${responsibilities}</ul>
            </div>
        `;
        timeline.appendChild(expCard);
    });

    // Skills Section - System scan style
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    config.skills.categories.forEach(category => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category reveal';

        const skillsList = category.skills.map(s =>
            `<span class="skill-item">${s}</span>`
        ).join('');

        skillCategory.innerHTML = `
            <h3>${category.title}</h3>
            <div class="skill-list">${skillsList}</div>
        `;
        skillsGrid.appendChild(skillCategory);
    });

    // Certifications
    const certGrid = document.getElementById('certGrid');
    certGrid.innerHTML = '';
    config.skills.certifications.forEach(cert => {
        const certBadge = document.createElement('div');
        certBadge.className = 'cert-badge';
        certBadge.textContent = cert;
        certGrid.appendChild(certBadge);
    });

    // Projects Section - Directory listing style
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card reveal';

        const techTags = project.tech.map(t =>
            `<span class="tech-tag">${t}</span>`
        ).join('');

        const links = `
            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener">GitHub</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener">Live Demo</a>` : ''}
        `;

        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-meta">
                    <span>${new Date().toLocaleDateString()}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">${links}</div>
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
        emailLink.innerHTML = `<i class="fas fa-envelope"></i> ${config.personal.email}`;
        contactMethods.appendChild(emailLink);
    }

    if (config.personal.linkedin) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = config.personal.linkedin;
        linkedinLink.className = 'contact-method';
        linkedinLink.target = '_blank';
        linkedinLink.rel = 'noopener';
        linkedinLink.innerHTML = `<i class="fab fa-linkedin"></i> LinkedIn`;
        contactMethods.appendChild(linkedinLink);
    }

    if (config.personal.github) {
        const githubLink = document.createElement('a');
        githubLink.href = config.personal.github;
        githubLink.className = 'contact-method';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener';
        githubLink.innerHTML = `<i class="fab fa-github"></i> GitHub`;
        contactMethods.appendChild(githubLink);
    }

    // Update form "To" field
    const toField = document.querySelector('input[name="to"]');
    if (toField && config.personal.email) {
        toField.value = config.personal.email;
    }

    // Footer
    document.getElementById('footerCopyright').textContent =
        `© ${new Date().getFullYear()} ${config.personal.name}. All rights reserved.`;

    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = '';

    if (config.personal.linkedin) {
        const li = document.createElement('a');
        li.href = config.personal.linkedin;
        li.className = 'social-link';
        li.target = '_blank';
        li.rel = 'noopener';
        li.innerHTML = '<i class="fab fa-linkedin"></i>';
        footerSocials.appendChild(li);
    }

    if (config.personal.github) {
        const gh = document.createElement('a');
        gh.href = config.personal.github;
        gh.className = 'social-link';
        gh.target = '_blank';
        gh.rel = 'noopener';
        gh.innerHTML = '<i class="fab fa-github"></i>';
        footerSocials.appendChild(gh);
    }

    if (config.personal.twitter) {
        const tw = document.createElement('a');
        tw.href = config.personal.twitter;
        tw.className = 'social-link';
        tw.target = '_blank';
        tw.rel = 'noopener';
        tw.innerHTML = '<i class="fab fa-twitter"></i>';
        footerSocials.appendChild(tw);
    }
}

// =================================================================
// SCROLL ANIMATIONS
// =================================================================
function initializeScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// =================================================================
// SCROLL PROGRESS BAR
// =================================================================
function initializeScrollProgress() {
    const progressBar = document.querySelector('.nav-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// =================================================================
// MOBILE MENU
// =================================================================
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// =================================================================
// CONTACT FORM SUBMISSION
// =================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate terminal output
        alert(`[SUCCESS] Message queued for transmission\n\nFrom: ${data.email}\nSubject: ${data.subject}\n\nThis is a demo form. In production, integrate with a backend service or email API.`);

        // Reset form
        contactForm.reset();
    });
}

// =================================================================
// DEFAULT CONFIGURATION
// =================================================================
function getConfig() {
    const defaultConfig = {
        personal: {
            name: "Your Name",
            title: "Cybersecurity & Intelligence Professional",
            description: "Protecting digital assets and analyzing threats.",
            email: "your@email.com",
            linkedin: "https://linkedin.com/in/yourprofile",
            github: "https://github.com/yourusername",
            twitter: "https://twitter.com/yourusername"
        },
        about: {
            lead: "Cybersecurity professional with expertise in threat analysis, penetration testing, and digital forensics.",
            paragraphs: [
                "Specialized in identifying vulnerabilities and implementing robust security measures to protect critical infrastructure and sensitive data.",
                "Experienced in conducting security audits, incident response, and developing comprehensive security strategies for enterprise environments.",
                "Passionate about staying ahead of emerging threats and continuously enhancing defensive capabilities through research and innovation."
            ],
            stats: [
                { number: "100+", label: "Security Audits" },
                { number: "50+", label: "Vulnerabilities Found" },
                { number: "5+", label: "Years Experience" },
                { number: "10+", label: "Certifications" }
            ]
        },
        experience: [
            {
                title: "Senior Security Analyst",
                company: "CyberDefense Corp",
                period: "2022 - Present",
                responsibilities: [
                    "Lead penetration testing engagements for enterprise clients",
                    "Develop and implement security monitoring solutions",
                    "Conduct incident response and digital forensics investigations",
                    "Train junior analysts on security best practices"
                ]
            },
            {
                title: "Security Consultant",
                company: "SecureIT Solutions",
                period: "2020 - 2022",
                responsibilities: [
                    "Performed vulnerability assessments and security audits",
                    "Assisted clients in achieving compliance certifications",
                    "Designed secure network architectures",
                    "Provided security awareness training"
                ]
            },
            {
                title: "Junior Security Analyst",
                company: "TechGuard Inc",
                period: "2019 - 2020",
                responsibilities: [
                    "Monitored security events and alerts",
                    "Assisted in incident response activities",
                    "Maintained security documentation",
                    "Supported security tool deployment"
                ]
            }
        ],
        skills: {
            categories: [
                {
                    title: "Penetration Testing",
                    icon: "fas fa-shield-alt",
                    skills: ["Metasploit", "Burp Suite", "Nmap", "Wireshark", "OWASP ZAP"]
                },
                {
                    title: "Forensics & Analysis",
                    icon: "fas fa-search",
                    skills: ["Autopsy", "Volatility", "FTK", "EnCase", "Log Analysis"]
                },
                {
                    title: "Programming",
                    icon: "fas fa-code",
                    skills: ["Python", "Bash", "PowerShell", "JavaScript", "SQL"]
                },
                {
                    title: "Security Tools",
                    icon: "fas fa-tools",
                    skills: ["Splunk", "ELK Stack", "Snort", "Suricata", "SIEM"]
                }
            ],
            certifications: ["OSCP", "CISSP", "CEH", "Security+", "GIAC"]
        },
        projects: [
            {
                title: "Threat Intelligence Platform",
                description: "Built a real-time threat intelligence aggregation and analysis platform using Python and ELK stack.",
                tech: ["Python", "Elasticsearch", "Kibana", "Docker"],
                github: "https://github.com/yourusername/threat-intel",
                demo: ""
            },
            {
                title: "Automated Vulnerability Scanner",
                description: "Developed a custom vulnerability scanning tool that integrates multiple security APIs and generates comprehensive reports.",
                tech: ["Python", "Nmap", "SQLite", "Flask"],
                github: "https://github.com/yourusername/vuln-scanner",
                demo: ""
            },
            {
                title: "Security Monitoring Dashboard",
                description: "Created an interactive dashboard for monitoring security events and detecting anomalies in real-time.",
                tech: ["React", "Node.js", "Socket.io", "MongoDB"],
                github: "https://github.com/yourusername/security-dashboard",
                demo: "https://demo.example.com"
            }
        ],
        contact: {
            description: "Interested in collaboration or have a security concern? Feel free to reach out."
        }
    };

    const storedConfig = localStorage.getItem('portfolioConfig');
    return storedConfig ? JSON.parse(storedConfig) : defaultConfig;
}

function saveConfig(config) {
    localStorage.setItem('portfolioConfig', JSON.stringify(config));
}
