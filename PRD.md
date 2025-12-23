# Password Generator

A secure, cryptographic password generator that creates strong, customizable passwords with visual strength indicators and instant copy functionality.

**Experience Qualities**:
1. **Secure** - Uses cryptographically secure random generation (crypto.getRandomValues) to ensure unpredictable passwords
2. **Intuitive** - Clean interface with immediate visual feedback on password strength and clear customization options
3. **Efficient** - Instant password generation and one-click copying for seamless workflow

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused utility tool with interactive controls (slider, checkboxes), real-time generation, strength calculation, and clipboard integration - more than a micro tool but not requiring complex multi-view architecture.

## Essential Features

### Password Generation
- **Functionality**: Generate cryptographically secure random passwords based on user-selected criteria
- **Purpose**: Provide users with strong, unpredictable passwords for security
- **Trigger**: Component mount (initial generation) and any settings change
- **Progression**: User adjusts settings → crypto.getRandomValues generates random values → character set filtered by rules → password displayed
- **Success criteria**: Password contains only selected character types, meets length requirement, uses crypto API

### Length Control
- **Functionality**: Slider to select password length from 6 to 64 characters
- **Purpose**: Allow users to meet different password requirements across services
- **Trigger**: User drags slider or clicks on track
- **Progression**: User moves slider → length value updates → password regenerates instantly → new password displayed
- **Success criteria**: Slider responsive, shows current value, generates correct length

### Character Type Selection
- **Functionality**: Checkboxes for lowercase, uppercase, digits, and symbols with at least one required
- **Purpose**: Customize password to meet specific service requirements
- **Trigger**: User clicks checkbox
- **Progression**: User toggles checkbox → validation checks at least one selected → if valid, settings update → password regenerates
- **Success criteria**: Cannot deselect all options, generated password contains selected types

### Exclude Similar Characters
- **Functionality**: Toggle to exclude visually similar characters (i, I, l, 1, o, O, 0)
- **Purpose**: Reduce transcription errors when manually entering passwords
- **Trigger**: User toggles checkbox
- **Progression**: User enables option → character set filters out similar chars → password regenerates
- **Success criteria**: When enabled, password never contains i, I, l, 1, o, O, 0

### Require Each Selected Type
- **Functionality**: Toggle ensuring password contains at least one character from each selected type
- **Purpose**: Meet strict password policies requiring character diversity
- **Trigger**: User toggles checkbox
- **Progression**: User enables option → generator validates password contains all types → if not, regenerates → displays valid password
- **Success criteria**: Generated password always has ≥1 char from each selected type when enabled

### Copy to Clipboard
- **Functionality**: Button to copy generated password to clipboard
- **Purpose**: Quick, error-free password transfer to other applications
- **Trigger**: User clicks copy button
- **Progression**: User clicks button → password copied to clipboard → toast notification confirms → button shows success state briefly
- **Success criteria**: Password in clipboard matches display, visual confirmation shown

### Strength Indicator
- **Functionality**: Visual bar and entropy calculation showing password strength
- **Purpose**: Help users understand password security level
- **Trigger**: Password generation/change
- **Progression**: Password generated → entropy calculated (log2 of possible combinations) → bar fills proportionally → color indicates strength level
- **Success criteria**: Entropy accurately calculated, bar color reflects security (red=weak, yellow=medium, green=strong)

## Edge Case Handling

- **All Checkboxes Deselected**: Prevent unchecking last character type option (disable checkbox or prevent action)
- **Small Character Set with "Require Each"**: If character set too small for length + requirements, disable "require each" or increase minimum length
- **Clipboard API Unavailable**: Show error toast if copy fails, provide fallback visual selection
- **Similar Chars + Require Each Conflict**: If excluding similar chars removes entire character type, automatically disable "exclude similar" or show warning
- **Rapid Setting Changes**: Debounce or use latest settings to avoid excessive regeneration

## Design Direction

The design should evoke confidence, clarity, and modern professionalism. Users should feel their security is in capable hands through clean typography, purposeful color choices, and smooth interactions. The interface should feel precise and tool-like, with a sophisticated color palette that communicates both security and approachability.

## Color Selection

A professional security-focused palette with vibrant accent colors for visual feedback.

