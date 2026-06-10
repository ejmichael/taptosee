import { cn } from '../utils/cn.js'

const base = [
  'inline-flex items-center justify-center gap-2 font-medium select-none',
  'rounded-[var(--radius-md)] transition-all duration-150',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
  'active:scale-[0.98]',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ')

const variants = {
  primary: [
    'bg-[var(--color-accent)] text-white',
    'hover:bg-[var(--color-accent-hover)] hover:-translate-y-px',
    'hover:shadow-[0_2px_8px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-surface-raised)] text-[var(--color-text)]',
    'border border-[var(--color-border)]',
    'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)]',
  ].join(' '),

  ghost: [
    'text-[var(--color-muted)]',
    'hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]',
  ].join(' '),

  outline: [
    'border border-[var(--color-border)] bg-transparent text-[var(--color-text)]',
    'hover:bg-[var(--color-surface-raised)] hover:border-[var(--color-border-strong)]',
  ].join(' '),

  danger: [
    'bg-[var(--color-destructive)] text-white',
    'hover:bg-red-700 hover:-translate-y-px',
  ].join(' '),

  'danger-outline': [
    'border border-[var(--color-destructive-border)] text-[var(--color-destructive)] bg-transparent',
    'hover:bg-[var(--color-destructive-muted)]',
  ].join(' '),
}

const sizes = {
  xs: 'h-7  px-2.5 text-xs  gap-1',
  sm: 'h-8  px-3   text-sm  gap-1.5',
  md: 'h-10 px-4   text-sm  gap-2',
  lg: 'h-12 px-6   text-base gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
