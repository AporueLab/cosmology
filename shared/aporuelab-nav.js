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
    /* AporueLab: match the information pop-ups in Solar System / Earth Chronicle. */
    #ap-nav-toggle, #ap-nav-drawer, #ap-nav-about, #ap-nav-shade { box-sizing:border-box; }
    #ap-nav-toggle {
      position:fixed; left:max(18px, env(safe-area-inset-left)); right:auto;
      bottom:max(22px, env(safe-area-inset-bottom)); top:auto;
      z-index:12100; display:flex; flex-direction:column;
      justify-content:space-evenly; align-items:center;
      width:46px; height:46px; padding:9px;
      border:1px solid rgba(255,227,184,.48); border-radius:13px;
      box-shadow:0 5px 22px rgba(0,0,0,.62);
      background:rgba(4,12,20,.90); color:#ffe3b8; cursor:pointer;
      -webkit-tap-highlight-color:transparent;
    }
    #ap-nav-toggle span {display:block; width:21px; height:2px; border-radius:2px; background:currentColor;}
    #ap-nav-toggle:hover, #ap-nav-toggle[aria-expanded="true"] {
      border-color:#ffe3b8; background:rgba(37,43,53,.96);
    }
    #ap-nav-shade {position:fixed; inset:0; z-index:12000; background:rgba(0,0,0,.52);}
    /* Exact popup geometry, colours and footer from the exhibit's .tooltip rules. */
    #ap-nav-drawer, #ap-nav-about {
      position:fixed; top:50%; left:50%; right:auto; bottom:auto;
      transform:translate(-50%,-50%); z-index:12010;
      display:flex; flex-direction:column;
      width:95vw; max-width:450px; max-height:85vh; max-height:85dvh;
      padding:5px; overflow:hidden;
      border:1px solid #444; border-radius:14px;
      background-color:#222; color:#ddd;
      box-shadow:0 10px 30px rgba(0,0,0,.8);
      font-family:Arial,sans-serif; font-size:16px; line-height:1.5;
      text-align:center;
    }
    #ap-nav-about {z-index:12120;}
    #ap-nav-drawer .ap-nav-content, #ap-nav-about .ap-about-content {
      padding:12px 12px 24px;
      text-align:center; overflow-y:auto; -webkit-overflow-scrolling:touch;
      overscroll-behavior:contain; flex:1 1 auto; min-height:0;
    }
    #ap-nav-drawer .ap-nav-footer, #ap-nav-about .ap-nav-footer {
      padding:10px 20px; text-align:right;
      border-top:1px solid #444; background-color:#222; flex-shrink:0;
    }
    #ap-nav-drawer .ap-nav-close, #ap-nav-about .ap-nav-close {
      cursor:pointer; background:none; border:none; color:#fff;
      font:400 16px/1 Arial,sans-serif; padding:5px 14px;
      border-radius:6px;
    }
    #ap-nav-drawer .ap-nav-close:hover, #ap-nav-about .ap-nav-close:hover {color:bisque;}
    #ap-nav-drawer h2, #ap-nav-about h2 {
      margin:0 0 10px; color:#fff; font:700 1.2rem/1.35 Arial,sans-serif;
      letter-spacing:normal; text-align:center;
    }
    #ap-nav-drawer .ap-subtitle {
      margin:0 0 15px; color:#ddd; font:400 16px/1.5 Arial,sans-serif;
    }
    #ap-nav-drawer .ap-label {
      margin:17px 0 6px; color:bisque; font:700 15px/1.3 Arial,sans-serif;
      letter-spacing:normal; text-align:center;
    }
    /* Link treatment mirrors .tooltip a: plain blue text, no large outlined cards. */
    #ap-nav-drawer a.ap-link {
      display:block; margin:0; padding:9px 6px;
      border:0; border-radius:6px; background:transparent;
      color:#58a6ff; text-decoration:none; text-align:center;
      font:400 16px/1.45 Arial,sans-serif;
    }
    #ap-nav-drawer a.ap-link strong {display:block; color:inherit; font:700 16px/1.45 Arial,sans-serif;}
    #ap-nav-drawer a.ap-link small {display:block; color:#aaa; font:400 13px/1.35 Arial,sans-serif; margin-top:2px;}
    #ap-nav-drawer a.ap-link:hover {background:#2e2e2e;}
    #ap-nav-drawer a.ap-link[aria-current="page"] {
      background:#303030; color:bisque;
    }
    #ap-nav-drawer button.ap-action {
      display:block; width:100%; cursor:pointer;
      background:transparent; color:#58a6ff; border:none;
      font:400 16px/1.5 Arial,sans-serif; padding:10px 6px;
      border-radius:6px; text-align:center;
    }
    #ap-nav-drawer button.ap-action:hover {background:#2e2e2e;}
    #ap-nav-drawer .ap-lang-row {
      display:flex; justify-content:center; align-items:center; gap:14px; margin:7px 0 0;
    }
    #ap-nav-drawer a.ap-lang {
      display:inline-block; flex:1; padding:7px 4px;
      border:0; border-radius:6px; background:transparent;
      text-decoration:none; color:#58a6ff;
      font:400 16px/1.4 Arial,sans-serif;
    }
    #ap-nav-drawer a.ap-lang[aria-current="true"] {color:bisque; background:#303030;}
    #ap-nav-drawer a.ap-lang[aria-disabled="true"] {color:#888; opacity:.7; pointer-events:none;}
    #ap-nav-drawer .ap-note {color:#aaa; font-size:13px; margin:8px 0 0;}
    #ap-nav-about .ap-about-content img {max-width:100%; height:auto;}
    #ap-nav-about .ap-about-content a {color:#58a6ff;}
    #ap-nav-shade[hidden], #ap-nav-drawer[hidden], #ap-nav-about[hidden] {display:none !important;}
    #ap-nav-toggle:focus-visible, #ap-nav-drawer :focus-visible, #ap-nav-about :focus-visible {
      outline:2px solid #58a6ff; outline-offset:3px;
    }
    @media(max-width:600px) {
      #ap-nav-toggle {width:46px; height:46px; top:auto; bottom:max(18px, env(safe-area-inset-bottom));}
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
  aboutTitle.textContent = labels.about;
  const content = document.createElement('div');
  content.className = 'ap-about-content';
  // The same About text is used throughout the educational series.
  // Keep both translations here so future exhibits inherit the description.
  const aboutParagraphs = cs ? [
    'Tato interaktivní vzdělávací série zkoumá přírodní svět – od počátků vesmíru a vývoje života až po mimořádnou složitost lidské mysli a těla.',
    'Každý průvodce propojuje vizuální objevování s přístupným vysvětlením založeným na současných vědeckých poznatcích. Cílem série je podněcovat zvídavost a podporovat porozumění vědě.',
    'Vývoj série zahájil v dubnu 2026 Josef Handsuch jako osobní iniciativu odrážející jeho zájem o vzdělávání v přírodních vědách. Projekt využívá VSCodium, Adobe Photoshop a Wikipedii za asistence nástrojů umělé inteligence Gemini, Claude a ChatGPT (the EMH).'
  ] : [
    'This interactive educational series explores the natural world, from the origins of the universe and the evolution of life to the extraordinary complexity of the human mind and body.',
    'Created to inspire curiosity and encourage scientific understanding, each guide combines visual exploration with accessible explanations based on current scientific knowledge.',
    'Development of the series began in April 2026 as a personal initiative by Josef Handsuch, reflecting his commitment to natural science education. The project makes use of VSCodium, Adobe Photoshop, and Wikipedia, with AI assistance from Gemini, Claude, and ChatGPT (the EMH).'
  ];
  aboutParagraphs.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    paragraph.style.margin = '0 0 14px';
    content.appendChild(paragraph);
  });
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
