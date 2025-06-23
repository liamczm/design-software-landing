"use client"

import React from 'react';
import Component from '@/components/ui/stacking-card';
import AnimatedContainer from "@/components/animated-container"
import AnimatedText from "@/components/animated-text"

const projects = [
  {
    title: 'Designify UI Pro',
    description:
      'Experience the next generation of design tools with our flagship UI design platform. Featuring advanced drag-and-drop capabilities, smart component libraries, and collaborative real-time editing.',
    link: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
  },
  {
    title: 'Prototype Studio',
    description:
      'Bring your designs to life with interactive prototypes. Create realistic user flows, micro-interactions, and animated transitions without writing a single line of code.',
    link: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop',
    color: '#8f89ff',
  },
  {
    title: 'Design System Builder',
    description:
      'Build scalable design systems that grow with your team. Manage components, tokens, and documentation in one unified platform for consistent design experiences.',
    link: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
    color: '#13006c',
  },
  {
    title: 'Collaborative Workspace',
    description:
      'Work together seamlessly with real-time collaboration, contextual feedback, and version control. Perfect for distributed teams building amazing products.',
    link: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=500&auto=format&fit=crop',
    color: '#ed649e',
  },
  {
    title: 'Mobile Design Studio',
    description:
      'Craft pixel-perfect mobile experiences with platform-specific components, touch gestures, and device previews. Optimized for iOS and Android design patterns.',
    link: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop',
    color: '#fd521a',
  },
];

export default function StackingCardsSection() {
  return (
    <section className="py-16 md:py-24 bg-background/90">
      <div className="container">
        <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <AnimatedText
            text="Explore Our Design Ecosystem"
            tag="h2"
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          />
          <p className="text-lg text-muted-foreground">
            Discover the powerful tools and features that make Designify the complete design platform for modern creators.
          </p>
        </AnimatedContainer>

        <div className="flex justify-center">
          <Component projects={projects} />
        </div>
      </div>
    </section>
  );
} 