interface ErrorBannerProps {
  message: string
  onClose: () => void
}

export default function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  return (
    <div className="error-banner">
      <span>{message}</span>
      <button onClick={onClose} className="error-close">✕</button>
    </div>
  )
}
