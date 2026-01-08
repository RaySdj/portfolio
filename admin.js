// Security Configuration
const ADMIN_PASSWORD_HASH = 'e99a18c428cb38d5f260853678922e03'; // MD5 hash of "admin123" (CHANGE THIS!)
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

// Simple MD5 hash function (for demo purposes - use bcrypt in production)
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if user is authenticated
function isAuthenticated() {
    const authData = localStorage.getItem('adminAuth');
    if (!authData) return false;

    const { timestamp } = JSON.parse(authData);
    const now = Date.now();

    // Check if session expired
    if (now - timestamp > SESSION_DURATION) {
        localStorage.removeItem('adminAuth');
        return false;
    }

    return true;
}

// Authenticate user
async function authenticate(password) {
    const hashedPassword = await hashPassword(password);

    // Compare with stored hash
    if (hashedPassword === ADMIN_PASSWORD_HASH) {
        localStorage.setItem('adminAuth', JSON.stringify({
            timestamp: Date.now(),
            authenticated: true
        }));
        return true;
    }
    return false;
}

// Logout
function logout() {
    localStorage.removeItem('adminAuth');
    document.getElementById('adminPanel').classList.remove('active');
    alert('Vous avez été déconnecté.');
}

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('loginPassword').focus();
    }
}

// Hide login modal
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginError').style.display = 'none';
    }
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const password = document.getElementById('loginPassword').value;
    const errorMsg = document.getElementById('loginError');

    if (await authenticate(password)) {
        hideLoginModal();
        document.getElementById('adminPanel').classList.add('active');
        loadAdminData();
    } else {
        errorMsg.textContent = 'Mot de passe incorrect!';
        errorMsg.style.display = 'block';
        document.getElementById('loginPassword').value = '';
    }
}

// Default Portfolio Configuration
const defaultConfig = {
    personal: {
        name: "Your Name",
        title: "Cybersecurity & Intelligence Professional",
        description: "Protecting digital assets and analyzing threats with expertise in penetration testing, threat intelligence, and security operations.",
        email: "your.email@example.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourhandle"
    },
    about: {
        lead: "Cybersecurity professional with expertise in threat intelligence, penetration testing, and security operations.",
        paragraphs: [
            "With a strong background in both offensive and defensive security, I specialize in identifying vulnerabilities, analyzing threat actors, and implementing robust security solutions.",
            "I am passionate about staying ahead of emerging threats and continuously developing skills to protect organizations from sophisticated cyber attacks."
        ],
        stats: [
            { icon: "fas fa-briefcase", number: "5+", label: "Years Experience" },
            { icon: "fas fa-project-diagram", number: "50+", label: "Projects Completed" },
            { icon: "fas fa-certificate", number: "10+", label: "Certifications" }
        ]
    },
    experience: [
        {
            title: "Senior Cybersecurity Analyst",
            company: "Company Name",
            period: "2022 - Present",
            responsibilities: [
                "Lead threat hunting operations and incident response activities",
                "Conduct advanced penetration testing and vulnerability assessments",
                "Develop and implement security policies and procedures"
            ]
        },
        {
            title: "Threat Intelligence Analyst",
            company: "Company Name",
            period: "2020 - 2022",
            responsibilities: [
                "Analyzed threat actor TTPs and produced intelligence reports",
                "Monitored dark web and underground forums for emerging threats",
                "Implemented MITRE ATT&CK framework for threat mapping"
            ]
        }
    ],
    skills: {
        categories: [
            {
                icon: "fas fa-user-secret",
                title: "Offensive Security",
                skills: ["Penetration Testing", "Exploit Development", "Web Application Security"]
            },
            {
                icon: "fas fa-shield-alt",
                title: "Defensive Security",
                skills: ["Incident Response", "Threat Hunting", "SIEM & Log Analysis"]
            }
        ],
        certifications: ["OSCP", "CISSP", "CEH", "GCIH", "Security+"]
    },
    projects: [
        {
            icon: "fas fa-network-wired",
            title: "Advanced Threat Detection System",
            description: "Developed a machine learning-based threat detection system that reduced false positives by 60%.",
            tags: ["Python", "ML", "SIEM"],
            link: "#"
        },
        {
            icon: "fas fa-bug",
            title: "Red Team Operations",
            description: "Conducted comprehensive red team assessment for Fortune 500 company.",
            tags: ["Pentesting", "Social Engineering", "OSINT"],
            link: "#"
        }
    ],
    contact: {
        description: "Interested in collaborating or discussing cybersecurity opportunities? Feel free to reach out."
    }
};

