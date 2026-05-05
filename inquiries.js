/* ============================================================
   inquiries.js — FAQ Accordion & Inquiry Form Logic
   ============================================================ */

/* ── FAQ ACCORDION ── */
function toggleFAQ(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── SUBMIT INQUIRY ── */
function submitInquiry() {
  const name  = document.getElementById('inq-name').value.trim();
  const phone = document.getElementById('inq-phone').value.trim();
  const type  = document.getElementById('inq-type').value;
  const msg   = document.getElementById('inq-msg').value.trim();

  if (!name || !phone || !type || !msg) {
    alert('Please fill in all required fields.');
    return;
  }

  document.getElementById('inq-ref').textContent = genRef('INQ');
  document.getElementById('inq-form-sec').style.display  = 'none';
  document.getElementById('inq-success').style.display   = 'block';
}

/* ── RESET INQUIRY ── */
function resetInquiry() {
  ['inq-name','inq-phone','inq-email','inq-msg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('inq-type').value             = '';
  document.getElementById('inq-success').style.display  = 'none';
  document.getElementById('inq-form-sec').style.display = 'block';
}
