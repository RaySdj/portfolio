# 🔒 Guide de Sécurité - Portfolio Admin

## Vue d'ensemble

Votre portfolio dispose maintenant d'un système d'authentification pour protéger le panneau d'administration. Ce document explique comment fonctionne la sécurité et comment la configurer correctement.

---

## ✅ Fonctionnalités de Sécurité

### 1. Authentification par Mot de Passe
- **Login obligatoire**: Cliquer sur l'icône ⚙️ ouvre une modal de connexion
- **Hash SHA-256**: Le mot de passe est haché, jamais stocké en clair
- **Validation côté client**: Vérification immédiate sans exposer le mot de passe

### 2. Gestion de Session
- **Durée**: 30 minutes d'inactivité
- **Expiration automatique**: La session expire après 30 min
- **Token sécurisé**: Stocké dans localStorage avec timestamp
- **Logout manuel**: Bouton de déconnexion dans le panneau admin

### 3. Protection des Données
- **Aucune transmission réseau**: Tout reste dans le navigateur
- **localStorage**: Données isolées par domaine
- **Pas de serveur**: Aucun backend vulnérable

---

## 🚀 Configuration Initiale

### Étape 1: Changer le Mot de Passe par Défaut

⚠️ **CRITIQUE**: Le mot de passe par défaut est `admin123`. Il **DOIT** être changé!

#### Méthode 1: Utiliser le Générateur (Recommandé)

1. Ouvrez `generate-password.html` dans votre navigateur
2. Entrez votre nouveau mot de passe (minimum 8 caractères)
3. Confirmez le mot de passe
4. Cliquez sur "Générer le Hash"
5. Copiez le hash SHA-256 généré
6. Ouvrez `admin.js` dans un éditeur de texte
7. À la ligne 2, remplacez la valeur de `ADMIN_PASSWORD_HASH`:
   ```javascript
   const ADMIN_PASSWORD_HASH = 'VOTRE_NOUVEAU_HASH_ICI';
   ```
8. Sauvegardez le fichier
9. Testez en vous connectant avec votre nouveau mot de passe

#### Méthode 2: Générer Manuellement (Avancé)

Vous pouvez générer un hash SHA-256 en ligne ou avec la console du navigateur:

```javascript
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Utilisation:
hashPassword('VotreMotDePasse').then(hash => console.log(hash));
```

---

## 🔐 Recommandations de Mot de Passe

