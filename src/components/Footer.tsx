import './Footer.css'

interface FooterProps {
  onRefresh: () => void
}

export default function Footer({ onRefresh }: FooterProps) {
  return (
    <footer className="footer">
      <p>Данные предоставлены CoinGecko API</p>
      <button onClick={onRefresh} className="refresh-button">
        🔄 Обновить данные
      </button>
    </footer>
  )
}
