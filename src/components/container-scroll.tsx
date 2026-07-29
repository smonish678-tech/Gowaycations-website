"use client";
import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }: { titleComponent: React.ReactNode; children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  return <div ref={containerRef} className="relative flex h-[740px] items-center justify-center px-3 md:h-[910px] md:px-10"><div className="relative w-full py-16 [perspective:1000px]"><Header translate={translate} titleComponent={titleComponent} /><Card rotate={rotate} scale={scale}>{children}</Card></div></div>;
};
const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">{titleComponent}</motion.div>;
const Card = ({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; children: React.ReactNode }) => <motion.div style={{ rotateX: rotate, scale, boxShadow: "0 26px 70px rgba(10,10,10,.22), 0 95px 120px rgba(17,17,17,.14)" }} className="mx-auto -mt-6 h-[365px] w-full max-w-6xl rounded-[28px] border-[5px] border-[#30352a] bg-[#111] p-2 md:-mt-12 md:h-[520px] md:rounded-[36px] md:p-3"><div className="h-full w-full overflow-hidden rounded-[20px] bg-[#f8f8f8] md:rounded-[27px]">{children}</div></motion.div>;
