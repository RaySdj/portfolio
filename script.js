// Load portfolio content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
    initializeAnimations();
    initializeMatrix();
});

// Load content from localStorage or defaults
function loadPortfolioContent() {
    const config = getConfig();

    // Hero Section
    document.getElementById('heroName').textContent = config.personal.name;
    document.getElementById('heroName').setAttribute('data-text', config.personal.name);
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
        statDiv.className = 'stat';
        statDiv.innerHTML = `
            <i class="${stat.icon}"></i>
            <h3>${stat.number}</h3>
            <p>${stat.label}</p>
        `;
        aboutStats.appendChild(statDiv);
    });

    // Experience Section
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    config.experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        const responsibilities = exp.responsibilities.map(r => `<li>${r}</li>`).join('');

        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company} | ${exp.period}</h4>
                <ul>${responsibilities}</ul>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    config.skills.categories.forEach(category => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';

        const skillsList = category.skills.map(s => `<li><i class="fas fa-check"></i> ${s}</li>`).join('');

        skillCategory.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.title}</h3>
            <ul class="skill-list">${skillsList}</ul>
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

    // Projects Section
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const tags = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tags}</div>
            <a href="${project.link}" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Contact Section
    document.getElementById('contactDescription').textContent = config.contact.description;

    const contactMethods = document.getElementById('contactMethods');
    contactMethods.innerHTML = '';
    const contacts = [
        { icon: 'fas fa-envelope', label: 'Email', value: config.personal.email, link: `mailto:${config.personal.email}` },
        { icon: 'fab fa-linkedin', label: 'LinkedIn', value: config.personal.linkedin.replace('https://', ''), link: config.personal.linkedin },
        { icon: 'fab fa-github', label: 'GitHub', value: config.personal.github.replace('https://', ''), link: config.personal.github },
        { icon: 'fab fa-twitter', label: 'Twitter/X', value: '@' + config.personal.twitter.split('/').pop(), link: config.personal.twitter }
    ];

    contacts.forEach(contact => {
        const contactMethod = document.createElement('div');
        contactMethod.className = 'contact-method';
        contactMethod.innerHTML = `
            <i class="${contact.icon}"></i>
            <div>
                <h4>${contact.label}</h4>
                <a href="${contact.link}" ${contact.label !== 'Email' ? 'target="_blank"' : ''}>${contact.value}</a>
            </div>
        `;
        contactMethods.appendChild(contactMethod);
    });

    // Footer
    document.getElementById('footerCopyright').textContent = `© ${new Date().getFullYear()} ${config.personal.name}. All rights reserved.`;

    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = `
        <a href="${config.personal.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="${config.personal.github}" target="_blank"><i class="fab fa-github"></i></a>
        <a href="${config.personal.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
    `;
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize animations
function initializeAnimations() {
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

    // Observe elements for animation
    setTimeout(() => {
        const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetText = target.textContent;
                const number = parseInt(targetText);

                if (!isNaN(number) && !target.dataset.animated) {
                    target.dataset.animated = 'true';
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = targetText;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + targetText.replace(/[0-9]/g, '');
                        }
                    }, 30);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    setTimeout(() => {
        stats.forEach(stat => statsObserver.observe(stat));
    }, 100);
}

// Matrix rain effect
function initializeMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff8820';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < 700) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Show success message
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #0066ff)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}