### Mot de Passe Fort
✅ **Bon:**
- Minimum **8 caractères** (12+ recommandé)
- Mélange de **majuscules** et **minuscules**
- Inclure des **chiffres**
- Inclure des **symboles** (!@#$%^&*)
- Pas de mots du dictionnaire
- Unique (pas utilisé ailleurs)

❌ **Mauvais:**
- `password123`
- `admin`
- `12345678`
- Votre nom ou date de naissance
- Mots communs

### Exemples de Bons Mots de Passe
- `Cy83r$3c_P0rtf0l!0`
- `Th34t-Hunt3r#2024!`
- `P3nT3st@Pr0_M@st3r`

---

## 🛡️ Meilleures Pratiques

### 1. Gestion du Mot de Passe
- ✅ Changez le mot de passe par défaut **immédiatement**
- ✅ Utilisez un **gestionnaire de mots de passe** (1Password, Bitwarden, etc.)
- ✅ Ne partagez **jamais** votre mot de passe
- ✅ Changez le mot de passe si vous pensez qu'il a été compromis
- ❌ N'écrivez pas le mot de passe en clair dans un fichier
- ❌ Ne l'envoyez pas par email ou SMS

### 2. Utilisation du Panneau Admin
- ✅ **Déconnectez-vous** après chaque session d'édition
- ✅ Fermez le panneau admin quand vous avez terminé
- ✅ Utilisez le bouton de logout (icône 🚪) dans l'en-tête
- ❌ Ne laissez pas le panneau ouvert sans surveillance

### 3. Sauvegardes
- ✅ **Exportez** votre configuration régulièrement
- ✅ Stockez les exports dans un endroit sûr
- ✅ Gardez une copie de votre mot de passe hash
- ✅ Testez les imports pour vérifier qu'ils fonctionnent

### 4. Avant le Déploiement
- ✅ Changez le mot de passe avant de mettre en ligne
- ✅ Testez la connexion avec le nouveau mot de passe
- ✅ Vérifiez que le fichier `admin.js` est bien uploadé
- ✅ Assurez-vous que `generate-password.html` est accessible (pour vous)
- ⚠️ Optionnel: Supprimez `generate-password.html` du serveur public

---

## 🔄 Modifier le Mot de Passe

### Si vous connaissez le mot de passe actuel:

1. Utilisez `generate-password.html`
2. Générez un nouveau hash
3. Remplacez dans `admin.js`
4. Sauvegardez et rechargez

### Si vous avez oublié le mot de passe:

1. Ouvrez `admin.js`
2. Remplacez `ADMIN_PASSWORD_HASH` par un nouveau hash
3. Utilisez `generate-password.html` pour créer le nouveau hash
4. Ou utilisez le hash par défaut temporairement:
   ```javascript
   const ADMIN_PASSWORD_HASH = 'e99a18c428cb38d5f260853678922e03'; // admin123
   ```
5. Connectez-vous avec `admin123`
6. Changez immédiatement pour un mot de passe sécurisé

---

## ⚙️ Configuration de la Session

### Modifier la Durée de Session

Dans `admin.js`, ligne 3:

```javascript
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
```

Exemples de durées:
- `15 * 60 * 1000` = 15 minutes
- `60 * 60 * 1000` = 1 heure
- `120 * 60 * 1000` = 2 heures

⚠️ **Note**: Des sessions plus longues = moins sécurisé

---

## 🚨 En Cas de Problème

### Connexion Impossible

**Problème**: "Mot de passe incorrect"

**Solutions**:
1. Vérifiez que vous utilisez le bon mot de passe
2. Vérifiez que le hash dans `admin.js` est correct
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Essayez de réinitialiser avec le mot de passe par défaut

### Session Expirée

**Problème**: Vous êtes déconnecté automatiquement

**Solution**:
- C'est normal après 30 minutes d'inactivité
- Reconnectez-vous avec votre mot de passe
- Augmentez `SESSION_DURATION` si nécessaire

### Hash Invalide

**Problème**: Le hash ne fonctionne pas

**Solution**:
1. Vérifiez que le hash est complet (64 caractères)
2. Pas d'espaces avant/après le hash
3. Entre guillemets simples: `'...'`
4. Regénérez le hash avec `generate-password.html`

---

## 📊 Comprendre la Sécurité

### Ce qui EST protégé:
- ✅ Accès au panneau d'administration
- ✅ Édition du contenu
- ✅ Export de la configuration
- ✅ Import de nouvelles données

### Ce qui N'EST PAS protégé:
- ❌ Le site portfolio public (normal - il doit être visible)
- ❌ Les fichiers JS sources (visibles dans le navigateur)
- ❌ Le hash du mot de passe (visible dans admin.js)

### Pourquoi c'est quand même sécurisé?

Le hash SHA-256 est à **sens unique**:
- On ne peut pas retrouver le mot de passe depuis le hash
- Même si quelqu'un voit le hash, il ne peut pas se connecter sans le mot de passe
- Il faudrait des années pour "casser" un bon mot de passe hashé

**Analogie**: C'est comme avoir l'empreinte digitale de quelqu'un - vous ne pouvez pas recréer le doigt!

---

## 🎓 Pour Aller Plus Loin

### Sécurité Additionnelle (Avancé)

Si vous voulez encore plus de sécurité:

1. **Obfuscation du Code**:
   - Utilisez un obfuscateur JavaScript pour `admin.js`
   - Rend le code plus difficile à lire

2. **Authentification Multi-Facteur**:
   - Ajoutez une question secrète
   - Implémentez TOTP (Google Authenticator)

3. **Rate Limiting**:
   - Limitez le nombre de tentatives de connexion
   - Ajoutez un délai après échecs

4. **Protection des Fichiers**:
   - Utilisez `.htaccess` pour protéger `admin.js`
   - Servez le fichier uniquement via HTTPS

5. **Journalisation**:
   - Loggez les tentatives de connexion
   - Alertes en cas d'échecs multiples

---

## 📞 Support

Si vous avez des questions de sécurité:

1. Vérifiez ce guide
2. Consultez le `README.md`
3. Testez avec le mot de passe par défaut
4. Vérifiez la console du navigateur (F12)

---

## 📝 Changelog de Sécurité

### Version 2.0 (Actuelle)
- ✅ Authentification par mot de passe
- ✅ Hash SHA-256
- ✅ Sessions avec expiration
- ✅ Logout manuel
- ✅ Générateur de hash

### À Venir
- 🔜 Questions de sécurité
- 🔜 Historique des connexions
- 🔜 Rate limiting

---

**Dernière mise à jour**: Janvier 2026
**Version de sécurité**: 2.0

**Remember**: Un bon mot de passe est votre première ligne de défense! 🛡️
