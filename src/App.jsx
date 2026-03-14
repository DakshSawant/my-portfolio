import { useState, useEffect, useRef } from "react";

const C = {
  cyan:    "#00fff0",
  magenta: "#ff0080",
  yellow:  "#f0ff00",
  green:   "#00ff41",
  bg:      "#020408",
  panel:   "#060d12",
  border:  "#0a2a2a",
};

const PHOTO_URL = "/pic1.jpeg";

const STATS = [
  { val:"10K+",  label:"Users Served",    hex:"0x270F" },
  { val:"99.9%", label:"Uptime",          hex:"0x63C7" },
  { val:"8.78",  label:"MCA CGPA",        hex:"0x225A" },
  { val:"01",    label:"Papers Published",hex:"0x0001" },
];

const PROJECTS = [
  { id:"PRJ-001", name:"HSNCU Portal",       tag:"WordPress · JS",   stat:"10K+ users",    color:C.cyan,    desc:"University production site serving 10,000+ users — 99.9% uptime, 30% faster loads via server-side caching and hosting optimization." },
  { id:"PRJ-002", name:"AI Doc Verify",      tag:"Python · OpenCV",  stat:"60% faster",    color:C.magenta, desc:"ML image processing pipeline automating student document verification. Cut manual processing time by 60%, improved data accuracy." },
  { id:"PRJ-003", name:"ERP Migration",      tag:"Systems · MySQL",  stat:"Zero loss",     color:C.yellow,  desc:"Full student records migration from legacy system to modern ERP. Completed a week ahead of schedule. Zero data loss." },
  { id:"PRJ-004", name:"Research Paper",     tag:"IoT · mHealth",    stat:"IJRAR 2023",    color:C.green,   desc:"Published research: connected healthcare empowering rapid response through IoT and mobile technology.", link:"http://www.ijrar.org/papers/IJRAR23C1417.pdf" },
  { id:"PRJ-005", name:"Enrollment System",  tag:"React · API",      stat:"2K applicants", color:C.cyan,    desc:"End-to-end enrollment management for 2,000+ applicants per cycle with full ERP backend integration." },
  { id:"PRJ-006", name:"Weather Dashboard",  tag:"JS · REST API",    stat:"Live data",     color:C.magenta, desc:"Real-time weather platform with live forecasts. Reliable REST API data pipeline, intuitive UX." },
];

const EXPERIENCE = [
  {
    id:"EXP-001", role:"Website Coordinator & ERP Specialist",
    company:"HSNC University", period:"Oct 2023 – Present", color:C.cyan,
    bullets:[
      "Oversaw hsncu.edu.in for 10,000+ users — 99.9% uptime, 30% faster page loads",
      "AI/ML image processing (Python, OpenCV) — cut doc verification time 60%",
      "Built Enrollment Management System for 2,000+ applicants per cycle",
      "Migrated legacy student records to modern ERP — zero data loss, a week early",
      "Supported 3,000+ concurrent users during online entrance examinations",
    ],
    stack:["WordPress","JavaScript","Python","OpenCV","MySQL","REST API","cPanel"],
  },
  {
    id:"EXP-002", role:"Digital Marketing Executive",
    company:"IB Experts", period:"Sep – Oct 2023", color:C.magenta,
    bullets:[
      "Planned & optimised digital campaigns across Google Ads, Facebook, LinkedIn",
      "On-page & off-page SEO via Google Analytics and Search Console",
      "Developed content calendars coordinating writers, designers, email campaigns",
    ],
    stack:["Google Ads","SEO","Analytics","Content Strategy","Email Marketing"],
  },
  {
    id:"EXP-003", role:"Trainee Analyst Intern",
    company:"NN Solution Pvt Ltd", period:"Mar – Sep 2023", color:C.yellow,
    bullets:[
      "Figma UI/UX prototypes for 3 client projects — 25% less onboarding friction",
      "Cleaned & analysed 100K+ row datasets with SQL and Python (Pandas)",
      "Presented design findings in weekly agile stakeholder reviews",
    ],
    stack:["Figma","SQL","Python","Pandas","UI/UX","Agile"],
  },
];

const SKILLS = [
  { cat:"FRONTEND.SYS",  color:C.cyan,    items:["React.js","JavaScript ES6+","HTML5","CSS3","Bootstrap","jQuery","Responsive Design"] },
  { cat:"BACKEND.SYS",   color:C.magenta, items:["Python","Java","PHP","REST APIs","MySQL","SQL","Data Migration"] },
  { cat:"CMS.MODULE",    color:C.yellow,  items:["WordPress","cPanel","DNS Mgmt","SSL","Web Hosting","Domain Admin"] },
  { cat:"ERP.KERNEL",    color:C.green,   items:["ERP Administration","Student Info Systems","Enrollment Mgmt","Exam Management"] },
  { cat:"DESIGN.LIB",    color:C.cyan,    items:["Figma","UI/UX","Wireframing","SEO","Google Analytics","Digital Marketing"] },
  { cat:"AI.RUNTIME",    color:C.magenta, items:["Machine Learning","OpenCV","IoT","Generative AI","AI Agents","Image Processing"] },
];

// ─── BREAKPOINT HOOK ─────────────────────────────────────────
function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    bp,
    isMobile:  bp === "mobile",
    isTablet:  bp === "tablet",
    isDesktop: bp === "desktop",
    isSmall:   bp !== "desktop",
  };
}

