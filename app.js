/* =========================================================
   AURA — AI Unified Resolution Assistant
   Application Logic (Static Knowledge Base — No LLM Tokens)
   ========================================================= */

// ===== KNOWLEDGE BASE — Static Q&A with rich structured answers =====
const KNOWLEDGE_BASE = [
  {
    id: 'sjpm-host-down',
    keywords: ['host status down', 'host down', 'lniata', 'sjpm down', 'hssp', 'connection type', 'sabre host', 'host status', 's02', 'zudws', 'primary host', 'access.sabre.com', 'sjpm host'],
    question: 'SJPM - Host Status Down',
    answer: {
      title: '🔧 Troubleshooting: SJPM — Host Status Down',
      severity: 'high',
      confidence: 94,
      sources: [
        { type: 'kb', label: 'KB-5020: SJPM Host Status Down Resolution' },
        { type: 'sop', label: 'SOP-520: LNIATA Configuration & Validation' },
        { type: 'kb', label: 'KB-5022: Sabre Host Connectivity Guide' }
      ],
      rootCause: 'The SJPM shows Host Status as Down when it cannot connect to the Sabre Host using the specified LNIATA. Possible causes include: incorrect SJPM configuration (Connection Type not set to HSSP), invalid or mistyped LNIATA, no network connectivity to Sabre Host, another session already using the same LNIATA (S02 error), insufficient user permissions, or corrupted Java installation.',
      steps: [
        {
          title: 'Check Primary Host & Connection Type',
          detail: 'Verify the Connection Type is set to HSSP and the Primary Host URL is correct.',
          command: '1. On SJPM GUI home screen, check the box next to the\n   affected device and click "Edit"\n2. Scroll to "Host Settings" section at the bottom\n3. Ensure Connection Type = HSSP\n\n⚠️ If set to "None", it replaces host with 0.0.0.0\n   which causes Host Status Down!\n\nPrimary Host values:\n  • Production: access.sabre.com\n  • Cert:       access.cert.sabre.com\n  • Test:       access.tsts.sabre.com\n  • If unsure:  use access.sabre.com'
        },
        {
          title: 'Validate the LNIATA',
          detail: 'Confirm the LNIATA is valid and entered correctly in the SJPM device settings.',
          command: 'Step 1: Verify LNIATA was entered correctly\n  (check for typos — confirm with Sabre staff if provided)\n\nStep 2: In Sabre Host, type: PE*PCC\n  (where PCC = your Pseudo City Code)\n\nStep 3: Look through the LNIATA list:\n  • TYPE PTR = Printers\n  • MINI = Mincom processes\n\nStep 4: In SJPM GUI, Edit the device and update\n  the LNIATA field with the correct address'
        },
        {
          title: 'Verify Sabre Host Connectivity',
          detail: 'Check if your machine has a valid connection to the Sabre Host network.',
          command: 'Check connectivity indicators:\n  • If OTHER devices in SJPM are connected →\n    Network is fine, issue is device-specific\n  • If ALL devices are down → Network issue\n\nVerify you have an active connection via:\n  • SVPN Launcher\n  • Private connection (B2B)\n  • Sabre Red 360 shared VPN\n\n⚠️ If using SR360 VPN: closing SR360 disconnects\n   the VPN and SJPM will lose host connectivity.'
        },
        {
          title: 'Check for Duplicate LNIATA (S02 Error)',
          detail: 'A LNIATA can only be configured in one device at a time. Check for conflicts.',
          command: 'Step 1: Disable the device/instance in SJPM\n\nStep 2: Run in Sabre Host:\n  ZUDWS (LNIATA)\n  • Port 50051 = active on another SJPM\n  • Port 30031 = added on a Sabre Red instance\n\nStep 3: Clear the connection:\n  ZUDWS (LNIATA) CLEAR ALL\n\nStep 4: Verify it disconnects:\n  ZUDWS (LNIATA)\n  (may need to repeat this command)\n\nStep 5: Wait 2 minutes. If no reconnection,\n  S02 is cleared — re-enable the device.'
        },
        {
          title: 'Run SJPM as Administrator',
          detail: 'Insufficient permissions can prevent SJPM from connecting to the host.',
          command: '1. Open Windows Start menu\n2. Find "Start SJPM Server (as Service)"\n3. Right-click → "Run as administrator"\n\n✅ If this resolves it → permission issue confirmed.\n   Contact IT for elevated access or continue\n   running as Administrator.'
        },
        {
          title: 'Check Java Installation Integrity',
          detail: 'Verify the Java bundled with SJPM is not corrupted by launching the Java control panel.',
          command: '1. Browse to: C:\\Program Files (x86)\\SJPM\\jre\\bin\n2. Double-click javacpl.exe\n\n• If it opens → Java is fine, issue is elsewhere\n• If it does NOT open → Java is corrupted\n\nTo fix corrupted Java:\n1. Use Windows Start Menu → Uninstall SJPM\n2. Reinstall SJPM from central.sabre.com'
        }
      ],
      escalation: {
        condition: 'Escalate if all 6 solutions fail, if LNIATA conflicts cannot be resolved via ZUDWS CLEAR ALL, or if Java corruption persists after reinstallation.',
        to: 'ATS Support — ServiceNow ticket + #ats-support (Slack)',
        priority: 'P2 — High'
      },
      relatedArticles: ['KB-5010: SJPM Server Unavailable Fix', 'KB-5001: SJPM Installation Guide', 'KB-5025: Sabre Red 360 VPN & SJPM Integration'],
      recommendedExpert: { name: 'Sneha Gupta', initials: 'SG', role: 'Tier-2 • SJPM & Sabre Host Connectivity', color: 'linear-gradient(135deg,#3b82f6,#2563eb)', status: 'Online', reason: 'Sneha has resolved 52 SJPM Host Down cases with deep expertise in LNIATA configuration and Sabre Host connectivity.' }
    }
  },
  {
    id: 'sjpm-unavailable',
    keywords: ['sjpm', 'server unavailable', 'unavailable', 'yellow icon', 'sjpm server', 'not running', 'sjpm service', 'sjpm yellow', 'printing unavailable', 'prunsrv', 'sjpm gui', 'sjpm loop'],
    question: 'SJPM - The Server is unavailable',
    answer: {
      title: '🔧 Troubleshooting: SJPM — The Server is Unavailable',
      severity: 'high',
      confidence: 96,
      sources: [
        { type: 'kb', label: 'KB-5010: SJPM Server Unavailable Resolution' },
        { type: 'sop', label: 'SOP-510: SJPM Service Recovery Procedure' },
        { type: 'kb', label: 'KB-5012: SJPM JSON File Corruption Fix' }
      ],
      rootCause: 'The SJPM GUI cannot connect to the SJPM Server, or the SJPM Server process is not running properly. The SJPM icon in the Windows System Tray may appear yellow indicating the server connection is lost. This can occur when the SJPM service has crashed, the user lacks permissions, Java JSON config files are corrupted, or third-party antivirus software is interfering.',
      steps: [
        {
          title: 'Pre-Check: Identify Server Mode',
          detail: 'First determine if SJPM is running as a Service or an Application — the fix differs based on this.',
          command: '1. Right-click the SJPM icon in the Windows System Tray\n2. Hover over "Server Mode" in the pop-up menu\n3. Note which option is enabled:\n   • Running as Service → Follow Service solutions below\n   • Running as Application → Follow Application solutions below'
        },
        {
          title: 'Solution 1: Click Retry / Run as Administrator',
          detail: 'If running as a Service — try the simplest fixes first.',
          command: 'Quick Fix A — Click "Retry now" and wait 30 seconds\n\nQuick Fix B — Run SJPM as Administrator:\n1. Open Windows Start menu\n2. Find "Start SJPM Server (as Service)"\n3. Right-click → Select "Run as administrator"\n\n✅ If this resolves it, you may lack sufficient\n   permissions. Contact IT for elevated access.'
        },
        {
          title: 'Solution 2: Restart SJPM via Windows Services',
          detail: 'Restart the SJPM service from the Windows Services control panel.',
          command: '1. Press Win+R, type: services.msc → Enter\n2. Find "Sabre Java Printing Module (SJPM)" service\n3. Right-click → Select "Restart"\n\n⚠️ If status shows "Stopping" — the user likely\n   lacks permissions to start/stop the service.\n   Give Full Control or switch to Application mode.'
        },
        {
          title: 'Solution 3: Kill & Restart via Task Manager',
          detail: 'Force-kill the stuck SJPM process and restart the service manually.',
          command: '1. Open Task Manager (Ctrl+Shift+Esc)\n2. Go to Services tab\n3. Right-click "SJPM_Service" → "Go to Process"\n4. Select the highlighted "prunsrv.exe" → Click "End Task"\n5. Open services.msc again\n6. Find SJPM service → Right-click → "Start"'
        },
        {
          title: 'Solution 4: Fix Corrupted JSON Config Files',
          detail: 'Corrupted device configuration JSON files can prevent SJPM from starting. Identify and replace them.',
          command: 'Step 1: Navigate to the config folder:\n  Service Mode:  C:\\Program Files (x86)\\SJPM\\server\\devroot\\instances\n  App Mode:      C:\\Users\\%username%\\.sabre\\.sjpm\\devroot\\instances\n\nStep 2: Rename each .json file by adding ".old" extension\nStep 3: Click "Restart" in SJPM GUI\nStep 4: Restore .json files one at a time, restarting\n        after each to identify the corrupted file\nStep 5: Delete the corrupted .json file and re-add\n        the device configuration in SJPM'
        },
        {
          title: 'Solution 5: Check Permissions & Antivirus',
          detail: 'Ensure the user has Full Control permissions and no antivirus is interfering with SJPM.',
          command: 'Permissions Fix:\n1. Give user Full Control to the SJPM folder\n   (Right-click folder → Properties → Security → Edit)\n2. Restart the SJPM Service and GUI\n\nAntivirus Check:\n• Some antivirus (e.g., STOPzilla 8.0) Web Filter\n  causes SJPM to loop between Ready ↔ Unavailable\n• Disable Web Filter or add SJPM to exclusions\n• Whitelist: C:\\Program Files (x86)\\SJPM\\*'
        },
        {
          title: 'Alternative: Switch to Application Mode',
          detail: 'If Service mode continues to fail, switch SJPM to run as an Application instead.',
          command: '1. Right-click SJPM icon in System Tray\n2. Hover over "Server Mode"\n3. Select "Application"\n4. Restart SJPM\n\n✅ Application mode runs under the current user\n   context and avoids most permission issues.'
        }
      ],
      escalation: {
        condition: 'Escalate if all solutions above fail, if the SJPM service is stuck in "Stopping" state and cannot be killed, or if JSON corruption reoccurs repeatedly.',
        to: 'ATS Desktop Support — ServiceNow ticket + #desktop-support (Slack)',
        priority: 'P2 — High'
      },
      relatedArticles: ['KB-5001: SJPM Installation Guide', 'KB-5015: Running SJPM as Application', 'SOP-512: SJPM JSON Backup Best Practices'],
      recommendedExpert: { name: 'Priya Sharma', initials: 'PS', role: 'Tier-2 • SJPM & Desktop Support', color: 'linear-gradient(135deg,#10b981,#059669)', status: 'Online', reason: 'Priya has resolved 58 SJPM server unavailable cases with expertise in service recovery and JSON config repair.' }
    }
  },
  {
    id: 'sjpm-install',
    keywords: ['sjpm', 'sabre java printing', 'printing module', 'install sjpm', 'printer', 'print', 'java printing', 'printing', 'sjpm installer', 'sabre printing'],
    question: 'How to install Sabre Java Printing Module (SJPM)',
    answer: {
      title: '🖨️ Guide: Sabre Java Printing Module (SJPM) Installation',
      severity: 'medium',
      confidence: 98,
      sources: [
        { type: 'kb', label: 'KB-5001: SJPM Installation Guide' },
        { type: 'sop', label: 'SOP-501: SJPM Deployment Checklist' },
        { type: 'kb', label: 'KB-5002: SJPM TN Installer Reference' }
      ],
      rootCause: 'The Sabre Java Printing Module (SJPM) enables printing capabilities within Sabre applications. Installation requires downloading the correct installer from central.sabre.com and running it with Administrator privileges. Issues typically arise from missing admin rights, incorrect installer selection, or skipped prerequisites.',
      steps: [
        {
          title: 'Download the SJPM Installer',
          detail: 'Access the official SJPM installer from the Sabre Central portal using your corporate credentials.',
          command: '1. Open central.sabre.com in your browser\n2. Log in with your Sabre credentials\n3. Click Support (top navigation)\n4. Navigate to: Downloads > SJPM Downloads\n5. Select the installer link — if unsure, choose "SJPM TN Installer"\n6. Click the Details tab\n7. Click the Download button'
        },
        {
          title: 'Run Installer as Administrator',
          detail: 'The SJPM installer must be executed with elevated (Administrator) privileges to install system-level components.',
          command: '1. Locate the downloaded SJPM installer file\n2. Right-click the installer file\n3. Select "Run as administrator"\n\n⚠️ Note: If you do not have Administrator rights,\n   contact your local IT provider for assistance.'
        },
        {
          title: 'Accept License Agreement',
          detail: 'Follow the installation wizard prompts and accept the Sabre license agreement to proceed.',
          command: '1. Click "Next" on the welcome screen\n2. Read the license agreement\n3. Select "I accept the terms in the license agreement"\n4. Click "Next" to continue'
        },
        {
          title: 'Select Installation Type',
          detail: 'Choose between Typical (recommended) or Custom installation based on your requirements.',
          command: 'Option A — Typical (Recommended for most users):\n  • Installs ALL components automatically\n  • Best for standard setups\n  • No additional configuration needed\n\nOption B — Custom (Advanced users only):\n  • Prompts you to select specific components\n  • Minimum required: Client + at least one Server Driver\n  • Use only if you need a specific subset of components'
        },
        {
          title: 'Complete Installation',
          detail: 'Wait for the installation to finish and verify the module is properly installed.',
          command: '1. Wait for the progress bar to complete\n2. Click "Finish" when prompted\n3. Verify installation — check that SJPM appears in:\n   • Windows Programs list (Add/Remove Programs)\n   • System tray (if applicable)\n4. Restart your machine if prompted'
        }
      ],
      escalation: {
        condition: 'Escalate if the installer fails to run, produces errors during installation, or the SJPM module does not function after successful installation.',
        to: 'Desktop Support — #desktop-support (Slack) + ServiceNow ticket',
        priority: 'P3 — Medium'
      },
      relatedArticles: ['KB-5003: SJPM Troubleshooting Common Errors', 'KB-5005: SJPM Configuration Guide', 'SOP-505: SJPM Uninstall & Reinstall Procedure'],
      recommendedExpert: { name: 'Amit Mehta', initials: 'AM', role: 'Tier-3 • System Configuration Specialist', color: 'linear-gradient(135deg,#f59e0b,#d97706)', status: 'Online', reason: 'Amit has assisted with 40+ SJPM installations and configuration issues across multiple Sabre environments.' }
    }
  }
];

