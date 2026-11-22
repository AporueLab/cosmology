/* AporueLab shared exhibit navigation • v1 */
(() => {
  'use strict';
  const script = document.currentScript;
  if (!script || document.getElementById('ap-nav-toggle')) return;
  const site = script.dataset.site || 'cosmology';
  const lang = script.dataset.lang === 'cs' ? 'cs' : 'en';
  const cs = lang === 'cs';
  const root = 'https://aporuelab.github.io/';
  const exhibits = [
    { id:'solar-system', en:'The Solar System', cs:'Sluneční soustava', descriptionEn:'A Field Guide to Our Cosmic Neighbourhood', descriptionCs:'Průvodce naším vesmírným sousedstvím', hasCs:true },
    { id:'earth-chronicle', en:'The Earth Chronicle', cs:'Kronika Země', descriptionEn:'An Interactive Geologic Time Scale', descriptionCs:'Interaktivní geologická časová osa', hasCs:true },
    { id:'cosmology', en:'The Beginning of Space-Time', cs:'Počátek časoprostoru', descriptionEn:'An interactive guide to the origin of space-time', descriptionCs:'Interaktivní průvodce počátkem časoprostoru', hasCs:false }
  ];
  const linkFor = (id, locale) => root + id + '/' + (locale === 'cs' && id !== 'cosmology' ? 'cz.html' : '');
  const labels = cs ? {
    explore:'PROZKOUMAT', options:'MOŽNOSTI', about:'O PROJEKTU', language:'JAZYK',
    menu:'Otevřít nabídku AporueLab', close:'Zavřít', englishOnly:'Pouze anglicky',
    title:'APORUELAB', subtitle:'Interaktivní vědecké expozice'
  } : {
    explore:'EXPLORE', options:'OPTIONS', about:'ABOUT THIS PROJECT', language:'LANGUAGE',
    menu:'Open AporueLab menu', close:'Close', englishOnly:'English only',
    title:'APORUELAB', subtitle:'Interactive Science Exhibits'
  };

  const css = `
    #ap-nav-toggle, #ap-nav-drawer, #ap-nav-about, #ap-nav-shade {
      font-family: Inter, "Helvetica Neue", Arial, sans-serif; box-sizing: border-box;
    }
    #ap-nav-toggle {
      position: fixed; top: auto; left: auto; right: max(18px, env(safe-area-inset-right));
      bottom: max(22px, env(safe-area-inset-bottom));
      z-index: 12100; width: 46px; height: 46px; padding: 9px; display: flex;
      flex-direction: column; justify-content: space-evenly; align-items: center;
      border: 1px solid rgba(255,227,184,.48); border-radius: 13px;
      box-shadow: 0 5px 22px rgba(0,0,0,.62);
      background: rgba(4,12,20,.83); color: #ffe3b8; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    #ap-nav-toggle span { display:block; width:21px; height:2px; border-radius:2px; background:currentColor; }
    #ap-nav-toggle:hover, #ap-nav-toggle[aria-expanded="true"] { border-color: #ffe3b8; background: rgba(37,43,53,.96); }
    #ap-nav-toggle:focus-visible, #ap-nav-drawer a:focus-visible, #ap-nav-drawer button:focus-visible,
    #ap-nav-about button:focus-visible { outline: 2px solid #79d8ff; outline-offset: 3px; }
    #ap-nav-shade { position:fixed; inset:0; background:rgba(0,0,0,.52); z-index:12000; }
    #ap-nav-drawer {
      position: fixed; top: auto; left: auto;
      bottom: max(81px, calc(env(safe-area-inset-bottom) + 81px));
      right: max(16px, env(safe-area-inset-right)); z-index:12010;
      width: min(330px, calc(100vw - 32px)); max-height: min(calc(100dvh - 116px), 650px);
      overflow-y: auto; padding: 18px; border: 1px solid rgba(151,190,225,.46);
      border-radius: 13px; background: rgba(5,13,23,.98); color:#ebf3f9;
      box-shadow:0 16px 55px rgba(0,0,0,.75); text-align:left;
      font-size:14px; line-height:1.45; overscroll-behavior:contain;
    }
    #ap-nav-drawer h2 { font:700 20px/1.1 Inter,Arial,sans-serif; margin:0; color:#ffe3b8; letter-spacing:1.6px; }
    #ap-nav-drawer .ap-subtitle { margin:5px 0 17px; color:#93b3c6; font-size:12px; }
    #ap-nav-drawer .ap-label { margin:18px 0 7px; color:#80d5ff; font-weight:700; letter-spacing:1.4px; font-size:11px; }
    #ap-nav-drawer .ap-link { display:block; padding:11px 12px; color:#e6eef6; text-decoration:none;
      border:1px solid transparent; border-radius:8px; margin:3px 0; background:rgba(255,255,255,.035); }
    #ap-nav-drawer .ap-link strong { font-size:14px; font-weight:600; }
    #ap-nav-drawer .ap-link small { display:block; font-size:11px; margin-top:3px; color:#9cb0c1; }
    #ap-nav-drawer .ap-link:hover { background:rgba(121,216,255,.12); border-color:rgba(121,216,255,.27); }
    #ap-nav-drawer .ap-link[aria-current="page"] { border-color:rgba(255,227,184,.48); background:rgba(255,227,184,.10); color:#ffe3b8; }
    #ap-nav-drawer .ap-action { display:block; width:100%; cursor:pointer; text-align:left;
      margin-top:8px; padding:11px 12px; color:#e6eef6; font:600 14px Inter,Arial,sans-serif;
      background:rgba(255,255,255,.04); border:1px solid rgba(155,182,204,.2); border-radius:8px; }
    #ap-nav-drawer .ap-action:hover { background:rgba(121,216,255,.12); }
    #ap-nav-drawer .ap-lang-row { display:flex; align-items:center; gap:9px; margin-top:7px; }
    #ap-nav-drawer .ap-lang { display:inline-flex; justify-content:center; flex:1; text-decoration:none;
      color:#d5e8f4; background:rgba(255,255,255,.04); border:1px solid rgba(155,182,204,.3);
      border-radius:7px; padding:9px 4px; font:600 13px Inter,Arial,sans-serif; }
    #ap-nav-drawer .ap-lang[aria-current="true"] { border-color:#ffe3b8; color:#ffe3b8; background:rgba(255,227,184,.10); }
    #ap-nav-drawer .ap-lang[aria-disabled="true"] { color:#72818f; cursor:not-allowed; opacity:.65; }
    #ap-nav-drawer .ap-note { color:#8fa2b0; margin-top:8px; font-size:11px; }
    #ap-nav-about { position:fixed; z-index:12120; top:50%; left:50%; transform:translate(-50%,-50%);
      width:min(520px,calc(100vw - 32px)); max-height:min(82dvh,700px); overflow:auto;
      color:#e8eff5; background:#07111c; border:1px solid rgba(134,190,235,.57);
      border-radius:13px; box-shadow:0 18px 70px #000; padding:24px; line-height:1.6;
      font-size:14px; text-align:left; overscroll-behavior:contain; }
    #ap-nav-about h2 { font-size:21px; padding:0 32px 0 0; color:#ffe3b8; margin:0 0 14px; }
    #ap-nav-about .ap-close { float:right; cursor:pointer; color:#fff; background:none; border:none;
      font-size:29px; line-height:1; padding:0 3px; }
    #ap-nav-about .ap-about-content img { max-width:100%; height:auto; }
    #ap-nav-about .ap-about-content a { color:#81d6ff; }
    #ap-nav-about .ap-about-content { clear:both; }
    #ap-nav-shade[hidden], #ap-nav-drawer[hidden], #ap-nav-about[hidden] { display:none !important; }
    @media(max-width:600px) {
      #ap-nav-toggle { width:46px; height:46px; top:auto; bottom:max(18px, env(safe-area-inset-bottom)); padding:9px; }
      #ap-nav-toggle span { width:21px; }
      #ap-nav-drawer { top:auto; bottom:max(77px, calc(env(safe-area-inset-bottom) + 77px)); }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const header = document.getElementById('fixed-header');
  if (!header) return;
  const toggle = document.createElement('button');
  toggle.id = 'ap-nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', labels.menu);
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-controls','ap-nav-drawer');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(toggle);

  const shade = document.createElement('div');
  shade.id = 'ap-nav-shade';
  shade.hidden = true;
  const drawer = document.createElement('nav');
  drawer.id = 'ap-nav-drawer';
  drawer.hidden = true;
  drawer.setAttribute('aria-label','AporueLab');
  const title = document.createElement('h2');
  title.textContent = labels.title;
  const subtitle = document.createElement('p');
  subtitle.className = 'ap-subtitle';
  subtitle.textContent = labels.subtitle;
  drawer.append(title,subtitle);

  function heading(text) {
    const el = document.createElement('div');
    el.className = 'ap-label';
    el.textContent = text;
    drawer.append(el);
  }
  heading(labels.explore);
  for (const item of exhibits) {
    const link = document.createElement('a');
    link.className = 'ap-link';
    link.href = linkFor(item.id, lang);
    if (item.id === site) link.setAttribute('aria-current','page');
    const name = document.createElement('strong');
    name.textContent = cs ? item.cs : item.en;
    const detail = document.createElement('small');
    detail.textContent = (cs ? item.descriptionCs : item.descriptionEn) +
      (cs && !item.hasCs ? ' · ' + labels.englishOnly : '');
    link.append(name,detail);
    drawer.appendChild(link);
  }
  heading(labels.options);
  const aboutButton = document.createElement('button');
  aboutButton.type = 'button';
  aboutButton.className = 'ap-action';
  aboutButton.textContent = labels.about;
  drawer.appendChild(aboutButton);
  heading(labels.language);
  const langRow = document.createElement('div');
  langRow.className = 'ap-lang-row';
  for (const locale of ['en','cs']) {
    const link = document.createElement('a');
    link.className = 'ap-lang';
    link.textContent = locale === 'cs' ? 'Čeština' : 'English';
    if (locale === lang) link.setAttribute('aria-current','true');
    if (site === 'cosmology' && locale === 'cs') {
      link.setAttribute('aria-disabled','true');
      link.setAttribute('tabindex','-1');
      link.title = labels.englishOnly;
    } else {
      link.href = linkFor(site, locale);
    }
    langRow.appendChild(link);
  }
  drawer.appendChild(langRow);
  if (site === 'cosmology') {
    const note = document.createElement('p');
    note.className = 'ap-note';
    note.textContent = labels.englishOnly;
    drawer.appendChild(note);
  }
  const about = document.createElement('section');
  about.id = 'ap-nav-about';
  about.hidden = true;
  about.setAttribute('role','dialog');
  about.setAttribute('aria-modal','true');
  about.setAttribute('aria-labelledby','ap-nav-about-title');
  about.setAttribute('tabindex','-1');
  const close = document.createElement('button');
  close.className='ap-close';
  close.type='button';
  close.textContent='×';
  close.setAttribute('aria-label',labels.close);
  const aboutTitle = document.createElement('h2');
  aboutTitle.id = 'ap-nav-about-title';
  aboutTitle.textContent = (cs ? exhibits.find(x=>x.id===site).cs : exhibits.find(x=>x.id===site).en);
  const content = document.createElement('div');
  content.className = 'ap-about-content';
  const existingAbout = document.querySelector('.hotspot#about');
  if (existingAbout) {
    // Reuse the project's published About text and credits; navigation now lives here.
    const source = existingAbout.getAttribute('data-desc') || '';
    content.innerHTML = source.split(/<br><br>(?:Other projects|Další projekty):/i)[0];
  } else {
    const intro = document.createElement('p');
    intro.textContent = 'An interactive educational guide exploring the origins of space-time, the expanding universe, and the limits of present cosmological knowledge.';
    const credit = document.createElement('p');
    credit.textContent = 'An AporueLab educational exhibit by Josef Handsuch. Select a section of the illustration to explore its questions with Perplexity AI.';
    content.append(intro, credit);
  }
  about.append(close,aboutTitle,content);
  document.body.append(shade,drawer,about);

  let previousFocus = null;
  const isOpen = () => !drawer.hidden || !about.hidden;
  function hideAll(restoreFocus = true) {
    drawer.hidden = true;
    about.hidden = true;
    shade.hidden = true;
    toggle.setAttribute('aria-expanded','false');
    if (restoreFocus && previousFocus && previousFocus.isConnected) previousFocus.focus();
  }
  function openMenu() {
    previousFocus = document.activeElement;
    about.hidden = true;
    drawer.hidden = false;
    shade.hidden = false;
    toggle.setAttribute('aria-expanded','true');
    const active = drawer.querySelector('[aria-current="page"]');
    (active || drawer.querySelector('.ap-link'))?.focus();
  }
  toggle.addEventListener('click',(event) => {
    event.stopPropagation();
    if (isOpen()) hideAll();
    else openMenu();
  });
  aboutButton.addEventListener('click',() => {
    drawer.hidden = true;
    about.hidden = false;
    toggle.setAttribute('aria-expanded','false');
    about.focus();
  });
  close.addEventListener('click',() => hideAll());
  shade.addEventListener('click',() => hideAll());
  document.addEventListener('keydown',(event) => {
    if (event.key === 'Escape' && isOpen()) { event.stopPropagation(); hideAll(); }
  },true);
  // Existing hotspot and quiz click handlers should not treat clicks inside navigation as map clicks.
  [drawer,about].forEach(el => el.addEventListener('click',event => event.stopPropagation()));
})();
