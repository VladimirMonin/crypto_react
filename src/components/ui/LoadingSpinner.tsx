interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message = 'Загружаем данные...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  )
}
