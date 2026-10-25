import React, { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";

const PageReveal = ({ children }) => {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    // পেজের সেকশনগুলো খুঁজে বের করা
    let nodes = Array.from(root.children);
    let depth = 0;
    while (nodes.length === 1 && nodes[0].children.length > 0 && depth < 3) {
      nodes = Array.from(nodes[0].children);
      depth++;
    }

    nodes.forEach((node) => node.classList.add("reveal"));

    // ব্রাউজারকে লুকানো অবস্থা আগে হিসাব করতে বাধ্য করা,
    // না হলে পেজ খুললেই দেখা যায় এমন অংশে অ্যানিমেশন চলে না
    void root.offsetHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal", "reveal-visible"));
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
};

export default PageReveal;