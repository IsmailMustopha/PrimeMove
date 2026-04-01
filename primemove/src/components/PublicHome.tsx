"use client";
import React, { useState } from "react";
import HeroSection from "@/app/HeroSection";
import VehicleSlider from "@/app/VehicleSlider";
import AuthModal from "@/app/AuthModal";

function PublicHome() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <HeroSection />
      <VehicleSlider />
      <AuthModal open={authOpen} onClose={() =>  setAuthOpen(false)} />
    </>
  );
}

export default PublicHome;