// ─── STYLES ──────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body {
    background:${C.bg}; color:rgba(0,255,240,0.75);
    font-family:'Share Tech Mono',monospace; overflow-x:hidden;
  }
  @media(min-width:1024px) { body { cursor:none; } }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-thumb { background:${C.cyan}55; }

  body::before {
    content:''; position:fixed; inset:0; z-index:9990; pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,240,0.012) 2px,rgba(0,255,240,0.012) 4px);
  }
  body::after {
    content:''; position:fixed; inset:0; z-index:9989; pointer-events:none;
    background:radial-gradient(ellipse at center,transparent 55%,rgba(2,4,8,0.85) 100%);
  }

  @keyframes glitch-h {
    0%,94%,100%{clip-path:none;transform:none}
    95%{clip-path:polygon(0 20%,100% 20%,100% 25%,0 25%);transform:translateX(-4px)}
    96%{clip-path:polygon(0 60%,100% 60%,100% 65%,0 65%);transform:translateX(4px)}
    97%{clip-path:polygon(0 40%,100% 40%,100% 43%,0 43%);transform:translateX(-2px)}
    98%{clip-path:none;transform:translateX(2px)}
    99%{clip-path:polygon(0 75%,100% 75%,100% 80%,0 80%);transform:none}
  }
  @keyframes rgb-shift {
    0%,93%,100%{text-shadow:none}
    94%{text-shadow:3px 0 0 ${C.magenta},-3px 0 0 ${C.cyan}}
    95%{text-shadow:-3px 0 0 ${C.magenta},3px 0 0 ${C.cyan}}
    96%{text-shadow:2px 0 0 ${C.yellow},-2px 0 0 ${C.magenta}}
    97%{text-shadow:none}
    98%{text-shadow:4px 0 0 ${C.cyan},-4px 0 0 ${C.magenta}}
    99%{text-shadow:none}
  }
  @keyframes scanline-move{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes neon-pulse{0%,100%{opacity:1}50%{opacity:0.6}}
  @keyframes card-in{from{opacity:0;transform:translateY(16px) skewX(-1deg)}to{opacity:1;transform:translateY(0) skewX(0)}}
  @keyframes border-chase{0%{background-position:0% 0%}100%{background-position:200% 0%}}
  @keyframes drawerIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}

  .neon-cyan{color:${C.cyan};text-shadow:0 0 8px ${C.cyan}88,0 0 20px ${C.cyan}44}
  .neon-mag{color:${C.magenta};text-shadow:0 0 8px ${C.magenta}88,0 0 20px ${C.magenta}44}
  .neon-yel{color:${C.yellow};text-shadow:0 0 8px ${C.yellow}88,0 0 20px ${C.yellow}44}
  .neon-grn{color:${C.green};text-shadow:0 0 8px ${C.green}88,0 0 20px ${C.green}44}

  .panel{background:${C.panel};border:1px solid ${C.border};position:relative;overflow:hidden}
  .panel::before{content:'';position:absolute;inset:0;pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,255,240,0.025) 39px,rgba(0,255,240,0.025) 40px)}

  .neon-border{position:relative}
  .neon-border::after{content:'';position:absolute;inset:-1px;
    background:linear-gradient(90deg,${C.cyan},${C.magenta},${C.yellow},${C.cyan});
    background-size:200% 100%;animation:border-chase 3s linear infinite;
    border-radius:inherit;z-index:-1;opacity:0;transition:opacity 0.3s}
  .neon-border:hover::after{opacity:1}

  .glitch-hover:hover{animation:rgb-shift 0.4s steps(1) 1}

  .clip-tr  {clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)}
  .clip-bl  {clip-path:polygon(0 0,100% 0,100% 100%,16px 100%,0 calc(100% - 16px))}
  .clip-both{clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}
  .clip-sm  {clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))}

  a{text-decoration:none}
  section{position:relative;z-index:1}

  .nav-overlay{position:fixed;inset:0;z-index:298;background:rgba(2,4,8,0.85);animation:overlayIn 0.2s both}
  .ham{display:flex;flex-direction:column;gap:5px;padding:4px;background:none;border:none;cursor:pointer}
  .ham span{display:block;width:20px;height:1px;background:${C.cyan};box-shadow:0 0 4px ${C.cyan}}
