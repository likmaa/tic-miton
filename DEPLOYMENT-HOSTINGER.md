# Configuration CI/CD - Déploiement Automatique sur Hostinger

## 🚀 Setup GitHub Actions pour Hostinger

Ce workflow déploie automatiquement le site sur Hostinger à chaque push sur `main`.

### Étape 1: Obtenir les Identifiants FTP Hostinger

1. **Connexion à Hostinger hPanel:**
   - Aller sur [hpanel.hostinger.com](https://hpanel.hostinger.com)

2. **Accéder aux comptes FTP:**
   - File Manager → FTP Accounts
   - Créer un nouveau compte FTP (ou utiliser l'existant)

3. **Noter les informations:**
   ```
   Server (Host): ftp.ticmiton.com (ou l'IP fournie)
   Username: votre_username_ftp (ex: u123456789)
   Password: votre_mot_de_passe
   Port: 21
   ```

### Étape 2: Configurer les Secrets GitHub

1. **Aller sur GitHub:**
   - Repository: `likmaa/tic-miton`
   - Settings → Secrets and variables → Actions

2. **Ajouter 3 Repository Secrets:**

   **Secret 1: FTP_SERVER**
   ```
   Name: FTP_SERVER
   Value: ftp.ticmiton.com
   ```
   (ou l'IP type `123.45.67.89`)

   **Secret 2: FTP_USERNAME**
   ```
   Name: FTP_USERNAME
   Value: votre_username_ftp
   ```

   **Secret 3: FTP_PASSWORD**
   ```
   Name: FTP_PASSWORD
   Value: votre_mot_de_passe_ftp
   ```

3. **Sauvegarder les secrets**

### Étape 3: Activer le Workflow

1. **Commit et push le workflow:**
   ```bash
   git add .github/workflows/deploy-hostinger.yml
   git commit -m "ci: Add GitHub Actions workflow for Hostinger deployment"
   git push origin main
   ```

2. **Vérifier l'exécution:**
   - GitHub → Repository → Actions
   - Vous verrez le workflow "Deploy to Hostinger" en cours
   - Durée estimée: 3-5 minutes

### Étape 4: Déploiements Futurs (Automatiques)

Désormais, **à chaque commit sur `main`** :

1. GitHub Actions:
   - ✅ Installe les dépendances (`npm ci`)
   - ✅ Build le projet (`npm run build`)
   - ✅ Crée le `.htaccess` automatiquement
   - ✅ Upload tout vers Hostinger via FTP
   - ✅ Nettoie les anciens fichiers (`dangerous-clean-slate`)

2. Votre site est mis à jour automatiquement !

### Workflow Manuel (Si Besoin)

Vous pouvez aussi déclencher manuellement le déploiement:

1. GitHub → Actions → Deploy to Hostinger
2. Cliquer "Run workflow"
3. Sélectionner branche `main`
4. Cliquer "Run workflow"

---

## ⚠️ Important

### Sécurité FTP
- **Ne jamais** committer les identifiants FTP dans le code
- Toujours utiliser GitHub Secrets
- Changer le mot de passe FTP régulièrement

### Premier Déploiement
Si c'est le premier déploiement:
1. Vérifier que `public_html/` est vide (ou sauvegarder)
2. `dangerous-clean-slate: true` supprime tout avant upload
3. Ajuster si nécessaire dans le workflow

### Logs & Debugging
- GitHub Actions → Onglet "Actions" → Voir les logs
- En cas d'erreur FTP: vérifier server/username/password
- Tester connexion FTP manuellement avec FileZilla

---

## 🎯 Avantages CI/CD

✅ **Déploiement automatique** à chaque push  
✅ **Pas de build local** requis  
✅ **Historique des déploiements** (GitHub Actions)  
✅ **Rollback facile** (revert commit)  
✅ **Consistent builds** (même environnement Node.js)  
✅ **Zero downtime** (upload direct FTP)

---

## 🔄 Workflow Complet

```
Local Dev → Git Commit → Git Push → GitHub Actions
                                         ↓
                                    npm install
                                         ↓
                                    npm run build
                                         ↓
                                    Create .htaccess
                                         ↓
                                    FTP Upload → Hostinger
                                         ↓
                                    ✅ Site Live!
```

---

**Le CI/CD est maintenant configuré ! Plus besoin d'upload manuel via FTP. 🚀**
