// =================================================================
// MODERN PORTFOLIO - SCROLL-DRIVEN ANIMATIONS
// =================================================================

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
    initializeScrollAnimations();
    initializeParallax();
    initializeScrollProgress();
    initializeHorizontalScroll();
    initializeMobileMenu();
});

// Load content from localStorage or defaults
function loadPortfolioContent() {
    const config = getConfig();

    // Hero Section - Updated for word animation
    const heroName = document.getElementById('heroName');
    const words = config.personal.name.split(' ');
    heroName.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

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
        statDiv.className = 'stat-box';
        statDiv.innerHTML = `
            <span class="stat-value" data-target="${stat.number}">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        aboutStats.appendChild(statDiv);
    });

    // Experience Section - Horizontal cards
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    config.experience.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.className = 'experience-card';

        const responsibilities = exp.responsibilities.map(r => `<li>${r}</li>`).join('');

        expCard.innerHTML = `
            <span class="exp-period">${exp.period}</span>
            <h3 class="exp-title">${exp.title}</h3>
            <p class="exp-company">${exp.company}</p>
            <ul class="exp-responsibilities">${responsibilities}</ul>
        `;
        timeline.appendChild(expCard);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    config.skills.categories.forEach(category => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';

        const skillsList = category.skills.map(s => `<li>${s}</li>`).join('');

        skillCategory.innerHTML = `
            <h3><i class="${category.icon}"></i> ${category.title}</h3>
            <ul>${skillsList}</ul>
        `;
        skillsGrid.appendChild(skillCategory);
    });

    // Certifications with scroll duplication for infinite scroll
    const certGrid = document.getElementById('certGrid');
    certGrid.innerHTML = '';
    const certsHTML = config.skills.certifications.map(cert =>
        `<div class="cert-badge">${cert}</div>`
    ).join('');
    // Duplicate certs for seamless infinite scroll
    certGrid.innerHTML = certsHTML + certsHTML;

    // Projects Section
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const tags = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        const links = `
            <div class="project-links">
                ${project.link ? `<a href="${project.link}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
            </div>
        `;

        projectCard.innerHTML = `
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    ${links}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${tags}</div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Contact Section
    document.getElementById('contactDescription').textContent = config.contact.description;

    const contactMethods = document.getElementById('contactMethods');
    contactMethods.innerHTML = '';
    const contacts = [
        { icon: 'fas fa-envelope', label: 'Email', value: config.personal.email, link: `mailto:${config.personal.email}` },
        { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'LinkedIn Profile', link: config.personal.linkedin },
        { icon: 'fab fa-github', label: 'GitHub', value: 'GitHub Profile', link: config.personal.github },
        { icon: 'fab fa-twitter', label: 'X / Twitter', value: 'Twitter Profile', link: config.personal.twitter }
    ];

    contacts.forEach(contact => {
        const contactMethod = document.createElement('a');
        contactMethod.href = contact.link;
        contactMethod.className = 'contact-method';
        if (contact.label !== 'Email') {
            contactMethod.target = '_blank';
        }
        contactMethod.innerHTML = `
            <i class="${contact.icon}"></i>
            <div class="method-info">
                <div class="method-label">${contact.label}</div>
                <div class="method-value">${contact.value}</div>
            </div>
        `;
        contactMethods.appendChild(contactMethod);
    });

    // Footer
    document.getElementById('footerCopyright').textContent = `© ${new Date().getFullYear()} ${config.personal.name}. All rights reserved.`;

    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = `
        <a href="${config.personal.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>
        <a href="${config.personal.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>
        <a href="${config.personal.twitter}" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>
    `;
}

// =================================================================
// SCROLL-DRIVEN ANIMATIONS
// =================================================================

function initializeScrollAnimations() {
    // Intersection Observer for reveal animations
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

    // Observe elements after a short delay to ensure DOM is ready
    setTimeout(() => {
        // About section title lines
        document.querySelectorAll('.title-line').forEach(el => {
            revealObserver.observe(el);
        });

        // About content
        document.querySelectorAll('.lead, .about-text p, .stat-box').forEach(el => {
            revealObserver.observe(el);
        });

        // Skills
        document.querySelectorAll('.skill-category').forEach(el => {
            revealObserver.observe(el);
        });

        // Projects
        document.querySelectorAll('.project-card').forEach(el => {
            revealObserver.observe(el);
        });

        // Contact
        document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
            revealObserver.observe(el);
        });
    }, 100);

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    setTimeout(() => {
        document.querySelectorAll('.stat-value').forEach(el => {
            statsObserver.observe(el);
        });
    }, 100);
}

function animateCounter(element) {
    const target = element.getAttribute('data-target');
    const number = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[0-9]/g, '');

    if (isNaN(number)) return;

    let current = 0;
    const increment = number / 60;
    const duration = 1500;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// =================================================================
// PARALLAX EFFECTS
// =================================================================

function initializeParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;

    // Hero parallax layers
    const layerBg = document.querySelector('.layer-bg');
    const layerMid = document.querySelector('.layer-mid');
    const layerFront = document.querySelector('.layer-front');

    if (layerBg && scrolled < window.innerHeight) {
        layerBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (layerMid && scrolled < window.innerHeight) {
        layerMid.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (layerFront && scrolled < window.innerHeight) {
        layerFront.style.transform = `translateY(${scrolled * 0.2}px)`;
    }

    // Hide scroll indicator when scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
}

// =================================================================
// SCROLL PROGRESS INDICATOR
// =================================================================

function initializeScrollProgress() {
    const progressBar = document.querySelector('.nav-progress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // Update navbar styling on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =================================================================
// HORIZONTAL SCROLL SECTION
// =================================================================

function initializeHorizontalScroll() {
    // Experience section is now naturally scrollable
    // No JavaScript needed for basic horizontal scroll
    // But we can add smooth scroll hint behavior

    const scrollHint = document.querySelector('.scroll-hint');
    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');

    if (horizontalWrapper && scrollHint) {
        horizontalWrapper.addEventListener('scroll', () => {
            if (horizontalWrapper.scrollLeft > 50) {
                scrollHint.style.opacity = '0';
            } else {
                scrollHint.style.opacity = '1';
            }
        });
    }
}

// =================================================================
// NAVIGATION
// =================================================================

// Mobile menu toggle
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
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
    }
}

// Smooth scrolling for anchor links
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
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =================================================================
// CONTACT FORM HANDLING
// =================================================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Show success message
        const btn = contactForm.querySelector('.btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}
