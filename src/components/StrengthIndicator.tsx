import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import {
  getStrengthLevel,
  getStrengthColor,
  getStrengthPercentage,
} from '@/lib/password'

interface StrengthIndicatorProps {
  entropy: number
}

export function StrengthIndicator({ entropy }: StrengthIndicatorProps) {
  const level = getStrengthLevel(entropy)
  const percentage = getStrengthPercentage(entropy)
  const color = getStrengthColor(level)

  const levelLabels = {
    weak: 'WEAK',
    medium: 'MEDIUM',
    strong: 'STRONG',
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Strength
        </span>
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {levelLabels[level]}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {Math.round(entropy)} bits
          </span>
        </div>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}
