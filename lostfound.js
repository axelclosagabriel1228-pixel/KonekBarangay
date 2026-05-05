/* ============================================================
   lostfound.js — Lost & Found Filter & Post Logic
   ============================================================ */

/* ── FILTER ── */
function filterLF(btn, type) {
  document.querySelectorAll('#lf-filter .fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#lf-grid .lf-card').forEach(card => {
    card.style.display = (type === 'all' || card.dataset.lft === type) ? '' : 'none';
  });
}

/* ── POST ── */
function postLF() {
  const type    = document.getElementById('m-lf-type').value;
  const name    = document.getElementById('m-lf-name').value.trim();
  const desc    = document.getElementById('m-lf-desc').value.trim();
  const loc     = document.getElementById('m-lf-loc').value.trim()  || 'Unspecified';
  const dateVal = document.getElementById('m-lf-date').value;
  const phone   = document.getElementById('m-lf-phone').value.trim();

  if (!name || !phone) { alert('Please fill in the required fields.'); return; }

  const d = dateVal
    ? new Date(dateVal + 'T12:00:00').toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
    : todayFormatted();

  const emojiMap = { lost:'📦', found:'📦' };

  const card = document.createElement('div');
  card.className = 'lf-card';
  card.dataset.lft = type;
  card.innerHTML = `
    <div class="lf-img lf-img-${type}">${emojiMap[type]}</div>
    <div class="lf-body">
      <div class="lf-type lf-${type}">${type.toUpperCase()}</div>
      <div class="lf-name">${name}</div>
      ${desc ? `<div class="lf-detail" style="font-size:11px;font-style:italic">${desc}</div>` : ''}
      <div class="lf-detail">📍 ${loc}</div>
      <div class="lf-detail">📅 ${d}</div>
      <div class="lf-detail">📞 ${phone}</div>
    </div>`;

  document.getElementById('lf-grid').prepend(card);
  closeModal('modal-lf');
  ['m-lf-name','m-lf-desc','m-lf-loc','m-lf-phone','m-lf-date'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
