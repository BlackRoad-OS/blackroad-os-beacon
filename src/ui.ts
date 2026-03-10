/**
 * HTML pages served by the Beacon UI.
 */

const PORTALS = [
  { href: 'https://blackroad.io', icon: '🏠', title: 'BlackRoad.io', desc: 'The main portal — start here. Click, explore, dream.', color: '#ff9d00' },
  { href: 'https://prism.blackroad.io', icon: '🌈', title: 'Prism Console', desc: 'Live operator dashboard. Observe everything in real-time.', color: '#a855f7' },
  { href: 'https://web.blackroad.io', icon: '🌐', title: 'Web Front Door', desc: 'The user-facing web experience. Sign up, log in, explore.', color: '#00e5ff' },
  { href: 'https://api.blackroad.io', icon: '⚡', title: 'Public API', desc: 'The programmatic gateway. Build on top of BlackRoad OS.', color: '#1af59d' },
  { href: 'https://blackroad.network', icon: '🕸️', title: 'BlackRoad Network', desc: 'Peer mesh and distributed compute backbone.', color: '#ff0066' },
  { href: 'https://lucidia.earth', icon: '🌍', title: 'Lucidia Earth', desc: 'Where intelligence meets the planet. Explore the Lucidia universe.', color: '#ffc400' },
];

const portalCards = PORTALS.map(
  ({ href, icon, title, desc, color }) => `
    <a href="${href}" target="_blank" rel="noopener noreferrer" class="portal-card" style="--accent:${color}">
      <div class="portal-icon">${icon}</div>
      <div class="portal-body">
        <div class="portal-title">${title}</div>
        <div class="portal-desc">${desc}</div>
      </div>
      <div class="portal-arrow">→</div>
    </a>`
).join('\n');