// ===== STATE =====
let sessionCount = 0;
let sessions = [];
let currentMessages = [];
let sessionStartTime = null;
let timerInterval = null;

// ===== SPLASH SCREEN =====
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('app').classList.remove('hidden');
    initDashboard();
    startSessionTimer();
  }, 2400);
});

// ===== SESSION TIMER =====
function startSessionTimer() {
  sessionStartTime = Date.now();
  const timerEl = document.getElementById('timerDisplay');
  const timerBox = document.getElementById('sessionTimer');
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    timerEl.textContent = m + ':' + s;
  }, 1000);
  timerBox.classList.add('active');
}

// ===== QUERY RESOLVED =====
function markQueryResolved() {
  if (!sessionStartTime) return;
  const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = mins > 0 ? `${mins} min ${secs} sec` : `${secs} sec`;
  const overlay = document.createElement('div');
  overlay.className = 'resolved-overlay';
  overlay.innerHTML = `
    <div class="resolved-popup">
      <button class="resolved-x-btn" onclick="dismissResolved(this, false)"><i class="ri-close-line"></i></button>
      <div class="resolved-popup-icon">🎉</div>
      <h3>Query Resolved!</h3>
      <p class="resolved-level">Level-1 Support resolved this query</p>
      <div class="resolved-time-display">
        <i class="ri-timer-line"></i>
        <span>${timeStr}</span>
      </div>
      <p class="resolved-sub">No escalation needed — resolved at first contact</p>
      <button class="resolved-close-btn" onclick="dismissResolved(this, true)">Great, thanks!</button>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function dismissResolved(el, stopTimer) {
  el.closest('.resolved-overlay').remove();
  if (stopTimer && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ===== SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== VIEW SWITCHING =====
function switchView(viewId, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewId).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (viewId === 'dashboard') initDashboard();
}

// ===== NEW CHAT =====
function newChat() {
  document.getElementById('messages').innerHTML = '';
  document.getElementById('welcome').style.display = '';
  currentMessages = [];
  switchView('chat', document.querySelector('[data-view=chat]'));
  startSessionTimer();
}

// ===== SEND MESSAGE =====
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  autoResize(input);
  handleUserMessage(text);
}

function sendQuickQuery(text) {
  handleUserMessage(text);
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// ===== MESSAGE HANDLING =====
function handleUserMessage(text) {
  // Hide welcome
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = 'none';

  appendMessage('user', text);
  showTypingIndicator();

  // Simulate thinking delay
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    removeTypingIndicator();
    const answer = findBestAnswer(text);
    if (answer) {
      appendStructuredAnswer(answer);
    } else {
      appendFallbackAnswer(text);
    }
    saveSession(text);
  }, delay);
}

function findBestAnswer(query) {
  const q = query.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  return bestScore >= 3 ? bestMatch : null;
}

// ===== RENDER MESSAGES =====
function appendMessage(role, content) {
  const container = document.getElementById('messages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const iconClass = role === 'user' ? 'ri-user-3-line' : 'ri-sparkling-2-fill';

  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerHTML = `
    <div class="msg-avatar"><i class="${iconClass}"></i></div>
    <div class="msg-body">
      <div class="msg-content">${escapeHtml(content)}</div>
      <div class="msg-meta">
        <span class="msg-time">${time}</span>
        ${role === 'assistant' ? `<div class="msg-actions">
          <button class="msg-action-btn" title="Copy" onclick="copyMsg(this)"><i class="ri-file-copy-line"></i></button>
          <button class="msg-action-btn" title="Helpful" onclick="feedback(this,'👍')"><i class="ri-thumb-up-line"></i></button>
          <button class="msg-action-btn" title="Not helpful" onclick="feedback(this,'👎')"><i class="ri-thumb-down-line"></i></button>
        </div>` : ''}
      </div>
    </div>`;
  container.appendChild(div);
  scrollToBottom();
}

function appendStructuredAnswer(entry) {
  const a = entry.answer;
  const container = document.getElementById('messages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Build sources HTML
  const sourcesHtml = a.sources.map(s => `<span class="tag ${s.type}"><i class="ri-${s.type === 'kb' ? 'book-open' : s.type === 'sop' ? 'file-list-3' : 'terminal-box'}-line"></i>${s.label}</span>`).join('');

  // Build steps HTML
  const stepsHtml = a.steps.map(s => `
    <li>
      <strong>${s.title}</strong><br/>
      <span style="color:var(--text-secondary)">${s.detail}</span>
      ${s.command ? `<pre><code>${escapeHtml(s.command)}</code></pre>` : ''}
    </li>`).join('');

  // Build related articles
  const relatedHtml = a.relatedArticles.map(r => `<li>${r}</li>`).join('');

  // Severity badge
  const sevClass = a.severity === 'critical' ? 'critical' : a.severity === 'high' ? 'high' : 'medium';

  const div = document.createElement('div');
  div.className = 'message assistant';
  div.innerHTML = `
    <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
    <div class="msg-body">
      <div class="msg-content">
        <h4>${a.title} <span class="severity-badge ${sevClass}">${a.severity.toUpperCase()}</span></h4>

        <div style="margin:8px 0">${sourcesHtml}</div>

        <div class="confidence-bar">
          <span style="font-size:0.78rem;color:var(--text-secondary)">Confidence</span>
          <div class="conf-track"><div class="conf-fill" style="width:0%" data-target="${a.confidence}"></div></div>
          <span class="conf-label">${a.confidence}%</span>
        </div>

        <h5><i class="ri-search-eye-line"></i> Root Cause Analysis</h5>
        <p>${a.rootCause}</p>

        <h5><i class="ri-list-ordered-2"></i> Step-by-Step Resolution</h5>
        <div class="resolution-box">
          <ol class="step-list">${stepsHtml}</ol>
        </div>

        <h5><i class="ri-alarm-warning-line"></i> Escalation Guidance</h5>
        <div class="resolution-box">
          <p><strong>When to escalate:</strong> ${a.escalation.condition}</p>
          <p><strong>Escalate to:</strong> ${a.escalation.to}</p>
          <p><strong>Priority:</strong> <span class="severity-badge ${sevClass}">${a.escalation.priority}</span></p>
        </div>

        ${a.recommendedExpert ? `
        <h5><i class="ri-user-star-line"></i> Recommended Expert</h5>
        <div class="expert-card">
          <div class="expert-avatar" style="background:${a.recommendedExpert.color}">${a.recommendedExpert.initials}</div>
          <div class="expert-info">
            <div class="expert-name">${a.recommendedExpert.name} <span class="expert-status ${a.recommendedExpert.status === 'Online' ? 'online' : 'offline'}">${a.recommendedExpert.status}</span></div>
            <div class="expert-role">${a.recommendedExpert.role}</div>
            <div class="expert-reason">${a.recommendedExpert.reason}</div>
          </div>
          <button class="expert-connect-btn resolved-btn" onclick="markQueryResolved()"><i class="ri-checkbox-circle-line"></i> Query Resolved?</button>
          <button class="expert-connect-btn" onclick="connectExpert('${a.recommendedExpert.name}')"><i class="ri-chat-1-line"></i> Connect</button>
        </div>` : ''}

        <h5><i class="ri-links-line"></i> Related Articles</h5>
        <ul>${relatedHtml}</ul>

        <div class="msg-footer-actions" style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
          <button class="expert-connect-btn" onclick="generateTicket('${entry.id}')"><i class="ri-ticket-line"></i> Generate Ticket</button>
          <button class="expert-connect-btn" style="background:var(--bg-tertiary);border:1px solid var(--border)" onclick="exportChat()"><i class="ri-download-2-line"></i> Export</button>
        </div>

        <div class="rating-container">
          <span class="rating-label">Rate this resolution:</span>
          <div class="rating-stars">
            <button class="rating-star" onclick="rateResolution(1,this)">★</button>
            <button class="rating-star" onclick="rateResolution(2,this)">★</button>
            <button class="rating-star" onclick="rateResolution(3,this)">★</button>
            <button class="rating-star" onclick="rateResolution(4,this)">★</button>
            <button class="rating-star" onclick="rateResolution(5,this)">★</button>
          </div>
          <span class="rating-text"></span>
        </div>
      </div>
      <div class="msg-meta">
        <span class="msg-time">${time}</span>
        <div class="msg-actions">
          <button class="msg-action-btn" title="Copy" onclick="copyMsg(this)"><i class="ri-file-copy-line"></i></button>
          <button class="msg-action-btn" title="Helpful" onclick="feedback(this,'👍')"><i class="ri-thumb-up-line"></i></button>
          <button class="msg-action-btn" title="Not helpful" onclick="feedback(this,'👎')"><i class="ri-thumb-down-line"></i></button>
        </div>
      </div>
    </div>`;

  container.appendChild(div);
  scrollToBottom();

  // Animate confidence bar
  setTimeout(() => {
    div.querySelector('.conf-fill').style.width = a.confidence + '%';
  }, 100);
}

function appendFallbackAnswer(query) {
  const container = document.getElementById('messages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const suggestions = KNOWLEDGE_BASE.map(e => `<button class="quick-btn" onclick="sendQuickQuery('${escapeAttr(e.question)}')" style="margin:4px 0"><i class="ri-arrow-right-s-line"></i><span>${e.question}</span></button>`).join('');

  const div = document.createElement('div');
  div.className = 'message assistant';
  div.innerHTML = `
    <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
    <div class="msg-body">
      <div class="msg-content">
        <h4><i class="ri-information-line"></i> I don't have a specific resolution for that query yet.</h4>
        <p>My knowledge base is being continuously updated. Here are the topics I can currently help with:</p>
        <div style="display:flex;flex-direction:column;gap:4px;margin-top:12px">${suggestions}</div>
        <div class="resolution-box" style="margin-top:14px">
          <div class="rb-header"><i class="ri-lightbulb-line"></i> Tip</div>
          <p>You can also browse the <strong>Knowledge Base</strong> tab for SOPs and runbooks, or use the <strong>Escalation Guide</strong> to find the right team for your issue.</p>
        </div>
      </div>
      <div class="msg-meta">
        <span class="msg-time">${time}</span>
        <div class="msg-actions">
          <button class="msg-action-btn" title="Copy" onclick="copyMsg(this)"><i class="ri-file-copy-line"></i></button>
        </div>
      </div>
    </div>`;
  container.appendChild(div);
  scrollToBottom();
}

// ===== TYPING INDICATOR =====
function showTypingIndicator() {
  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'message assistant';
  div.id = 'typingMsg';
  div.innerHTML = `
    <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
    <div class="msg-body">
      <div class="msg-content">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>`;
  container.appendChild(div);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingMsg');
  if (el) el.remove();
}

// ===== UTILITIES =====
function scrollToBottom() {
  const area = document.getElementById('chatArea');
  requestAnimationFrame(() => area.scrollTop = area.scrollHeight);
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escapeAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function copyMsg(btn) {
  const content = btn.closest('.msg-body').querySelector('.msg-content').innerText;
  navigator.clipboard.writeText(content).then(() => showToast('Copied to clipboard'));
}

function feedback(btn, type) {
  btn.style.color = type === '👍' ? 'var(--success)' : 'var(--danger)';
  showToast(type === '👍' ? 'Thanks for the feedback!' : 'We\'ll improve this answer');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== SESSION MANAGEMENT =====
function saveSession(query) {
  sessionCount++;
  const sessionData = {
    id: sessionCount,
    query: query,
    messages: document.getElementById('messages').innerHTML,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  sessions.unshift(sessionData);
  if (sessions.length > 5) sessions.pop();
  renderRecentSessions();
}

function renderRecentSessions() {
  const sessionEl = document.getElementById('recentSessions');
  sessionEl.innerHTML = '';
  sessions.forEach(s => {
    const item = document.createElement('div');
    item.className = 'recent-item';
    item.onclick = () => loadSession(s.id);
    item.innerHTML = `<i class="ri-message-3-line"></i><span>${s.query.substring(0, 30)}${s.query.length > 30 ? '...' : ''}</span><span style="font-size:0.65rem;color:var(--text-muted);margin-left:auto">${s.time}</span>`;
    sessionEl.appendChild(item);
  });
}

function loadSession(id) {
  const session = sessions.find(s => s.id === id);
  if (!session) return;
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = 'none';
  document.getElementById('messages').innerHTML = session.messages;
  switchView('chat', document.querySelector('[data-view=chat]'));
  scrollToBottom();
  showToast('Session loaded');
}

// ===== MODALS =====
function showEscalation() { document.getElementById('escalationModal').classList.add('show'); }
function hideEscalation() { document.getElementById('escalationModal').classList.remove('show'); }
function closeModal(e) { if (e.target === e.currentTarget) e.target.classList.remove('show'); }

// ===== COLLAPSIBLE SECTIONS =====
function toggleSection(bodyId, headerEl) {
  const body = document.getElementById(bodyId);
  headerEl.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
}

// ===== KB FILTER =====
function filterKB(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.kb-card').forEach(card => {
    const tags = card.dataset.tags || '';
    const text = card.textContent.toLowerCase();
    card.classList.toggle('hidden', q && !text.includes(q) && !tags.includes(q));
  });
}

// ===== DASHBOARD INIT =====
function initDashboard() {
  // Animate metric counters
  document.querySelectorAll('.metric-value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.includes('%') ? '%' : '';
    animateCounter(el, 0, target, 1200, suffix);
  });

  // Build bar chart
  const barData = [
    { label: 'API/GW', before: 18, after: 2.3 },
    { label: 'K8s', before: 22, after: 2.8 },
    { label: 'DB', before: 15, after: 3.1 },
    { label: 'Auth', before: 12, after: 1.5 },
    { label: 'CI/CD', before: 10, after: 1.8 }
  ];
  const chart = document.getElementById('barChart');
  if (chart && !chart.hasChildNodes()) {
    const maxVal = Math.max(...barData.map(d => d.before));
    barData.forEach(d => {
      const group = document.createElement('div');
      group.className = 'bar-group';
      group.innerHTML = `
        <div class="bar-pair">
          <div class="bar before" style="height:0%" data-h="${(d.before / maxVal * 100)}"></div>
          <div class="bar after" style="height:0%" data-h="${(d.after / maxVal * 100)}"></div>
        </div>
        <div class="bar-label">${d.label}</div>`;
      chart.appendChild(group);
    });
    // Animate bars
    setTimeout(() => {
      chart.querySelectorAll('.bar').forEach(bar => {
        bar.style.height = bar.dataset.h + '%';
      });
    }, 200);
  }
}

function animateCounter(el, start, end, duration, suffix) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== SETTINGS =====
function showSettings() { document.getElementById('settingsModal').classList.add('show'); }
function hideSettings() { document.getElementById('settingsModal').classList.remove('show'); }

function changeTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  showToast('Theme changed to ' + theme);
}

function changeFontSize(size) {
  document.documentElement.style.fontSize = size + 'px';
  showToast('Font size updated');
}

function changeAccent(color1, color2, btn) {
  document.documentElement.style.setProperty('--accent', color1);
  document.documentElement.style.setProperty('--accent-hover', color2);
  document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${color1}, ${color2})`);
  document.documentElement.style.setProperty('--accent-glow', color1 + '40');
  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
  btn.classList.add('active');
  showToast('Accent color updated');
}

