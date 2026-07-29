"use client";

import React, { cloneElement, useLayoutEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  onClick?: () => void;
};

type Props = {
  items: NavItem[];
  className?: string;
};

export const LimelightNav = ({ items, className = "" }: Props) => {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const light = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = refs.current[active];

    if (element && light.current) {
      light.current.style.left = `${element.offsetLeft + element.offsetWidth / 2 - 28}px`;
      setReady(true);
    }
  }, [active]);

  return (
    <nav
      className={`relative inline-flex h-[68px] items-center rounded-full border border-white/15 bg-white/[0.07] px-2 text-white shadow-[0_10px_30px_rgba(0,0,0,.14)] backdrop-blur-2xl ${className}`}
    >
      {/* Orange Moving Glow */}
      <div
        ref={light}
        className={`absolute top-0 z-10 h-[4px] w-14 rounded-full bg-[#ff941c] shadow-[0_0_35px_rgba(255,148,28,.95)] ${
          ready
            ? "transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : ""
        }`}
      />

      {items.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-label={item.label}
          onClick={() => {
            setActive(i);
            item.onClick?.();
          }}
          className={`group relative z-20 flex h-12 items-center gap-2 rounded-full px-5 text-[11px] font-semibold tracking-[.02em] transition-all duration-500 hover:scale-[1.03]
          ${
            active === i
              ? `relative
                 scale-[1.04]
                 bg-gradient-to-b
                 from-white/20
                 to-white/10
                 text-white
                 border
                 border-white/25
                 backdrop-blur-xl
                 shadow-[0_0_40px_rgba(255,148,28,.45)]
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:bg-[#ff941c]/10
                 before:blur-xl
                 before:-z-10`
              : "hover:bg-white/10 hover:text-[#ff941c]"
          }`}
        >
          {/* Active underline */}
          {active === i && (
            <span className="absolute bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ff941c] shadow-[0_0_12px_#ff941c]" />
          )}

          {/* Label */}
          <span>{item.label}</span>

          {/* Icon */}
          {cloneElement(item.icon, {
            className: `h-3.5 w-3.5 transition-all duration-500 ${
              active === i
                ? "opacity-100 scale-110 rotate-3 text-[#ff941c] drop-shadow-[0_0_10px_rgba(255,148,28,.9)]"
                : "opacity-55 group-hover:scale-105"
            }`,
          })}
        </button>
      ))}
    </nav>
  );
}
