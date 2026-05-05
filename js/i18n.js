// Simple client-side i18n using data-en / data-fil attributes
(function(){
  const defaultLang = 'en';

  function applyLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const text = el.dataset[lang];
      if(typeof text !== 'undefined') el.innerText = text;
    });

    // placeholders support
    document.querySelectorAll('[data-en-placeholder], [data-fil-placeholder]').forEach(el=>{
      const key = (lang === 'fil') ? 'filPlaceholder' : 'enPlaceholder';
      const ph = el.dataset[key];
      if(typeof ph !== 'undefined') el.placeholder = ph;
    });

    document.documentElement.lang = (lang === 'fil') ? 'fil' : 'en';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const selects = document.querySelectorAll('#lang-select, .lang-select');
    let lang = localStorage.getItem('kb_lang') || defaultLang;
    selects.forEach(s=> s.value = lang);
    applyLang(lang);
    selects.forEach(s=> s.addEventListener('change', e=>{
      const v = e.target.value;
      localStorage.setItem('kb_lang', v);
      applyLang(v);
      // keep all selects in sync
      selects.forEach(other=> other.value = v);
    }));

    // language toggle button (quick switch)
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle){
      langToggle.addEventListener('click', ()=>{
        const cur = localStorage.getItem('kb_lang') || defaultLang;
        const next = (cur === 'en') ? 'fil' : 'en';
        localStorage.setItem('kb_lang', next);
        applyLang(next);
        selects.forEach(other=> other.value = next);
        // update button label if present
        langToggle.innerText = (next === 'en') ? 'EN' : 'FIL';
      });
      // initialize button label
      langToggle.innerText = (lang === 'en') ? 'EN' : 'FIL';
    }

    // Alert filter behavior (client-side)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const alerts = document.querySelectorAll('.alerts-grid .alert-card');
    function applyFilter(type){
      alerts.forEach(a=>{
        if(type === 'all') a.style.display = '';
        else a.style.display = (a.dataset.type === type) ? '' : 'none';
      });
      filterBtns.forEach(b=> b.classList.toggle('active', b.dataset.filter === type));
    }
    filterBtns.forEach(b=> b.addEventListener('click', ()=> applyFilter(b.dataset.filter)));
  });

})();