function clearAllData() {
  document.getElementById('messages').innerHTML = '';
  document.getElementById('recentSessions').innerHTML = '';
  document.getElementById('welcome').style.display = '';
  currentMessages = [];
  sessionCount = 0;
  hideSettings();
  showToast('All data cleared');
}

function connectExpert(name) {
  showToast('Connecting you to ' + name + '...');
  setTimeout(() => showToast(name + ' has been notified and will join shortly'), 1500);
}

// ===== COMMAND PALETTE =====
function showCommandPalette() {
  const cp = document.getElementById('commandPalette');
  cp.classList.add('show');
  setTimeout(() => document.getElementById('cmdInput').focus(), 100);
}
function closeCommandPalette(e) { if (e.target === e.currentTarget) document.getElementById('commandPalette').classList.remove('show'); }
function hideCommandPalette() { document.getElementById('commandPalette').classList.remove('show'); document.getElementById('cmdInput').value = ''; }

function filterCommands(q) {
  const items = document.querySelectorAll('#cmdResults .cmd-item');
  const query = q.toLowerCase();
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = (!query || text.includes(query)) ? 'flex' : 'none';
  });
}

function handleCmdKey(e) {
  if (e.key === 'Escape') hideCommandPalette();
  if (e.key === 'Enter') {
    const visible = [...document.querySelectorAll('#cmdResults .cmd-item')].filter(i => i.style.display !== 'none');
    if (visible.length) visible[0].click();
  }
}

