"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticElement } from "./animations";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full relative group"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="h-full flex flex-col bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-sm transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative z-10">
        
        {/* Subtle animated border signal on hover */}
        <motion.div 
          className="absolute top-0 left-0 h-[2px] bg-accent/80 z-20"
          initial={{ width: 0, opacity: 0 }}
          animate={isHovered ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        />

        <CardHeader className="p-8 pb-4">
          <MagneticElement className="inline-block mb-6">
            <div className="h-14 w-14 rounded-sm bg-white border border-slate-100 shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-accent/20 transition-colors duration-500">
              
              {/* Icon background pulsing light */}
              <motion.div 
                className="absolute inset-0 bg-accent/10 rounded-sm blur-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={isHovered ? { scale: 1.5, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Icon className="h-6 w-6 text-slate-700 group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
              </motion.div>
            </div>
          </MagneticElement>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-8 pt-0 relative">
          <CardDescription className="text-base text-slate-500 leading-relaxed relative z-10">
            {description}
          </CardDescription>
          
          {/* Abstract network nodes that appear on hover inside the card */}
          <motion.div 
            className="absolute bottom-8 right-8 text-accent/20 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="30" cy="15" r="2" fill="currentColor" />
              <circle cx="20" cy="30" r="2" fill="currentColor" />
              <path d="M10 10L30 15L20 30L10 10Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
