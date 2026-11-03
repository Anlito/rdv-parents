// Script à coller dans Google Sheets : Extensions > Apps Script.
// Il reçoit les réponses du formulaire parents et les range dans l'onglet « Réponses ».
// La page professeur lit ces réponses avec la clé ci-dessous.

// Choisissez votre propre clé (un mot de passe simple, sans espace).
// Elle ne doit pas être écrite ailleurs que dans ce script.
const CLE_PROF = 'changez-moi';

function doPost(e) {
  const p = (e && e.parameter) || {};
  const prenom = nettoyer(p.prenom, 60);
  const creneaux = nettoyer(p.creneaux, 200);
  const note = nettoyer(p.note, 1000);
  if (!prenom || !creneaux) return json({ ok: false, erreur: 'incomplet' });

  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    feuille().appendRow([new Date(), prenom, creneaux, note]);
  } finally {
    verrou.releaseLock();
  }
  return json({ ok: true });
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (CLE_PROF === 'changez-moi' || p.cle !== CLE_PROF) return json({ ok: false, erreur: 'cle' });
  const lignes = feuille().getDataRange().getValues().slice(1);
  const reponses = lignes
    .filter(l => l[1])
    .map(l => ({
      date: l[0] instanceof Date ? l[0].toISOString() : String(l[0]),
      prenom: String(l[1]).replace(/^'/, ''),
      creneaux: String(l[2]).replace(/^'/, ''),
      note: String(l[3] || '').replace(/^'/, '')
    }));
  return json({ ok: true, reponses: reponses });
}

function feuille() {
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  let f = classeur.getSheetByName('Réponses');
  if (!f) {
    f = classeur.insertSheet('Réponses');
    f.appendRow(['Horodatage', 'Prénom', 'Créneaux', 'Note']);
    f.setFrozenRows(1);
  }
  return f;
}

// Coupe le texte et empêche qu'il soit lu comme une formule par le tableur.
function nettoyer(v, max) {
  const t = String(v || '').trim().slice(0, max);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