function cmdAction(action) {
  hideCommandPalette();
  switch(action) {
    case 'newchat': newChat(); break;
    case 'export': exportChat(); break;
    case 'logs': showLogAnalyzer(); break;
    case 'escalation': showEscalation(); break;
    case 'dashboard': switchView('dashboard', document.querySelector('[data-view=dashboard]')); break;
    case 'q-host-down': switchView('chat', document.querySelector('[data-view=chat]')); setTimeout(() => sendQuickQuery('SJPM shows Host Status as Down for configured devices. How to fix?'), 200); break;
    case 'q-sjpm-unavail': switchView('chat', document.querySelector('[data-view=chat]')); setTimeout(() => sendQuickQuery('SJPM shows The Server is unavailable and the icon is yellow. How do I fix this?'), 200); break;
    case 'q-sjpm': switchView('chat', document.querySelector('[data-view=chat]')); setTimeout(() => sendQuickQuery('How to install Sabre Java Printing Module (SJPM)?'), 200); break;
  }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); showCommandPalette(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); newChat(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'e') { e.preventDefault(); exportChat(); }
  if (e.key === 'Escape') {
    hideCommandPalette();
    hideEscalation();
    hideSettings();
    hideLogAnalyzer();
    hideTicketModal();
  }
});

// ===== EXPORT CHAT =====
function exportChat() {
  const msgs = document.querySelectorAll('#messages .message');
  if (!msgs.length) { showToast('No messages to export'); return; }
  let text = '═══════════════════════════════════════════\n';
  text += '  AURA — Resolution Transcript\n';
  text += '  Generated: ' + new Date().toLocaleString() + '\n';
  text += '═══════════════════════════════════════════\n\n';
  msgs.forEach(msg => {
    const role = msg.classList.contains('user') ? '👤 ENGINEER' : '🤖 AURA';
    const content = msg.querySelector('.msg-content').innerText;
    const time = msg.querySelector('.msg-time')?.textContent || '';
    text += `[${time}] ${role}:\n${content}\n\n${'─'.repeat(45)}\n\n`;
  });
  text += '═══════════════════════════════════════════\n';
  text += '  End of Transcript\n';
  text += '═══════════════════════════════════════════\n';
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `AURA-transcript-${Date.now()}.txt`;
  a.click();
  showToast('Chat transcript exported');
}

