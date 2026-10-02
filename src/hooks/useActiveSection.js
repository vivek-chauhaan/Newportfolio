import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently under the "reading line"
 * (35% down the viewport). Purely presentational — used to highlight the navbar.
 */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current = "";
      let bestTop = -Infinity;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        if (top <= line && top > bestTop) {
          bestTop = top;
          current = id;
        }
      });

      // Last section can never reach the reading line on tall screens
      if (atBottom && document.getElementById(ids[ids.length - 1])) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Sections mount after data loads, so re-check shortly after render
    const t = setTimeout(update, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, ids.join("|")]);

  return active;
}