// Get config from localStorage or use default
function getConfig() {
    const saved = localStorage.getItem('portfolioConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
}

// Save config to localStorage
function saveConfig(config) {
    localStorage.setItem('portfolioConfig', JSON.stringify(config));
}

// Admin Panel Toggle (with authentication)
document.getElementById('adminToggle').addEventListener('click', () => {
    if (isAuthenticated()) {
        document.getElementById('adminPanel').classList.add('active');
        loadAdminData();
    } else {
        showLoginModal();
    }
});

document.getElementById('closeAdmin').addEventListener('click', () => {
    document.getElementById('adminPanel').classList.remove('active');
});

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update sections
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active');
    });
});

// Load Admin Data
function loadAdminData() {
    const config = getConfig();

    // Personal Info
    document.getElementById('edit-name').value = config.personal.name;
    document.getElementById('edit-title').value = config.personal.title;
    document.getElementById('edit-description').value = config.personal.description;
    document.getElementById('edit-email').value = config.personal.email;
    document.getElementById('edit-linkedin').value = config.personal.linkedin;
    document.getElementById('edit-github').value = config.personal.github;
    document.getElementById('edit-twitter').value = config.personal.twitter;

    // About
    document.getElementById('edit-about-lead').value = config.about.lead;
    document.getElementById('edit-about-paragraphs').value = config.about.paragraphs.join('\n');
    loadStats(config.about.stats);

    // Experience
    loadExperience(config.experience);

    // Skills
    loadSkills(config.skills);
    document.getElementById('edit-certifications').value = config.skills.certifications.join(', ');

    // Projects
    loadProjects(config.projects);

    // Contact
    document.getElementById('edit-contact-description').value = config.contact.description;
}

// Load Stats
function loadStats(stats) {
    const container = document.getElementById('stats-list');
    container.innerHTML = '';

    stats.forEach((stat, index) => {
        const div = document.createElement('div');
        div.className = 'edit-item';
        div.innerHTML = `
            <div class="edit-item-header">
                <h5>Stat ${index + 1}</h5>
                <button class="btn-remove" onclick="removeStat(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="form-group">
                <label>Icon (Font Awesome class)</label>
                <input type="text" class="stat-icon" value="${stat.icon}" placeholder="fas fa-briefcase">
            </div>
            <div class="form-group">
                <label>Number</label>
                <input type="text" class="stat-number" value="${stat.number}" placeholder="5+">
            </div>
            <div class="form-group">
                <label>Label</label>
                <input type="text" class="stat-label" value="${stat.label}" placeholder="Years Experience">
            </div>
        `;
        container.appendChild(div);
    });
}

function addStat() {
    const config = getConfig();
    config.about.stats.push({ icon: "fas fa-star", number: "0", label: "New Stat" });
    saveConfig(config);
    loadStats(config.about.stats);
}

function removeStat(index) {
    const config = getConfig();
    config.about.stats.splice(index, 1);
    saveConfig(config);
    loadStats(config.about.stats);
}

