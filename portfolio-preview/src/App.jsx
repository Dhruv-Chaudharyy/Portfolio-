import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "React", level: 78 },
  { name: "JavaScript", level: 88 },
  { name: "Python", level: 80 },
  { name: "Machine Learning", level: 70 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 75 },
  { name: "MongoDB", level: 72 },
  { name: "C++ (OOP)", level: 65 },
  { name: "Git", level: 85 },
  { name: "REST APIs", level: 82 },
];

const projects = [
  {
    id: "01",
    title: "AI Learning Platform",
    year: "2025",
    category: "Full Stack",
    description:
      "A modern learning platform focused on AI-powered education and smart student experiences. Built adaptive quiz flows, integrated recommendation models, and designed the full UI from scratch.",
    tech: ["React", "Python", "MongoDB"],
    color: "#e6f0f7",
    accent: "#1a5a8a",
    github: "https://github.com/Dhruv-Chaudharyy",
    demo: "#",
  },
  {
    id: "02",
    title: "Modern Portfolio System",
    year: "2026",
    category: "Frontend",
    description:
      "A futuristic personal portfolio with smooth animations and interactive UI. Explored layout theory, micro-interactions, and scroll-driven storytelling for a memorable user journey.",
    tech: ["React", "Tailwind", "Framer Motion"],
    color: "#ede8f5",
    accent: "#5a3a9a",
    github: "https://github.com/Dhruv-Chaudharyy",
    demo: "#",
  },
  {
    id: "03",
    title: "Coming Soon",
    year: "2026",
    category: "TBD",
    description:
      "Something new is in the works. Check back soon — this slot is reserved for an upcoming project that's currently in early development.",
    tech: [],
    color: "#f0f4e8",
    accent: "#4a6a1a",
    placeholder: true,
  },
];

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = () => {
            start += 16;
            const progress = Math.min(start / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillBar({ name, level, index }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const barColor = "#4f46e5";
  return (
    <div ref={ref} style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontSize: "13px", fontFamily: "'DM Mono', monospace", color: "#1e293b", letterSpacing: "0.03em" }}>{name}</span>
        <span style={{ fontSize: "12px", color: barColor, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{level}%</span>
      </div>
      <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: filled ? `${level}%` : "0%",
          background: barColor,
          borderRadius: "4px",
          transition: `width ${0.6 + index * 0.06}s cubic-bezier(0.22, 1, 0.36, 1)`,
          transitionDelay: `${index * 0.05}s`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = ["about", "skills", "projects", "contact"];

  const P = {
    bg: "#f1f5f9",
    surface: "#ffffff",
    border: "#cbd5e1",
    borderLight: "#e2e8f0",
    text: "#0f172a",
    textMuted: "#64748b",
    textFaint: "#94a3b8",
    accent: "#4f46e5",
    accentLight: "#ede9fe",
    accentMid: "#818cf8",
    warm: "#f59e0b",
    navBg: "rgba(241,245,249,0.96)",
    marquee: "#1e293b",
  };

  const W = { maxWidth: "1400px", margin: "0 auto", width: "100%" };

  return (
    <div style={{
      minHeight: "100vh",
      background: P.bg,
      color: P.text,
      fontFamily: "'Playfair Display', Georgia, serif",
      overflowX: "hidden",
      width: "100%",
      margin: 0,
      padding: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { margin: 0; padding: 0; width: 100%; }
        body { margin: 0; padding: 0; width: 100%; background: #f1f5f9; }
        #root { margin: 0; padding: 0; width: 100%; max-width: 100%; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; }
        ::selection { background: #4f46e5; color: #fff; }

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
        }
        .nav-link:hover { color: #0f172a; }
        .nav-link.active { color: #4f46e5; border-bottom: 1.5px solid #4f46e5; }

        .btn-primary {
          background: #4f46e5;
          color: #fff;
          border: none;
          padding: 14px 32px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          border-radius: 4px;
        }
        .btn-primary:hover { background: #4338ca; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,0.25); }

        .btn-secondary {
          background: transparent;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          padding: 13px 32px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          border-radius: 4px;
        }
        .btn-secondary:hover { border-color: #4f46e5; color: #4f46e5; transform: translateY(-2px); }

        .project-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 36px;
          background: #fff;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover { box-shadow: 0 16px 48px rgba(15,23,42,0.1); transform: translateY(-4px); border-color: #c7d2fe; }
        .project-card.placeholder-card { border-style: dashed; border-color: #cbd5e1; background: #f8fafc; }
        .project-card.placeholder-card:hover { border-color: #a5b4fc; box-shadow: 0 8px 24px rgba(79,70,229,0.08); }

        .stat-card { padding: 28px 32px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; transition: all 0.25s; }
        .stat-card:hover { border-color: #a5b4fc; box-shadow: 0 4px 16px rgba(79,70,229,0.08); }

        .lifestyle-item { border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px 24px; background: #fff; transition: all 0.25s; text-align: center; }
        .lifestyle-item:hover { border-color: #4f46e5; background: #4f46e5; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,0.2); }
        .lifestyle-item:hover .lifestyle-desc { color: #c7d2fe; }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .about-header { grid-template-columns: 1fr !important; }
          .about-stats { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-cols { grid-template-columns: 1fr !important; }
          .lifestyle-grid { grid-template-columns: 1fr !important; }
          .contact-btns { flex-direction: column !important; align-items: center !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, width: "100%",
        background: scrolled ? P.navBg : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${P.borderLight}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", height: "62px", padding: "0 48px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", letterSpacing: "0.18em", fontWeight: 500, color: P.accent }}>
            D.CHAUDHARY
          </div>
          <div className="nav-desktop" style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            {navLinks.map(link => (
              <button key={link} className={`nav-link${activeNav === link ? " active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: P.textMuted, fontSize: "22px" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{ background: P.navBg, borderTop: `1px solid ${P.borderLight}`, padding: "20px 48px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {navLinks.map(link => (
              <button key={link} className={`nav-link${activeNav === link ? " active" : ""}`} onClick={() => scrollTo(link)} style={{ textAlign: "left" }}>{link}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ width: "100%", padding: "80px 0 60px" }}>
        <div style={{ ...W, padding: "0 48px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center", minHeight: "calc(100vh - 142px)" }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#059669", marginBottom: "36px",
                padding: "7px 16px", border: "1px solid #a7f3d0",
                borderRadius: "4px", background: "#ecfdf5",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
                Available for work
              </div>

              <h1 style={{ fontSize: "clamp(50px, 6.5vw, 84px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "20px", color: "#0f172a" }}>
                Dhruv<br />
                <span style={{ color: "#0f172a", fontWeight: 900 }}>Chaudhary</span>
              </h1>

              <div style={{ width: "40px", height: "3px", background: P.warm, borderRadius: "2px", marginBottom: "24px" }} />

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1.75, color: P.textMuted, maxWidth: "460px", marginBottom: "40px", fontWeight: 300 }}>
                AI enthusiast & frontend developer crafting meaningful digital experiences — at the intersection of clean code and thoughtful design.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects →</button>
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-secondary">Download CV ↓</button>
                </a>
              </div>
            </div>

            {/* Profile card */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
                <div style={{ position: "absolute", top: "14px", left: "14px", right: "-14px", bottom: "-14px", border: `1px solid ${P.border}`, borderRadius: "16px", background: P.accentLight }} />
                <div style={{ position: "relative", border: `1px solid ${P.border}`, borderRadius: "16px", background: P.surface, padding: "36px", zIndex: 1 }}>
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${P.accentLight} 0%, #c7d2fe 100%)`,
                    marginBottom: "20px", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "26px", fontWeight: 700,
                    color: P.accent, fontFamily: "'Playfair Display', serif",
                    border: `2px solid ${P.accentMid}`,
                  }}>DC</div>

                  <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "3px", letterSpacing: "-0.01em" }}>Dhruv Chaudhary</h3>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: P.accentMid, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
                    Developer & AI Enthusiast
                  </p>

                  <div style={{ borderTop: `1px solid ${P.borderLight}`, paddingTop: "20px" }}>
                    {[["Location", "India"], ["Focus", "Web & AI"], ["Status", "Open to work"]].map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "11px" }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: P.textFaint, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: P.text, fontWeight: 500 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "20px", borderTop: `1px solid ${P.borderLight}`, paddingTop: "20px", display: "flex", gap: "10px" }}>
                    <a href="https://github.com/Dhruv-Chaudharyy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }}>
                      <button className="btn-secondary" style={{ width: "100%", fontSize: "10px", padding: "10px 0" }}>GitHub ↗</button>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }}>
                      <button className="btn-primary" style={{ width: "100%", fontSize: "10px", padding: "10px 0" }}>Resume ↓</button>
                    </a>
                  </div>

                  <div style={{ position: "absolute", top: "-14px", right: "20px", background: P.accent, color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "4px" }}>
                    Portfolio 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}`, overflow: "hidden", padding: "15px 0", background: P.marquee, width: "100%" }}>
        <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {["React", "Python", "C++ OOP", "Node.js", "MongoDB", "Machine Learning", "Git", "REST APIs", "Tailwind CSS"].map((item, j) => (
                <span key={item + j} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#94a3b8", padding: "0 28px", display: "inline-flex", alignItems: "center", gap: "28px" }}>
                  {item}
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: P.accent, display: "inline-block" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ width: "100%", padding: "110px 0" }}>
        <div style={{ ...W, padding: "0 48px" }}>
          <div className="about-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "72px", alignItems: "start", marginBottom: "64px" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: P.accent, marginBottom: "14px" }}>§ About</p>
              <h2 style={{ fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Building skills.<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: P.textMuted }}>Improving every day.</span>
              </h2>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", lineHeight: 1.8, color: P.textMuted, fontWeight: 300, marginBottom: "18px" }}>
                I'm passionate about modern web development and artificial intelligence — building things that are both technically sound and genuinely pleasant to use. I don't just ship code; I think about the person on the other end.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", lineHeight: 1.8, color: P.textMuted, fontWeight: 300 }}>
                Every project teaches me something new, whether that's a better way to structure a React app, a smarter way to train a model, or how to write C++ classes that are actually maintainable.
              </p>
            </div>
          </div>

          <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { value: 10, suffix: "+", label: "Technologies", color: P.accent },
              { value: 3, suffix: "+", label: "Projects Built", color: "#059669" },
              { value: 365, suffix: "", label: "Days of Learning", color: "#db2777" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <h3 style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "8px", lineHeight: 1, color: stat.color }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </h3>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: P.textMuted, textTransform: "uppercase", letterSpacing: "0.12em" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ width: "100%", padding: "110px 0", background: "#eef2ff" }}>
        <div style={{ ...W, padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: P.accent, marginBottom: "14px" }}>§ Skills</p>
              <h2 style={{ fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Tools &<br /><span style={{ fontStyle: "italic", fontWeight: 400, color: P.textMuted }}>Technologies</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: P.textMuted, maxWidth: "220px", textAlign: "right", lineHeight: 1.6, fontWeight: 300 }}>
              A snapshot of where I am right now — constantly evolving.
            </p>
          </div>

          <div className="skills-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div style={{ background: P.surface, borderRadius: "12px", padding: "32px", border: `1px solid ${P.borderLight}` }}>
              {skills.slice(0, 5).map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
            <div style={{ background: P.surface, borderRadius: "12px", padding: "32px", border: `1px solid ${P.borderLight}` }}>
              {skills.slice(5).map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i + 5} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ width: "100%", padding: "110px 0" }}>
        <div style={{ ...W, padding: "0 48px" }}>
          <div className="about-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "72px", alignItems: "start", marginBottom: "56px" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: P.accent, marginBottom: "14px" }}>§ Projects</p>
              <h2 style={{ fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Featured<br /><span style={{ fontStyle: "italic", fontWeight: 400, color: P.textMuted }}>Work</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: P.textMuted, lineHeight: 1.8, fontWeight: 300, alignSelf: "flex-end" }}>
              A curated selection of projects I've built — each one solving a real problem or exploring a new idea.
            </p>
          </div>

          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-card${project.placeholder ? " placeholder-card" : ""}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: P.textFaint, letterSpacing: "0.1em" }}>{project.id}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: project.accent, letterSpacing: "0.1em", textTransform: "uppercase", background: project.color, padding: "4px 10px", borderRadius: "4px" }}>
                    {project.category}
                  </span>
                </div>

                <div style={{ height: "72px", marginBottom: "24px", borderRadius: "8px", background: project.placeholder ? "#f1f5f9" : project.color, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", overflow: "hidden" }}>
                  {project.placeholder ? (
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "20px", color: P.border, letterSpacing: "0.1em" }}>· · ·</span>
                  ) : (
                    <>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `2px solid ${project.accent}`, opacity: 0.45 }} />
                      <div style={{ width: "20px", height: "20px", borderRadius: "3px", background: project.accent, opacity: 0.2 }} />
                    </>
                  )}
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "11px", color: project.placeholder ? P.textFaint : project.accent, opacity: 0.7, letterSpacing: "0.05em", position: "absolute", right: "16px", bottom: "10px" }}>
                    {project.year}
                  </span>
                </div>

                <h3 style={{
                  fontSize: "19px", fontWeight: 700, marginBottom: "10px",
                  letterSpacing: "-0.01em", lineHeight: 1.25,
                  color: project.placeholder ? P.textFaint : hoveredProject === project.id ? project.accent : P.text,
                  transition: "color 0.25s",
                  fontStyle: project.placeholder ? "italic" : "normal",
                }}>
                  {project.title}
                </h3>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: project.placeholder ? P.textFaint : P.textMuted, lineHeight: 1.75, marginBottom: "22px", fontWeight: 300, flexGrow: 1 }}>
                  {project.description}
                </p>

                {!project.placeholder && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "24px" }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: project.accent, border: `1px solid ${project.color}`, background: project.color, padding: "4px 10px", borderRadius: "4px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {project.placeholder ? (
                  <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                    <div style={{ border: `1.5px dashed ${P.border}`, borderRadius: "6px", padding: "14px", textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: P.textFaint }}>
                      Coming soon — stay tuned
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                      <button className="btn-primary" style={{ width: "100%", fontSize: "10px", padding: "10px 0" }}>Live Demo ↗</button>
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                      <button className="btn-secondary" style={{ width: "100%", fontSize: "10px", padding: "10px 0" }}>GitHub ↗</button>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND CODING */}
      <section style={{ width: "100%", padding: "110px 0", background: "#eef2ff" }}>
        <div style={{ ...W, padding: "0 48px" }}>
          <div className="lifestyle-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: P.accent, marginBottom: "14px" }}>§ Beyond Coding</p>
              <h2 style={{ fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "22px" }}>
                Balance &<br /><span style={{ fontStyle: "italic", fontWeight: 400, color: P.textMuted }}>self-improvement.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", lineHeight: 1.8, color: P.textMuted, fontWeight: 300, maxWidth: "400px" }}>
                I believe the same principles that make a good developer — discipline, consistency, and the willingness to push limits — apply directly to staying physically fit and mentally sharp.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { icon: "🏋️", label: "Fitness", desc: "Daily training" },
                { icon: "🏃", label: "Running", desc: "Endurance builds" },
                { icon: "🎯", label: "Discipline", desc: "Systems > goals" },
                { icon: "📈", label: "Consistency", desc: "1% every day" },
              ].map(item => (
                <div key={item.label} className="lifestyle-item">
                  <div style={{ fontSize: "26px", marginBottom: "10px" }}>{item.icon}</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "5px", letterSpacing: "-0.01em" }}>{item.label}</h4>
                  <p className="lifestyle-desc" style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: P.textFaint, textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.25s" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ width: "100%", padding: "130px 0" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", padding: "0 48px" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: P.accent, marginBottom: "22px" }}>§ Contact</p>

          <h2 style={{ fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.0, marginBottom: "28px" }}>
            Let's build<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: P.textMuted }}>something great.</span>
          </h2>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: P.textMuted, lineHeight: 1.8, marginBottom: "48px", fontWeight: 300 }}>
            Open to collaborations, freelance work, and creative projects in web development and AI. I respond within 24 hours.
          </p>

          <div className="contact-btns" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="mailto:chaudharyd2003@gmail.com" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Email Me</button>
            </a>
            <a href="https://github.com/Dhruv-Chaudharyy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">GitHub ↗</button>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">Resume ↓</button>
            </a>
          </div>

          <div style={{ marginTop: "44px", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: P.textFaint, letterSpacing: "0.05em" }}>
            <a href="tel:+918077907194" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid #cbd5e1", paddingBottom: "1px", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "#4f46e5"; e.target.style.borderColor = "#4f46e5"; }}
              onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.borderColor = "#cbd5e1"; }}>
              +91-8077907194
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ width: "100%", borderTop: `1px solid ${P.borderLight}`, padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: P.surface }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: P.textFaint, letterSpacing: "0.08em" }}>© 2026 Dhruv Chaudhary</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: P.textFaint, letterSpacing: "0.08em" }}>Built with React & Tailwind CSS</span>
      </footer>
    </div>
  );
}