// ===== LOG ANALYZER =====
const LOG_PATTERNS = [
  {
    pattern: /502|bad gateway/i, severity: 'error',
    title: '502 Bad Gateway Detected',
    desc: 'The reverse proxy / API gateway received an invalid or no response from the upstream backend service.',
    impact: 'Client-facing requests are failing. End users may see error pages or broken API responses.',
    suggestions: [
      'Verify upstream service health: <code>kubectl get pods -n &lt;ns&gt; | grep &lt;service&gt;</code>',
      'Check upstream service logs for application crashes or unhandled exceptions',
      'Review Nginx/Gateway error logs: <code>tail -f /var/log/nginx/error.log</code>',
      'Validate proxy timeout settings — increase <code>proxy_read_timeout</code> if backend is slow',
      'Check if recent deployments changed upstream endpoints or port configuration'
    ],
    action: null
  },
  {
    pattern: /connection refused/i, severity: 'error',
    title: 'Connection Refused (ECONNREFUSED)',
    desc: 'The target service is actively refusing TCP connections on the specified port. No process is listening on the destination.',
    impact: 'All requests to this service will fail immediately. Downstream services dependent on it will cascade errors.',
    suggestions: [
      'Confirm the target service is running: <code>kubectl get pods -n &lt;ns&gt; -o wide</code>',
      'Verify the service is listening on the correct port: <code>netstat -tlnp | grep &lt;port&gt;</code>',
      'Check if the container started successfully: <code>kubectl logs &lt;pod&gt; -n &lt;ns&gt;</code>',
      'Validate Kubernetes Service and Endpoint objects: <code>kubectl get endpoints &lt;svc&gt; -n &lt;ns&gt;</code>',
      'Review network policies or firewall rules that may block traffic between namespaces',
      'Restart the service if the process has exited: <code>kubectl rollout restart deployment/&lt;name&gt;</code>'
    ],
    action: null
  },
  {
    pattern: /upstream.*(timeout|timed out)/i, severity: 'error',
    title: 'Upstream Timeout',
    desc: 'The gateway waited for the upstream backend to respond but the request exceeded the configured timeout threshold.',
    impact: 'Slow or long-running requests will be terminated, returning 504 to clients. May indicate backend performance degradation.',
    suggestions: [
      'Check backend response times: <code>curl -w "time_total: %{time_total}\\n" -o /dev/null &lt;upstream_url&gt;</code>',
      'Increase timeout if legitimate long operations: set <code>proxy_read_timeout 120s</code>',
      'Identify slow database queries or external API calls in the backend',
      'Review resource utilization (CPU/memory) on upstream pods: <code>kubectl top pods -n &lt;ns&gt;</code>',
      'Consider implementing request-level timeouts and circuit breakers in the application'
    ],
    action: null
  },
  {
    pattern: /crashloopbackoff|crash.*loop/i, severity: 'error',
    title: 'CrashLoopBackOff Detected',
    desc: 'The container starts, crashes immediately, and Kubernetes keeps restarting it with increasing backoff delays (10s, 20s, 40s, ...).',
    impact: 'The service is completely unavailable. Pod will not become Ready and will not receive traffic.',
    suggestions: [
      'Check crash logs from previous run: <code>kubectl logs &lt;pod&gt; -n &lt;ns&gt; --previous</code>',
      'Inspect pod events for clues: <code>kubectl describe pod &lt;pod&gt; -n &lt;ns&gt;</code>',
      'Verify all ConfigMaps, Secrets, and environment variables are present and correct',
      'Check for OOMKilled in termination reason — may need increased memory limits',
      'Validate container image tag exists and is pullable from the registry',
      'If caused by a bad deployment, rollback: <code>kubectl rollout undo deployment/&lt;name&gt;</code>'
    ],
    action: 'q-k8s'
  },
  {
    pattern: /oomkill|out of memory|oom|exceeded memory/i, severity: 'error',
    title: 'OOM Killed — Out of Memory',
    desc: 'The container consumed more memory than its configured limit and was terminated by the Linux OOM killer (exit code 137).',
    impact: 'Service restarts abruptly losing in-flight requests. May trigger CrashLoopBackOff if memory usage is consistently high.',
    suggestions: [
      'Check current limits: <code>kubectl describe pod &lt;pod&gt; | grep -A5 Limits</code>',
      'Increase memory limits in deployment spec: <code>resources.limits.memory: 1Gi</code>',
      'For Java apps, align JVM heap: <code>-Xmx=70% of container limit</code>',
      'Profile application memory to identify leaks using heap dumps or APM tools',
      'Consider enabling vertical pod autoscaler (VPA) for automatic right-sizing'
    ],
    action: null
  },
  {
    pattern: /connection.*(pool|not available)|hikari.*timeout|pool.*exhaust/i, severity: 'error',
    title: 'Connection Pool Exhausted',
    desc: 'All connections in the application\'s database connection pool are in use. New requests cannot acquire a connection within the timeout window.',
    impact: 'Application threads block waiting for connections, causing request timeouts and cascading failures across the service.',
    suggestions: [
      'Enable leak detection: <code>spring.datasource.hikari.leak-detection-threshold=60000</code>',
      'Check active DB connections: <code>SELECT count(*), state FROM pg_stat_activity GROUP BY state</code>',
      'Identify long-running queries holding connections: <code>SELECT pid, duration, query FROM pg_stat_activity WHERE state != \'idle\' ORDER BY duration DESC</code>',
      'Review pool size — optimal formula: <code>pool_size = (core_count * 2) + effective_spindle_count</code>',
      'Check application code for unclosed connections or missing <code>try-with-resources</code> blocks',
      'Consider adding connection validation: <code>connectionTestQuery: SELECT 1</code>'
    ],
    action: null
  },
  {
    pattern: /too many connections/i, severity: 'error',
    title: 'Database Max Connections Reached',
    desc: 'The database server has hit its configured <code>max_connections</code> limit and is rejecting new connection attempts.',
    impact: 'No new clients or application instances can connect. All services sharing this database will fail simultaneously.',
    suggestions: [
      'Check current usage: <code>SELECT count(*) FROM pg_stat_activity</code> vs <code>SHOW max_connections</code>',
      'Identify which applications hold the most connections: <code>SELECT application_name, count(*) FROM pg_stat_activity GROUP BY 1 ORDER BY 2 DESC</code>',
      'Terminate idle connections: <code>SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = \'idle\' AND query_start < now() - interval \'10 minutes\'</code>',
      'Use PgBouncer or ProxySQL as a connection pooler between apps and database',
      'Reduce per-app pool sizes — total across all instances must be &lt; max_connections'
    ],
    action: null
  },
  {
    pattern: /ssl|certificate.*expir|tls.*error/i, severity: 'warn',
    title: 'SSL/TLS Certificate Issue',
    desc: 'A certificate-related warning was detected. The certificate may be expiring, expired, or misconfigured.',
    impact: 'If the certificate expires, HTTPS connections will fail and browsers will show security warnings to users.',
    suggestions: [
      'Check certificate expiry: <code>openssl s_client -connect &lt;host&gt;:443 | openssl x509 -noout -dates</code>',
      'Renew with cert-manager if using Kubernetes: <code>kubectl get certificate -A</code>',
      'Set up automated renewal with Let\'s Encrypt or your internal CA',
      'Verify the full certificate chain is correctly configured (intermediate certs included)',
      'Add monitoring alerts for certificates expiring within 30 days'
    ],
    action: null
  },
  {
    pattern: /permission denied|forbidden|403/i, severity: 'warn',
    title: 'Permission Denied / 403 Forbidden',
    desc: 'The request was authenticated but the identity does not have the required permissions to access the resource.',
    impact: 'Specific operations or endpoints are inaccessible. May block deployments, API calls, or service-to-service communication.',
    suggestions: [
      'Check RBAC roles and bindings: <code>kubectl auth can-i --list --as=system:serviceaccount:&lt;ns&gt;:&lt;sa&gt;</code>',
      'Review IAM policies for the service account in GCP/AWS',
      'Verify API key scopes and token permissions (OAuth scopes)',
      'Check if the resource requires elevated privileges or a different service account',
      'Review recent RBAC/IAM policy changes that may have removed access'
    ],
    action: null
  },
  {
    pattern: /404|not found/i, severity: 'info',
    title: 'Resource Not Found (404)',
    desc: 'The requested endpoint or resource does not exist at the specified path.',
    impact: 'Low severity — may be expected for deprecated endpoints. Could indicate routing misconfiguration if unexpected.',
    suggestions: [
      'Verify the API path and version — endpoint may have been deprecated or renamed',
      'Check Ingress/Route configuration: <code>kubectl get ingress -A</code>',
      'Review API gateway routing rules for path-based routing errors',
      'Confirm the backend service is registered and has matching route handlers'
    ],
    action: null
  },
];

