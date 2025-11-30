# MUI-Theme v2 Migration TODO List

This checklist provides a complete roadmap for migrating rule-of-3 to mui-theme v2. Work through each phase systematically, checking off items as you complete them.

Related: [Issue #11 - Migration Task](https://github.com/J-Meira/rule-of-3/issues/11)

---

## Phase 1: Dependency Analysis & Updates

- [ ] **1.1** Check current versions in `package.json`
  ```bash
  cat package.json | grep -E "react|@mui|vite|@j-meira"
  ```

- [ ] **1.2** Update core dependencies
  ```bash
  pnpm update @j-meira/mui-theme@^2.0.0
  pnpm add react@^19.0.0 react-dom@^19.0.0
  pnpm add @mui/material@^7.3.5 @emotion/react@^11.11.0 @emotion/styled@^11.11.0
  ```

- [ ] **1.3** Update MUI X packages (if used)
  ```bash
  pnpm add @mui/x-date-pickers@^8.19.0
  ```

- [ ] **1.4** Update Vite to v7
  ```bash
  pnpm add -D vite@^7.0.0 @vitejs/plugin-react@^4.3.0
  ```

- [ ] **1.5** Update testing libraries
  ```bash
  pnpm add -D @testing-library/react@^16.1.0 @testing-library/jest-dom@^6.0.0
  ```

- [ ] **1.6** Update TypeScript (if needed)
  ```bash
  pnpm add -D typescript@^5.7.0
  ```

---

## Phase 2: Code Migration

### Grid Component Updates

- [ ] **2.1** Find all Grid component usages
  ```bash
  grep -r "Grid " src/ --include="*.tsx" --include="*.ts"
  ```

- [ ] **2.2** Replace Grid props pattern:
  ```typescript
  // ❌ Old (v1)
  <Grid xs={12} md={6} lg={4}>
  
  // ✅ New (v2)
  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
  
  // ✅ Single size
  <Grid size={12}>
  ```

- [ ] **2.3** Update Grid container/item props (if used):
  ```typescript
  // ❌ Old
  <Grid container spacing={2}>
    <Grid item xs={12}>
  
  // ✅ New
  <Grid container spacing={2}>
    <Grid size={12}>
  ```

### React 19 Prop Cleanup

- [ ] **2.4** Find invalid DOM props
  ```bash
  grep -r "action=" src/ --include="*.tsx" | grep "<input"
  grep -r "searchChange=" src/ --include="*.tsx"
  ```

- [ ] **2.5** Remove/fix invalid props:
  ```typescript
  // ❌ Invalid
  <input action="/submit" searchChange={handler} />
  
  // ✅ Valid
  <form action="/submit">
    <input onChange={handler} />
  </form>
  ```

- [ ] **2.6** Check for deprecated React APIs:
  - Remove `React.FC` usage (prefer explicit typing)
  - Update `useEffect` cleanup functions
  - Check for legacy context API usage

### DatePicker Updates

- [ ] **2.7** Find all DatePicker usages
  ```bash
  grep -r "DatePicker" src/ --include="*.tsx"
  ```

- [ ] **2.8** Verify DatePicker implementations still work
  - No API changes in wrapper, but test functionality
  - Check date formatting with Day.js integration
  - Verify form integration (Formik compatibility)

### Form Components

- [ ] **2.9** Review all Input component usages:
  - InputBasic
  - InputCheckBox
  - InputCurrency
  - InputPassword
  - InputPhone
  - InputRadio
  - InputSearch
  - InputSelect

- [ ] **2.10** Verify Formik integration:
  - Check form validation still works
  - Test error message display
  - Verify onChange handlers

---

## Phase 3: Configuration Updates

### Vite Configuration

- [ ] **3.1** Update `vite.config.ts`:
  ```typescript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
    build: {
      // Vite 7 optimizations
      target: 'esnext',
      minify: 'esbuild',
    },
  });
  ```

- [ ] **3.2** Update `tsconfig.json` for React 19:
  ```json
  {
    "compilerOptions": {
      "jsx": "react-jsx",
      "lib": ["ES2023", "DOM", "DOM.Iterable"],
      "target": "ES2022",
      "module": "ESNext"
    }
  }
  ```

### Jest Configuration

- [ ] **3.3** Update `jest.config.js` (if exists):
  ```javascript
  module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\.tsx?$': ['ts-jest', {
        tsconfig: {
          jsx: 'react-jsx'
        }
      }]
    }
  };
  ```

- [ ] **3.4** Update test setup file for RTL v16

### Docker Configuration

- [ ] **3.5** Update Dockerfile (if exists):
  - Update Node.js version (recommend Node 20+)
  - Update pnpm version
  - Rebuild Docker image

---

## Phase 4: Code Quality Improvements

### Apply New Coding Standards

- [ ] **4.1** Remove `else` statements:
  ```typescript
  // ❌ Bad
  if (condition) {
    return valueA;
  } else {
    return valueB;
  }
  
  // ✅ Good
  if (condition) return valueA;
  return valueB;
  ```

- [ ] **4.2** Replace `let` with `const` where possible:
  ```bash
  # Find potential candidates
  grep -r "let " src/ --include="*.tsx" --include="*.ts"
  ```

- [ ] **4.3** Apply memory optimizations:
  - Add `useMemo` for expensive calculations
  - Add `useCallback` for event handlers passed as props
  - Add `React.memo` for pure components

- [ ] **4.4** Remove unnecessary comments:
  - Keep only essential JSDoc comments
  - Remove explanatory comments for self-evident code

---

## Phase 5: Testing & Verification

### Unit Tests

- [ ] **5.1** Run existing tests:
  ```bash
  pnpm test
  ```

- [ ] **5.2** Fix failing tests related to:
  - Grid prop changes
  - React 19 updates
  - RTL v16 changes

- [ ] **5.3** Update test files for new patterns:
  ```typescript
  // Update imports
  import { render, screen, fireEvent } from '@testing-library/react';
  
  // Use new RTL patterns
  const user = userEvent.setup();
  await user.click(button);
  ```

### Type Checking

- [ ] **5.4** Run TypeScript compiler:
  ```bash
  pnpm tsc --noEmit
  ```

- [ ] **5.5** Fix all type errors:
  - Grid prop types
  - React 19 type changes
  - MUI v7 type updates

### Build Verification

- [ ] **5.6** Test development build:
  ```bash
  pnpm dev
  ```

- [ ] **5.7** Test production build:
  ```bash
  pnpm build
  pnpm preview
  ```

- [ ] **5.8** Check build output:
  - No warnings in console
  - Correct bundle sizes
  - No missing dependencies

### Manual Testing

- [ ] **5.9** Test all pages/routes:
  - Home page
  - Rule of 3 calculator functionality
  - Any settings/configuration pages

- [ ] **5.10** Test all components:
  - Forms and inputs
  - Buttons and interactions
  - Date pickers (if used)
  - Responsive behavior

- [ ] **5.11** Test browser compatibility:
  - Chrome/Edge
  - Firefox
  - Safari

---

## Phase 6: Documentation & Deployment

### Documentation Updates

- [ ] **6.1** Verify `.github/copilot-instructions.md` is up to date

- [ ] **6.2** Update README.md:
  - Update dependencies versions
  - Update installation instructions
  - Update development commands

- [ ] **6.3** Update CHANGELOG.md:
  - Document breaking changes
  - List new features from mui-theme v2
  - Migration notes

### Version Control

- [ ] **6.4** Review all changes in migration branch

- [ ] **6.5** Commit changes with clear messages:
  - Dependencies update
  - Grid migrations
  - Code quality improvements
  - Test updates

- [ ] **6.6** Create pull request with detailed description

### Deployment Preparation

- [ ] **6.7** Update deployment configuration:
  - CI/CD pipeline updates
  - Environment variables check
  - Build script updates

- [ ] **6.8** Test in staging environment

- [ ] **6.9** Performance testing:
  - Lighthouse audit
  - Bundle size comparison
  - Load time metrics

- [ ] **6.10** Final production deployment

---

## Quick Reference Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm tsc --noEmit

# Build for production
pnpm build

# Preview production build
pnpm preview

# Find Grid components
grep -r "Grid " src/ --include="*.tsx"

# Find DatePicker usage
grep -r "DatePicker" src/ --include="*.tsx"

# Find let declarations
grep -r "let " src/ --include="*.ts" --include="*.tsx"

# Find else statements
grep -r " else " src/ --include="*.ts" --include="*.tsx"
```

---

## Definition of Done

- [ ] All dependencies updated to latest compatible versions
- [ ] All Grid components use `size` prop
- [ ] No `else` statements in codebase
- [ ] `const` used instead of `let` where possible
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Manual testing complete
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Performance metrics acceptable
- [ ] Ready for production deployment

---

## Additional Resources

- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/migration-v6/)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Vite 7 Release Notes](https://vitejs.dev/blog/announcing-vite7)
- [@j-meira/mui-theme Documentation](https://github.com/J-Meira/mui-theme)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Issue #11 - Migration Task](https://github.com/J-Meira/rule-of-3/issues/11)