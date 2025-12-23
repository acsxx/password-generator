import { motion } from 'framer-motion'

interface PasswordDisplayProps {
  password: string
}

export function PasswordDisplay({ password }: PasswordDisplayProps) {
  return (
    <div className="relative bg-muted rounded-lg p-6 border border-border">
      <motion.div
        key={password}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="font-mono text-xl text-foreground break-all leading-relaxed tracking-wide"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {password || 'Generate a password...'}
      </motion.div>
    </div>
  )
}
