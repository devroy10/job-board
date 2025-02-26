"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MatchScoreBadgeProps {
  score: number
  className?: string
}

export function MatchScoreBadge({ score, className }: MatchScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700 border-emerald-200"
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getScoreColor(score),
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-2 h-2 rounded-full mr-1.5"
        style={{
          backgroundColor: "currentColor",
        }}
      />
      {score}% Match
    </motion.div>
  )
}

