/* ═══════════════════════════════════════════════════════════════════
   SUBHRAMIT BERA — PORTFOLIO v3.0 INTERACTIVE ENGINE
   - Web Audio API Cyber Synthesizer (Pure JS sound generation)
   - Command Palette CLI (Ctrl+K / ⌘K) with live search & instant triggers
   - Text Scramble / Matrix Decryption transition on hover
   - Recruiter Fast-Track Focus Lens
   - Interactive LangGraph Pipeline Visualizer with Live Code Inspector
   - Silicon-to-Transformers Stack Explorer
   - Magnetic Buttons Physics
   - Laser Scroll Progress Bar
   - Hero Terminal Simulation
   - 3D Card Tilt & Cursor Spotlight
   - Synaptic Pulse Neural Canvas on Click
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initCursorGlow();
  initLaserScrollProgress();
  initNavbar();
  initMobileMenu();
  initAudioEffects();
  initTypingEffect();
  initTextScramble();
  initHeroTerminal();
  initRecruiterLens();
  initLangGraphVisualizer();
  initSiliconStackExplorer();
  initCommandPalette();
  initMagneticButtons();
  initSpotlightAndTilt();
  initScrollReveal();
  initStatCounter();
  initProjectFilters();
  initSmoothScroll();
  initActiveNavLink();
  initEmailCopy();
});

/* ═══════════════ LASER SCROLL PROGRESS BAR ═══════════════ */
function initLaserScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ═══════════════ WEB AUDIO API SOUND SYNTHESIZER ═══════════════ */
let audioCtx = null;
let soundEnabled = false;

function initAudioEffects() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (!toggleBtn || !soundIcon) return;

  const saved = localStorage.getItem('sb_portfolio_sound');
  if (saved === 'enabled') {
    soundEnabled = true;
    soundIcon.textContent = '🔊';
    toggleBtn.classList.add('active');
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  toggleBtn.addEventListener('click', () => {
    getAudioContext();
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.textContent = '🔊';
      toggleBtn.classList.add('active');
      localStorage.setItem('sb_portfolio_sound', 'enabled');
      playSuccessSound();
      showToast('Cyber audio effects enabled');
    } else {
      soundIcon.textContent = '🔇';
      toggleBtn.classList.remove('active');
      localStorage.setItem('sb_portfolio_sound', 'disabled');
      showToast('Audio muted');
    }
  });

  document.querySelectorAll('button, a.btn, .lg-node, .stack-tier-card, .term-tab').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playHoverSound();
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playClickSound();
    });
  });
}

function playHoverSound() {
  if (!soundEnabled) return;
  try {
    const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {}
}

function playClickSound() {
  if (!soundEnabled) return;
  try {
    const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

function playSuccessSound() {
  if (!soundEnabled) return;
  try {
    const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx = ctx;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);
      gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.04 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + i * 0.04 + 0.2);
    });
  } catch (e) {}
}