function showLogAnalyzer() { document.getElementById('logAnalyzerModal').classList.add('show'); }
function hideLogAnalyzer() { document.getElementById('logAnalyzerModal').classList.remove('show'); }

function analyzeLogs() {
  const input = document.getElementById('logInput').value.trim();
  const results = document.getElementById('logResults');
  if (!input) { showToast('Please paste some logs first'); return; }

  const matches = [];
  const lines = input.split('\n');
  for (const line of lines) {
    for (const pat of LOG_PATTERNS) {
      if (pat.pattern.test(line)) {
        if (!matches.find(m => m.title === pat.title)) {
          matches.push({ ...pat, line: line.trim().substring(0, 150) });
        }
      }
    }
  }

  if (!matches.length) {
    results.innerHTML = `<div class="log-result-card"><p style="color:var(--text-secondary)"><i class="ri-checkbox-circle-line" style="color:var(--success)"></i> No known error patterns detected. Logs appear clean.</p></div>`;
    return;
  }

  const errorCount = matches.filter(m => m.severity === 'error').length;
  const warnCount = matches.filter(m => m.severity === 'warn').length;
  const infoCount = matches.filter(m => m.severity === 'info').length;

  let html = `<div class="log-result-card">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-weight:600;font-size:0.95rem"><i class="ri-scan-line" style="color:var(--accent)"></i> Analysis Complete</div>
    <div style="display:flex;gap:12px;margin-bottom:16px;font-size:0.78rem">
      ${errorCount ? `<span style="color:var(--danger)"><i class="ri-close-circle-line"></i> ${errorCount} Error${errorCount>1?'s':''}</span>` : ''}
      ${warnCount ? `<span style="color:var(--warning)"><i class="ri-alert-line"></i> ${warnCount} Warning${warnCount>1?'s':''}</span>` : ''}
      ${infoCount ? `<span style="color:var(--accent)"><i class="ri-information-line"></i> ${infoCount} Info</span>` : ''}
    </div>`;

  matches.forEach((m, idx) => {
    const suggestionsHtml = m.suggestions.map(s => `<li>${s}</li>`).join('');
    html += `<div class="log-match">
      <div class="log-match-icon ${m.severity}"><i class="ri-${m.severity === 'error' ? 'close-circle' : m.severity === 'warn' ? 'alert' : 'information'}-line"></i></div>
      <div class="log-match-body">
        <h5>${m.title} <span class="severity-badge ${m.severity === 'error' ? 'critical' : m.severity === 'warn' ? 'high' : 'medium'}" style="font-size:0.65rem">${m.severity.toUpperCase()}</span></h5>
        <p style="margin-bottom:6px">${m.desc}</p>
        <p style="font-size:0.78rem;color:var(--warning);margin-bottom:8px"><strong>Impact:</strong> ${m.impact}</p>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px"><strong>Log Entry:</strong><br/><code style="font-size:0.72rem">${escapeHtml(m.line)}</code></div>
        <div style="margin-bottom:8px"><strong style="font-size:0.8rem;color:var(--success)"><i class="ri-lightbulb-flash-line"></i> Recommended Actions:</strong><ol style="margin:6px 0 0 16px;font-size:0.8rem;color:var(--text-secondary);line-height:1.7">${suggestionsHtml}</ol></div>
        ${m.action ? `<span class="log-action" onclick="hideLogAnalyzer();cmdAction('${m.action}')"><i class="ri-arrow-right-s-line"></i> Open full step-by-step resolution guide</span>` : ''}
      </div>
    </div>`;
  });
  html += '</div>';
  results.innerHTML = html;
}

