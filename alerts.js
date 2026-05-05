/* ============================================================
   alerts.js — Alert Dismiss & Post Logic
   ============================================================ */

/* ── DISMISS ── */
function dismissAlert(id) {
  const el = document.getElementById(id);
  el.style.opacity  = '0';
  el.style.transform = 'translateX(24px)';
  el.style.transition = 'all .3s';

  setTimeout(() => {
    el.remove();
    const remaining = document.querySelectorAll('#alerts-list .alert-card').length;
    if (remaining === 0) document.getElementById('alerts-empty').style.display = 'block';
    updateAlertBadge(-1);
  }, 300);
}

/* ── UPDATE BADGE ── */
function updateAlertBadge(delta) {
  const badge = document.getElementById('alert-count');
  const current = parseInt(badge.textContent) || 0;
  const next = Math.max(0, current + delta);
  badge.textContent = next;
  badge.style.display = next > 0 ? 'inline' : 'none';
}

/* ── POST ALERT ── */
function postAlert() {
  const lvl   = document.getElementById('m-alrt-lvl').value;
  const title = document.getElementById('m-alrt-title').value.trim();
  const body  = document.getElementById('m-alrt-body').value.trim();
  const src   = document.getElementById('m-alrt-src').value.trim() || 'Brgy. Admin';

  if (!title || !body) { alert('Please fill in the required fields.'); return; }

  const cfg = {
    em: { cls:'ac-em', icls:'aico-em', ico:'🚨', tcls:'at-em', bcls:'badge-red',    blbl:'Emergency' },
    wa: { cls:'ac-wa', icls:'aico-wa', ico:'⚠️', tcls:'at-wa', bcls:'badge-yellow', blbl:'Warning'   },
    in: { cls:'ac-in', icls:'aico-in', ico:'ℹ️', tcls:'at-in', bcls:'badge-blue',   blbl:'Advisory'  }
  }[lvl];

  const uid = 'alrt-' + Date.now();
  const div = document.createElement('div');
  div.id        = uid;
  div.className = 'alert-card ' + cfg.cls;
  div.innerHTML = `
    <div class="alert-ico ${cfg.icls}">${cfg.ico}</div>
    <div style="flex:1">
      <div class="alert-title ${cfg.tcls}">${title}</div>
      <div class="alert-body">${body}</div>
      <div class="alert-meta">
        <span class="badge ${cfg.bcls}">${cfg.blbl}</span>
        · ${todayFormatted()} · Source: ${src}
      </div>
    </div>
    <button class="alert-dismiss" onclick="dismissAlert('${uid}')">✕</button>`;

  document.getElementById('alerts-empty').style.display = 'none';
  document.getElementById('alerts-list').prepend(div);
  updateAlertBadge(+1);

  closeModal('modal-alert');
  ['m-alrt-title','m-alrt-body','m-alrt-src'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
