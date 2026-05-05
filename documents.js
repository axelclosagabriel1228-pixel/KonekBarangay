/* ============================================================
   documents.js — Document Request Selection & Submission
   ============================================================ */

const DOC_DATA = {
  clearance: {
    name: 'Barangay Clearance',
    fee:  'PHP 50.00',
    reqs: [
      '1 valid government-issued ID',
      'Accomplished application form',
      'PHP 50.00 processing fee'
    ]
  },
  indigency: {
    name: 'Certificate of Indigency',
    fee:  'Free',
    reqs: [
      'Letter of request stating the purpose',
      '1 valid ID or Barangay ID',
      'Must be a registered barangay resident',
      'Verification by the Barangay Captain'
    ]
  },
  residency: {
    name: 'Certificate of Residency',
    fee:  'PHP 50.00',
    reqs: [
      '1 valid government-issued ID',
      'Proof of address (utility bill or lease contract)',
      'PHP 50.00 processing fee'
    ]
  },
  business: {
    name: 'Business Permit Clearance',
    fee:  'PHP 100.00',
    reqs: [
      'DTI or SEC / CDA Registration',
      'Lease contract or proof of business location',
      '1 valid government-issued ID',
      'PHP 100.00 processing fee'
    ]
  },
  moral: {
    name: 'Good Moral Certificate',
    fee:  'PHP 50.00',
    reqs: [
      '1 valid government-issued ID',
      'Purpose / endorsement letter',
      '1×1 ID picture (2 copies)',
      'PHP 50.00 processing fee'
    ]
  },
  id: {
    name: 'Barangay ID',
    fee:  'Free',
    reqs: [
      'Proof of residency (utility bill or lease)',
      '1 valid government-issued ID',
      '2×2 ID picture (2 copies)',
      'Accomplished application form (free)'
    ]
  }
};

let _selectedDoc = null;

/* ── SELECT DOCUMENT ── */
function selectDoc(el, key) {
  _selectedDoc = key;
  const doc = DOC_DATA[key];

  // Highlight selected card
  document.querySelectorAll('.doc-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');

  // Show requirements
  document.getElementById('doc-reqs-title').textContent = 'Requirements — ' + doc.name;
  document.getElementById('doc-reqs-list').innerHTML = doc.reqs.map(r => `<li>${r}</li>`).join('');
  document.getElementById('doc-fee-pill').textContent = '💰 Fee: ' + doc.fee;
  document.getElementById('doc-reqs-box').style.display = 'block';

  // Show form
  document.getElementById('doc-form-title').textContent = 'Request: ' + doc.name;
  document.getElementById('doc-form-sec').style.display  = 'block';
  document.getElementById('doc-placeholder').style.display = 'none';
  document.getElementById('doc-success').style.display   = 'none';
}

/* ── SUBMIT ── */
function submitDoc() {
  const name    = document.getElementById('doc-name').value.trim();
  const addr    = document.getElementById('doc-addr').value.trim();
  const phone   = document.getElementById('doc-phone').value.trim();
  const purpose = document.getElementById('doc-purpose').value.trim();

  if (!name || !addr || !phone || !purpose) {
    alert('Please fill in all required fields.');
    return;
  }

  document.getElementById('doc-ref').textContent     = genRef('DOC');
  document.getElementById('doc-confirm').textContent  = DOC_DATA[_selectedDoc].name;
  document.getElementById('doc-form-sec').style.display  = 'none';
  document.getElementById('doc-reqs-box').style.display  = 'none';
  document.getElementById('doc-success').style.display   = 'block';
  document.querySelectorAll('.doc-card').forEach(c => c.classList.remove('sel'));
}

/* ── RESET ── */
function resetDoc() {
  _selectedDoc = null;
  ['doc-name','doc-dob','doc-addr','doc-phone','doc-pickup','doc-purpose','doc-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('doc-form-sec').style.display    = 'none';
  document.getElementById('doc-reqs-box').style.display    = 'none';
  document.getElementById('doc-success').style.display     = 'none';
  document.getElementById('doc-placeholder').style.display = 'block';
  document.querySelectorAll('.doc-card').forEach(c => c.classList.remove('sel'));
}
