import type { ReactNode } from "react"
import { Zap, Layers, Users, Monitor, Smartphone, Palette } from "lucide-react"

export interface Benefit {
  title: string
  description: string
}

export interface Feature {
  slug: string
  title: string
  description: string
  icon: ReactNode
  image: string
  benefits: Benefit[]
  howItWorks: string
  steps: string[]
  howItWorksImage: string
  pricing?: string
  releaseDate?: string
}

export const features: Feature[] = [
  {
    slug: "designify-ui",
    title: "Designify UI",
    description: "Our flagship UI design tool with drag-and-drop editor, pre-built components, and smart layout tools.",
    icon: <Zap className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=UI+Design+Interface",
    benefits: [
      {
        title: "Drag-and-Drop Editor",
        description: "Easily arrange elements on your canvas with our intuitive drag-and-drop interface.",
      },
      {
        title: "Pre-built Components",
        description: "Access a library of professionally designed UI components to speed up your workflow.",
      },
      {
        title: "Smart Layout Tools",
        description: "Automatically align and distribute elements with intelligent layout assistance.",
      },
    ],
    howItWorks:
      "Our intuitive UI design tools make it easy to create beautiful interfaces without coding. Start with a blank canvas or template, then use our drag-and-drop editor to build your design.",
    steps: [
      "Choose from hundreds of pre-built components or create your own",
      "Drag elements onto your canvas and arrange them with smart guides",
      "Customize styles, colors, and typography with our visual editor",
      "Preview your design across different device sizes with one click",
      "Export your design or share it directly with your team",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=UI+Design+Workflow",
    pricing: "From $12/month",
    releaseDate: "2023",
  },
  {
    slug: "designify-prototype",
    title: "Designify Prototype",
    description: "Turn static designs into interactive prototypes with our specialized prototyping solution.",
    icon: <Layers className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=Prototyping+Interface",
    benefits: [
      {
        title: "Interactive Connections",
        description: "Create clickable hotspots that connect screens and simulate real user flows.",
      },
      {
        title: "Animation Library",
        description: "Choose from dozens of pre-built animations or create custom transitions.",
      },
      {
        title: "Conditional Logic",
        description: "Build complex prototypes with if/then conditions and variables.",
      },
    ],
    howItWorks:
      "Our advanced prototyping tools help you bring your designs to life with interactive elements, animations, and transitions that simulate the real user experience.",
    steps: [
      "Connect your screens with interactive hotspots",
      "Add animations and transitions between screens",
      "Create conditional flows based on user interactions",
      "Test your prototype directly in the browser or on mobile devices",
      "Share interactive prototypes with stakeholders for feedback",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=Prototyping+Workflow",
    pricing: "From $15/month",
    releaseDate: "2023",
  },
  {
    slug: "designify-collab",
    title: "Designify Collab",
    description: "Our team collaboration platform with real-time editing, comments, and version control.",
    icon: <Users className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=Collaboration+Interface",
    benefits: [
      {
        title: "Live Editing",
        description: "See changes from your team members in real-time as they happen.",
      },
      {
        title: "Commenting System",
        description: "Leave contextual feedback directly on designs with threaded conversations.",
      },
      {
        title: "Version History",
        description: "Track changes and revert to previous versions at any time.",
      },
    ],
    howItWorks:
      "Our real-time collaboration features make it easy for teams to work together on designs, regardless of location. See changes as they happen and communicate directly within the platform.",
    steps: [
      "Invite team members to your project with customizable permissions",
      "Edit designs simultaneously with real-time updates",
      "Leave comments and feedback directly on specific elements",
      "Track changes with detailed version history",
      "Resolve discussions and implement feedback without leaving the platform",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=Collaboration+Workflow",
    pricing: "From $19/month",
    releaseDate: "2023",
  },
  {
    slug: "designify-responsive",
    title: "Designify Responsive",
    description: "Create designs that work on any device with our responsive design solution.",
    icon: <Monitor className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=Responsive+Design+Interface",
    benefits: [
      {
        title: "Adaptive Layouts",
        description: "Create designs that automatically adjust to different screen sizes.",
      },
      {
        title: "Device Preview",
        description: "Test your designs on various device sizes with one click.",
      },
      {
        title: "Responsive Components",
        description: "Use components that intelligently adapt to their container size.",
      },
    ],
    howItWorks:
      "Our responsive design tools help you create layouts that look great on any device. Design once and see how your interface adapts to different screen sizes automatically.",
    steps: [
      "Design with our responsive grid system",
      "Use flexible components that adapt to their container",
      "Preview your design across desktop, tablet, and mobile views",
      "Fine-tune specific breakpoints for perfect layouts on any device",
      "Export responsive code that works across all platforms",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=Responsive+Design+Workflow",
    pricing: "From $14/month",
    releaseDate: "2024",
  },
  {
    slug: "designify-mobile",
    title: "Designify Mobile",
    description: "Specialized mobile design tool optimized for creating exceptional mobile experiences.",
    icon: <Smartphone className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=Mobile+Design+Interface",
    benefits: [
      {
        title: "Touch Gestures",
        description: "Design and test touch interactions like swipe, pinch, and tap.",
      },
      {
        title: "Mobile Components",
        description: "Access specialized UI components optimized for mobile interfaces.",
      },
      {
        title: "Device Testing",
        description: "Preview your designs on specific mobile device models.",
      },
    ],
    howItWorks:
      "Our mobile-first design approach ensures your interfaces work perfectly on smartphones and tablets. Start with the mobile experience and expand to larger screens.",
    steps: [
      "Begin your design with mobile viewport constraints",
      "Use our mobile-optimized component library",
      "Design touch-friendly interactions with gesture support",
      "Test on specific device models with our device preview tool",
      "Progressively enhance your design for larger screens",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=Mobile+Design+Workflow",
    pricing: "From $12/month",
    releaseDate: "2024",
  },
  {
    slug: "designify-systems",
    title: "Designify Systems",
    description: "Build and maintain design systems with our comprehensive design system management tool.",
    icon: <Palette className="h-6 w-6" />,
    image: "/placeholder.svg?height=600&width=800&text=Design+System+Interface",
    benefits: [
      {
        title: "Component Library",
        description: "Build and maintain a library of reusable components for your team.",
      },
      {
        title: "Style Guide",
        description: "Define and document colors, typography, and spacing for consistency.",
      },
      {
        title: "Design Tokens",
        description: "Manage design variables that can be updated across your entire system.",
      },
    ],
    howItWorks:
      "Our design system tools help you create and maintain a consistent design language across your products. Build a library of reusable components and styles that your entire team can use.",
    steps: [
      "Define your design tokens for colors, typography, and spacing",
      "Create reusable components with customizable properties",
      "Document usage guidelines and best practices",
      "Share your design system with your team",
      "Update components centrally to propagate changes across all designs",
    ],
    howItWorksImage: "/placeholder.svg?height=600&width=800&text=Design+System+Workflow",
    pricing: "From $29/month",
    releaseDate: "2024",
  },
]

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((feature) => feature.slug === slug)
}

export function getRelatedFeatures(currentSlug: string): Feature[] {
  // Return 2 random features that are not the current one
  return features
    .filter((feature) => feature.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
}
