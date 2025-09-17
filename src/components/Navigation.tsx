import './Navigation.css'

export type TabType = 'market' | 'trending' | 'search' | 'favorites'

interface NavigationProps {
  currentTab: TabType
  onTabChange: (tab: TabType) => void
  showSearchTab: boolean
}

export default function Navigation({ currentTab, onTabChange, showSearchTab }: NavigationProps) {
  return (
    <nav className="tabs">
      <button
        className={`tab ${currentTab === 'market' ? 'active' : ''}`}
        onClick={() => onTabChange('market')}
      >
        📈 Рынок
      </button>
      <button
        className={`tab ${currentTab === 'trending' ? 'active' : ''}`}
        onClick={() => onTabChange('trending')}
      >
        🔥 Тренды
      </button>
      <button
        className={`tab ${currentTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        ⭐ Избранное
      </button>
      {showSearchTab && (
        <button
          className={`tab ${currentTab === 'search' ? 'active' : ''}`}
          onClick={() => onTabChange('search')}
        >
          🔍 Поиск
        </button>
      )}
    </nav>
  )
}
