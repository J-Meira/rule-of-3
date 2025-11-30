# Rule of 3 - Copilot Instructions

## Project Overview

Simple Rule of 3 calculator built with React. A Progressive Web App (PWA) that helps users perform quick rule of three calculations with history tracking and multi-language support.

## Tech Stack

- React 19.2.0
- @j-meira/mui-theme v1.9.x
- MUI Core v7.3.5
- TypeScript 5.7.x
- Vite 6
- Redux Toolkit
- Formik + Yup
- Day.js
- pnpm

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header/       # App header with settings
│   ├── Footer/       # App footer
│   ├── Loading/      # Loading overlay
│   ├── PopUps/       # Settings popup
│   └── PWABadge/     # PWA update notification
├── redux/            # Redux store and slices
│   └── slices/       # Operations & System state
├── enums/            # Language and dictionary enums
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── scss/             # Global styles
```

## Coding Standards

### 1. Grid Components

Always use `size` prop for Grid instead of xs/md/lg:

```tsx
// ✅ Correct
<Grid size={{ xs: 12, md: 6 }}>Content</Grid>
<Grid size={12}>Full width</Grid>

// ❌ Wrong
<Grid xs={12} md={6}>Content</Grid>
```

### 2. Variable Declarations

Prefer `const` over `let` when possible:

```tsx
// ✅ Good
const value = getData();
const items = [1, 2, 3];

// ❌ Avoid
let value = getData();
```

### 3. Control Flow

No `else` statements - use early returns or ternary:

```tsx
// ✅ Good
if (error) return null;
return <Component />;

// Or
return error ? null : <Component />;

// ❌ Avoid
if (error) {
  return null;
} else {
  return <Component />;
}
```

### 4. Comments

Do NOT add comments during refactoring unless absolutely necessary:

- Keep only critical JSDoc comments
- Remove explanatory comments for self-evident code
- Let the code speak for itself

### 5. Memory Optimization

Apply performance optimizations:

- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed as props
- Use `React.memo` for pure components
- Always add `displayName` to components wrapped with `React.memo`

```tsx
// ✅ Good
export const MyComponent = memo(() => {
  // component code
});

MyComponent.displayName = 'MyComponent';
```

### 6. Component Imports

Import Grid from @mui/material (not Grid2):

```tsx
// ✅ Correct
import { Grid } from '@mui/material';

// ❌ Wrong - Grid2 doesn't exist in MUI v7
import { Grid2 } from '@mui/material';
```

## Available Components from @j-meira/mui-theme

### Buttons

- Button (all variants: contained, outlined, text)

### Data Display

- DataTable and related components

### Input Components

- InputBasic
- InputCheckBox
- InputCurrency
- InputPassword
- InputPhone
- InputRadio
- InputSearch
- InputSelect

### Date/Time

- DatePicker

### Other Components

- FileUpload
- SearchGeneric
- SearchRequest
- MultiProvider
- Header
- SideBar
- Dialog
- PopUp

### Hooks

- useCookies
- useToast
- useDebounce
- And more...

## MUI Components

Can also use MUI components directly following MUI v7 API:

- All @mui/material components
- All @mui/x-date-pickers components
- Follow [MUI v7 documentation](https://mui.com/material-ui/)

**Important**: Use `Grid` not `Grid2` - In MUI v7, Grid2 became the default Grid component.

## Architecture Notes

### State Management

- Redux Toolkit for global state
- `OperationsReducer`: Manages calculation history
- `SystemReducer`: Manages UI state (loading, language)
- Local storage persistence for history and language preference

### Internationalization

- Multi-language support (EN, PT-BR, ES)
- Dictionary-based translations
- Language preference stored in localStorage

### PWA Features

- Service worker for offline functionality
- Auto-update mechanism with periodic sync
- Installable as standalone app
- Custom PWA badge for update notifications

## Development Guidelines

### When Adding New Features:

1. Keep components small and focused
2. Use TypeScript for all new code
3. Follow existing patterns for Redux actions/reducers
4. Add translations to dictionary for new text
5. Maintain PWA compatibility

### When Modifying Styles:

- Use SCSS modules in `src/scss/`
- Follow existing naming conventions
- Maintain responsive design patterns
- Test dark mode compatibility

### When Working with Forms:

- Use Formik for form state
- Use Yup for validation schemas
- Use Input components from mui-theme
- Follow existing patterns in Main.tsx

## Quick Commands

```bash
# Development
pnpm dev

# Testing
pnpm test
pnpm tsc --noEmit

# Build
pnpm build
pnpm preview
```
