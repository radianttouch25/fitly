import { useState, useEffect } from 'react'
import { UserData } from '../App'

interface AgePageProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onBack: () => void
}

const AgePage = ({ userData, updateUserData, onNext, onBack }: AgePageProps) => {
  const [ageValue, setAgeValue] = useState('')
  const [age, setAge] = useState(userData.age)

  useEffect(() => {
    // Update the age state when ageValue changes
    const parsedAge = parseInt(ageValue) || 0
    setAge(parsedAge)
  }, [ageValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserData({ age })
    onNext()
  }

  return (
    <div className="container">
      <h2>What is your age?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            min="1"
            max="120"
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            placeholder="Enter your age"
          />
        </div>
        
        <div className="navigation">
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit" disabled={age <= 0}>Next</button>
        </div>
      </form>
    </div>
  )
}

export default AgePage