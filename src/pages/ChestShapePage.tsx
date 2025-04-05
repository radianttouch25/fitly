import { UserData } from '../App'

interface ChestShapePageProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onBack: () => void
}

const ChestShapePage = ({ userData, updateUserData, onNext, onBack }: ChestShapePageProps) => {
  const handleSelectChest = (shape: 'slimmer' | 'average' | 'broader') => {
    updateUserData({ chestShape: shape })
  }

  return (
    <div className="container">
      <h2>Select your chest shape</h2>
      
      <div className="option-container">
        <div 
          className={`option-item ${userData.chestShape === 'slimmer' ? 'selected' : ''}`}
          onClick={() => handleSelectChest('slimmer')}
        >
          {/* Professional human silhouette for slimmer chest */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M46,30 L46,35 L54,35 L54,30" fill="currentColor" />
            
            {/* Shoulders - slimmer */}
            <path d="M46,35 L30,45 M54,35 L70,45" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <path d="M30,45 L28,80 M70,45 L72,80" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Torso - slimmer chest */}
            <path d="M46,35 L40,60 L40,90 L60,90 L60,60 L54,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Chest line - slimmer */}
            <path d="M40,50 Q50,48 60,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Slimmer</span>
        </div>

        <div 
          className={`option-item ${userData.chestShape === 'average' ? 'selected' : ''}`}
          onClick={() => handleSelectChest('average')}
        >
          {/* Professional human silhouette for average chest */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M46,30 L46,35 L54,35 L54,30" fill="currentColor" />
            
            {/* Shoulders - average */}
            <path d="M46,35 L27,47 M54,35 L73,47" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <path d="M27,47 L25,85 M73,47 L75,85" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Torso - average chest */}
            <path d="M46,35 L35,60 L35,95 L65,95 L65,60 L54,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Chest line - average */}
            <path d="M35,50 Q50,44 65,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Average</span>
        </div>

        <div 
          className={`option-item ${userData.chestShape === 'broader' ? 'selected' : ''}`}
          onClick={() => handleSelectChest('broader')}
        >
          {/* Professional human silhouette for broader chest */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M45,30 L45,35 L55,35 L55,30" fill="currentColor" />
            
            {/* Shoulders - broader */}
            <path d="M45,35 L25,48 M55,35 L75,48" stroke="currentColor" strokeWidth="3" fill="none" />
            
            {/* Arms */}
            <path d="M25,48 L23,85 M75,48 L77,85" stroke="currentColor" strokeWidth="3" fill="none" />
            
            {/* Torso - broader chest */}
            <path d="M45,35 L30,62 L32,95 L68,95 L70,62 L55,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Chest line - broader */}
            <path d="M30,50 Q50,40 70,50" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span>Broader</span>
        </div>
      </div>
      
      <div className="navigation">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default ChestShapePage