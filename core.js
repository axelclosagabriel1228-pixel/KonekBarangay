/* ============================================================
   core.js — Navigation, Clock, Ticker, Modal Engine
   ============================================================ */

/* ── CLOCK ── */
function updateClock() {
  const now = new Date();
  document.getElementById('h-time').textContent = now.toLocaleTimeString('en-PH', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });
  document.getElementById('h-date').textContent = now.toLocaleDateString('en-PH', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
  });
}
updateClock();
setInterval(updateClock, 30000);

/* ── TICKER ── */
function closeTicker(e) {
  e.stopPropagation();
  document.getElementById('ticker').style.display = 'none';
  document.body.style.setProperty('--ticker', '0px');
  document.getElementById('app-body').classList.add('no-tick');
  document.getElementById('sidebar').classList.add('no-tick');
}

/* ── NAV ── */
function switchTab(tab) {
  document.querySelectorAll('.tab-sec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('[data-tab]').forEach(n => n.classList.remove('active'));
  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.add('active');
  document.querySelectorAll(`[data-tab="${tab}"]`).forEach(el => el.classList.add('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── MODAL ENGINE ── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Click outside to close
document.querySelectorAll('.modal-ov').forEach(ov => {
  ov.addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('open');
  });
});

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-ov.open').forEach(m => m.classList.remove('open'));
  }
});

/* ── HELPER: generate ref number ── */
function genRef(prefix) {
  return prefix + '-' + Math.floor(10000 + Math.random() * 90000);
}

/* ── HELPER: today's date formatted ── */
function todayFormatted() {
  return new Date().toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}
