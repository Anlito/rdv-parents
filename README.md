# Rendez-vous parents-professeur principal

Petit outil pour la rencontre parents-professeurs du collège Pont Rousseau.

- `index.html` : formulaire pour les parents (prénom de l'élève, tranches horaires de 30 min à partir de 17h30, précisions).
- `prof.html` : page du professeur principal. Elle lit les réponses avec une clé et propose un planning de rendez-vous de 10 minutes, modifiable à la main.
- `Code.gs` : script Google Apps Script qui enregistre les réponses dans un Google Sheet.
- `config.js` : adresse du script, dates et tranches proposées.

## Installation (une seule fois, environ 5 minutes)

1. Créez un Google Sheet vide (par exemple « RDV parents 17 novembre »).
2. Menu **Extensions > Apps Script**. Effacez le contenu et collez celui de `Code.gs`.
3. Remplacez `changez-moi` par votre propre clé, puis enregistrez.
4. **Déployer > Nouveau déploiement** > type **Application Web** :
   - Exécuter en tant que : **Moi**
   - Qui peut accéder : **Tout le monde**
5. Autorisez l'accès quand Google le demande (« Paramètres avancés » puis « Accéder au projet » si un avertissement s'affiche).
6. Copiez l'adresse de l'application Web (elle se termine par `/exec`) dans `config.js`, champ `scriptUrl`.

Les réponses arrivent dans l'onglet « Réponses » du Sheet. Si vous modifiez `Code.gs` plus tard, faites **Gérer les déploiements > Modifier > Nouvelle version** pour garder la même adresse.

## Pour une autre réunion

Modifiez `reunion`, `limite` et `tranches` dans `config.js`, puis videz l'onglet « Réponses » (gardez la ligne de titres).
