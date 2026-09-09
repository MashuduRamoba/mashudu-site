/* ═══════════════════════════════════════════
   MASHUDU RAMOBA — SHARED JS  v2
═══════════════════════════════════════════ */

/* ── Navbar scroll ── */
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 30);
  if (btt) btt.classList.toggle('show', window.scrollY > 500);
  updateScrollProgress();
  updateReadingProgress();
}, { passive: true });

/* ── Active nav link ── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nl-links a, #drawer a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === page) a.classList.add('on');
});

/* ── Hamburger ── */
const ham  = document.getElementById('ham');
const drawer = document.getElementById('drawer');
if (ham && drawer) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    drawer.classList.toggle('open');
  });
}
function closeDrawer() {
  ham  && ham.classList.remove('open');
  drawer && drawer.classList.remove('open');
}

/* ── Scroll reveal ── */
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); rvObs.unobserve(e.target); }
  });
}, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* ── Animated skill bars ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.dataset.width;
        setTimeout(() => { bar.style.width = target; }, 100);
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars-wrap').forEach(el => skillObs.observe(el));

/* ── Typing animation ── */
function typeWriter(el, words, speed = 90, pause = 2000) {
  if (!el) return;
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length)      { deleting = true; setTimeout(tick, pause); return; }
    if (deleting  && ci < 0)               { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}
const typer = document.getElementById('typer');
if (typer) {
  typeWriter(typer, [
    'Application Developer',
    'Power Platform Specialist',
    'SharePoint Engineer',
    'React.js Developer',
    'Azure Certified',
    'Enterprise Automation',
    'Cloud & AI Enthusiast',
  ]);
}

/* ── Theme toggle ── */
const themeBtn = document.getElementById('theme-btn');
function toggleTheme() {
  document.body.classList.toggle('light');
  if (themeBtn) themeBtn.textContent = document.body.classList.contains('light') ? '🌑' : '🌙';
  localStorage.setItem('mr-theme', document.body.classList.contains('light') ? 'light' : 'dark');
}
if (localStorage.getItem('mr-theme') === 'light') {
  document.body.classList.add('light');
  if (themeBtn) themeBtn.textContent = '🌑';
}

/* ── Page transitions ── */
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-8px)';
      document.body.style.transition = 'opacity .25s ease, transform .25s ease';
      setTimeout(() => { location.href = href; }, 260);
    });
  }
});

/* ── Scroll progress bar (page-level) ── */
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
}

/* ── Reading progress bar (blog posts only) ── */
function updateReadingProgress() {
  const bar  = document.getElementById('reading-bar');
  const art  = document.querySelector('.post-article');
  if (!bar || !art) return;
  const rect  = art.getBoundingClientRect();
  const total = art.offsetHeight - window.innerHeight;
  const done  = Math.max(0, -rect.top);
  bar.style.width = total > 0 ? Math.min(100, done / total * 100) + '%' : '0%';
}

/* ── Global Search (Ctrl+K) ── */
const SEARCH_INDEX = [
  { title:'Home',             url:'index.html',           tags:'home hero developer mashudu' },
  { title:'About Me',         url:'about.html',           tags:'about bio skills stack who' },
  { title:'Experience',       url:'experience.html',      tags:'work experience landis huawei microsoft internship' },
  { title:'Projects',         url:'projects.html',        tags:'projects portfolio ecommerce inventory sharepoint' },
  { title:'Certifications',   url:'certifications.html',  tags:'certs azure az900 google cybersecurity nasa tut' },
  { title:'Blog',             url:'blog.html',            tags:'blog articles tutorials career' },
  { title:'Contact',          url:'contact.html',         tags:'contact email phone hire' },
  { title:'Download CV',      url:'cv-print.html',        tags:'cv resume download print' },
  { title:'SharePoint Guide', url:'post-sharepoint-guide.html',   tags:'sharepoint permissions tutorial guide' },
  { title:'IT Intern Lessons',url:'post-it-intern-lessons.html',  tags:'internship career lessons advice' },
  { title:'React E-Commerce', url:'post-ecommerce-breakdown.html',tags:'react ecommerce project breakdown' },
  { title:'Power Automate',   url:'post-power-automate-2025.html',tags:'power automate microsoft 365 workflow' },
  { title:'AZ-900 Journey',   url:'post-az900-journey.html',      tags:'azure az900 certification study' },
  { title:'Python Automation',url:'post-python-automation.html',  tags:'python automation scripting beginners' },
];

