import { Moon, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={20} weight="duotone" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} weight="duotone" />
      </motion.div>
    </Button>
  )
}