// ===== GENERATE TICKET =====
let lastResolvedEntry = null;

function generateTicket(entryId) {
  const entry = KNOWLEDGE_BASE.find(e => e.id === entryId);
  if (!entry) return;
  lastResolvedEntry = entry;
  const a = entry.answer;
  const ticketId = 'INC-' + (40920 + Math.floor(Math.random() * 100));
  const now = new Date();

  const html = `<div class="ticket-preview">
    <h4><i class="ri-ticket-line"></i> ${ticketId} — Auto-Generated Ticket</h4>
    <div class="ticket-field"><span class="tf-label">Ticket ID:</span><span class="tf-value">${ticketId}</span></div>
    <div class="ticket-field"><span class="tf-label">Created:</span><span class="tf-value">${now.toLocaleString()}</span></div>
    <div class="ticket-field"><span class="tf-label">Priority:</span><span class="tf-value"><span class="severity-badge ${a.severity === 'critical' ? 'critical' : 'high'}">${a.escalation.priority}</span></span></div>
    <div class="ticket-field"><span class="tf-label">Category:</span><span class="tf-value">${entry.question}</span></div>
    <div class="ticket-field"><span class="tf-label">Root Cause:</span><span class="tf-value">${a.rootCause.substring(0, 200)}...</span></div>
    <div class="ticket-field"><span class="tf-label">Steps Taken:</span><span class="tf-value">${a.steps.length} diagnostic steps completed</span></div>
    <div class="ticket-field"><span class="tf-label">Assigned To:</span><span class="tf-value">${a.recommendedExpert.name} (${a.recommendedExpert.role})</span></div>
    <div class="ticket-field"><span class="tf-label">Escalation:</span><span class="tf-value">${a.escalation.to}</span></div>
    <div class="ticket-field"><span class="tf-label">Confidence:</span><span class="tf-value">${a.confidence}%</span></div>
    <div class="ticket-field"><span class="tf-label">KB Refs:</span><span class="tf-value">${a.sources.map(s => s.label).join(', ')}</span></div>
  </div>`;
  document.getElementById('ticketContent').innerHTML = html;
  document.getElementById('ticketModal').classList.add('show');
}

function hideTicketModal() { document.getElementById('ticketModal').classList.remove('show'); }

function copyTicket() {
  const text = document.querySelector('.ticket-preview')?.innerText || '';
  navigator.clipboard.writeText(text).then(() => showToast('Ticket copied to clipboard'));
}

// ===== VOICE INPUT =====
let recognition = null;
let isRecording = false;

function toggleVoice() {
  const btn = document.getElementById('voiceBtn');
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Voice input not supported in this browser');
    return;
  }
  if (isRecording) {
    recognition.stop();
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => { isRecording = true; btn.classList.add('recording'); btn.innerHTML = '<i class="ri-mic-fill"></i>'; showToast('Listening...'); };
  recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('userInput').value = transcript;
    autoResize(document.getElementById('userInput'));
  };
  recognition.onend = () => { isRecording = false; btn.classList.remove('recording'); btn.innerHTML = '<i class="ri-mic-line"></i>'; };
  recognition.onerror = () => { isRecording = false; btn.classList.remove('recording'); btn.innerHTML = '<i class="ri-mic-line"></i>'; showToast('Voice recognition error'); };
  recognition.start();
}

// ===== RESOLUTION RATING =====
function rateResolution(stars, btn) {
  const container = btn.closest('.rating-container');
  const allStars = container.querySelectorAll('.rating-star');
  allStars.forEach((s, i) => s.classList.toggle('active', i < stars));
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  container.querySelector('.rating-text').textContent = labels[stars];
  showToast('Thanks! Rated ' + stars + '/5 — ' + labels[stars]);
}

