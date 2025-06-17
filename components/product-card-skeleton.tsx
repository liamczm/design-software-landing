"use client"

import { motion } from "framer-motion"
import Skeleton from "@/components/skeleton"

interface ProductCardSkeletonProps {
  index?: number
}

export default function ProductCardSkeleton({ index = 0 }: ProductCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 glow-border"
    >
      {/* Icon skeleton */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Skeleton className="h-6 w-6" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Learn more link skeleton */}
      <div className="flex items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 ml-1" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </motion.div>
  )
}