- **Primary Color**: Deep slate blue `oklch(0.35 0.05 260)` - Communicates trust, security, and professionalism
- **Secondary Colors**: 
  - Light slate background `oklch(0.98 0.01 260)` for cards - Subtle, sophisticated container color
  - Medium slate `oklch(0.75 0.03 260)` for muted elements - Hierarchy and subtle UI elements
- **Accent Color**: Vibrant purple `oklch(0.60 0.20 290)` for interactive elements and CTAs - Modern, energetic, draws attention
- **Strength Colors**:
  - Weak: Coral red `oklch(0.62 0.20 25)` - Warning, needs improvement
  - Medium: Amber `oklch(0.75 0.15 70)` - Acceptable but not ideal
  - Strong: Emerald green `oklch(0.65 0.18 150)` - Secure and confident

**Foreground/Background Pairings**:
- Background (Light Slate #FAFAFB): Dark Text (Primary #2D2F45) - Ratio 10.2:1 ✓
- Primary (Deep Slate #2D2F45): White Text (#FFFFFF) - Ratio 11.5:1 ✓
- Accent (Vibrant Purple #8B5CF6): White Text (#FFFFFF) - Ratio 4.8:1 ✓
- Card (Light Slate #F8F9FA): Primary Text (#2D2F45) - Ratio 11.8:1 ✓

## Font Selection

Typography should feel technical yet approachable, with monospace for the password display to communicate precision and a clean sans-serif for UI elements.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold / 32px / tight letter spacing (-0.02em)
  - H2 (Section Headers): Space Grotesk Semibold / 18px / normal spacing
  - Body (Settings Labels): Inter Medium / 14px / relaxed line height (1.6)
  - Password Display: JetBrains Mono Regular / 20px / monospace for clarity
  - Strength Indicator: Inter Semibold / 13px / uppercase tracking (0.05em)

## Animations

Animations should be precise and purposeful, reinforcing the tool's reliability while providing satisfying feedback for interactions.

- Strength bar fills smoothly with elastic easing when password changes (300ms)
- Copy button shows subtle scale feedback (95% → 100%) with spring animation on click
- Toast notifications slide in from top-right with gentle bounce
- Password text fades between changes (150ms) to indicate regeneration
- Slider thumb has subtle lift shadow on hover/drag for tactile feel

## Component Selection

- **Components**:
  - `Card`, `CardHeader`, `CardTitle`, `CardContent` for main container and settings panel - Clean separation of concerns
  - `Slider` for length control - Precise value selection with visual feedback
  - `Checkbox` for all toggles (char types, exclude similar, require each) - Clear on/off states
  - `Button` for copy action - Primary variant with accent color
  - `Progress` for strength bar - Visual representation of entropy
  - `Label` for all form controls - Accessibility and clear associations
  - Toast from `sonner` for copy confirmations - Non-intrusive feedback

- **Customizations**:
  - Custom password display component with monospace font and subtle background differentiation
  - Custom strength indicator combining Progress bar with entropy calculation display
  - Copy button with icon (Copy/Check from phosphor-icons) that transitions on success

- **States**:
  - Slider: Hover shows enhanced thumb, active/dragging has elevated shadow
  - Checkboxes: Last remaining checkbox is disabled (cannot uncheck)
  - Copy button: Default (violet) → Success (green with check icon for 2s) → Default
  - Password text: Subtle fade transition between generations

- **Icon Selection**:
  - `Copy` (phosphor) for copy button default state
  - `Check` (phosphor) for successful copy confirmation
  - `Password` or `ShieldCheck` (phosphor) for app header icon

- **Spacing**:
  - Card padding: `p-6` (24px) for comfortable breathing room
  - Section gaps: `gap-6` (24px) between major sections
  - Control groups: `gap-4` (16px) between related controls
  - Label-to-input: `gap-2` (8px) for tight association
  - Outer container: `p-4 md:p-8` responsive padding

- **Mobile**:
  - Single column layout maintained across all breakpoints
  - Card full width on mobile with `max-w-2xl` on desktop, centered
  - Touch-friendly slider with larger thumb on mobile (min 44px hit area)
  - Stack strength indicator label and value on small screens
  - Generous padding on interactive elements (min 44px height for buttons/checkboxes)
