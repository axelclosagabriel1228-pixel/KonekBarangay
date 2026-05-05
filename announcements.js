/* ============================================================
   announcements.js — Announcement Filter & Post Logic
   ============================================================ */

/* ── FILTER ── */
function filterAnn(btn, cat) {
  document.querySelectorAll('#ann-filter .fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#ann-list .ann-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

/* ── POST ── */
function postAnn() {
  const title = document.getElementById('m-ann-title').value.trim();
  const cat   = document.getElementById('m-ann-cat').value;
  const body  = document.getElementById('m-ann-body').value.trim();
  const loc   = document.getElementById('m-ann-loc').value.trim()  || 'Barangay Hall';
  const by    = document.getElementById('m-ann-by').value.trim()   || 'Brgy. Official';

  if (!title || !body) { alert('Please fill in the required fields.'); return; }

  const badgeMap = {
    event: '<span class="badge badge-blue">🎉 Event</span>',
    health:'<span class="badge badge-red">❤ Health</span>',
    infra: '<span class="badge badge-yellow">🔧 Infrastructure</span>',
    gov:   '<span class="badge badge-blue">🏛 Government</span>'
  };

  const card = document.createElement('div');
  card.className = 'ann-card';
  card.dataset.cat = cat;
  card.innerHTML = `
    <div class="ann-hdr">
      ${badgeMap[cat]}
      <span class="ann-date">${todayFormatted()}</span>
    </div>
    <div class="ann-title">${title}</div>
    <div class="ann-body">${body}</div>
    <div class="ann-foot">
      <span class="t-muted t-sm">📌 ${loc}</span>
      <span class="t-muted t-sm" style="margin-left:auto">Posted by: ${by}</span>
    </div>`;

  document.getElementById('ann-list').prepend(card);
  closeModal('modal-ann');
  ['m-ann-title','m-ann-body','m-ann-loc','m-ann-by'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
