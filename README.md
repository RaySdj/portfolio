# Cybersecurity Portfolio v2 - With Admin Panel

A fully responsive, modern portfolio website for cybersecurity professionals with a built-in admin panel for easy content management. **No coding required to edit content!**

## 🌟 Key Features

### Admin Panel (Option 3) - 🔒 SÉCURISÉ
- **Protection par Mot de Passe**: Authentification requise pour accéder au panneau admin
- **Session Sécurisée**: Expiration automatique après 30 minutes d'inactivité
- **Hash SHA-256**: Les mots de passe sont hashés, jamais stockés en clair
- **Visual Editor**: Click the gear icon to open the admin panel
- **No Backend Required**: All data stored in browser's localStorage
- **Drag-and-Drop Editing**: Easy-to-use forms for all content
- **Real-time Updates**: See changes instantly after saving
- **Import/Export**: Backup and restore your configuration
- **Mobile-Friendly Admin**: Works on all devices

### Fully Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px
- **Flexible Layouts**: Grid and flexbox with automatic wrapping
- **Touch-Friendly**: Large buttons and easy navigation on mobile

### Professional Features
- Matrix rain animation background
- Smooth scroll navigation
- Animated section reveals
- Interactive stats counter
- Hover effects and transitions
- Modern cybersecurity theme

## 🚀 Quick Start

1. **Open the Portfolio**
   - Double-click `index.html` or
   - Serve with a local server

2. **Change the Default Password (IMPORTANT!)**
   - Open `generate-password.html` in your browser
   - Enter your new secure password
   - Copy the generated hash
   - Open `admin.js` and replace the `ADMIN_PASSWORD_HASH` value (line 2)
   - Save the file

3. **Edit Your Content**
   - Click the **gear icon** (⚙️) in bottom-right corner
   - Enter your password (default: `admin123`)
   - Edit your information in the admin panel
   - Click **Save Changes**
   - Page will reload with your updates

4. **Deploy**
   - Copy all files to your web server
   - Or use GitHub Pages, Netlify, Vercel, etc.

## 📝 How to Edit Content

### Using the Admin Panel

#### 1. Personal Information Tab
- **Name**: Your full name (appears in hero and navigation)
- **Title**: Professional title/tagline
- **Description**: Brief introduction
- **Email, LinkedIn, GitHub, Twitter**: Your contact links

#### 2. About Tab
- **Lead Text**: Main headline in about section
- **Paragraphs**: Enter each paragraph on a new line
- **Statistics**: Add/remove stats boxes
  - Icon: Font Awesome class (e.g., `fas fa-briefcase`)
  - Number: Display value (e.g., `5+`)
  - Label: Description (e.g., `Years Experience`)

#### 3. Experience Tab
- **Add Experience**: Click "+ Add Experience" button
- Fill in:
  - Job Title
  - Company Name
  - Period (e.g., `2022 - Present`)
  - Responsibilities (one per line)
- **Remove**: Click trash icon on any experience

#### 4. Skills Tab
- **Add Category**: Click "+ Add Category"
- Fill in:
  - Icon: Font Awesome class
  - Category Title (e.g., `Offensive Security`)
  - Skills: Comma-separated list
- **Certifications**: Comma-separated list at bottom

#### 5. Projects Tab
- **Add Project**: Click "+ Add Project"
- Fill in:
  - Icon: Font Awesome class
  - Title
  - Description
  - Tags: Comma-separated
  - Link: URL or `#` for no link

#### 6. Contact Tab
- Edit the contact section description

### Admin Panel Buttons

- **💾 Save Changes**: Apply all edits and reload page
- **📥 Export Config**: Download your configuration as JSON
- **📤 Import Config**: Upload a previously exported configuration
- **🔄 Reset to Defaults**: Restore original demo content

## 🎨 Finding Icons

