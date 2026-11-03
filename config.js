// Adresse de l'application Web Google Apps Script (se termine par /exec). Voir README.md.
window.RDV_CONFIG = {
  scriptUrl: 'https://script.google.com/macros/s/AKfycbzPKI1zTlCRXdQbdkZ1zUdhLfJBEmCOiFRYQpfKBX5sqU3sJPSXIMJkVIV3EA-EdF-Z/exec',
  reunion: 'mardi 17 novembre 2026',
  limite: 'lundi 9 novembre 2026',
  // Tranches proposées aux parents (le professeur principal n'est pas disponible avant 17h30)
  tranches: [
    { id: '17h30-18h00', debut: '17:30', fin: '18:00' },
    { id: '18h00-18h30', debut: '18:00', fin: '18:30' },
    { id: '18h30-19h00', debut: '18:30', fin: '19:00' },
    { id: '19h00-19h30', debut: '19:00', fin: '19:30' },
    { id: '19h30-20h00', debut: '19:30', fin: '20:00' }
  ]
};
