# MUI-Theme v2 Migration Guide (rule-of-3 Project)

## Breaking Changes Summary

### 1. MUI Core v7 Upgrade
- **Grid v2 is now default**: `xs`, `md`, `lg`, `xl` props → `size` prop
- **Date Pickers v8.19.0**: Internal API changes
- **Theme API updates**: Minor prop changes

### 2. React 19 Compatibility
- **Stricter prop validation**: Invalid DOM props cause warnings
- **Enhanced TypeScript types**: Better type inference
- **Removed legacy APIs**: Some deprecated features removed

### 3. Vite 7
- **New plugin system**: Updated configuration syntax
- **Performance improvements**: Faster builds
- **Dependency updates**: All Vite plugins need updates

### 4. Testing Updates
- **React Testing Library v16**: New rendering patterns
- **Jest v29+**: Updated matchers and configuration

---

## Migration Steps

### Step 1: Update Dependencies

```bash
# Update mui-theme
pnpm update @j-meira/mui-theme@latest

# Update peer dependencies
pnpm add react@^19.0.0 react-dom@^19.0.0

# Update MUI packages (if using directly)
pnpm add @mui/material@^7.3.5 @mui/x-date-pickers@^8.19.0

# Update Vite
pnpm add -D vite@^7.0.0 @vitejs/plugin-react@^4.3.0

# Update TypeScript
pnpm add -D typescript@^5.7.0
```

### Step 2: Fix MUI Grid Props

Replace old Grid props with new `size` prop:

```typescript
// ❌ Before (v1)
<Grid xs={12} md={6} lg={4}>
  <Component />
</Grid>

// ✅ After (v2)
<Grid size={{ xs: 12, md: 6, lg: 4 }}>
  <Component />
</Grid>

// Or use single size for all breakpoints
<Grid size={12}>
  <Component />
</Grid>
```

### Step 3: Update DatePicker Usage

```typescript
// The DatePicker component API remains the same
// but internal MUI changes may affect custom implementations
import { DatePicker } from '@j-meira/mui-theme';

// ✅ Still works
<DatePicker
  label="Select Date"
  value={date}
  onChange={handleChange}
/>
```

### Step 4: Remove Invalid Props

```typescript
// ❌ Before (causes React 19 warnings)
<input action="/submit" searchChange={handler} />

// ✅ After
<form action="/submit">
  <input onChange={handler} />
</form>
```

### Step 5: Update Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
});
```

### Step 6: Update TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "target": "ES2022",
    "module": "ESNext"
  }
}
```

### Step 7: Run Tests

```bash
# Verify everything works
pnpm test

# Check for type errors
pnpm tsc --noEmit

# Build to ensure no runtime errors
pnpm build
```

---

## Component-Specific Changes

### No Breaking Changes:
- ✅ Button (all variants)
- ✅ DataTable (all components)
- ✅ Input components (Basic, CheckBox, Currency, etc.)
- ✅ Hooks (useCookies, useToast, useDebounce, etc.)
- ✅ MultiProvider
- ✅ Dialog, PopUp, Header, SideBar, etc.

### Internal Updates Only:
- DatePicker: Updated to MUI v8 pickers (API unchanged)
- SearchGeneric/SearchRequest: Code optimizations (no API changes)

---

## Common Migration Issues

### Issue 1: Grid Props Not Working

**Symptom**: TypeScript errors on Grid components

**Solution**:
```typescript
// Change from
<Grid xs={12} md={6} />

// To
<Grid size={{ xs: 12, md: 6 }} />
```

### Issue 2: React 19 Warnings

**Symptom**: Console warnings about invalid props

**Solution**: Remove non-standard DOM props from native elements

### Issue 3: Build Failures

**Symptom**: Vite build errors

**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules .pnpm-store
pnpm install
```

### Issue 4: Test Failures

**Symptom**: Tests fail after React 19 update

**Solution**: Update test utilities and mocks for new React behavior

---

## Support Resources

- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/migration-v6/)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Vite 7 Release Notes](https://vitejs.dev/blog/announcing-vite7)
- [@j-meira/mui-theme Documentation](https://github.com/J-Meira/mui-theme)
- [Issue #11 - Migration TODO List](https://github.com/J-Meira/rule-of-3/issues/11)

---

## Next Steps

1. Review the [Migration TODO List](./MIGRATION_TODO.md)
2. Follow the checklist in [Issue #11](https://github.com/J-Meira/rule-of-3/issues/11)
3. Test thoroughly in development before deploying
4. Update documentation as you go
