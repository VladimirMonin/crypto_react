import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  onSearch: (query: string) => void
  searchLoading: boolean
}

export default function Header({ onSearch, searchLoading }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="crypto-icon">₿</span>
          CryptoTracker
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск криптовалют..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button 
            onClick={handleSearch}
            disabled={searchLoading}
            className="search-button"
          >
            {searchLoading ? '...' : '🔍'}
          </button>
        </div>
      </div>
    </header>
  )
}
