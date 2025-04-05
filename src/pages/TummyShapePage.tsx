import { UserData } from '../App'

interface TummyShapePageProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onBack: () => void
}

const TummyShapePage = ({ userData, updateUserData, onNext, onBack }: TummyShapePageProps) => {
  const handleSelectTummy = (shape: 'flat' | 'average' | 'rounder') => {
    updateUserData({ tummyShape: shape })
  }

  return (
    <div className="container">
      <h2>Select your tummy shape</h2>
      
      <div className="option-container">
        <div 
          className={`option-item ${userData.tummyShape === 'flat' ? 'selected' : ''}`}
          onClick={() => handleSelectTummy('flat')}
        >
          {/* Professional human silhouette for flat tummy */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M46,30 L46,35 L54,35 L54,30" fill="currentColor" />
            
            {/* Shoulders */}
            <path d="M46,35 L30,45 M54,35 L70,45" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <path d="M30,45 L28,85 M70,45 L72,85" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Torso - flat tummy profile view */}
            <path d="M40,35 L40,95 M60,35 L60,95" stroke="currentColor" strokeWidth="0.75" fill="none" />
            <path d="M46,35 L35,60 L35,95 L65,95 L65,60 L54,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Flat tummy line */}
            <path d="M35,75 L65,75" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Flat</span>
        </div>

        <div 
          className={`option-item ${userData.tummyShape === 'average' ? 'selected' : ''}`}
          onClick={() => handleSelectTummy('average')}
        >
          {/* Professional human silhouette for average tummy */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M46,30 L46,35 L54,35 L54,30" fill="currentColor" />
            
            {/* Shoulders */}
            <path d="M46,35 L30,45 M54,35 L70,45" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <path d="M30,45 L28,85 M70,45 L72,85" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Torso - average tummy profile view */}
            <path d="M40,35 L40,95 M60,35 L60,95" stroke="currentColor" strokeWidth="0.75" fill="none" />
            <path d="M46,35 L35,60 L35,95 L65,95 L65,60 L54,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Average tummy line - slight curve */}
            <path d="M35,75 Q50,79 65,75" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Average</span>
        </div>

        <div 
          className={`option-item ${userData.tummyShape === 'rounder' ? 'selected' : ''}`}
          onClick={() => handleSelectTummy('rounder')}
        >
          {/* Professional human silhouette for rounder tummy */}
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="20" r="10" fill="currentColor" />
            
            {/* Neck */}
            <path d="M46,30 L46,35 L54,35 L54,30" fill="currentColor" />
            
            {/* Shoulders */}
            <path d="M46,35 L30,45 M54,35 L70,45" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <path d="M30,45 L28,85 M70,45 L72,85" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Torso - rounder tummy with slight expansion */}
            <path d="M40,35 L40,95 M60,35 L60,95" stroke="currentColor" strokeWidth="0.75" fill="none" />
            <path d="M46,35 L33,60 L35,95 L65,95 L67,60 L54,35" 
                  stroke="currentColor" strokeWidth="2" fill="none" />
                  
            {/* Rounder tummy line - more pronounced curve */}
            <path d="M33,75 Q50,85 67,75" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Rounder</span>
        </div>
      </div>
      
      <div className="navigation">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default TummyShapePage