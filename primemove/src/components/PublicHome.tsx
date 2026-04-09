"use client";
import React, { useState } from "react";
import HeroSection from "@/app/HeroSection";
import AuthModal from "@/app/AuthModal";
import VehicleSlider from "./VehicleSlider";
import Footer from "./Footer";

function PublicHome() {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <HeroSection onAuthRequired={() => setAuthOpen(true)} />
      <VehicleSlider />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        <Footer />
    </>
  );
}

export default PublicHome;
