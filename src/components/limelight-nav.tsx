"use client";
import React, { cloneElement, useLayoutEffect, useRef, useState } from "react";
type NavItem = { id: string; icon: React.ReactElement<{ className?: string }>; label: string; onClick?: () => void };
type Props = { items: NavItem[]; className?: string };
export const LimelightNav = ({ items, className = "" }: Props) => {
  const [active, setActive] = useState(0); const [ready, setReady] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]); const light = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { const element = refs.current[active]; if (element && light.current) { light.current.style.left = `${element.offsetLeft + element.offsetWidth / 2 - 20}px`; setReady(true); } }, [active]);
  return <nav className={`relative inline-flex h-[58px] items-center rounded-full border border-white/15 bg-white/[.07] px-2 text-white shadow-[0_10px_30px_rgba(0,0,0,.14)] backdrop-blur-2xl ${className}`}><div ref={light} className={`absolute top-0 z-10 h-1 w-10 rounded-full bg-[#ff941c] shadow-[0_8px_22px_#ff941c] ${ready ? "transition-[left] duration-500 ease-out" : ""}`} />{items.map((item, i) => <button key={item.id} ref={el => { refs.current[i] = el; }} aria-label={item.label} onClick={() => { setActive(i); item.onClick?.(); }} className="relative z-20 flex h-12 items-center gap-2 rounded-full px-5 text-[11px] font-semibold tracking-[.02em] transition duration-300 hover:bg-white/10 hover:text-orange"><span>{item.label}</span>{cloneElement(item.icon, { className: `h-3.5 w-3.5 ${active === i ? "opacity-100 text-orange" : "opacity-55"}` })}</button>)}</nav>;
};
