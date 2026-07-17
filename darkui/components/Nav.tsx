"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger, getLenis } from "@/lib/anim";

const ITEMS = [
  { id: "model", label: "01 Model" },
  { id: "capabilities", label: "02 Capabilities" },
  { id: "context", label: "03 Context" },
  { id: "access", label: "04 Access" },
];

export default function Nav() {
  const [active, setActive] = useState("model");

  useEffect(() => {
    // pin spacers make offset math unreliable — instead, ask the browser
    // which scene actually occupies the middle of the viewport
    const update = () => {
      const el = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight * 0.55
      );
      const section = el?.closest<HTMLElement>("[data-scene]");
      if (!section) return;
      const theme = section.dataset.theme ?? "dark";
      if (document.documentElement.dataset.theme !== theme) {
        document.documentElement.dataset.theme = theme;
      }
      if (section.dataset.nav) setActive(section.dataset.nav);
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => st.kill();
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const lenis = getLenis();
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo(`#${id}`, { duration: 1.4 });
    }
  };

  return (
    <header className="site-nav">
      <a href="#model" className="nav-brand" onClick={(e) => go(e, "model")}>
        JD
        <span className="nav-brand-k">/ K3</span>
      </a>
      <nav aria-label="Sections">
        <ul>
          {ITEMS.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? "is-active" : undefined}
                aria-current={active === it.id ? "true" : undefined}
                onClick={(e) => go(e, it.id)}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="nav-cta"
        href="https://openrouter.ai/moonshotai/kimi-k3"
        target="_blank"
        rel="noreferrer"
      >
        Try K3 ↗
      </a>
    </header>
  );
}