export const landingHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>BlackRoad OS Beacon</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --bg: #020308;
      --bg-card: rgba(12, 18, 40, 0.85);
      --text: #f5f5ff;
      --muted: rgba(245, 245, 255, 0.65);
      --border: rgba(255, 255, 255, 0.08);
      --gradient: linear-gradient(135deg, #ff9d00, #ff0066, #7700ff, #0066ff);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      background: radial-gradient(circle at 20% 20%, #0a0520 0%, #020308 50%, #000 100%);
      color: var(--text);
      min-height: 100vh;
    }
    .page { max-width: 900px; margin: 0 auto; padding: 40px 20px 80px; }

    .header { text-align: center; margin-bottom: 48px; }
    .logo {
      font-size: 2.8rem; font-weight: 800;
      background: var(--gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; margin-bottom: 12px;
    }
    .tagline { color: var(--muted); font-size: 1.1rem; max-width: 480px; margin: 0 auto 24px; }

    .status-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(26, 245, 157, 0.12); border: 1px solid rgba(26, 245, 157, 0.3);
      border-radius: 999px; padding: 6px 16px; font-size: 0.85rem; color: #1af59d;
    }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #1af59d;
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

    .section-label {
      font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--muted); margin-bottom: 16px; font-weight: 600;
    }

    .portals { margin-bottom: 48px; }
    .portal-card {
      display: flex; align-items: center; gap: 16px;
      background: var(--bg-card); border: 1px solid var(--border);
      border-left: 3px solid var(--accent, #ff9d00);
      border-radius: 12px; padding: 20px; margin-bottom: 12px;
      text-decoration: none; color: var(--text);
      transition: transform 0.15s, border-color 0.15s, background 0.15s;
    }
    .portal-card:hover {
      transform: translateX(4px);
      border-color: var(--accent, #ff9d00);
      background: rgba(255, 255, 255, 0.04);
    }
    .portal-icon { font-size: 2rem; flex-shrink: 0; }
    .portal-body { flex: 1; min-width: 0; }
    .portal-title { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
    .portal-desc { font-size: 0.85rem; color: var(--muted); }
    .portal-arrow { color: var(--muted); font-size: 1.2rem; flex-shrink: 0; }
    .portal-card:hover .portal-arrow { color: var(--accent, #ff9d00); }

    .status-section { margin-bottom: 48px; }
    .status-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px;
    }
    .status-item {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 10px; padding: 16px; text-align: center;
    }
    .status-item-icon { font-size: 1.5rem; margin-bottom: 6px; }
    .status-item-name { font-size: 0.8rem; color: var(--muted); margin-bottom: 6px; }
    .status-item-badge {
      font-size: 0.7rem; padding: 2px 8px; border-radius: 999px;
      display: inline-block; font-weight: 600;
    }
    .badge-ok { background: rgba(26,245,157,0.15); color: #1af59d; border: 1px solid rgba(26,245,157,0.3); }
    .badge-err { background: rgba(255,68,68,0.15); color: #ff4444; border: 1px solid rgba(255,68,68,0.3); }
    .badge-loading { background: rgba(255,196,0,0.15); color: #ffc400; border: 1px solid rgba(255,196,0,0.3); }

    .api-section { margin-bottom: 48px; }
    .api-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; overflow: hidden;
    }
    .api-row {
      display: flex; align-items: center; gap: 12px; padding: 14px 20px;
      border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text);
      transition: background 0.15s;
    }
    .api-row:last-child { border-bottom: none; }
    .api-row:hover { background: rgba(255,255,255,0.04); }
    .method {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 0.7rem; padding: 2px 7px; border-radius: 4px; font-weight: 700;
      background: rgba(0,229,255,0.15); color: #00e5ff; flex-shrink: 0;
    }
    .method.post { background: rgba(168,85,247,0.15); color: #a855f7; }
    .api-path {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 0.9rem; flex: 1;
    }
    .api-desc { font-size: 0.8rem; color: var(--muted); }

    .footer {
      text-align: center; color: var(--muted); font-size: 0.8rem;
      border-top: 1px solid var(--border); padding-top: 24px;
    }
    .footer a { color: #00e5ff; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">📡 BlackRoad OS Beacon</div>
      <p class="tagline">The heartbeat of BlackRoad OS — live service health, deploy logs, and portal links. Click anything, it works.</p>
      <div class="status-badge">
        <span class="status-dot"></span>
        Beacon Online
      </div>
    </div>

    <div class="portals">
      <div class="section-label">🌐 Portals — Click Any Link</div>
      ${portalCards}
    </div>

    <div class="status-section">
      <div class="section-label">❤️ Live Service Health</div>
      <div class="status-grid" id="status-grid">
        <div class="status-item"><div class="status-item-icon">📡</div><div class="status-item-name">Beacon</div><span class="status-item-badge badge-loading">Checking…</span></div>
        <div class="status-item"><div class="status-item-icon">🌐</div><div class="status-item-name">Web</div><span class="status-item-badge badge-loading">Checking…</span></div>
        <div class="status-item"><div class="status-item-icon">🌈</div><div class="status-item-name">Prism</div><span class="status-item-badge badge-loading">Checking…</span></div>
        <div class="status-item"><div class="status-item-icon">⚡</div><div class="status-item-name">API</div><span class="status-item-badge badge-loading">Checking…</span></div>
      </div>
    </div>

    <div class="api-section">
      <div class="section-label">🔌 API Endpoints — Try Them</div>
      <div class="api-card">
        <a href="/health" class="api-row"><span class="method">GET</span><span class="api-path">/health</span><span class="api-desc">Beacon health check</span></a>
        <a href="/services" class="api-row"><span class="method">GET</span><span class="api-path">/services</span><span class="api-desc">List configured services</span></a>
        <a href="/beacon" class="api-row"><span class="method">GET</span><span class="api-path">/beacon</span><span class="api-desc">Live beacons for all services</span></a>
        <a href="/deploys" class="api-row"><span class="method">GET</span><span class="api-path">/deploys</span><span class="api-desc">Deploy history log</span></a>
        <div class="api-row"><span class="method post">POST</span><span class="api-path">/deploys</span><span class="api-desc">Append a deploy record</span></div>
        <a href="/status" class="api-row"><span class="method">GET</span><span class="api-path">/status</span><span class="api-desc">Visual status dashboard</span></a>
      </div>
    </div>

    <div class="footer">
      <a href="https://github.com/BlackRoad-OS/blackroad-os-beacon" target="_blank" rel="noopener">GitHub</a>
      &nbsp;·&nbsp;
      <a href="https://blackroad.io" target="_blank" rel="noopener">blackroad.io</a>
      &nbsp;·&nbsp;
      BlackRoad OS Beacon v1.0.0
    </div>
  </div>

  <script>
    (async () => {
      const CORE = [
        { id: 'blackroad-os-beacon', icon: '📡', name: 'Beacon' },
        { id: 'blackroad-os-web', icon: '🌐', name: 'Web' },
        { id: 'blackroad-os-prism-console', icon: '🌈', name: 'Prism' },
        { id: 'blackroad-os-api', icon: '⚡', name: 'API' },
      ];
      try {
        const res = await fetch('/beacon');
        const data = await res.json();
        const beaconMap = {};
        if (data.ok && Array.isArray(data.services)) {
          for (const svc of data.services) beaconMap[svc.service] = svc;
        }
        const grid = document.getElementById('status-grid');
        const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        grid.innerHTML = CORE.map(svc => {
          const b = beaconMap[svc.id];
          const ok = b?.status === 'healthy';
          const badge = b ? (ok ? 'badge-ok' : 'badge-err') : 'badge-err';
          const label = b ? (ok ? 'Healthy' : 'Unhealthy') : 'Unreachable';
          return \`<div class="status-item"><div class="status-item-icon">\${esc(svc.icon)}</div><div class="status-item-name">\${esc(svc.name)}</div><span class="status-item-badge \${badge}">\${label}</span></div>\`;
        }).join('');
      } catch (_) { /* leave as loading */ }
    })();
  </script>
</body>
</html>`;

export const statusHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>System Status · BlackRoad OS Beacon</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --bg: #020308; --bg-card: rgba(12,18,40,0.85); --text: #f5f5ff;
      --muted: rgba(245,245,255,0.65); --border: rgba(255,255,255,0.08);
      --green: #1af59d; --yellow: #ffc400; --red: #ff4444; --cyan: #00e5ff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      background: radial-gradient(circle at 20% 20%, #0a0520 0%, #020308 50%, #000 100%);
      color: var(--text); min-height: 100vh;
    }
    .page { max-width: 960px; margin: 0 auto; padding: 32px 20px 80px; }
    .nav { margin-bottom: 28px; }
    .nav a { color: var(--cyan); text-decoration: none; font-size: 0.9rem; }
    .nav a:hover { text-decoration: underline; }
    h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
    .subtitle { color: var(--muted); font-size: 0.95rem; margin-bottom: 28px; }

    .overall {
      display: flex; align-items: center; gap: 16px;
      padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; transition: all 0.3s;
    }
    .overall.healthy { background: rgba(26,245,157,0.08); border: 1px solid rgba(26,245,157,0.25); }
    .overall.degraded { background: rgba(255,196,0,0.08); border: 1px solid rgba(255,196,0,0.25); }
    .overall.down { background: rgba(255,68,68,0.08); border: 1px solid rgba(255,68,68,0.25); }
    .overall-icon { font-size: 2.2rem; }
    .overall-text { flex: 1; }
    .overall-title { font-size: 1.15rem; font-weight: 600; }
    .overall-desc { font-size: 0.85rem; color: var(--muted); margin-top: 3px; }
    .refresh-btn {
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      color: var(--text); padding: 8px 16px; border-radius: 8px;
      cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
    }
    .refresh-btn:hover { background: rgba(255,255,255,0.14); }
    .refresh-btn:disabled { opacity: 0.45; cursor: not-allowed; }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 14px; margin-bottom: 36px; }
    .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
    .card.ok { border-left: 3px solid var(--green); }
    .card.err { border-left: 3px solid var(--red); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-name { font-weight: 600; }
    .pill { font-size: 0.7rem; padding: 3px 10px; border-radius: 999px; font-weight: 600; }
    .pill-ok { background: rgba(26,245,157,0.15); color: var(--green); border: 1px solid rgba(26,245,157,0.3); }
    .pill-err { background: rgba(255,68,68,0.15); color: var(--red); border: 1px solid rgba(255,68,68,0.3); }
    .card-meta { font-size: 0.8rem; color: var(--muted); }
    .card-url { font-family: ui-monospace,monospace; font-size: 0.75rem; color: var(--cyan); margin-top: 6px; }
    .card-error { font-size: 0.75rem; color: var(--red); margin-top: 8px; padding: 6px 10px; background: rgba(255,68,68,0.08); border-radius: 6px; }

    .last-updated { text-align: center; color: var(--muted); font-size: 0.8rem; margin-top: 16px; }

    @keyframes shimmer { 0%{opacity:0.4}50%{opacity:0.9}100%{opacity:0.4} }
    .skeleton { animation: shimmer 1.5s infinite; background: rgba(255,255,255,0.06); border-radius: 6px; height: 1em; }
  </style>
</head>
<body>
  <div class="page">
    <div class="nav"><a href="/">← Beacon Home</a></div>
    <h1>📡 System Status</h1>
    <p class="subtitle">Live health for every configured BlackRoad OS service.</p>

    <div class="overall healthy" id="overall">
      <div class="overall-icon" id="overall-icon">⏳</div>
      <div class="overall-text">
        <div class="overall-title" id="overall-title">Checking services…</div>
        <div class="overall-desc" id="overall-desc">Please wait</div>
      </div>
      <button class="refresh-btn" id="refresh-btn" onclick="load()">Refresh</button>
    </div>

    <div class="grid" id="grid">
      <div class="card"><div class="skeleton" style="height:1.2em;width:60%;margin-bottom:8px"></div><div class="skeleton" style="width:80%"></div></div>
      <div class="card"><div class="skeleton" style="height:1.2em;width:60%;margin-bottom:8px"></div><div class="skeleton" style="width:80%"></div></div>
      <div class="card"><div class="skeleton" style="height:1.2em;width:60%;margin-bottom:8px"></div><div class="skeleton" style="width:80%"></div></div>
      <div class="card"><div class="skeleton" style="height:1.2em;width:60%;margin-bottom:8px"></div><div class="skeleton" style="width:80%"></div></div>
    </div>

    <div class="last-updated" id="last-updated"></div>
  </div>

  <script>
    async function load() {
      const btn = document.getElementById('refresh-btn');
      btn.disabled = true; btn.textContent = 'Checking…';
      try {
        const res = await fetch('/beacon');
        const data = await res.json();
        render(data);
      } catch (e) { render({ ok: false, services: [], error: e.message }); }
      btn.disabled = false; btn.textContent = 'Refresh';
      document.getElementById('last-updated').textContent = 'Updated: ' + new Date().toLocaleTimeString();
    }

    function render(data) {
      const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      const svcs = Array.isArray(data.services) ? data.services : [];
      const ok = svcs.filter(s => s.status === 'healthy').length;
      const total = svcs.length;
      const overall = document.getElementById('overall');
      const icon = document.getElementById('overall-icon');
      const title = document.getElementById('overall-title');
      const desc = document.getElementById('overall-desc');

      if (total === 0) {
        overall.className = 'overall down'; icon.textContent = '❌';
        title.textContent = 'No services configured';
        desc.textContent = data.error || 'Add services to config/services.yaml';
      } else if (ok === total) {
        overall.className = 'overall healthy'; icon.textContent = '✅';
        title.textContent = 'All Systems Operational';
        desc.textContent = ok + '/' + total + ' services healthy';
      } else if (ok > 0) {
        overall.className = 'overall degraded'; icon.textContent = '⚠️';
        title.textContent = 'Partial Outage';
        desc.textContent = ok + '/' + total + ' services healthy';
      } else {
        overall.className = 'overall down'; icon.textContent = '❌';
        title.textContent = 'Major Outage'; desc.textContent = '0/' + total + ' services healthy';
      }

      document.getElementById('grid').innerHTML = svcs.map(s => {
        const healthy = s.status === 'healthy';
        const errHtml = (!healthy && s.meta && s.meta.error)
          ? \`<div class="card-error">\${esc(s.meta.error)}</div>\` : '';
        return \`<div class="card \${healthy ? 'ok' : 'err'}">
          <div class="card-header"><div class="card-name">\${esc(s.service)}</div>
          <span class="pill \${healthy ? 'pill-ok' : 'pill-err'}">\${healthy ? 'Healthy' : 'Unhealthy'}</span></div>
          <div class="card-meta">env: \${esc(s.env)} · v\${esc(s.version)}</div>
          <div class="card-url">\${esc(s.url)}</div>\${errHtml}</div>\`;
      }).join('');
    }

    load();
    setInterval(load, 60000);
  </script>
</body>
</html>`;