// ===== GUIDED TROUBLESHOOTING FLOW =====
const GUIDED_FLOWS = {
  start: {
    title: 'What type of issue are you experiencing?',
    desc: 'Select the category that best describes your problem so I can guide you through diagnosis.',
    options: [
      { label: '📶 SJPM Host Status Down', next: 'sjpm-host-triage' },
      { label: '🖨️ SJPM Server Unavailable', next: 'sjpm-unavail-triage' },
      { label: '�️ Sabre Java Printing Module (SJPM)', next: 'sjpm-triage' },
      { label: '🔒 Authentication / Permission Errors', next: 'auth-triage' },
      { label: '📦 CI/CD / Deployment Failures', next: 'cicd-triage' },
    ],
    step: 1, total: 4
  },
  'sjpm-host-triage': {
    title: 'How many devices show Host Status Down?',
    desc: 'This helps determine if it\'s a device-specific or network-wide issue.',
    options: [
      { label: 'Single device is down', next: 'sjpm-host-single' },
      { label: 'All devices are down', next: 'sjpm-host-all' },
      { label: 'Not sure', next: 'sjpm-host-resolve' },
    ],
    step: 2, total: 4
  },
  'sjpm-host-single': {
    title: 'Is there an S02 error showing?',
    desc: 'S02 indicates the LNIATA is already in use by another session.',
    options: [
      { label: 'Yes, S02 error is showing', next: 'sjpm-host-resolve' },
      { label: 'No S02 error', next: 'sjpm-host-resolve' },
      { label: 'I don\'t know what S02 means', next: 'sjpm-host-resolve' },
    ],
    step: 3, total: 4
  },
  'sjpm-host-all': {
    title: 'Is Sabre Red 360 or VPN active?',
    desc: 'SJPM needs an active VPN/network connection to reach Sabre Host.',
    options: [
      { label: 'SR360 is open and connected', next: 'sjpm-host-resolve' },
      { label: 'SR360 is closed / VPN disconnected', next: 'sjpm-host-resolve' },
      { label: 'Using B2B private connection', next: 'sjpm-host-resolve' },
    ],
    step: 3, total: 4
  },
  'sjpm-host-resolve': {
    title: 'Loading Full Resolution Guide',
    desc: 'Based on your inputs: SJPM Host Status Down. Loading complete troubleshooting guide.',
    resolve: 'sjpm-host-down',
    step: 4, total: 4
  },
  'sjpm-unavail-triage': {
    title: 'What is the SJPM server mode?',
    desc: 'Right-click the SJPM tray icon → hover Server Mode to check.',
    options: [
      { label: 'Running as Service', next: 'sjpm-svc-fix' },
      { label: 'Running as Application', next: 'sjpm-app-fix' },
      { label: 'Not sure / Cannot tell', next: 'sjpm-svc-fix' },
    ],
    step: 2, total: 4
  },
  'sjpm-svc-fix': {
    title: 'Have you tried restarting the service?',
    desc: 'Try the quick fixes before deeper troubleshooting.',
    options: [
      { label: 'No, let me try first', next: 'sjpm-unavail-resolve' },
      { label: 'Yes, still not working', next: 'sjpm-unavail-resolve' },
      { label: 'Service stuck in Stopping state', next: 'sjpm-unavail-resolve' },
    ],
    step: 3, total: 4
  },
  'sjpm-app-fix': {
    title: 'Is the issue related to permissions?',
    desc: 'Check if you have Full Control on the SJPM folder.',
    options: [
      { label: 'Not sure, show me all solutions', next: 'sjpm-unavail-resolve' },
      { label: 'I have permissions, still failing', next: 'sjpm-unavail-resolve' },
    ],
    step: 3, total: 4
  },
  'sjpm-unavail-resolve': {
    title: 'Loading Full Resolution Guide',
    desc: 'Based on your inputs: SJPM Server Unavailable. Loading complete troubleshooting guide with all solutions.',
    resolve: 'sjpm-unavailable',
    step: 4, total: 4
  },
  'sjpm-triage': {
    title: 'What SJPM issue are you facing?',
    desc: 'Select what you need help with.',
    options: [
      { label: 'Fresh installation of SJPM', next: 'sjpm-env' },
      { label: 'SJPM installer not running / errors', next: 'sjpm-error' },
      { label: 'Reinstallation or upgrade', next: 'sjpm-env' },
    ],
    step: 2, total: 4
  },
  'sjpm-env': {
    title: 'Do you have Administrator rights on your machine?',
    desc: 'SJPM requires admin privileges for installation.',
    options: [
      { label: 'Yes, I have admin rights', next: 'sjpm-resolve' },
      { label: 'No, I need IT assistance', next: 'sjpm-noadmin' },
    ],
    step: 3, total: 4
  },
  'sjpm-resolve': {
    title: 'Ready — Launching SJPM Installation Guide',
    desc: 'Loading the complete step-by-step SJPM installation guide.',
    resolve: 'sjpm-install',
    step: 4, total: 4
  },
  'sjpm-noadmin': { title: 'Admin Rights Required', desc: 'Contact your local IT provider or raise a ServiceNow ticket requesting Administrator access to install SJPM. Include your machine name and justification.', step: 4, total: 4, stub: true },
  'sjpm-error': { title: 'SJPM Installer Troubleshooting', desc: 'Try: 1) Re-download the installer from central.sabre.com, 2) Ensure you right-click > Run as Administrator, 3) Temporarily disable antivirus, 4) Check Windows Event Viewer for error details. If issue persists, raise a ServiceNow ticket.', step: 4, total: 4, stub: true },
  // Stub flows for other categories
  'api-503': { title: 'Service Unavailable — Quick Check', desc: 'Verify the backend service is running and has healthy instances behind the load balancer. Check auto-scaling policies and instance health.', step: 4, total: 4, stub: true },
  'api-504': { title: 'Gateway Timeout — Quick Check', desc: 'The upstream is too slow. Check for long-running queries, increased payload sizes, or missing caching. Increase proxy_read_timeout as a temporary fix.', step: 4, total: 4, stub: true },
  'api-flap': { title: 'Intermittent Failures — Quick Check', desc: 'Typically caused by pod restarts, connection resets, or DNS TTL issues. Monitor pod stability and check for resource limits being hit.', step: 4, total: 4, stub: true },
  'auth-triage': { title: 'Auth Issue — Quick Check', desc: 'Verify token expiry, service account permissions, RBAC rules, and API key validity. Check OAuth/OIDC provider health.', step: 4, total: 4, stub: true },
  'cicd-triage': { title: 'CI/CD Issue — Quick Check', desc: 'Check pipeline logs, verify credentials/tokens, check runner health, and review recent Dockerfile or config changes.', step: 4, total: 4, stub: true },
  'k8s-image': { title: 'ImagePullBackOff — Quick Check', desc: 'Verify image name/tag, check registry credentials (imagePullSecrets), and ensure network access to the container registry.', step: 4, total: 4, stub: true },
  'k8s-pending': { title: 'Pending Pod — Quick Check', desc: 'Check node resources (kubectl describe nodes), node selectors/taints/tolerations, and PVC binding status.', step: 4, total: 4, stub: true },
  'k8s-oom': { title: 'OOMKilled — Quick Check', desc: 'Container exceeded memory limits. Increase resource limits, optimize application memory, or add JVM flags like -Xmx for Java apps.', step: 4, total: 4, stub: true },
  'db-slow': { title: 'Slow Queries — Quick Check', desc: 'Run EXPLAIN ANALYZE on slow queries. Check for missing indexes, full table scans, and lock contention. Review pg_stat_statements.', step: 4, total: 4, stub: true },
  'db-repl': { title: 'Replication Lag — Quick Check', desc: 'Check replica health, network bandwidth, and write volume. Consider promoting replica and rebuilding if lag is unrecoverable.', step: 4, total: 4, stub: true },
  'db-disk': { title: 'Disk Space — Quick Check', desc: 'Identify large tables (pg_total_relation_size), run VACUUM FULL, archive old data, and extend volume if needed.', step: 4, total: 4, stub: true },
};

function startGuidedFlow() {
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = 'none';
  appendMessage('user', 'Start guided troubleshooting');
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    renderGuidedStep('start');
  }, 600);
}

function renderGuidedStep(stepId) {
  const step = GUIDED_FLOWS[stepId];
  if (!step) return;

  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'message assistant';

  // Progress dots
  let progressHtml = '<div class="gf-progress">';
  for (let i = 1; i <= step.total; i++) {
    const cls = i < step.step ? 'done' : i === step.step ? 'current' : '';
    progressHtml += `<div class="gf-dot ${cls}"></div>`;
  }
  progressHtml += '</div>';

  // If this is a resolve step, trigger the answer
  if (step.resolve) {
    div.innerHTML = `
      <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
      <div class="msg-body"><div class="msg-content">
        <div class="guided-flow">
          <div class="gf-header"><i class="ri-checkbox-circle-fill" style="color:var(--success)"></i> ${step.title}</div>
          ${progressHtml}
          <div class="gf-step-desc">${step.desc}</div>
          <div class="gf-actions" style="margin-top:12px">
            <button class="gf-btn primary" onclick="this.closest('.message').remove();sendQuickQuery('${KNOWLEDGE_BASE.find(e=>e.id===step.resolve)?.question}')"><i class="ri-arrow-right-line"></i> View Resolution</button>
          </div>
        </div>
      </div></div>`;
    container.appendChild(div);
    scrollToBottom();
    return;
  }

  // Stub end step
  if (step.stub) {
    div.innerHTML = `
      <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
      <div class="msg-body"><div class="msg-content">
        <div class="guided-flow">
          <div class="gf-header"><i class="ri-lightbulb-flash-line" style="color:var(--warning)"></i> ${step.title}</div>
          ${progressHtml}
          <div class="gf-step-desc">${step.desc}</div>
          <p style="margin-top:12px;font-size:0.82rem;color:var(--text-muted)"><i class="ri-information-line"></i> Full resolution guide for this category is being added to the knowledge base.</p>
        </div>
      </div></div>`;
    container.appendChild(div);
    scrollToBottom();
    return;
  }

  // Options step
  const optionsHtml = step.options.map(o => `<button class="gf-option" onclick="this.closest('.guided-flow').style.opacity='0.5';this.closest('.guided-flow').style.pointerEvents='none';renderGuidedStep('${o.next}')">${o.label}</button>`).join('');

  div.innerHTML = `
    <div class="msg-avatar"><i class="ri-sparkling-2-fill"></i></div>
    <div class="msg-body"><div class="msg-content">
      <div class="guided-flow">
        <div class="gf-header"><i class="ri-route-line"></i> Guided Diagnosis — Step ${step.step}/${step.total}</div>
        ${progressHtml}
        <div class="gf-step-content">
          <div class="gf-step-title">${step.title}</div>
          <div class="gf-step-desc">${step.desc}</div>
        </div>
        ${optionsHtml}
      </div>
    </div></div>`;
  container.appendChild(div);
  scrollToBottom();
}
