# Form Component Variants System

This document describes the variant system for form components.

## Design Principles

1. **Component-Specific Variants** — Each component defines variants tailored to its purpose
2. **Prop-Based Selection** — Variants selected through component props
3. **Style Override Support** — `className` prop allows users to customize styles
4. **Independent Logic** — Each component manages its own variants

## Components

### Input

**Variants:**
- `bordered` — Full border around input
- `borderless` — Bottom border only

**Props:**
```typescript
interface InputProps {
  variant?: 'bordered' | 'borderless';
  error?: boolean;
  errorText?: string;
  helperText?: string;
  icon?: ReactNode;
  onClear?: () => void;
  className?: string;
}
```

**Usage:**
```tsx
<Input variant="borderless" placeholder="Name" />
<Input variant="bordered" error={true} errorText="Required field" />
<Input variant="bordered" className="border-blue-500" />
```

### Checkbox

**Variants:**
- `square` — Standard square checkbox

**States:**
- Normal (unchecked/checked)
- Hover
- Disabled

**Props:**
```typescript
interface CheckboxProps {
  variant?: 'square';
  label?: string;
  subtitle?: string;
  detail?: ReactNode;
  indeterminate?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
<Checkbox label="Accept terms" />
<Checkbox label="Remember me" detail={<InfoIcon />} />
<Checkbox label="Disabled" disabled={true} />
```

### CheckCircles

**Variants:**
- `circle` — Circular checkbox variant

**Same states and props as Checkbox**

**Usage:**
```tsx
<CheckCircles label="Option A" />
<CheckCircles label="Option B" subtitle="This is optional" />
```

### RadioButton & RadioGroup

**RadioButton Variants:**
- `circle` — Standard circular radio button

**Props:**
```typescript
interface RadioButtonProps {
  variant?: 'circle';
  label?: string;
  subtitle?: string;
  detail?: ReactNode;
  value: string;
  className?: string;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<RadioGroup value={selected} onChange={setSelected}>
  <RadioButton value="option1" label="Option 1" />
  <RadioButton value="option2" label="Option 2" />
  <RadioButton value="option3" label="Option 3" disabled={true} />
</RadioGroup>

// Horizontal layout
<RadioGroup value={selected} onChange={setSelected} orientation="horizontal">
  <RadioButton value="yes" label="Yes" />
  <RadioButton value="no" label="No" />
</RadioGroup>
```

### Switch

**Variants:**
- `toggle` — Standard toggle switch

**States:**
- Normal (ON/OFF)
- Hover
- Disabled

**Props:**
```typescript
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'toggle';
  label?: string;
  subtitle?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
<Switch 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Notifications"
/>

<Switch 
  checked={isDarkMode}
  onChange={setIsDarkMode}
  label="Dark Mode"
  subtitle="Use dark theme"
  icon={<MoonIcon />}
/>

<Switch checked={false} onChange={() => {}} disabled={true} />
```

## Style Overrides

All components support the `className` prop for style overrides:

```tsx
<Input 
  variant="bordered" 
  className="border-2 border-blue-500 focus:border-blue-700"
/>

<Checkbox
  label="Custom styled"
  className="w-6 h-6"
/>
```

## Accessibility

All form components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Disabled state styling
- Error state announcements

## Future Enhancements

- Size variants for inputs and checkboxes
- Additional color variants
- Animation states (hover, focus)
- Validation integration
