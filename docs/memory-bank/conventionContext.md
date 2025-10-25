# Convention Context

## File Naming

- **lowercase**: icons, pages, providers, global functions
- **PascalCase**: components , hooks, services only

## Examples

- `icon.tsx` (lowercase)
- `page.tsx` (lowercase)
- `provider.tsx` (lowercase)
- `MainEditor.tsx` (PascalCase component)
- `authApi.ts` (PascalCase service)
- `useVocabularyQueries.tsx` (PascalCase hook)

### 📁 Folder & File Structure

- **Component-driven architecture**: Organized for landing page clone with clear separation:
  - `/src/components/` - Reusable UI blocks (Header, Hero, Section, Footer, etc.)
  - `/src/sections/` - Page-specific landing page sections
  - `/src/styles/` - Global theme tokens, variables, and design system
  - `/src/lib/` - Global utilities and helpers
  - `/src/hooks/` - Global hooks for landing page interactions
  - `/docs/memory-bank/` - Project memory and reasoning space

**Landing page structure:**

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── sections/
│   └── LandingPage.tsx
├── styles/
│   ├── globals.scss
│   └── variables.scss
└── lib/
    └── utils.ts
```

- **Conventions follow lightweight component-driven approach** (Next.js / React style)

### 🎨 Landing Page Component Pattern

- **Static content**: No API calls required for landing page clone
- **Component composition**: Build landing page from reusable UI blocks
- **Design system**: Consistent styling with Tailwind CSS and design tokens
- **Responsive behavior**: Mobile-first approach with breakpoint-specific layouts

**Example landing page structure:**

```typescript
// src/sections/LandingPage.tsx
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
```

**Example component with design tokens:**

```typescript
// src/components/Hero.tsx
export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Domain Investment Made Simple
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Invest in premium domains with confidence using our data-driven platform.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Get Started
        </Button>
      </div>
    </section>
  );
}
```

### 🏪 State Management

- **Local state**: React hooks for component-level interactions
- **No global state required**: Landing page is primarily static content
- **Animation state**: Framer Motion for smooth transitions and micro-interactions
- **Form state**: React Hook Form for any contact or signup forms

**Example component with local state:**

```typescript
// src/components/Hero.tsx
export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    >
      {/* Hero content */}
    </motion.section>
  );
}
```

### 🎨 Component & UI Convention

- **Shadcn/ui**: Component library with consistent styling
- **Class Variance Authority (CVA)**: For component variants (see `button.tsx`)
- **Radix UI**: Underlying primitives for accessibility
- **Component structure**:
  - Props interfaces with TypeScript
  - Forward refs for DOM elements
  - Consistent className merging with `cn()` utility
- **Feature components**: Organized in `/src/components/feature/` for complex features
- **Plate Editor**: Rich text editor with extensive plugin system

**Example component with CVA:**

```typescript
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 📝 Naming & Code Style

- **File naming**:
  - Components: `PascalCase.tsx` (e.g., `MainEditor.tsx`)
  - Hooks: `camelCase.ts` (e.g., `useVocabularyQueries.tsx`)
  - Services: `camelCase.ts` (e.g., `authApi.ts`)
  - Pages: `page.tsx` (Next.js convention)
- **Function naming**: camelCase for functions, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE for route names and enums
- **TypeScript**: Strict typing with interfaces and type definitions
- **Path aliases**: `@/` for src directory imports

**Example naming patterns:**

```typescript
// File: src/feature/vocabulary/components/VocabularyCard.tsx
export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  // Component function: PascalCase
}

// File: src/feature/vocabulary/hooks/useVocabularyQueries.tsx
export const useVocabularies = (params: VocabularyQueryParams) => {
  // Hook function: camelCase starting with 'use'
};

// File: src/constraints/route-name.ts
export enum RouteNames {
  HOME = "/home",
  VOCABULARY = "/lesson/vocabulary",
  VOCABULARY_CREATE = "/lesson/vocabulary/create",
}
```

### 🛠️ Development Tools & Configuration

- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling with custom design system
- **ESLint**: Code linting with Next.js and Tailwind plugins
- **TypeScript**: Strict mode with path mapping
- **Swagger integration**: Auto-generated API types from OpenAPI spec
- **Conventional Commits**: Scoped commits (ui, logic)

### 🧪 Testing & Utilities

- **Utility functions**: Centralized in `/src/lib/` and `/src/hooks/`
- **Custom hooks**: Reusable logic (e.g., `useDebounce`, `useMediaQuery`)
- **Error handling**: Global `handleApiError` utility
- **File handling**: Upload utilities with UploadThing integration

### 🎯 Project-Specific Patterns

- **Route management**: Centralized route names in `route-name.ts` enum
- **Authentication**: JWT-based with refresh token handling
- **File uploads**: UploadThing integration for file management
- **AI integration**: Multiple AI services (OpenAI, Deepgram, etc.)
- **Rich text editing**: Plate editor with extensive plugin ecosystem
- **Internationalization**: next-i18next for multi-language support
