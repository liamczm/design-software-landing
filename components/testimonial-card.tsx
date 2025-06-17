"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

export default function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false)

  // 计算是否需要"显示更多"按钮
  const needsExpansion = quote.length > 120

  return (
    <motion.div
      className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 transition-all hover:shadow-md h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.div
        className="mb-4 text-primary"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            ★
          </motion.span>
        ))}
      </motion.div>

      <div className={`relative ${!expanded && needsExpansion ? "max-h-24 overflow-hidden" : ""} mb-6`}>
        <p className="text-muted-foreground">"{quote}"</p>

        {!expanded && needsExpansion && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
        )}
      </div>

      {needsExpansion && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary text-sm flex items-center mb-4 hover:underline self-start"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Read more
            </>
          )}
        </button>
      )}

      <div className="flex items-center mt-auto">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Image
            src={avatar || "/placeholder.svg"}
            alt={author}
            width={48}
            height={48}
            className="mr-4 h-12 w-12 rounded-full object-cover"
          />
        </motion.div>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
