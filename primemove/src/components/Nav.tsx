// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const NAV_ITEMS = [
//   { name: "Home", href: "/" },
//   { name: "Bookings", href: "/bookings" },
//   { name: "About Us", href: "/about-us" },
//   { name: "Contact", href: "/contact" },
// ];

// function Nav() {
//   const pathName = usePathname();

//   return (
//     <motion.div
//       initial={{ y: -100, x: "-50%", opacity: 0 }}
//       animate={{ y: 0, x: "-50%", opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="fixed top-5 left-1/2 w-[95%] md:w-fit z-50 rounded-full bg-[#0B0B0B]/80 backdrop-blur-md border border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-2 py-2"
//     >
//       <div className="flex items-center gap-8 md:gap-12 px-2 md:px-4">
//         {/* Logo */}
//         <Link href="/" className="hover:opacity-80 transition-opacity">
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={36}
//             height={36}
//             className="rounded-full"
//             priority
//           />
//         </Link>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex items-center gap-2">
//           {NAV_ITEMS.map((item) => {
//             const isActive = pathName === item.href;

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
//                   isActive ? "text-white" : "text-gray-400 hover:text-white"
//                 }`}
//               >
//                 <span className="relative z-10">{item.name}</span>
//                 {isActive && (
//                   <motion.div
//                     layoutId="nav-pill"
//                     transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
//                     className="absolute inset-0 bg-white/10 rounded-full"
//                   />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Action Button */}
//         <button className="group relative flex items-center justify-center px-6 py-2 rounded-full bg-white text-black text-sm font-semibold overflow-hidden transition-all hover:pr-8 active:scale-95">
//           <span className="relative z-10">Login</span>
//           <span className="absolute right-3 opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
//             →
//           </span>
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default Nav;

"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "@/app/AuthModal";

const Nav_Items = ["Home", "Bookings", "About Us", "Contact"];

function Nav() {
  const pathName = usePathname();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Image src="/logo.png" alt="logo" width={44} height={44} priority />

          <div className="hidden md:flex items-center gap-10">
            {Nav_Items.map((i, index) => {
              let href;
              if (i === "Home") {
                href = "/";
              } else {
                // Note: This logic assumes simple slugs; "About Us" would become "/about us"
                // You may want to add .replace(/\s+/g, '-') for production.
                href = `/${i.toLowerCase()}`;
              }

              const active = href === pathName;

              return (
                <Link
                  key={index}
                  href={href}
                  className={`text-sm font-medium transition ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {i}
                </Link>
              );
            })}
          </div>

          <button
            className="px-4 py-1.5 rounded-full bg-white text-black text-sm"
            onClick={() => setAuthOpen(true)}
          >
            Login
          </button>
        </div>
      </motion.div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Nav;
