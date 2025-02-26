"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface FilterChipsProps {
  filters: string[]
  onRemoveFilter: (filter: string) => void
  onClearAll: () => void
}

export function FilterChips({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex gap-2 flex-wrap">
        <AnimatePresence>
          {filters.map((filter) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Button variant="outline" size="sm" className="gap-2" onClick={() => onRemoveFilter(filter)}>
                {filter}
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filters.length > 0 && (
        <Button variant="link" className="text-emerald-600" onClick={onClearAll}>
          Delete All
        </Button>
      )}
    </div>
  )
}

