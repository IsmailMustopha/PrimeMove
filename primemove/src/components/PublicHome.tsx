"use client";
import React, { useState } from "react";
import HeroSection from "@/app/HeroSection";
import AuthModal from "@/app/AuthModal";
import VehicleSlider from "./VehicleSlider";

function PublicHome() {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <HeroSection onAuthRequired={() => setAuthOpen(true)} />
      <VehicleSlider />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default PublicHome;
