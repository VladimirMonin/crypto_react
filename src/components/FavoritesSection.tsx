import { useState, useEffect } from 'react'
import { getFavoriteIds } from '../utils/favorites'
import { getCoinsByIds } from '../utils/cryptoApi'
import type { CryptoCoin } from '../utils/cryptoApi'
import CoinCard from './CoinCard'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorBanner from './ui/ErrorBanner'
import './FavoritesSection.css'

export default function FavoritesSection() {
  const [favoriteCoins, setFavoriteCoins] = useState<CryptoCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favoritesCount, setFavoritesCount] = useState(0)

  const loadFavoriteCoins = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const favoriteIds = getFavoriteIds()
      setFavoritesCount(favoriteIds.length)
      
      if (favoriteIds.length === 0) {
        setFavoriteCoins([])
        return
      }

      // Получаем актуальные данные о избранных монетах
      const coins = await getCoinsByIds(favoriteIds.join(','))
      setFavoriteCoins(coins)
    } catch (err) {
      setError('Ошибка при загрузке избранных монет')
      console.error('Ошибка при загрузке избранного:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavoriteCoins()
  }, [])

  useEffect(() => {
    const handleFavoritesChange = () => {
      loadFavoriteCoins()
    }

    window.addEventListener('favoritesChanged', handleFavoritesChange)
    return () => window.removeEventListener('favoritesChanged', handleFavoritesChange)
  }, [])

  if (loading) {
    return (
      <div className="favorites-section">
        <div className="favorites-loading">
          <LoadingSpinner />
          <p>Загрузка избранных монет...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="favorites-section">
        <ErrorBanner 
          message={error} 
          onClose={() => setError(null)}
        />
      </div>
    )
  }

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2>❤️ Избранные криптовалюты</h2>
        <div className="favorites-stats">
          <span className="favorites-count">
            {favoritesCount} {favoritesCount === 1 ? 'монета' : favoritesCount < 5 ? 'монеты' : 'монет'}
          </span>
        </div>
      </div>

      {favoriteCoins.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-favorites-icon">💔</div>
          <h3>Избранных монет пока нет</h3>
          <p>
            Добавьте криптовалюты в избранное, нажимая на иконку ❤️ в карточках монет.
            Избранные монеты будут сохранены в вашем браузере и останутся доступными 
            при следующем посещении.
          </p>
          <div className="favorites-tips">
            <h4>💡 Советы:</h4>
            <ul>
              <li>Используйте поиск для нахождения интересных монет</li>
              <li>Изучайте трендовые криптовалюты</li>
              <li>Добавляйте монеты для отслеживания их динамики</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  )
}
