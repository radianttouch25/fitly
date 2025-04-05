import { useState } from 'react'
import { UserData } from '../App'

interface FitPreferencePageProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onBack: () => void
}

const FitPreferencePage = ({ userData, updateUserData, onNext, onBack }: FitPreferencePageProps) => {
  const [fitPreference, setFitPreference] = useState(userData.fitPreference)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserData({ fitPreference })
    onNext()
  }

  return (
    <div className="container">
      <h2>How do you like your t-shirts to fit?</h2>

      <form onSubmit={handleSubmit}>
        <div className="slider-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={fitPreference}
            onChange={(e) => setFitPreference(parseInt(e.target.value))}
            className="slider"
            style={{ width: '100%', height: '20px', margin: '3rem 0 2.5rem', cursor: 'pointer' }}
          />
          <div className="slider-labels" style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0'
          }}>
            <div style={{ width: '18%', textAlign: 'center' }}>
              <span style={{
                fontWeight: '500',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, rgba(11, 83, 95, 1) 0%, rgba(8, 65, 75, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>Very Tight</span>
            </div>
            <div className="mobile-hidden" style={{ width: '16%', textAlign: 'center' }}>
              <span style={{
                fontWeight: '500',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, rgba(11, 83, 95, 1) 0%, rgba(8, 65, 75, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>Slim</span>
            </div>
            <div className="mobile-hidden" style={{ width: '16%', textAlign: 'center' }}>
              <span style={{
                fontWeight: '500',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, rgba(11, 83, 95, 1) 0%, rgba(8, 65, 75, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>Regular</span>
            </div>
            <div className="mobile-hidden" style={{ width: '16%', textAlign: 'center' }}>
              <span style={{
                fontWeight: '500',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, rgba(11, 83, 95, 1) 0%, rgba(8, 65, 75, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>Relaxed</span>
            </div>
            <div style={{ width: '18%', textAlign: 'center' }}>
              <span style={{
                fontWeight: '500',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, rgba(11, 83, 95, 1) 0%, rgba(8, 65, 75, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>Very Loose</span>
            </div>
          </div>
        </div>

        <div className="navigation" style={{ gap: '3rem', marginTop: '3rem' }}>
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  )
}

export default FitPreferencePage