/* ═══════════════ TEXT SCRAMBLE / DECRYPT EFFECT ═══════════════ */
function initTextScramble() {
  const scrambleElements = document.querySelectorAll('.scramble-hover');
  const chars = '!<>-_\\/[]{}—=+*^?#________0101λπ';

  scrambleElements.forEach(el => {
    const originalText = el.dataset.text || el.textContent;
    let frame = 0;
    let timer = null;

    el.addEventListener('mouseenter', () => {
      if (timer) clearInterval(timer);
      frame = 0;
      const totalFrames = 16;

      timer = setInterval(() => {
        let output = '';
        const progress = frame / totalFrames;

        for (let i = 0; i < originalText.length; i++) {
          if (i / originalText.length < progress) {
            output += originalText[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        el.textContent = output;
        frame++;

        if (frame > totalFrames) {
          clearInterval(timer);
          el.textContent = originalText;
        }
      }, 25);
    });
  });
}

/* ═══════════════ RECRUITER FAST-TRACK LENS FILTER ═══════════════ */
function initRecruiterLens() {
  const buttons = document.querySelectorAll('.lens-btn');
  const banner = document.getElementById('lensBanner');
  if (!buttons.length || !banner) return;

  const lensContent = {
    all: 'Viewing <strong>Full Engineering Profile</strong>: Autonomous agents, RAG engines, full-stack systems & hardware architecture.',
    ai: 'Targeting <strong>AI & LLM Engineer</strong>: Highlighting Reflexion self-debugging agents, LangGraph state pipelines, episodic memory & vector intelligence.',
    systems: 'Targeting <strong>Core Systems & Backend</strong>: Highlighting SAT 2,800+ LOC physics engine, high-throughput APIs, Docker isolation & 500+ algorithmic DSA.',
    hardware: 'Targeting <strong>Silicon & Hardware Architecture</strong>: Highlighting RISC-V 5-stage CPU design, FPGA synthesis, gate-level RTL & semiconductor device physics.'
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lens = btn.dataset.lens;

      banner.innerHTML = lensContent[lens] || lensContent.all;

      // Automatically sync project filter buttons
      const targetFilter = lens === 'systems' ? 'backend' : (lens === 'all' ? 'all' : lens);
      const projectFilterBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
      if (projectFilterBtn) projectFilterBtn.click();

      // Highlight corresponding skill tags
      document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.classList.remove('highlight');
      });

      if (lens === 'ai') {
        document.querySelectorAll('.skill-category:nth-child(1) .skill-tag').forEach(t => t.classList.add('highlight'));
      } else if (lens === 'systems') {
        document.querySelectorAll('.skill-category:nth-child(3) .skill-tag').forEach(t => t.classList.add('highlight'));
      } else if (lens === 'hardware') {
        document.querySelectorAll('.skill-category:nth-child(4) .skill-tag').forEach(t => t.classList.add('highlight'));
      }

      showToast(`Profile focused on: ${btn.textContent.trim()}`);
    });
  });
}

/* ═══════════════ INTERACTIVE LANGGRAPH VISUALIZER ═══════════════ */
function initLangGraphVisualizer() {
  const nodes = document.querySelectorAll('.lg-node');
  const title = document.getElementById('lgTitle');
  const latency = document.getElementById('lgLatency');
  const desc = document.getElementById('lgDesc');
  const snippet = document.getElementById('lgSnippet');

  if (!nodes.length || !title || !snippet) return;

  const nodeData = [
    {
      title: 'State 1: Query Decomposition Node',
      latency: 'Latency: 110ms',
      desc: 'Splits multi-hop compound questions into targeted financial sub-queries (e.g., extracting Q3 CapEx vs Operating Margin).',
      code: `async def decompose_query(state: AgentState) -> dict:\n    sub_queries = await llm_structured.ainvoke(state.raw_query)\n    return {"sub_queries": sub_queries, "current_step": "retrieval"}`
    },
    {
      title: 'State 2: Hybrid Qdrant Vector Search',
      latency: 'Latency: 45ms',
      desc: 'Retrieves top-k dense and sparse semantic embeddings across 50+ parsed SEC 10-K & 10-Q financial documents.',
      code: `async def vector_search(state: AgentState) -> dict:\n    docs = await qdrant_client.search_batch(\n        collection_name="sec_filings", queries=state["sub_queries"], limit=25\n    )\n    return {"retrieved_docs": docs}`
    },
    {
      title: 'State 3: FlashRank Cross-Encoder Rerank',
      latency: 'Latency: 140ms (+40% accuracy)',
      desc: 'Computes deep token-level cross-attention between queries and retrieved chunks, discarding low-relevance noise.',
      code: `def flashrank_rerank(state: AgentState) -> dict:\n    rerank_request = RerankRequest(query=state.raw_query, passages=state["retrieved_docs"])\n    ranked_results = ranker.rerank(rerank_request)\n    return {"context": ranked_results[:5]}`
    },
    {
      title: 'State 4: Hallucination & Fact Verification',
      latency: 'Latency: 180ms (Conditional Edge)',
      desc: 'Verifies every numerical claim against retrieved SEC tables. If ungrounded, routes to query re-planning retry node.',
      code: `def verify_hallucinations(state: AgentState) -> str:\n    is_grounded = citation_evaluator.evaluate(state["candidate_answer"], state["context"])\n    return "synthesize" if is_grounded else "retry_decomposition"`
    },
    {
      title: 'State 5: Verified Synthesis & Citation',
      latency: 'Latency: 350ms',
      desc: 'Synthesizes final comprehensive analytical briefing with exact page references, table numbers, and audit trails.',
      code: `async def synthesize_answer(state: AgentState) -> dict:\n    final_report = await synthesis_chain.ainvoke({\n        "query": state.raw_query, "context": state["context"]\n    })\n    return {"final_report": final_report, "status": "COMPLETED"}`
    }
  ];

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const data = nodeData[idx];
      if (data) {
        title.textContent = data.title;
        latency.textContent = data.latency;
        desc.textContent = data.desc;
        snippet.textContent = data.code;
      }
    });
  });
}