// Load Experience
function loadExperience(experience) {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';

    experience.forEach((exp, index) => {
        const div = document.createElement('div');
        div.className = 'edit-item';
        div.innerHTML = `
            <div class="edit-item-header">
                <h5>Experience ${index + 1}</h5>
                <button class="btn-remove" onclick="removeExperience(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" value="${exp.title}">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" value="${exp.company}">
            </div>
            <div class="form-group">
                <label>Period</label>
                <input type="text" class="exp-period" value="${exp.period}">
            </div>
            <div class="form-group">
                <label>Responsibilities (one per line)</label>
                <textarea class="exp-responsibilities" rows="4">${exp.responsibilities.join('\n')}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

function addExperience() {
    const config = getConfig();
    config.experience.push({
        title: "New Position",
        company: "Company Name",
        period: "2024 - Present",
        responsibilities: ["Responsibility 1", "Responsibility 2"]
    });
    saveConfig(config);
    loadExperience(config.experience);
}

function removeExperience(index) {
    const config = getConfig();
    config.experience.splice(index, 1);
    saveConfig(config);
    loadExperience(config.experience);
}

// Load Skills
function loadSkills(skills) {
    const container = document.getElementById('skills-categories-list');
    container.innerHTML = '';

    skills.categories.forEach((category, index) => {
        const div = document.createElement('div');
        div.className = 'edit-item';
        div.innerHTML = `
            <div class="edit-item-header">
                <h5>Category ${index + 1}</h5>
                <button class="btn-remove" onclick="removeSkillCategory(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="form-group">
                <label>Icon (Font Awesome class)</label>
                <input type="text" class="skill-cat-icon" value="${category.icon}">
            </div>
            <div class="form-group">
                <label>Category Title</label>
                <input type="text" class="skill-cat-title" value="${category.title}">
            </div>
            <div class="form-group">
                <label>Skills (comma-separated)</label>
                <input type="text" class="skill-cat-skills" value="${category.skills.join(', ')}">
            </div>
        `;
        container.appendChild(div);
    });
}

function addSkillCategory() {
    const config = getConfig();
    config.skills.categories.push({
        icon: "fas fa-code",
        title: "New Category",
        skills: ["Skill 1", "Skill 2"]
    });
    saveConfig(config);
    loadSkills(config.skills);
}

function removeSkillCategory(index) {
    const config = getConfig();
    config.skills.categories.splice(index, 1);
    saveConfig(config);
    loadSkills(config.skills);
}

// Load Projects
function loadProjects(projects) {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const div = document.createElement('div');
        div.className = 'edit-item';
        div.innerHTML = `
            <div class="edit-item-header">
                <h5>Project ${index + 1}</h5>
                <button class="btn-remove" onclick="removeProject(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="form-group">
                <label>Icon (Font Awesome class)</label>
                <input type="text" class="project-icon" value="${project.icon}">
            </div>
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" class="project-title" value="${project.title}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-description" rows="3">${project.description}</textarea>
            </div>
            <div class="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" class="project-tags" value="${project.tags.join(', ')}">
            </div>
            <div class="form-group">
                <label>Link</label>
                <input type="text" class="project-link" value="${project.link}">
            </div>
        `;
        container.appendChild(div);
    });
}

function addProject() {
    const config = getConfig();
    config.projects.push({
        icon: "fas fa-project-diagram",
        title: "New Project",
        description: "Project description here...",
        tags: ["Tag1", "Tag2"],
        link: "#"
    });
    saveConfig(config);
    loadProjects(config.projects);
}

function removeProject(index) {
    const config = getConfig();
    config.projects.splice(index, 1);
    saveConfig(config);
    loadProjects(config.projects);
}

// Save All Changes
function saveAllChanges() {
    const config = getConfig();

    // Personal
    config.personal.name = document.getElementById('edit-name').value;
    config.personal.title = document.getElementById('edit-title').value;
    config.personal.description = document.getElementById('edit-description').value;
    config.personal.email = document.getElementById('edit-email').value;
    config.personal.linkedin = document.getElementById('edit-linkedin').value;
    config.personal.github = document.getElementById('edit-github').value;
    config.personal.twitter = document.getElementById('edit-twitter').value;

    // About
    config.about.lead = document.getElementById('edit-about-lead').value;
    config.about.paragraphs = document.getElementById('edit-about-paragraphs').value.split('\n').filter(p => p.trim());

    // Stats
    const statItems = document.querySelectorAll('#stats-list .edit-item');
    config.about.stats = Array.from(statItems).map(item => ({
        icon: item.querySelector('.stat-icon').value,
        number: item.querySelector('.stat-number').value,
        label: item.querySelector('.stat-label').value
    }));

    // Experience
    const expItems = document.querySelectorAll('#experience-list .edit-item');
    config.experience = Array.from(expItems).map(item => ({
        title: item.querySelector('.exp-title').value,
        company: item.querySelector('.exp-company').value,
        period: item.querySelector('.exp-period').value,
        responsibilities: item.querySelector('.exp-responsibilities').value.split('\n').filter(r => r.trim())
    }));

    // Skills
    const skillItems = document.querySelectorAll('#skills-categories-list .edit-item');
    config.skills.categories = Array.from(skillItems).map(item => ({
        icon: item.querySelector('.skill-cat-icon').value,
        title: item.querySelector('.skill-cat-title').value,
        skills: item.querySelector('.skill-cat-skills').value.split(',').map(s => s.trim()).filter(s => s)
    }));

    config.skills.certifications = document.getElementById('edit-certifications').value.split(',').map(c => c.trim()).filter(c => c);

    // Projects
    const projectItems = document.querySelectorAll('#projects-list .edit-item');
    config.projects = Array.from(projectItems).map(item => ({
        icon: item.querySelector('.project-icon').value,
        title: item.querySelector('.project-title').value,
        description: item.querySelector('.project-description').value,
        tags: item.querySelector('.project-tags').value.split(',').map(t => t.trim()).filter(t => t),
        link: item.querySelector('.project-link').value
    }));

    // Contact
    config.contact.description = document.getElementById('edit-contact-description').value;

    // Save and reload
    saveConfig(config);
    location.reload();
}

// Export Config
function exportConfig() {
    const config = getConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-config.json';
    link.click();
}

// Import Config
function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const config = JSON.parse(e.target.result);
            saveConfig(config);
            alert('Configuration imported successfully!');
            location.reload();
        } catch (error) {
            alert('Error importing configuration. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Reset to Defaults
function resetToDefaults() {
    if (confirm('Are you sure you want to reset to default configuration? This will erase all your changes.')) {
        localStorage.removeItem('portfolioConfig');
        location.reload();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadAdminData);
