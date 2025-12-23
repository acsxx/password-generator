import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Copy, Check, ShieldCheck } from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { PasswordDisplay } from '@/components/PasswordDisplay'
import { StrengthIndicator } from '@/components/StrengthIndicator'
import {
  generatePassword,
  calculateEntropy,
  type PasswordOptions,
} from '@/lib/password'

function App() {
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeLowercase: true,
    includeUppercase: true,
    includeDigits: true,
    includeSymbols: true,
    excludeSimilar: false,
    requireEach: true,
  })

  const entropy = calculateEntropy(options)

  const updatePassword = () => {
    try {
      const newPassword = generatePassword(options)
      setPassword(newPassword)
    } catch (error) {
      toast.error('Failed to generate password')
    }
  }

  useEffect(() => {
    updatePassword()
  }, [options])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast.success('Password copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy password')
    }
  }

  const updateOption = <K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  const selectedTypesCount =
    (options.includeLowercase ? 1 : 0) +
    (options.includeUppercase ? 1 : 0) +
    (options.includeDigits ? 1 : 0) +
    (options.includeSymbols ? 1 : 0)

  const isLastSelected = (key: keyof PasswordOptions) => {
    return selectedTypesCount === 1 && options[key] === true
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck size={40} weight="duotone" className="text-accent" />
            <h1
              className="text-4xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Password Generator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Generate secure, cryptographic passwords instantly
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <PasswordDisplay password={password} />

            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                size="lg"
                disabled={!password}
              >
                {copied ? (
                  <>
                    <Check size={20} weight="bold" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy Password
                  </>
                )}
              </Button>
              <Button
                onClick={updatePassword}
                variant="outline"
                size="lg"
                className="font-semibold"
              >
                Regenerate
              </Button>
            </div>

            <StrengthIndicator entropy={entropy} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="length" className="text-base font-medium">
                  Password Length
                </Label>
                <span className="text-2xl font-bold text-accent tabular-nums">
                  {options.length}
                </span>
              </div>
              <Slider
                id="length"
                min={6}
                max={64}
                step={1}
                value={[options.length]}
                onValueChange={([value]) => updateOption('length', value)}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6</span>
                <span>64</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Character Types</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="lowercase"
                    checked={options.includeLowercase}
                    onCheckedChange={(checked) =>
                      updateOption('includeLowercase', checked as boolean)
                    }
                    disabled={isLastSelected('includeLowercase')}
                  />
                  <Label
                    htmlFor="lowercase"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Lowercase (a-z)
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="uppercase"
                    checked={options.includeUppercase}
                    onCheckedChange={(checked) =>
                      updateOption('includeUppercase', checked as boolean)
                    }
                    disabled={isLastSelected('includeUppercase')}
                  />
                  <Label
                    htmlFor="uppercase"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Uppercase (A-Z)
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="digits"
                    checked={options.includeDigits}
                    onCheckedChange={(checked) =>
                      updateOption('includeDigits', checked as boolean)
                    }
                    disabled={isLastSelected('includeDigits')}
                  />
                  <Label
                    htmlFor="digits"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Digits (0-9)
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="symbols"
                    checked={options.includeSymbols}
                    onCheckedChange={(checked) =>
                      updateOption('includeSymbols', checked as boolean)
                    }
                    disabled={isLastSelected('includeSymbols')}
                  />
                  <Label
                    htmlFor="symbols"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Symbols (!@#$%...)
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Options</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="excludeSimilar"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) =>
                      updateOption('excludeSimilar', checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="excludeSimilar"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Exclude similar characters (i, I, l, 1, o, O, 0)
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="requireEach"
                    checked={options.requireEach}
                    onCheckedChange={(checked) =>
                      updateOption('requireEach', checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="requireEach"
                    className="text-sm cursor-pointer font-medium"
                  >
                    Require at least one from each selected type
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  )
}

export default App