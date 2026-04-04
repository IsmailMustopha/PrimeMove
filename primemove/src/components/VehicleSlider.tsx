"use client";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";

const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse the full fleet",
    Icon: CarTaxiFront,
    tag: "Popular",
  },
  { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
  { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
  { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
  { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
  {
    title: "Trucks",
    desc: "Heavy & commercial transport",
    Icon: Truck,
    tag: "Cargo",
  },
];

export default function VehicleSlider() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = dir === "left" ? -400 : 400;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[#fcfcfc] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-zinc-900 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                Premium Fleet
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-zinc-900">
              Vehicle <span className="text-zinc-400">Categories</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="group w-14 h-14 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 transition-all duration-300 shadow-sm"
            >
              <ChevronLeft
                size={20}
                className="group-hover:text-white transition-colors"
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="group w-14 h-14 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 transition-all duration-300 shadow-sm"
            >
              <ChevronRight
                size={20}
                className="group-hover:text-white transition-colors"
              />
            </button>
          </div>
        </header>

        {/* Slider Section */}
        <div className="relative group/container">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-12 pt-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VEHICLE_CATEGORIES.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative min-w-[280px] sm:min-w-[320px] h-[400px] flex-shrink-0 cursor-pointer group"
              >
                <div
                  className={`
                  relative h-full w-full rounded-[40px] p-8 border transition-all duration-500 flex flex-col justify-between overflow-hidden
                  ${
                    hovered === i
                      ? "bg-zinc-900 border-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                      : "bg-white border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]"
                  }
                `}
                >
                  {/* Decorative Background Number */}
                  <span
                    className={`absolute -right-4 -top-4 text-9xl font-black transition-opacity duration-500 select-none
                    ${hovered === i ? "text-white/5 opacity-100" : "text-zinc-50 opacity-0"}`}
                  >
                    0{i + 1}
                  </span>

                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 
                        ${hovered === i ? "bg-white/10 text-white scale-110" : "bg-zinc-50 text-zinc-900"}`}
                      >
                        <category.Icon size={28} strokeWidth={1.5} />
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-500
                        ${hovered === i ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}
                      >
                        <Sparkles size={10} />
                        {category.tag}
                      </div>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-3 transition-colors duration-500 ${hovered === i ? "text-white" : "text-zinc-900"}`}
                    >
                      {category.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-500 ${hovered === i ? "text-zinc-400" : "text-zinc-500"}`}
                    >
                      {category.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 group/btn">
                    <span
                      className={`text-sm font-bold transition-colors duration-500 ${hovered === i ? "text-white" : "text-zinc-900"}`}
                    >
                      Explore Fleet
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`transition-all duration-300 ${hovered === i ? "text-white translate-x-1 -translate-y-1" : "text-zinc-400"}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-4 pt-10 border-t border-zinc-100">
          {[
            { num: "06", label: "Fleet Categories" },
            { num: "120+", label: "Premium Vehicles" },
            { num: "24/7", label: "Support Team" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-2xl font-black text-zinc-900 tracking-tighter">
                {stat.num}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import {
//   Bike,
//   Bus,
//   Car,
//   CarTaxiFront,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Truck,
// } from "lucide-react";
// import { motion, useScroll, useSpring } from "framer-motion";
// import React, { useRef, useState, useEffect } from "react";

// const VEHICLE_CATEGORIES = [
//   {
//     title: "All Vehicles",
//     desc: "Browse the full fleet",
//     Icon: CarTaxiFront,
//     tag: "Popular",
//   },
//   { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
//   { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
//   { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
//   { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
//   {
//     title: "Trucks",
//     desc: "Heavy & commercial transport",
//     Icon: Truck,
//     tag: "Cargo",
//   },
// ];

// function VehicleSlider() {
//   const [hovered, setHovered] = useState<number | null>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   // Update button states based on scroll position
//   const checkScroll = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   useEffect(() => {
//     checkScroll();
//   }, []);

//   const scroll = (dir: "left" | "right") => {
//     if (!sliderRef.current) return;
//     const scrollAmount = 320;
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="w-full bg-zinc-50/50 py-24 px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-2"
//           >
//             <div className="flex items-center gap-3">
//               <span className="h-px w-12 bg-zinc-300" />
//               <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
//                 Premium Fleet
//               </span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
//               Vehicle{" "}
//               <span className="text-zinc-400 font-light">Categories</span>
//             </h2>
//           </motion.div>

//           {/* Navigation Controls */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => scroll("left")}
//               disabled={!canScrollLeft}
//               className="p-4 rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed group"
//             >
//               <ChevronLeft
//                 size={20}
//                 className="group-active:scale-75 transition-transform"
//               />
//             </button>
//             <button
//               onClick={() => scroll("right")}
//               disabled={!canScrollRight}
//               className="p-4 rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed group"
//             >
//               <ChevronRight
//                 size={20}
//                 className="group-active:scale-75 transition-transform"
//               />
//             </button>
//           </div>
//         </header>

//         {/* Slider Container */}
//         <div className="relative group/slider">
//           <div
//             ref={sliderRef}
//             onScroll={checkScroll}
//             className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-8 pt-4 px-2"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {VEHICLE_CATEGORIES.map((c, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 onHoverStart={() => setHovered(i)}
//                 onHoverEnd={() => setHovered(null)}
//                 className="snap-start min-w-[280px] md:min-w-[320px] shrink-0"
//               >
//                 <motion.div
//                   whileHover={{ y: -10 }}
//                   className={`relative h-full p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden
//                     ${
//                       hovered === i
//                         ? "bg-zinc-900 border-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
//                         : "bg-white border-zinc-100 shadow-xl shadow-zinc-200/50"
//                     }`}
//                 >
//                   {/* Decorative Gradient Background */}
//                   <div
//                     className={`absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br from-zinc-800 to-black ${hovered === i ? "opacity-100" : ""}`}
//                   />

//                   <div className="relative z-10">
//                     <div className="flex justify-between items-start mb-12">
//                       <motion.div
//                         animate={{
//                           backgroundColor:
//                             hovered === i ? "rgba(255,255,255,0.1)" : "#f4f4f5",
//                           color: hovered === i ? "#fff" : "#18181b",
//                         }}
//                         className="p-4 rounded-2xl border border-transparent"
//                       >
//                         <c.Icon size={28} strokeWidth={1.5} />
//                       </motion.div>

//                       <span
//                         className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
//                           hovered === i
//                             ? "border-zinc-700 text-zinc-400"
//                             : "border-zinc-200 text-zinc-500"
//                         }`}
//                       >
//                         {c.tag}
//                       </span>
//                     </div>

//                     <h3
//                       className={`text-2xl font-bold mb-3 transition-colors ${hovered === i ? "text-white" : "text-zinc-900"}`}
//                     >
//                       {c.title}
//                     </h3>
//                     <p
//                       className={`text-sm leading-relaxed transition-colors ${hovered === i ? "text-zinc-400" : "text-zinc-500"}`}
//                     >
//                       {c.desc}
//                     </p>

//                     <motion.div
//                       animate={{
//                         opacity: hovered === i ? 1 : 0,
//                         x: hovered === i ? 0 : -10,
//                       }}
//                       className="mt-8 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest"
//                     >
//                       Explore <ChevronRight size={14} />
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Stats */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:flex items-center gap-x-12 gap-y-6 mt-12 pt-10 border-t border-zinc-200"
//         >
//           {[
//             { num: "06", label: "Categories" },
//             { num: "40+", label: "Vehicles" },
//             { num: "24/7", label: "Support" },
//             { num: "100%", label: "Insured" },
//           ].map((d, i) => (
//             <div
//               key={i}
//               className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3"
//             >
//               <span className="text-2xl font-black text-zinc-900 tracking-tighter">
//                 {d.num}
//               </span>
//               <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
//                 {d.label}
//               </span>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default VehicleSlider;

// "use client"
// import { Bike, Bus, Car, CarTaxiFront, ChevronLeft, ChevronRight, Sparkles, Truck } from "lucide-react";
// import { motion } from "motion/react";
// import React, { useRef, useState } from "react";

// const VEHICLE_CATEGORIES = [
//   {
//     title: "All Vehicles",
//     desc: "Browse the full fleet",
//     Icon: CarTaxiFront,
//     tag: "Popular",
//   },
//   { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
//   { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
//   { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
//   { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
//   {
//     title: "Trucks",
//     desc: "Heavy & commercial transport",
//     Icon: Truck,
//     tag: "Cargo",
//   },
// ];

// function VehicleSlider() {
//   const [hovered, setHovered] = useState<number | null>(null)

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const scroll = (dir: "left" | "right") => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="w-full bg-white py-20 px-4 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//           className="flex items-end justify-between mb-10"
//         >
//           <div>
//             <div className="flex items-center gap-2 mb-3">
//               <div className="h-px w-8 bg-zinc-900" />
//               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
//                 Fleet
//               </span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-none">
//               Vehicles
//             </h2>
//             <br />
//             <span className="relative inline-block">
//               Categories
//               <motion.div
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{
//                   duration: 0.6,
//                   delay: 0.4,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 className="absolute -bottom-1 left-0 right-0 h-0.5 bg-zinc-900 origin-left"
//               />
//             </span>

//             <div className="hidden sm:flex items-center gap-2">
//               <motion.div
//                 whileTap={{ scale: 0.88 }}
//                 onClick={() => scroll("left")}
//                 className="w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm"
//               >
//                 <ChevronLeft size={18} strokeWidth={2.5} />
//               </motion.div>

//               <motion.div
//                 onClick={() => scroll("right")}
//                 whileTap={{ scale: 0.88 }}
//                 className="w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm"
//               >
//                 <ChevronRight size={18} strokeWidth={2.5} />
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative">
//           <div
//             className="flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             ref={sliderRef}
//           >
//             {VEHICLE_CATEGORIES.map((c, i) => {
//               const isHovered = hovered === i;
//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: 0.1 + i * 0.08,
//                     duration: 0.5,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   onHoverStart={() => setHovered(i)}
//                   onHoverEnd={() => setHovered(null)}
//                   whileHover={{ y: -8 }}
//                   className="group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer"
//                 >
//                   <motion.div
//                     animate={{
//                       backgroundColor: isHovered ? "#09090b" : "#ffffff",
//                       borderColor: isHovered ? "#09090b" : "#e4e4e7",
//                       boxShadow: isHovered
//                         ? "0 24px 56px rgba(0,0,0,0.2)"
//                         : "0 2px 16px rgba(0,0,0,0.06)",
//                     }}
//                     transition={{ duration: 0.25 }}
//                     className="relative rounded-3xl border p-6 sm:p-7 overflow-hidden h-full"
//                   >
//                     <motion.div
//                       animate={{
//                         backgroundColor: isHovered
//                           ? "rgba(255,255,255,0.12)"
//                           : "#f4f4f5",
//                         color: isHovered ? "#ffffff" : "#71717a",
//                         borderColor: isHovered
//                           ? "rgba(255,255,255,0.15)"
//                           : "#e4e4e7",
//                       }}
//                       className="inline-flex items-center gap-1.5 border text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full mb-5 transition-colors"
//                     >
//                       <Sparkles size={8} />
//                       {c.tag}
//                     </motion.div>

//                     <motion.div
//                       animate={{
//                         backgroundColor: isHovered
//                           ? "rgba(255, 255, 255, 0.1)"
//                           : "#f4f4f5",
//                         borderColor: isHovered
//                           ? "rgba(255, 255, 255, 0.15)"
//                           : "#e4e4e7",
//                       }}
//                       className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 transition-colors"
//                     >
//                       <motion.div
//                         animate={{ color: isHovered ? "#ffffff" : "#3f3f46" }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <c.Icon size={24} strokeWidth={1.4} />
//                       </motion.div>
//                     </motion.div>

//                     <motion.h3
//                       animate={{ color: isHovered ? "#ffffff" : "#09090b" }}
//                       transition={{ duration: 0.2 }}
//                       className="text-lg font-black tracking-tight leading-none mb-2"
//                     >
//                       {c.title}
//                     </motion.h3>

//                     <motion.p
//                       animate={{
//                         color: isHovered ? "rgba(255,255,255,0.5)" : "#a1a1aa",
//                       }}
//                       transition={{ duration: 0.2 }}
//                       className="text-xs font-medium leading-relaxed"
//                     >
//                       {c.desc}
//                     </motion.p>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="flex items-center gap-6 mt-8 pt-6 border-t border-zinc-100"
//         >
//           {[
//             { num: "6+", label: "Categories" },
//             { num: "10+", label: "Vehicle types" },
//             { num: "24/7", label: "Availability" },
//           ].map((d, i) => (
//             <div key={i} className="flex items-center gap-3">
//               <p className="text-zinc-900 text-lg font-black tracking-tighter">
//                 {d.num}
//               </p>
//               <p className="text-zinc-400 text-xs font-medium">{d.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default VehicleSlider;