function openSearch() {
  let overlay = document.getElementById('search-overlay');
  if (overlay) { overlay.style.display = 'flex'; document.getElementById('search-input').focus(); return; }

  overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <div id="search-box">
      <div id="search-header">
        <span id="search-icon">🔍</span>
        <input id="search-input" type="text" placeholder="Search pages, posts, projects…" autocomplete="off"/>
        <kbd id="search-esc" onclick="closeSearch()">ESC</kbd>
      </div>
      <div id="search-results"></div>
      <div id="search-footer">
        <span>↑↓ navigate</span><span>↵ open</span><span>ESC close</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  let selected  = 0;

  function render(list) {
    if (!list.length) {
      results.innerHTML = `<div class="sr-empty">No results found</div>`;
      return;
    }
    results.innerHTML = list.map((item, i) => `
      <a href="${item.url}" class="sr-item ${i===selected?'sr-active':''}" data-idx="${i}">
        <span class="sr-icon">📄</span>
        <span class="sr-title">${item.title}</span>
        <span class="sr-url">${item.url}</span>
      </a>`).join('');
  }

  function search(q) {
    selected = 0;
    if (!q.trim()) { render(SEARCH_INDEX); return; }
    const term = q.toLowerCase();
    render(SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(term) || item.tags.includes(term)
    ));
  }

  render(SEARCH_INDEX);
  input.focus();
  input.addEventListener('input', e => search(e.target.value));
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.sr-item');
    if (e.key === 'ArrowDown') { selected = Math.min(selected+1, items.length-1); items.forEach((el,i)=>el.classList.toggle('sr-active',i===selected)); e.preventDefault(); }
    if (e.key === 'ArrowUp')   { selected = Math.max(selected-1, 0);              items.forEach((el,i)=>el.classList.toggle('sr-active',i===selected)); e.preventDefault(); }
    if (e.key === 'Enter')     { const active = results.querySelector('.sr-active'); if (active) { closeSearch(); location.href = active.href; } }
    if (e.key === 'Escape')    { closeSearch(); }
  });
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.style.display = 'none';
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

/* ── Share buttons ── */
function sharePost(platform) {
  const url   = encodeURIComponent(location.href);
  const title = encodeURIComponent(document.title);
  const links = {
    twitter:  `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    copy:     null,
  };
  if (platform === 'copy') {
    navigator.clipboard.writeText(location.href).then(() => showToast('Link copied!'));
    return;
  }
  window.open(links[platform], '_blank', 'width=600,height=400');
}

/* ── Toast notification ── */
function showToast(msg, type='ok') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.classList.add('toast-out'), 2800);
  setTimeout(() => t.remove(), 3300);
}

/* ── GitHub stats loader ── */
async function loadGitHubStats(username, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    ]);
    const user  = await userRes.json();
    const repos = await reposRes.json();
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const langs = {};
    repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language]||0)+1; });
    const topLangs = Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,5);

    el.innerHTML = `
      <div class="gh-stats-grid">
        <div class="gh-stat"><div class="gh-stat-n">${user.public_repos||0}</div><div class="gh-stat-l">Public Repos</div></div>
        <div class="gh-stat"><div class="gh-stat-n">${user.followers||0}</div><div class="gh-stat-l">Followers</div></div>
        <div class="gh-stat"><div class="gh-stat-n">${stars}</div><div class="gh-stat-l">Total Stars</div></div>
        <div class="gh-stat"><div class="gh-stat-n">${user.following||0}</div><div class="gh-stat-l">Following</div></div>
      </div>
      <div class="gh-langs">
        <p class="gh-langs-title">Top Languages</p>
        ${topLangs.map(([lang,count])=>`
          <div class="gh-lang-row">
            <span class="gh-lang-name">${lang}</span>
            <div class="gh-lang-bar"><div class="gh-lang-fill" style="width:${Math.round(count/repos.length*100)}%"></div></div>
            <span class="gh-lang-count">${count} repos</span>
          </div>`).join('')}
      </div>
      <a href="https://github.com/${username}" target="_blank" class="gh-profile-link">
        View Full GitHub Profile →
      </a>`;
  } catch(e) {
    el.innerHTML = `<p style="color:var(--mist);font-size:.82rem">Could not load GitHub stats. <a href="https://github.com/MashuduRamoba" target="_blank" style="color:var(--acid)">View on GitHub →</a></p>`;
  }
}