`;

// ─── DATA RAIN ───────────────────────────────────────────────
function DataRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / 20);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%^&*<>/\\|ｦｧｨｩｪｫｬｭｮｯｰ".split("");
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    let raf, frame = 0;
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { raf = requestAnimationFrame(draw); return; }
      ctx.fillStyle = "rgba(2,4,8,0.05)"; ctx.fillRect(0, 0, W, H);
      ctx.font = "14px 'Share Tech Mono',monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const b = Math.random();
        ctx.fillStyle = b > 0.97 ? "#fff" : b > 0.8 ? `rgba(0,255,240,${0.5+b*0.3})` : `rgba(0,255,240,${0.08+b*0.12})`;
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, opacity:0.35, pointerEvents:"none" }}/>;
}

// ─── BOOT SEQUENCE ───────────────────────────────────────────
function BootSequence({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const BOOT = [
    "> SYSTEM INIT... v4.2.1","> LOADING KERNEL MODULES......","> MOUNTING /dev/daksh-sawant",
    "> CHECKING INTEGRITY: [OK]","> PORTFOLIO.EXE LOADING","> SKILLS DATABASE: CONNECTED",
    "> ERP SYSTEMS: ONLINE (99.9% UPTIME)","> 10,247 USERS DETECTED","> NEURAL LINK ESTABLISHED","> BOOT COMPLETE. WELCOME.",
  ];
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT.length) { setLines(l => [...l, BOOT[i]]); setProgress(Math.round(((i+1)/BOOT.length)*100)); i++; }
      else { clearInterval(iv); setTimeout(onDone, 600); }
    }, 160);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ width:"100%", maxWidth:560, padding:"clamp(14px,4vw,32px)", clipPath:"polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))", border:`1px solid ${C.cyan}44`, background:C.panel }}>
        <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(8px,2vw,11px)", letterSpacing:"0.2em", color:C.cyan, marginBottom:20, animation:"neon-pulse 1.5s ease-in-out infinite" }}>DAKSH_SAWANT.PORTFOLIO — BOOT SEQUENCE</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, minHeight:140, marginBottom:20 }}>
          {lines.map((l,i) => (
            <div key={i} style={{ fontSize:"clamp(9px,1.5vw,11px)", color:i===lines.length-1?C.green:`rgba(0,255,240,${0.3+(i/lines.length)*0.5})`, animation:"fadeUp 0.2s both" }}>
              {l}{i===lines.length-1&&<span style={{ animation:"blink 0.8s infinite", marginLeft:4, borderRight:`1px solid ${C.green}` }}>&nbsp;</span>}
            </div>
          ))}
        </div>
        <div style={{ height:2, background:"rgba(0,255,240,0.1)", borderRadius:1 }}>
          <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${C.cyan},${C.magenta})`, transition:"width 0.15s linear", borderRadius:1 }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          <span style={{ fontSize:8, letterSpacing:"0.2em", color:"rgba(0,255,240,0.35)" }}>INITIALIZING</span>
          <span style={{ fontSize:8, color:C.cyan }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── CURSOR (desktop only) ────────────────────────────────────
function GlitchCursor() {
  const cross = useRef(null);
  const pos = useRef({ x:-100, y:-100 });
  const lag = useRef({ x:-100, y:-100 });
  useEffect(() => {
    const mv = e => { pos.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener("mousemove", mv);
    let raf;
    const tick = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.1;
      lag.current.y += (pos.current.y - lag.current.y) * 0.1;
      if (cross.current) { cross.current.style.left = lag.current.x+"px"; cross.current.style.top = lag.current.y+"px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={cross} style={{ position:"fixed", zIndex:99999, pointerEvents:"none", transform:"translate(-50%,-50%)", width:24, height:24 }}>
      <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:C.cyan, transform:"translateX(-50%)", boxShadow:`0 0 4px ${C.cyan}` }}/>
      <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1, background:C.cyan, transform:"translateY(-50%)", boxShadow:`0 0 4px ${C.cyan}` }}/>
      {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i) => (
        <div key={i} style={{ position:"absolute", left:sx<0?0:"auto", right:sx>0?0:"auto", top:sy<0?0:"auto", bottom:sy>0?0:"auto", width:5, height:5,
          borderTop:sy<0?`1px solid ${C.cyan}`:"none", borderBottom:sy>0?`1px solid ${C.cyan}`:"none",
          borderLeft:sx<0?`1px solid ${C.cyan}`:"none", borderRight:sx>0?`1px solid ${C.cyan}`:"none" }}/>
      ))}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────
function Nav() {
  const { isSmall, isDesktop } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [open, setOpen] = useState(false);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setOpen(false); };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive:true });
    let gi;
    if (isDesktop) gi = setInterval(() => { setGlitching(true); setTimeout(()=>setGlitching(false),300); }, 5000);
    return () => { window.removeEventListener("scroll", h); clearInterval(gi); };
  }, [isDesktop]);

  const links = [["WORK","experience"],["PROJ","projects"],["SKILLS","skills"],["CONTACT","contact"]];
  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:300, height:52,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 clamp(14px,4vw,60px)",
        background:scrolled?"rgba(2,4,8,0.94)":"transparent",
        borderBottom:scrolled?`1px solid ${C.cyan}22`:"none",
        transition:"all 0.4s",
      }}>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{
          fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(13px,4vw,16px)", fontWeight:900, letterSpacing:"0.1em",
          color:C.cyan, background:"none", border:"none", cursor:isDesktop?"none":"pointer",
          textShadow:`0 0 10px ${C.cyan}88,0 0 30px ${C.cyan}44`,
          animation:glitching?"rgb-shift 0.3s steps(1)":"none",
        }}>DS<span style={{ color:C.magenta, textShadow:`0 0 10px ${C.magenta}` }}>//</span></button>

        {isDesktop && (
          <div style={{ display:"flex", gap:32, alignItems:"center" }}>
            {links.map(([l,id]) => (
              <button key={id} onClick={()=>go(id)} style={{
                fontFamily:"'Orbitron',sans-serif", fontSize:9, letterSpacing:"0.2em",
                color:"rgba(0,255,240,0.45)", background:"none", border:"none", cursor:"none", transition:"color 0.2s",
              }}
                onMouseEnter={e=>{e.target.style.color=C.cyan;e.target.style.textShadow=`0 0 8px ${C.cyan}`;}}
                onMouseLeave={e=>{e.target.style.color="rgba(0,255,240,0.45)";e.target.style.textShadow="none";}}
              >{l}</button>
            ))}
            <button onClick={()=>go("contact")} className="clip-tr" style={{
              padding:"7px 18px", cursor:"none",
              background:`rgba(0,255,240,0.08)`, border:`1px solid ${C.cyan}55`,
              fontFamily:"'Orbitron',sans-serif", fontSize:8, letterSpacing:"0.18em", color:C.cyan, transition:"all 0.25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(0,255,240,0.15)`;e.currentTarget.style.boxShadow=`0 0 20px ${C.cyan}33`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`rgba(0,255,240,0.08)`;e.currentTarget.style.boxShadow="none";}}
            >HIRE_ME.EXE</button>
          </div>
        )}

        {!isDesktop && (
          <button className="ham" onClick={()=>setOpen(true)}>
            <span/><span/><span/>
          </button>
        )}
      </nav>

      {!isDesktop && open && (
        <>
          <div className="nav-overlay" onClick={()=>setOpen(false)}/>
          <div style={{
            position:"fixed", top:0, left:0, bottom:0, zIndex:299, width:260,
            background:C.panel, borderRight:`1px solid ${C.cyan}22`,
            display:"flex", flexDirection:"column", padding:"18px 16px",
            animation:"drawerIn 0.25s cubic-bezier(.22,1,.36,1)",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
              <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:14, fontWeight:900, color:C.cyan, textShadow:`0 0 10px ${C.cyan}88` }}>DS<span style={{ color:C.magenta }}>//</span></span>
              <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", color:"rgba(0,255,240,0.4)", fontSize:18, cursor:"pointer", padding:"2px 6px" }}>✕</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4, flex:1 }}>
              {[["WORK_HISTORY","experience"],["SYS_BUILDS","projects"],["TECH_STACK","skills"],["CONTACT","contact"]].map(([l,id]) => (
                <button key={id} onClick={()=>go(id)} style={{
                  fontFamily:"'Orbitron',sans-serif", fontSize:10, letterSpacing:"0.2em",
                  color:"rgba(0,255,240,0.5)", background:"none", border:"none",
                  borderBottom:`1px solid ${C.border}`, padding:"13px 0",
                  textAlign:"left", cursor:"pointer", transition:"color 0.2s",
                }}>// {l}</button>
              ))}
            </div>
            <a href="mailto:daksh.s.1808@gmail.com" className="clip-sm" style={{
              display:"block", textAlign:"center", padding:"11px",
              background:`rgba(0,255,240,0.08)`, border:`1px solid ${C.cyan}55`,
              fontFamily:"'Orbitron',sans-serif", fontSize:8, letterSpacing:"0.18em", color:C.cyan,
            }}>HIRE_ME.EXE</a>
            <div style={{ marginTop:16, fontSize:7, letterSpacing:"0.2em", color:"rgba(0,255,240,0.2)", textAlign:"center" }}>SYS_ONLINE // MUMBAI.IN</div>
          </div>
        </>
      )}
    </>
  );
}