/* ═══════════════ SILICON-TO-TRANSFORMERS STACK EXPLORER ═══════════════ */
function initSiliconStackExplorer() {
  const cards = document.querySelectorAll('.stack-tier-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ═══════════════ COMMAND PALETTE MODAL (Ctrl+K / ⌘K) ═══════════════ */
function initCommandPalette() {
  const palette = document.getElementById('cmdPalette');
  const openBtn = document.getElementById('openCmdPalette');
  const input = document.getElementById('cmdSearchInput');
  const resultsList = document.getElementById('cmdResultsList');

  if (!palette || !input || !resultsList) return;

  const commands = [
    { id: 'proj-reflexion', icon: '🤖', title: 'Reflexion Code Agent', action: 'Jump to Project', target: '#projects', run: () => scrollToSection('#projects') },
    { id: 'proj-rag', icon: '📊', title: 'Finance Intelligence RAG', action: 'Inspect LangGraph', target: '#projects', run: () => { scrollToSection('#projects'); document.querySelector('.lg-node[data-node="2"]')?.click(); } },
    { id: 'proj-sim', icon: '🚗', title: 'SimEngine (2.8k LOC SAT)', action: 'View Physics Engine', target: '#projects', run: () => scrollToSection('#projects') },
    { id: 'stack-explore', icon: '⚡', title: 'Silicon to Transformers Spectrum', action: 'Explore Hardware Stack', target: '#skills', run: () => scrollToSection('#skills') },
    { id: 'lens-ai', icon: '🎯', title: 'Tailor View: AI / LLM Engineer', action: 'Switch Focus', run: () => document.querySelector('.lens-btn[data-lens="ai"]')?.click() },
    { id: 'lens-sys', icon: '⚙️', title: 'Tailor View: Core Systems & Backend', action: 'Switch Focus', run: () => document.querySelector('.lens-btn[data-lens="systems"]')?.click() },
    { id: 'lens-hw', icon: '🔬', title: 'Tailor View: Silicon & Architecture', action: 'Switch Focus', run: () => document.querySelector('.lens-btn[data-lens="hardware"]')?.click() },
    { id: 'copy-email', icon: '📋', title: 'Copy Email Address', action: 'sbsubhramit@gmail.com', run: () => copyEmailToClipboard() },
    { id: 'view-linkedin', icon: '💼', title: 'Open LinkedIn Profile', action: 'in/subhramitbera', run: () => window.open('https://www.linkedin.com/in/subhramitbera/', '_blank') },
    { id: 'view-resume', icon: '📄', title: 'View & Download Resume', action: 'Google Drive Link', run: () => window.open('https://drive.google.com/file/d/1TWFrEb8OLHlO_x8kI8SdbwiuW08R7AsG/view?usp=drive_link', '_blank') },
    { id: 'term-sim', icon: '▶️', title: 'Run Hero Terminal Cycle', action: 'Execute AI Demo', run: () => { scrollToSection('#hero'); document.getElementById('runSimBtn')?.click(); } },
    { id: 'toggle-audio', icon: '🔊', title: 'Toggle Cyber Audio Effects', action: 'Audio Feedback', run: () => document.getElementById('soundToggleBtn')?.click() },
    { id: 'contact', icon: '✉️', title: 'Contact & Hire Subhramit', action: 'Jump to Contact', target: '#contact', run: () => scrollToSection('#contact') }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function renderList() {
    resultsList.innerHTML = '';
    if (!filteredCommands.length) {
      resultsList.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching commands found</div>';
      return;
    }

    filteredCommands.forEach((cmd, i) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${i === selectedIndex ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <span class="cmd-item-title">${cmd.title}</span>
        </div>
        <span class="cmd-item-action">${cmd.action}</span>
      `;

      item.addEventListener('click', () => {
        executeCommand(cmd);
      });

      resultsList.appendChild(item);
    });
  }

  function openPalette() {
    palette.classList.add('active');
    palette.setAttribute('aria-hidden', 'false');
    input.value = '';
    filteredCommands = [...commands];
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
    if (soundEnabled) playClickSound();
  }

  function closePalette() {
    palette.classList.remove('active');
    palette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function executeCommand(cmd) {
    closePalette();
    if (cmd.run) cmd.run();
    if (soundEnabled) playSuccessSound();
  }

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  if (openBtn) openBtn.addEventListener('click', openPalette);

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    filteredCommands = commands.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.action.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderList();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      renderList();
      scrollToActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderList();
      scrollToActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    }
  });

  function scrollToActive() {
    const activeEl = resultsList.querySelector('.cmd-item.selected');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ═══════════════ MAGNETIC BUTTONS ═══════════════ */
function initMagneticButtons() {
  if (window.innerWidth < 1024) return;
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ═══════════════ NEURAL NETWORK CANVAS WITH SYNAPTIC WAVE ═══════════════ */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let nodes = [];
  let ripples = [];
  let mouse = { x: -1000, y: -1000 };
  const NODE_COUNT_BASE = 80;
  const CONNECTION_DISTANCE = 145;
  const MOUSE_RADIUS = 200;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createNodes() {
    const count = Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 15000));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.45 + 0.2,
      });
    }
  }

  function drawNode(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 255, ${node.opacity})`;
    ctx.fill();
  }

  function drawConnection(a, b, dist) {
    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.14;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(124, 77, 255, ${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  function drawMouseConnection(node, dist) {
    const alpha = (1 - dist / MOUSE_RADIUS) * 0.28;
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Synaptic ripple pulse on click
  window.addEventListener('click', (e) => {
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 180,
      opacity: 0.5
    });
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render ripples
    for (let r = ripples.length - 1; r >= 0; r--) {
      const rip = ripples[r];
      rip.radius += 4;
      rip.opacity *= 0.94;

      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 229, 255, ${rip.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (rip.radius > rip.maxRadius || rip.opacity < 0.01) {
        ripples.splice(r, 1);
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));

      drawNode(node);

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          drawConnection(node, other, dist);
        }
      }

      const mdx = node.x - mouse.x;
      const mdy = node.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < MOUSE_RADIUS) {
        drawMouseConnection(node, mDist);
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  createNodes();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createNodes();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
}

/* ═══════════════ CURSOR GLOW ═══════════════ */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function updateGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(updateGlow);
  }

  updateGlow();
}

/* ═══════════════ CARD SPOTLIGHT & 3D TILT ═══════════════ */
function initSpotlightAndTilt() {
  const cards = document.querySelectorAll('.spotlight-card');
  const tiltCards = document.querySelectorAll('.featured-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  if (window.innerWidth > 1024) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

/* ═══════════════ NAVBAR ═══════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ═══════════════ MOBILE MENU ═══════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('mobileOverlay');
  if (!hamburger || !overlay) return;

  const mobileLinks = overlay.querySelectorAll('.mobile-link');

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════ TYPING EFFECT ═══════════════ */
function initTypingEffect() {
  const element = document.getElementById('typingText');
  if (!element) return;

  const phrases = [
    'Autonomous AI Agent Engineer',
    'LangGraph & Multi-Hop RAG Architect',
    'High-Performance Systems & Physics Builder',
    'Silicon & Computer Architecture Specialist',
    '500+ LeetCode DSA Problem Solver',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 75;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 600);
}

/* ═══════════════ INTERACTIVE HERO TERMINAL ═══════════════ */
function initHeroTerminal() {
  const screen = document.getElementById('terminalScreen');
  const tabs = document.querySelectorAll('.term-tab');
  const runBtn = document.getElementById('runSimBtn');
  const solveRateEl = document.getElementById('termSolveRate');
  const latencyEl = document.getElementById('termLatency');

  if (!screen) return;

  let currentTab = 'reflexion';
  let streamTimer = null;

  const demoData = {
    reflexion: {
      solveRate: '100%',
      latency: '<15s',
      logs: [
        { tag: 'INIT', type: 'init', text: 'Initializing Reflexion Agent [NeurIPS 2023]' },
        { tag: 'LOAD', type: 'run', text: 'Loaded 33 benchmark tests (leetcode hard / recursion)' },
        { tag: 'EXEC', type: 'state', text: 'Cycle 0: Subprocess spawned with 10s execution timeout' },
        { tag: 'WARN', type: 'warn', text: 'Test #4 failed: RecursionError on boundary node [k=0]' },
        { tag: 'MEMO', type: 'reflect', text: 'Episodic Memory: Stored failure trace & AST context' },
        { tag: 'REFL', type: 'reflect', text: 'Agent Reflection: Adding memoization table & base case' },
        { tag: 'EXEC', type: 'run', text: 'Cycle 1: Patching AST & executing test verification' },
        { tag: 'PASS', type: 'pass', text: '33/33 Tests PASSED in 1.2s • Solve Rate: 100%' }
      ]
    },
    rag: {
      solveRate: '96.4%',
      latency: '<850ms',
      logs: [
        { tag: 'INIT', type: 'init', text: 'LangGraph Engine: State Machine Initialized' },
        { tag: 'NODE1', type: 'state', text: 'State 1/5: Decomposing multi-hop financial query' },
        { tag: 'NODE2', type: 'run', text: 'State 2/5: Qdrant dense vector search (top_k=25 chunks)' },
        { tag: 'NODE3', type: 'reflect', text: 'State 3/5: FlashRank cross-encoder rerank (+40% accuracy)' },
        { tag: 'NODE4', type: 'warn', text: 'State 4/5: Hallucination check triggered -> verification PASS' },
        { tag: 'NODE5', type: 'pass', text: 'State 5/5: Synthesis complete with precise 10-K citations' }
      ]
    },
    sim: {
      solveRate: '60 FPS',
      latency: '16.6ms/f',
      logs: [
        { tag: 'INIT', type: 'init', text: 'SimEngine: 2,800+ LOC multi-agent traffic simulation' },
        { tag: 'PHYS', type: 'run', text: 'Sub-stepped Euler integration (dt = 0.016s) engaged' },
        { tag: 'COLL', type: 'state', text: 'Separating Axis Theorem (SAT): Rotated polygon collision' },
        { tag: 'STEER', type: 'reflect', text: 'Social-force steering: Closing-speed repulsion cones' },
        { tag: 'PERF', type: 'pass', text: 'Zero collision misses • Deterministic 60 FPS achieved' }
      ]
    }
  };

  function playTerminalStream(tabKey) {
    if (streamTimer) clearTimeout(streamTimer);
    screen.innerHTML = '';
    const data = demoData[tabKey];
    if (!data) return;

    if (solveRateEl) solveRateEl.textContent = data.solveRate;
    if (latencyEl) latencyEl.textContent = data.latency;

    let index = 0;

    function nextLine() {
      if (index >= data.logs.length) return;

      const item = data.logs[index];
      const lineDiv = document.createElement('div');
      lineDiv.className = 'term-line';
      lineDiv.innerHTML = `<span class="term-tag ${item.type}">[${item.tag}]</span> <span>${item.text}</span>`;
      screen.appendChild(lineDiv);
      screen.scrollTop = screen.scrollHeight;

      index++;
      streamTimer = setTimeout(nextLine, 280);
    }

    nextLine();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      playTerminalStream(currentTab);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      playTerminalStream(currentTab);
    });
  }

  setTimeout(() => {
    playTerminalStream('reflexion');
  }, 900);
}

/* ═══════════════ SCROLL REVEAL ═══════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  reveals.forEach(el => observer.observe(el));
}

/* ═══════════════ STAT COUNTER ANIMATION ═══════════════ */
function initStatCounter() {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(stat => observer.observe(stat));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (Number.isInteger(target)) {
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;
      } else {
        const current = (eased * target).toFixed(2);
        el.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ═══════════════ PROJECT FILTERS ═══════════════ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featuredCards = document.querySelectorAll('.featured-card');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      featuredCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ═══════════════ SMOOTH SCROLL ═══════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ═══════════════ ACTIVE NAV LINK TRACKING ═══════════════ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-80px 0px -40% 0px',
  });

  sections.forEach(section => observer.observe(section));
}

/* ═══════════════ EMAIL COPY WITH TOAST ═══════════════ */
function initEmailCopy() {
  const emailCard = document.getElementById('copyEmailCard');
  if (!emailCard) return;

  emailCard.addEventListener('click', () => {
    const email = emailCard.dataset.email || 'sbsubhramit@gmail.com';
    copyEmailToClipboard(email);
  });
}

function copyEmailToClipboard(email = 'sbsubhramit@gmail.com') {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email copied: ${email}`);
    if (soundEnabled) playSuccessSound();
  }).catch(() => {
    window.location.href = `mailto:${email}`;
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('copyToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
