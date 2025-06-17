export interface UseCase {
  slug: string
  title: string
  description: string
  image: string
  fullDescription: string
  benefits: { title: string; description: string }[]
  examples: { title: string; description: string; image: string }[]
}

export const useCases: UseCase[] = [
  {
    slug: "web-design",
    title: "Web Design",
    description:
      "Create responsive websites with modern layouts, animations, and interactions that work across all devices.",
    image: "/placeholder.svg?height=400&width=600&text=Web+Design",
    fullDescription:
      "Our web design tools empower you to create stunning, responsive websites that look great on any device. From simple landing pages to complex web applications, our platform provides everything you need to bring your web projects to life.",
    benefits: [
      {
        title: "Responsive Design Tools",
        description:
          "Create designs that automatically adapt to any screen size with our responsive grid system and flexible components.",
      },
      {
        title: "Interactive Prototyping",
        description:
          "Build interactive prototypes that simulate real user experiences, complete with animations and transitions.",
      },
      {
        title: "Code Export",
        description:
          "Export clean, production-ready HTML, CSS, and JavaScript code that matches your design pixel-perfectly.",
      },
    ],
    examples: [
      {
        title: "E-commerce Website",
        description: "A fully responsive online store with product galleries, shopping cart, and checkout process.",
        image: "/placeholder.svg?height=400&width=600&text=E-commerce+Example",
      },
      {
        title: "Portfolio Site",
        description: "A sleek, modern portfolio showcasing creative work with smooth animations and transitions.",
        image: "/placeholder.svg?height=400&width=600&text=Portfolio+Example",
      },
      {
        title: "Corporate Website",
        description: "A professional business website with multiple pages, contact forms, and interactive elements.",
        image: "/placeholder.svg?height=400&width=600&text=Corporate+Example",
      },
    ],
  },
  {
    slug: "mobile-app-design",
    title: "Mobile App Design",
    description: "Design intuitive mobile experiences with specialized components and gesture-based interactions.",
    image: "/placeholder.svg?height=400&width=600&text=Mobile+App+Design",
    fullDescription:
      "Create beautiful, intuitive mobile app interfaces that users will love. Our specialized mobile design tools help you craft experiences optimized for touch interactions, with components and patterns designed specifically for mobile devices.",
    benefits: [
      {
        title: "Native Components",
        description:
          "Access a library of native-looking UI components for iOS and Android that follow platform guidelines.",
      },
      {
        title: "Gesture Interactions",
        description:
          "Design and test touch gestures like swipe, pinch, and tap with our interactive prototyping tools.",
      },
      {
        title: "Device Preview",
        description: "Preview your designs on various device models to ensure they look perfect on every screen.",
      },
    ],
    examples: [
      {
        title: "Social Media App",
        description: "A feature-rich social platform with feed, messaging, and profile management.",
        image: "/placeholder.svg?height=400&width=600&text=Social+App+Example",
      },
      {
        title: "Fitness Tracker",
        description: "A health and fitness app with activity tracking, statistics, and personalized recommendations.",
        image: "/placeholder.svg?height=400&width=600&text=Fitness+App+Example",
      },
      {
        title: "Food Delivery App",
        description: "A food ordering and delivery app with restaurant browsing, cart management, and order tracking.",
        image: "/placeholder.svg?height=400&width=600&text=Food+App+Example",
      },
    ],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    description: "Develop comprehensive brand systems with logo design, typography, color palettes, and style guides.",
    image: "/placeholder.svg?height=400&width=600&text=Brand+Identity",
    fullDescription:
      "Build cohesive brand identities that communicate your values and resonate with your audience. Our branding tools help you create and maintain consistent visual languages across all touchpoints, from logos to complete design systems.",
    benefits: [
      {
        title: "Logo Design Tools",
        description:
          "Create versatile logos with our vector editing tools, with variations for different contexts and sizes.",
      },
      {
        title: "Brand Guidelines",
        description:
          "Document and share comprehensive brand guidelines including colors, typography, imagery, and voice.",
      },
      {
        title: "Asset Management",
        description: "Organize and distribute brand assets to ensure consistency across teams and projects.",
      },
    ],
    examples: [
      {
        title: "Startup Rebrand",
        description:
          "A complete brand refresh for a tech startup, including logo, color system, and marketing materials.",
        image: "/placeholder.svg?height=400&width=600&text=Startup+Rebrand",
      },
      {
        title: "Product Branding",
        description:
          "Product-specific branding that fits within a larger brand ecosystem while maintaining its own identity.",
        image: "/placeholder.svg?height=400&width=600&text=Product+Branding",
      },
      {
        title: "Non-profit Identity",
        description:
          "A mission-driven brand identity for a non-profit organization, designed to inspire action and trust.",
        image: "/placeholder.svg?height=400&width=600&text=Nonprofit+Branding",
      },
    ],
  },
]

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((useCase) => useCase.slug === slug)
}

export function getRelatedUseCases(currentSlug: string): UseCase[] {
  return useCases
    .filter((useCase) => useCase.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
}