All icons use [Font Awesome 6](https://fontawesome.com/icons):

1. Visit https://fontawesome.com/icons
2. Search for an icon (e.g., "shield", "lock", "bug")
3. Copy the class name (e.g., `fas fa-shield-alt`)
4. Paste into icon field in admin panel

**Popular Cybersecurity Icons:**
- `fas fa-shield-alt` - Shield
- `fas fa-user-secret` - Hacker
- `fas fa-bug` - Bug/Vulnerability
- `fas fa-network-wired` - Network
- `fas fa-lock` - Security
- `fas fa-virus` - Malware
- `fas fa-skull-crossbones` - Threat
- `fas fa-eye` - Monitoring
- `fas fa-key` - Access
- `fas fa-fingerprint` - Biometrics

## 📱 Responsive Features

### Mobile Optimizations
- Hamburger menu navigation
- Full-width buttons
- Single-column layouts
- Touch-friendly tap targets (44px minimum)
- Optimized font sizes with `clamp()`

### Tablet Optimizations
- Two-column layouts where appropriate
- Balanced grid systems
- Medium-sized navigation

### Desktop Features
- Multi-column grids
- Split timeline view
- Hover effects
- Parallax scrolling

## 💾 Data Storage

Your portfolio data is stored in your browser's **localStorage**:

- **Location**: Browser's local storage (not server)
- **Persistence**: Data remains after closing browser
- **Privacy**: Only accessible from same domain
- **Clearing**: Cleared if you clear browser data
- **Backup**: Use Export button to save JSON file

### Important Notes
- Data is browser-specific (Chrome data ≠ Firefox data)
- Always export your config before clearing browser data
- Import config on new browsers/computers
- No server or database required

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```
Enable GitHub Pages in repository settings.

### Option 2: Netlify (Free)
1. Drag and drop the `portfolio2` folder to Netlify
2. Site is live instantly

### Option 3: Raspberry Pi
```bash
# Using Nginx (Recommended)
sudo apt update
sudo apt install nginx -y
sudo cp -r portfolio2/* /var/www/html/
sudo systemctl restart nginx

# Using Apache
sudo apt install apache2 -y
sudo cp -r portfolio2/* /var/www/html/
sudo systemctl restart apache2

# Using Python (Testing)
cd portfolio2
python3 -m http.server 8000
```

### Option 4: Any Web Host
Upload all files via FTP/cPanel file manager to public_html

## 🔧 Customization

### Changing Colors
Edit `styles.css`, modify CSS variables:
```css
:root {
    --primary: #00ff88;        /* Main accent color */
    --secondary: #0066ff;       /* Secondary accent */
    --dark-bg: #0a0e27;        /* Background */
    --card-bg: #151b3d;        /* Cards background */
}
```

### Disabling Matrix Effect
In `script.js`, comment out:
```javascript
// initializeMatrix();
```

### Hiding Admin Panel
Remove these lines from `index.html`:
```html
<!-- Remove the gear button -->
<button id="adminToggle" class="admin-toggle">...</button>
<!-- Remove the admin panel div -->
<div id="adminPanel" class="admin-panel">...</div>
<!-- Remove admin.js script -->
<script src="admin.js"></script>
```

## 🐛 Troubleshooting

### Admin Panel Won't Open
- Check browser console (F12) for errors
- Ensure JavaScript is enabled
- Try different browser

### Changes Not Saving
- Check browser allows localStorage
- Try incognito/private mode
- Check browser storage quota

### Page Blank After Save
- Syntax error in entered data
- Check browser console
- Reset to defaults and try again

### Icons Not Showing
- Check internet connection (Font Awesome loads from CDN)
- Verify icon class name is correct
- Check browser console for loading errors

### Responsive Issues
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Check viewport meta tag present

## 📄 File Structure

```
portfolio2/
├── index.html          # Main HTML structure
├── styles.css          # All styles (fully responsive)
├── script.js           # Portfolio rendering & animations
├── admin.js            # Admin panel functionality
└── README.md           # This file
```

## 🔒 Security Notes

### Protection du Panneau d'Administration

✅ **Ce qui est sécurisé:**
- **Authentification par mot de passe** requise pour accéder au panneau admin
- **Hash SHA-256** du mot de passe (jamais stocké en clair)
- **Session avec expiration** automatique après 30 minutes d'inactivité
- **Logout manuel** disponible à tout moment
- Mot de passe par défaut: `admin123` (⚠️ À CHANGER IMMÉDIATEMENT!)

### Comment changer le mot de passe:

1. Ouvrez `generate-password.html` dans votre navigateur
2. Entrez un mot de passe sécurisé (min 8 caractères)
3. Copiez le hash SHA-256 généré
4. Ouvrez `admin.js` et remplacez `ADMIN_PASSWORD_HASH` (ligne 2)
5. Sauvegardez et testez

### Recommandations de Sécurité:

⚠️ **IMPORTANT:**
- **Changez le mot de passe par défaut** dès l'installation!
- Utilisez un mot de passe **fort** (8+ caractères, majuscules, chiffres, symboles)
- Ne partagez **jamais** votre mot de passe ou hash
- Déconnectez-vous après chaque utilisation
- Exportez vos données régulièrement (backup)

### Données:
- Aucune donnée sensible n'est transmise sur le réseau
- Toutes les données restent dans le navigateur (localStorage)
- Pas de code serveur requis
- Pas de base de données nécessaire
- Sûr pour n'importe quel hébergement

## 📊 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Tips

1. **Regular Backups**: Export config weekly
2. **Test Responsiveness**: Use browser dev tools (F12 → Device toolbar)
3. **Optimize Images**: If you add custom images, compress them first
4. **Keep It Simple**: Less is more - don't overload with too many items
5. **Proofread**: Check for typos before saving
6. **Browser Sync**: Use same browser for consistency

## 🆘 Support

If you need help:
1. Check browser console for errors (F12)
2. Export and examine your config JSON
3. Try resetting to defaults
4. Test in different browser

## 📈 Future Enhancements

Possible additions:
- Image upload for profile photo
- Blog section with posts
- Dark/light theme toggle
- Custom color picker in admin
- Markdown support for rich text
- Email integration for contact form

---

**Built with vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies.**