// ─── GLITCH TEXT ──────────────────────────────────────────────
function GlitchText({ text, color=C.cyan, size=48, weight=900, style={} }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => { setGlitch(true); setTimeout(()=>setGlitch(false),400); }, 3000+Math.random()*4000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:size, fontWeight:weight, letterSpacing:"0.06em", color, textShadow:`0 0 10px ${color}88,0 0 30px ${color}44`, display:"inline-block", position:"relative", animation:glitch?"glitch-h 0.4s steps(1),rgb-shift 0.4s steps(1)":"none", ...style }}>
      {text}
      {glitch && <>
        <span style={{ position:"absolute", left:0, top:0, color:C.magenta, opacity:0.7, clipPath:"polygon(0 30%,100% 30%,100% 50%,0 50%)", transform:"translateX(3px)" }}>{text}</span>
        <span style={{ position:"absolute", left:0, top:0, color:C.cyan, opacity:0.7, clipPath:"polygon(0 55%,100% 55%,100% 75%,0 75%)", transform:"translateX(-3px)" }}>{text}</span>
      </>}
    </span>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero() {
  const { isMobile, isSmall, isDesktop } = useBreakpoint();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(()=>setLoaded(true),200); }, []);

  const photoW = isMobile ? 160 : isSmall ? 200 : 280;
  const photoH = isMobile ? 210 : isSmall ? 260 : 360;

  return (
    <section id="hero" style={{ minHeight:"100dvh", display:"flex", alignItems:"center", padding:`80px clamp(14px,5vw,80px) clamp(40px,6vw,60px)`, position:"relative" }}>
      {isDesktop && <>
        <div style={{ position:"absolute", top:0, right:"30%", width:1, height:"100%", background:`linear-gradient(to bottom,transparent,${C.cyan}33,transparent)`, transform:"skewX(-8deg)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:0, right:"32%", width:1, height:"100%", background:`linear-gradient(to bottom,transparent,${C.magenta}22,transparent)`, transform:"skewX(-8deg)", pointerEvents:"none" }}/>
      </>}

      <div style={{
        maxWidth:1100, width:"100%", position:"relative",
        display:"grid", gridTemplateColumns:isDesktop?"1fr 1fr":"1fr",
        gap:isSmall?28:48, alignItems:"center",
        opacity:loaded?1:0, transform:loaded?"none":"translateY(20px)", transition:"all 0.8s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Photo — top on mobile, right on desktop */}
        <div style={{ display:"flex", justifyContent:"center", position:"relative", order:isSmall?1:2 }}>
          {[["0%","0%"],["0%","auto"],["auto","0%"],["auto","auto"]].map(([t,b],i) => (
            <div key={i} style={{ position:"absolute", top:t, bottom:b, left:i%2===0?"0%":"auto", right:i%2===1?"0%":"auto", width:14, height:14, pointerEvents:"none",
              borderTop:b==="auto"?`2px solid ${C.cyan}`:"none", borderBottom:t==="auto"?`2px solid ${C.cyan}`:"none",
              borderLeft:i%2===0?`2px solid ${C.cyan}`:"none", borderRight:i%2===1?`2px solid ${C.cyan}`:"none" }}/>
          ))}
          <div style={{ fontSize:7, color:"rgba(0,255,240,0.2)", letterSpacing:"0.1em", position:"absolute", top:-14, left:0, fontFamily:"'Share Tech Mono',monospace" }}>0xFF:A2:09:3B</div>
          <div style={{ fontSize:7, color:"rgba(255,0,128,0.2)", letterSpacing:"0.1em", position:"absolute", bottom:-14, right:0, fontFamily:"'Share Tech Mono',monospace" }}>SUBJECT_ID:DS_MH_01</div>
          <div style={{ position:"relative", width:photoW, height:photoH }}>
            <div style={{ width:"100%", height:"100%", clipPath:"polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px))", overflow:"hidden", border:`1px solid ${C.cyan}44`, position:"relative" }}>
              <img src={PHOTO_URL} alt="Daksh Sawant" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"contrast(1.1) saturate(0.9)" }}/>
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,rgba(0,255,240,0.05),rgba(2,4,8,0.4))`, mixBlendMode:"color-dodge" }}/>
              <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,240,0.04) 3px,rgba(0,255,240,0.04) 4px)", pointerEvents:"none" }}/>
            </div>
            <div style={{ position:"absolute", inset:0, clipPath:"polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px))", overflow:"hidden", mixBlendMode:"screen", opacity:0.08 }}>
              <img src={PHOTO_URL} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", transform:"translateX(4px)", filter:"sepia(1) hue-rotate(120deg)" }}/>
            </div>
            <div style={{ position:"absolute", inset:-1, zIndex:-1, clipPath:"polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px))", background:`linear-gradient(135deg,${C.cyan}33,${C.magenta}22)`, filter:"blur(8px)", animation:"neon-pulse 3s ease-in-out infinite" }}/>
          </div>
        </div>

        {/* Text */}
        <div style={{ order:isSmall?2:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`1px solid ${C.green}44`, padding:"4px 10px", clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)", background:`rgba(0,255,65,0.05)`, marginBottom:18 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, boxShadow:`0 0 8px ${C.green}`, animation:"blink 1s infinite" }}/>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"clamp(7px,2vw,10px)", letterSpacing:"0.15em", color:C.green }}>SYS_ONLINE // AVAILABLE FOR HIRE</span>
          </div>
          <div style={{ marginBottom:4, fontSize:"clamp(7px,2vw,10px)", letterSpacing:"0.3em", color:"rgba(0,255,240,0.3)", fontFamily:"'Orbitron',sans-serif" }}>IDENTITY.DAT //</div>
          <div><GlitchText text="DAKSH" size="clamp(38px,8vw,90px)" color={C.cyan}/></div>
          <div style={{ marginBottom:isMobile?14:24 }}><GlitchText text="SAWANT" size="clamp(38px,8vw,90px)" color={C.magenta}/></div>

          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"clamp(10px,1.5vw,12px)", letterSpacing:"0.1em", color:"rgba(0,255,240,0.45)", lineHeight:1.9, marginBottom:isMobile?18:28, borderLeft:`2px solid ${C.cyan}33`, paddingLeft:14 }}>
            &gt; FULL_STACK_DEVELOPER<br/>
            &gt; ERP_SPECIALIST<br/>
            &gt; LOCATION: MUMBAI.IN<br/>
            &gt; UPTIME: 99.9% // ZERO_DATA_LOSS
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:isMobile?18:28 }}>
            {STATS.map(s => (
              <div key={s.label} className="panel neon-border clip-sm" style={{ padding:isMobile?"9px 11px":"12px 14px" }}>
                <div style={{ fontSize:7, letterSpacing:"0.15em", color:"rgba(0,255,240,0.3)", marginBottom:3 }}>{s.hex}</div>
                <div className="neon-cyan" style={{ fontFamily:"'Orbitron',sans-serif", fontSize:isMobile?17:22, fontWeight:700, marginBottom:2 }}>{s.val}</div>
                <div style={{ fontSize:7, letterSpacing:"0.1em", color:"rgba(0,255,240,0.35)" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})} className="glitch-hover clip-sm" style={{
              padding:isMobile?"10px 16px":"12px 24px", cursor:isDesktop?"none":"pointer",
              background:`rgba(0,255,240,0.1)`, border:`1px solid ${C.cyan}`,
              fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(7px,1.5vw,9px)", letterSpacing:"0.2em",
              color:C.cyan, transition:"all 0.25s", boxShadow:`0 0 15px ${C.cyan}22`,
              flex:isMobile?"1":"none",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(0,255,240,0.18)`;e.currentTarget.style.boxShadow=`0 0 30px ${C.cyan}44`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`rgba(0,255,240,0.1)`;e.currentTarget.style.boxShadow=`0 0 15px ${C.cyan}22`;}}
            >ACCESS_PROJECTS //</button>
            <a href="mailto:daksh.s.1808@gmail.com" className="clip-sm" style={{
              padding:isMobile?"10px 16px":"12px 24px",
              background:`rgba(255,0,128,0.08)`, border:`1px solid ${C.magenta}55`,
              fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(7px,1.5vw,9px)", letterSpacing:"0.2em",
              color:C.magenta, display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.25s", flex:isMobile?"1":"none",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(255,0,128,0.16)`;e.currentTarget.style.boxShadow=`0 0 20px ${C.magenta}33`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`rgba(255,0,128,0.08)`;e.currentTarget.style.boxShadow="none";}}
            >SEND_MSG.EXE</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────
function SectionHeader({ label, title, accent=C.cyan }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:0.1});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ maxWidth:1100, margin:"0 auto 28px", opacity:vis?1:0, transform:vis?"none":"translateY(12px)", transition:"all 0.6s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:8, letterSpacing:"0.3em", color:`${accent}66` }}>// {label.toUpperCase()} //</span>
        <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${accent}44,transparent)` }}/>
      </div>
      <GlitchText text={title} size="clamp(22px,5vw,52px)" color={accent} weight={900}/>
    </div>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────
function Experience() {
  const { isMobile, isSmall, isDesktop } = useBreakpoint();
  const [active, setActive] = useState(0);
  const exp = EXPERIENCE[active];

  return (
    <section id="experience" style={{ padding:"clamp(48px,8vw,80px) clamp(14px,5vw,80px)", position:"relative" }}>
      <SectionHeader label="career.log" title="WORK_HISTORY" accent={C.cyan}/>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Mobile/tablet: horizontal scrolling tabs above panel */}
        {isSmall && (
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, marginBottom:12, WebkitOverflowScrolling:"touch" }}>
            {EXPERIENCE.map((e,i) => (
              <button key={e.id} onClick={()=>setActive(i)} className="clip-sm" style={{
                padding:"10px 14px", flexShrink:0, cursor:"pointer",
                border:`1px solid ${i===active?e.color+"66":C.border}`,
                background:i===active?`${e.color}0a`:C.panel,
                transition:"all 0.25s",
                boxShadow:i===active?`inset 0 0 20px ${e.color}08,0 0 12px ${e.color}15`:"none",
              }}>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:9, fontWeight:700, color:i===active?e.color:"rgba(0,255,240,0.4)", marginBottom:isMobile?0:3, whiteSpace:"nowrap" }}>{e.company}</div>
                {!isMobile && <div style={{ fontSize:8, color:"rgba(0,255,240,0.25)", whiteSpace:"nowrap" }}>{e.period}</div>}
                {i===active && <div style={{ width:"100%", height:1, background:`linear-gradient(90deg,${e.color},transparent)`, marginTop:6 }}/>}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: sidebar + panel */}
        <div style={{ display:"grid", gridTemplateColumns:isDesktop?"240px 1fr":"1fr", gap:14 }}>
          {isDesktop && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {EXPERIENCE.map((e,i) => (
                <button key={e.id} onClick={()=>setActive(i)} className="panel clip-tr" style={{
                  padding:"14px 16px", textAlign:"left", cursor:"none",
                  border:`1px solid ${i===active?e.color+"66":C.border}`,
                  background:i===active?`${e.color}0a`:C.panel,
                  transition:"all 0.25s",
                  boxShadow:i===active?`inset 0 0 20px ${e.color}08,0 0 15px ${e.color}15`:"none",
                }}>
                  <div style={{ fontSize:7, letterSpacing:"0.2em", color:`${e.color}66`, marginBottom:3 }}>{e.id}</div>
                  <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:10, fontWeight:700, color:i===active?e.color:"rgba(0,255,240,0.4)", marginBottom:3, transition:"color 0.25s" }}>{e.company}</div>
                  <div style={{ fontSize:8, letterSpacing:"0.06em", color:"rgba(0,255,240,0.25)" }}>{e.period}</div>
                  {i===active && <div style={{ width:"100%", height:1, background:`linear-gradient(90deg,${e.color},transparent)`, marginTop:10 }}/>}
                </button>
              ))}
            </div>
          )}

          <div key={active} className={`panel ${isMobile?"clip-sm":"clip-both"}`} style={{
            padding:isMobile?"16px 14px":"26px 28px",
            border:`1px solid ${exp.color}33`,
            boxShadow:`inset 0 0 40px ${exp.color}05`,
            animation:"card-in 0.35s cubic-bezier(.22,1,.36,1)",
          }}>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:7, letterSpacing:"0.25em", color:`${exp.color}66`, marginBottom:5 }}>{exp.id} // {exp.period}</div>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(12px,2vw,20px)", fontWeight:700, color:exp.color, textShadow:`0 0 15px ${exp.color}55`, lineHeight:1.3, marginBottom:4 }}>{exp.role}</div>
              <div style={{ fontSize:10, color:"rgba(0,255,240,0.35)", letterSpacing:"0.06em" }}>{exp.company}</div>
            </div>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
              {exp.bullets.map((b,i) => (
                <li key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:"clamp(11px,1.5vw,12px)", color:"rgba(0,255,240,0.45)", lineHeight:1.7 }}>
                  <span style={{ color:exp.color, flexShrink:0, marginTop:4, fontSize:8, textShadow:`0 0 6px ${exp.color}` }}>◆</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12, display:"flex", flexWrap:"wrap", gap:5 }}>
              {exp.stack.map(s => (
                <span key={s} style={{ fontSize:8, letterSpacing:"0.06em", padding:"3px 8px", background:`${exp.color}0f`, border:`1px solid ${exp.color}33`, color:`${exp.color}aa`, clipPath:"polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"clamp(48px,8vw,80px) clamp(14px,5vw,80px)", position:"relative" }}>
      <SectionHeader label="projects.db" title="SYS_BUILDS" accent={C.magenta}/>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,270px),1fr))", gap:12 }}>
        {PROJECTS.map((p,i) => <ProjectCard key={p.id} project={p} index={i}/>)}
      </div>
    </section>
  );
}

function ProjectCard({ project:p, index }) {
  const { isDesktop } = useBreakpoint();
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:0.1});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="panel neon-border" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      padding:"16px", position:"relative", overflow:"hidden",
      clipPath:"polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
      border:`1px solid ${hov?p.color+"55":C.border}`,
      boxShadow:hov?`0 0 30px ${p.color}15,inset 0 0 30px ${p.color}05`:"none",
      transition:"all 0.3s cubic-bezier(.22,1,.36,1)",
      opacity:vis?1:0, animation:vis?`card-in 0.5s ${index*0.07}s both`:"none",
    }}>
      {hov && <div style={{ position:"absolute", inset:0, background:`linear-gradient(105deg,transparent 40%,${p.color}06 60%,transparent 80%)`, animation:"scanline-move 0.5s ease", pointerEvents:"none" }}/>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div style={{ fontSize:7, letterSpacing:"0.2em", color:"rgba(0,255,240,0.25)" }}>{p.id}</div>
        <span style={{ fontSize:7, letterSpacing:"0.1em", padding:"2px 7px", background:`${p.color}12`, border:`1px solid ${p.color}33`, color:p.color, textShadow:`0 0 6px ${p.color}66`, clipPath:"polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,0 100%)" }}>{p.stat}</span>
      </div>
      <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(11px,1.5vw,13px)", fontWeight:700, color:p.color, textShadow:`0 0 12px ${p.color}55`, marginBottom:5, lineHeight:1.3 }}>{p.name}</div>
      <div style={{ fontSize:8, letterSpacing:"0.1em", color:"rgba(0,255,240,0.25)", marginBottom:9 }}>[{p.tag}]</div>
      <div style={{ fontSize:"clamp(11px,1.5vw,12px)", color:"rgba(0,255,240,0.38)", lineHeight:1.7 }}>{p.desc}</div>
      {p.link && (
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:10, fontSize:8, letterSpacing:"0.15em", color:p.color, opacity:hov?1:0.45, transition:"opacity 0.25s", fontFamily:"'Orbitron',sans-serif" }}>ACCESS_FILE //</a>
      )}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${p.color}60,transparent)`, opacity:hov?1:0, transition:"opacity 0.3s" }}/>
    </div>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding:"clamp(48px,8vw,80px) clamp(14px,5vw,80px)", position:"relative" }}>
      <SectionHeader label="skills.manifest" title="TECH_STACK" accent={C.yellow}/>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,250px),1fr))", gap:12 }}>
        {SKILLS.map((g,i) => <SkillGroup key={g.cat} group={g} index={i}/>)}
      </div>
    </section>
  );
}

