"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bike, Bus, Car, Truck, ArrowRight } from "lucide-react";

const VEHICLES = [
  { icon: Bike, label: "Bike" },
  { icon: Car, label: "Car" },
  { icon: Bus, label: "Bus" },
  { icon: Truck, label: "Truck" },
];

function HeroSection({onAuthRequired}: {onAuthRequired: ()=> void}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background with Cinematic Scale */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />

      {/* Multilayered Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-xs uppercase tracking-widest"
        >
          Premium Transport Solutions
        </motion.div>

        {/* Headline with Gradient Mask */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-center"
        >
          Book Any <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
            Vehicle
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-lg text-gray-400 text-center text-lg md:text-xl font-light leading-relaxed"
        >
          From daily commutes to industrial logistics.{" "}
          <br className="hidden md:block" />
          Precision moving at your fingertips.
        </motion.p>

        {/* Interactive Vehicle Dock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-2 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 flex gap-2 md:gap-4"
        >
          {VEHICLES.map((v, i) => (
            <motion.div
              key={v.label}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              className="group cursor-pointer p-4 md:p-6 rounded-2xl transition-all flex flex-col items-center gap-2"
            >
              <v.icon
                size={24}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
              <span className="text-[10px] uppercase tracking-tighter text-gray-500 group-hover:text-white">
                {v.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            onClick={onAuthRequired}
          >
            Start Booking
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <span className="text-gray-500 text-xs font-medium">
            No credit card required for initial quote
          </span>
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}

export default HeroSection;

// import React from "react";
// import { motion } from "framer-motion";
// import { Bike, Bus, Car, Truck } from "lucide-react";

// function HeroSection() {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Image Layer */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/heroImage.jpg')" }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/80" />

//       {/* Content Container */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-white font-extrabold text-4xl sm:text-5xl md:text-7xl"
//         >
//           Book Any Vehicle
//         </motion.div>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="mt-4 max-w-xl text-gray-300"
//         >
//           From daily rides to heavy transport - all in one platform.
//         </motion.p>

//         {/* Icons Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mt-8 flex gap-8 text-gray-300"
//         >
//           <Bike size={30} />
//           <Car size={30} />
//           <Bus size={30} />
//           <Truck size={30} />
//         </motion.div>

//         {/* CTA Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-12 px-10 py-4 bg-white text-black rounded-full font-semibold shadow-xl"
//         >
//           Book Now
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
