import { ArrowLeft } from "lucide-react"
import AnimatedButton from "@/components/animated-button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <AnimatedButton variant="outline" href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </AnimatedButton>
    </div>
  )
}