function SkillGroup({ group:g, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:0.1});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="panel neon-border clip-sm" style={{ padding:"16px 14px", border:`1px solid ${g.color}22`, opacity:vis?1:0, animation:vis?`card-in 0.5s ${index*0.07}s both`:"none" }}>
      <div style={{ height:1, background:`linear-gradient(90deg,${g.color},transparent)`, marginBottom:12, position:"relative", top:-16, left:-14, width:"calc(100% + 28px)" }}/>
      <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:9, letterSpacing:"0.2em", color:g.color, textShadow:`0 0 8px ${g.color}66`, marginBottom:11 }}>{g.cat}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {g.items.map((item,ii) => (
          <span key={item} style={{
            fontSize:8, letterSpacing:"0.05em", padding:"3px 8px",
            background:`${g.color}0c`, border:`1px solid ${g.color}28`, color:`${g.color}99`,
            clipPath:"polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))",
            opacity:vis?1:0, transition:`all 0.3s ${index*0.07+ii*0.04}s`, transform:vis?"none":"translateY(4px)",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${g.color}1e`;e.currentTarget.style.color=g.color;e.currentTarget.style.textShadow=`0 0 8px ${g.color}`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=`${g.color}0c`;e.currentTarget.style.color=`${g.color}99`;e.currentTarget.style.textShadow="none";}}
          >{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────
function Contact() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("idle");
  const submit = () => {
    if (!form.name||!form.email||!form.message) return;
    setStatus("sending"); setTimeout(()=>setStatus("sent"),1400);
  };
  const inputStyle = {
    width:"100%", background:"rgba(0,255,240,0.03)", border:`1px solid ${C.border}`,
    padding:"10px 12px", fontFamily:"'Share Tech Mono',monospace", fontSize:"clamp(10px,1.5vw,11px)",
    color:"rgba(0,255,240,0.8)", letterSpacing:"0.05em", outline:"none", resize:"none",
    transition:"border-color 0.25s,box-shadow 0.25s",
    clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)",
    WebkitAppearance:"none",
  };
  return (
    <section id="contact" style={{ padding:"clamp(48px,8vw,80px) clamp(14px,5vw,80px) clamp(60px,10vw,100px)", position:"relative" }}>
      <SectionHeader label="contact.exe" title="ESTABLISH_LINK" accent={C.green}/>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:isDesktop?"1fr 1fr":"1fr", gap:14 }}>

        {/* Info */}
        <div className="panel clip-sm" style={{ padding:isMobile?"16px 14px":"28px 28px", border:`1px solid ${C.green}22` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"clamp(10px,1.5vw,12px)", color:"rgba(0,255,240,0.38)", lineHeight:1.9, marginBottom:24, borderLeft:`2px solid ${C.green}44`, paddingLeft:14 }}>
            &gt; AVAILABLE FOR FULL-TIME<br/>
            &gt; AVAILABLE FOR CONTRACT<br/>
            &gt; OPEN TO HARD PROBLEMS<br/>
            &gt; SYSTEMS THAT DON'T BREAK
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {[
              { label:"EMAIL.ADDR",    val:"daksh.s.1808@gmail.com",      href:"mailto:daksh.s.1808@gmail.com",             color:C.cyan },
              { label:"PHONE.NUM",     val:"+91 9834606550",               href:"tel:+919834606550",                          color:C.magenta },
              { label:"SOCIAL.NET",    val:"linkedin.com/in/daksh-sawant", href:"https://linkedin.com/in/daksh-sawant",       color:C.cyan },
              { label:"NODE.LOCATION", val:"MUMBAI // INDIA",              href:null,                                          color:C.yellow },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", gap:10, alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:26, height:26, border:`1px solid ${item.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:item.color, flexShrink:0, clipPath:"polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,0 100%)", background:`${item.color}08` }}>◈</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:7, letterSpacing:"0.2em", color:"rgba(0,255,240,0.25)", marginBottom:2 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ fontSize:"clamp(10px,1.5vw,11px)", color:item.color, letterSpacing:"0.03em", textShadow:`0 0 8px ${item.color}55`, display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.val}</a>
                    : <span style={{ fontSize:"clamp(10px,1.5vw,11px)", color:item.color, letterSpacing:"0.03em" }}>{item.val}</span>
                  }
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${C.border}` }}>
            <a href="http://www.ijrar.org/papers/IJRAR23C1417.pdf" target="_blank" rel="noopener noreferrer" className="clip-sm" style={{
              display:"inline-flex", alignItems:"center", gap:6, padding:"8px 13px",
              background:`rgba(240,255,0,0.06)`, border:`1px solid ${C.yellow}44`,
              fontFamily:"'Orbitron',sans-serif", fontSize:7, letterSpacing:"0.15em",
              color:C.yellow, textShadow:`0 0 8px ${C.yellow}66`, transition:"all 0.25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(240,255,0,0.12)`;e.currentTarget.style.boxShadow=`0 0 20px ${C.yellow}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`rgba(240,255,0,0.06)`;e.currentTarget.style.boxShadow="none";}}
            >◆ ACCESS_RESEARCH_PAPER //</a>
          </div>
        </div>

        {/* Form */}
        <div className="panel clip-sm" style={{ padding:isMobile?"16px 14px":"28px 28px", border:`1px solid ${C.green}22` }}>
          {status==="sent" ? (
            <div style={{ height:"100%", minHeight:220, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:14 }}>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:9, letterSpacing:"0.3em", color:C.green, animation:"neon-pulse 1s ease-in-out infinite" }}>TRANSMISSION_COMPLETE</div>
              <div className="neon-grn" style={{ fontFamily:"'Orbitron',sans-serif", fontSize:isMobile?20:28, fontWeight:900 }}>MSG_SENT</div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(0,255,65,0.4)" }}>&gt; RESPONSE INCOMING...</div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:8, letterSpacing:"0.25em", color:"rgba(0,255,240,0.3)", marginBottom:4 }}>// INPUT_FORM.DAT</div>
              {[
                { key:"name",    label:"IDENT.NAME",    ph:"YOUR_NAME",                       type:"input"    },
                { key:"email",   label:"COMMS.EMAIL",   ph:"YOUR_EMAIL",                      type:"input"    },
                { key:"message", label:"MSG.PAYLOAD",   ph:"WHAT_WOULD_YOU_LIKE_TO_BUILD?",   type:"textarea" },
              ].map(field => (
                <div key={field.key}>
                  <div style={{ fontSize:7, letterSpacing:"0.15em", color:"rgba(0,255,240,0.25)", marginBottom:4 }}>{field.label}</div>
                  {field.type==="input"
                    ? <input placeholder={field.ph} value={form[field.key]} onChange={e=>setForm(f=>({...f,[field.key]:e.target.value}))} style={inputStyle}
                        onFocus={e=>{e.target.style.borderColor=`${C.cyan}66`;e.target.style.boxShadow=`0 0 15px ${C.cyan}11`;}}
                        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none";}}/>
                    : <textarea placeholder={field.ph} rows={4} value={form[field.key]} onChange={e=>setForm(f=>({...f,[field.key]:e.target.value}))} style={inputStyle}
                        onFocus={e=>{e.target.style.borderColor=`${C.cyan}66`;e.target.style.boxShadow=`0 0 15px ${C.cyan}11`;}}
                        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.boxShadow="none";}}/>
                  }
                </div>
              ))}
              <button onClick={submit} disabled={status==="sending"} className="glitch-hover clip-sm" style={{
                padding:"11px", cursor:isDesktop?"none":"pointer",
                background:`rgba(0,255,65,0.08)`, border:`1px solid ${C.green}55`,
                fontFamily:"'Orbitron',sans-serif", fontSize:8, letterSpacing:"0.2em",
                color:C.green, transition:"all 0.25s", boxShadow:`0 0 20px ${C.green}11`,
              }}
                onMouseEnter={e=>{e.currentTarget.style.background=`rgba(0,255,65,0.16)`;e.currentTarget.style.boxShadow=`0 0 30px ${C.green}22`;}}
                onMouseLeave={e=>{e.currentTarget.style.background=`rgba(0,255,65,0.08)`;e.currentTarget.style.boxShadow=`0 0 20px ${C.green}11`;}}>
                {status==="sending"?"TRANSMITTING...":"SEND_TRANSMISSION //"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, background:C.panel, padding:"12px clamp(14px,4vw,80px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, position:"relative", zIndex:1 }}>
      <div style={{ fontSize:7, letterSpacing:"0.2em", color:"rgba(0,255,240,0.2)" }}>DAKSH_SAWANT // 2025 // ALL_RIGHTS_RESERVED</div>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, boxShadow:`0 0 8px ${C.green}`, animation:"blink 1s infinite" }}/>
        <span style={{ fontSize:7, letterSpacing:"0.15em", color:"rgba(0,255,65,0.45)" }}>SYS_ONLINE // MUMBAI.IN</span>
      </div>
      <div style={{ display:"flex", gap:14 }}>
        {[["✉","mailto:daksh.s.1808@gmail.com"],["⬡","https://linkedin.com/in/daksh-sawant"],["◆","http://www.ijrar.org/papers/IJRAR23C1417.pdf"]].map(([icon,href]) => (
          <a key={href} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
            style={{ fontSize:13, color:"rgba(0,255,240,0.25)", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.target.style.color=C.cyan;e.target.style.textShadow=`0 0 8px ${C.cyan}`;}}
            onMouseLeave={e=>{e.target.style.color="rgba(0,255,240,0.25)";e.target.style.textShadow="none";}}
          >{icon}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const { isDesktop } = useBreakpoint();
  const [booted, setBooted] = useState(false);
  return (
    <>
      <style>{STYLES}</style>
      {!booted && <BootSequence onDone={()=>setBooted(true)}/>}
      <DataRain/>
      {isDesktop && <GlitchCursor/>}
      <Nav/>
      <Hero/>
      <Experience/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Footer/>
    </>
  );
}