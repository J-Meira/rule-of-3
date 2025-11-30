# Rule of 3 - Copilot Instructions

## Tech Stack
- React 19
- @j-meira/mui-theme v2.0.x
- MUI Core v7
- TypeScript
- Vite 7
- pnpm

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

## Migration Context

This project is migrating from:
- mui-theme v1 → v2
- React 18 → React 19
- MUI v6 → MUI v7
- Vite 6 → Vite 7

Key breaking changes:
- Grid props changed to `size` prop
- React 19 stricter prop validation
- No invalid DOM props on native elements

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