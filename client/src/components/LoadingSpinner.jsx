export default function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  }

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-[var(--color-border)] border-t-[var(--color-accent)]`}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-bg)]">
        {spinner}
      </div>
    )
  }

  return <div className="flex justify-center py-12">{spinner}</div>
}
