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
    /* Match the existing exhibit information pop-ups: centred charcoal card,
       scrollable content and a fixed footer with a Close action. */
    #ap-nav-drawer {
      position: fixed; left:50%; top:50%; bottom:auto; right:auto;
      transform:translate(-50%, -50%); z-index:12010;
      display:flex; flex-direction:column;
      width:min(450px, 95vw); max-height:85vh; max-height:85dvh;
      overflow:hidden; padding:5px; border:1px solid #444;
      border-radius:14px; background:#222; color:#ddd;
      box-shadow:0 10px 30px rgba(0,0,0,.8); text-align:left;
      font-size:14px; line-height:1.45;
    }
    #ap-nav-drawer .ap-nav-content {
      padding:15px 14px 20px; overflow-y:auto; min-height:0;
      flex:1 1 auto; -webkit-overflow-scrolling:touch; overscroll-behavior:contain;
    }
    #ap-nav-drawer .ap-nav-footer, #ap-nav-about .ap-nav-footer {
      border-top:1px solid #444; background:#222; flex-shrink:0;
      padding:10px 20px; text-align:right;
    }
    #ap-nav-drawer .ap-nav-close, #ap-nav-about .ap-nav-close {
      border:0; border-radius:6px; color:#fff; background:transparent;
      font:400 16px/1.1 Inter,Arial,sans-serif; padding:5px 14px; cursor:pointer;
    }
    #ap-nav-drawer .ap-nav-close:hover, #ap-nav-about .ap-nav-close:hover { color:bisque; }
    #ap-nav-drawer h2 { font:700 20px/1.2 Inter,Arial,sans-serif; margin:0; color:#fff; text-align:center; letter-spacing:1.3px; }
    #ap-nav-drawer .ap-subtitle { margin:6px 0 17px; color:#aaa; font-size:12px; text-align:center; }
    #ap-nav-drawer .ap-label { margin:18px 0 7px; color:bisque; font-weight:700; letter-spacing:1px; font-size:11px; }
    #ap-nav-drawer .ap-link { display:block; padding:11px 12px; color:#ddd; text-decoration:none;
      border:1px solid #444; border-radius:8px; margin:6px 0; background:#292929; }
    #ap-nav-drawer .ap-link strong { font-size:14px; font-weight:600; }
    #ap-nav-drawer .ap-link small { display:block; font-size:11px; margin-top:3px; color:#aaa; }
    #ap-nav-drawer .ap-link:hover { background:#343434; border-color:#777; }
    #ap-nav-drawer .ap-link[aria-current="page"] { border-color:#a08a6b; background:#39332c; color:bisque; }
    #ap-nav-drawer .ap-action { display:block; width:100%; cursor:pointer; text-align:left;
      margin-top:8px; padding:11px 12px; color:#ddd; font:600 14px Inter,Arial,sans-serif;
      background:#292929; border:1px solid #444; border-radius:8px; }
    #ap-nav-drawer .ap-action:hover { background:#343434; }
    #ap-nav-drawer .ap-lang-row { display:flex; align-items:center; gap:9px; margin-top:7px; }
    #ap-nav-drawer .ap-lang { display:inline-flex; justify-content:center; flex:1; text-decoration:none;
      color:#ddd; background:#292929; border:1px solid #444;
      border-radius:7px; padding:9px 4px; font:600 13px Inter,Arial,sans-serif; }
    #ap-nav-drawer .ap-lang[aria-current="true"] { border-color:#a08a6b; color:bisque; background:#39332c; }
    #ap-nav-drawer .ap-lang[aria-disabled="true"] { color:#72818f; cursor:not-allowed; opacity:.65; }
    #ap-nav-drawer .ap-note { color:#8fa2b0; margin-top:8px; font-size:11px; }
    #ap-nav-about { position:fixed; z-index:12120; top:50%; left:50%; transform:translate(-50%,-50%);
      display:flex; flex-direction:column; padding:5px;
      width:min(450px,95vw); max-height:85vh; max-height:85dvh; overflow:hidden;
      color:#ddd; background:#222; border:1px solid #444;
      border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,.8);
      font-size:14px; line-height:1.5; text-align:left; }
    #ap-nav-about h2 { font-size:20px; color:#fff; margin:0 0 12px; text-align:center; }
    #ap-nav-about .ap-about-content { flex:1 1 auto; min-height:0; overflow-y:auto;
      padding:15px 12px 22px; -webkit-overflow-scrolling:touch; overscroll-behavior:contain; }
    #ap-nav-about .ap-about-content img { max-width:100%; height:auto; }
    #ap-nav-about .ap-about-content a { color:bisque; }
    #ap-nav-shade[hidden], #ap-nav-drawer[hidden], #ap-nav-about[hidden] { display:none !important; }
    @media(max-width:600px) {
      #ap-nav-toggle { width:46px; height:46px; top:auto; bottom:max(18px, env(safe-area-inset-bottom)); padding:9px; }
      #ap-nav-toggle span { width:21px; }
      #ap-nav-drawer { top:50%; bottom:auto; }
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
  const drawerContent = document.createElement('div');
  drawerContent.className = 'ap-nav-content';
  drawerContent.append(title,subtitle);
  drawer.appendChild(drawerContent);

  function heading(text) {
    const el = document.createElement('div');
    el.className = 'ap-label';
    el.textContent = text;
    drawerContent.append(el);
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
    drawerContent.appendChild(link);
  }
  heading(labels.options);
  const aboutButton = document.createElement('button');
  aboutButton.type = 'button';
  aboutButton.className = 'ap-action';
  aboutButton.textContent = labels.about;
  drawerContent.appendChild(aboutButton);
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
  drawerContent.appendChild(langRow);
  if (site === 'cosmology') {
    const note = document.createElement('p');
    note.className = 'ap-note';
    note.textContent = labels.englishOnly;
    drawerContent.appendChild(note);
  }
  const drawerFooter = document.createElement('div');
  drawerFooter.className = 'ap-nav-footer';
  const drawerClose = document.createElement('button');
  drawerClose.type = 'button';
  drawerClose.className = 'ap-nav-close';
  drawerClose.textContent = labels.close;
  drawerFooter.appendChild(drawerClose);
  drawer.appendChild(drawerFooter);
  drawer.setAttribute('role','dialog');
  drawer.setAttribute('aria-modal','true');
  drawer.setAttribute('aria-labelledby','ap-nav-drawer-title');
  title.id = 'ap-nav-drawer-title';
  drawer.setAttribute('tabindex','-1');
  const about = document.createElement('section');
  about.id = 'ap-nav-about';
  about.hidden = true;
  about.setAttribute('role','dialog');
  about.setAttribute('aria-modal','true');
  about.setAttribute('aria-labelledby','ap-nav-about-title');
  about.setAttribute('tabindex','-1');
  const close = document.createElement('button');
  close.className='ap-nav-close';
  close.type='button';
  close.textContent=labels.close;
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
  content.prepend(aboutTitle);
  const aboutFooter = document.createElement('div');
  aboutFooter.className = 'ap-nav-footer';
  aboutFooter.appendChild(close);
  about.append(content,aboutFooter);
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
    drawer.focus();
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
  drawerClose.addEventListener('click',() => hideAll());
  shade.addEventListener('click',() => hideAll());
  document.addEventListener('keydown',(event) => {
    if (event.key === 'Escape' && isOpen()) { event.stopPropagation(); hideAll(); }
  },true);
  // Existing hotspot and quiz click handlers should not treat clicks inside navigation as map clicks.
  [drawer,about].forEach(el => el.addEventListener('click',event => event.stopPropagation()));
})();
