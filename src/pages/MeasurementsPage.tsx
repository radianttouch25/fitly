import { useState, useEffect } from 'react'
import { UserData } from '../App'
import { convertHeight, convertWeight } from '../utils/unitConversions'

interface MeasurementsPageProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
}

const MeasurementsPage = ({ userData, updateUserData, onNext }: MeasurementsPageProps) => {
  const [heightValue, setHeightValue] = useState('')
  const [weightValue, setWeightValue] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  // Handle height unit toggle
  const toggleHeightUnit = () => {
    const currentHeight = parseFloat(heightValue) || 0
    const newUnit = userData.heightUnit === 'cm' ? 'in' : 'cm'
    const convertedHeight = convertHeight(currentHeight, userData.heightUnit, newUnit)

    // Only set a value if there was an input value
    if (heightValue !== '') {
      setHeightValue(convertedHeight.toFixed(1))
      updateUserData({
        heightUnit: newUnit,
        height: convertedHeight
      })
    } else {
      updateUserData({
        heightUnit: newUnit
      })
    }
  }

  // Handle weight unit toggle
  const toggleWeightUnit = () => {
    const currentWeight = parseFloat(weightValue) || 0
    const newUnit = userData.weightUnit === 'kg' ? 'lbs' : 'kg'
    const convertedWeight = convertWeight(currentWeight, userData.weightUnit, newUnit)

    // Only set a value if there was an input value
    if (weightValue !== '') {
      setWeightValue(convertedWeight.toFixed(1))
      updateUserData({
        weightUnit: newUnit,
        weight: convertedWeight
      })
    } else {
      updateUserData({
        weightUnit: newUnit
      })
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    const height = parseFloat(heightValue) || 0
    const weight = parseFloat(weightValue) || 0

    // Only proceed if both values are valid
    if (height > 0 && weight > 0) {
      updateUserData({ height, weight })
      onNext()
    }
  }

  // Validate form
  useEffect(() => {
    const height = parseFloat(heightValue) || 0
    const weight = parseFloat(weightValue) || 0

    if (height > 0 && weight > 0) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [heightValue, weightValue])

  return (
    <div className="container">
      <h2>Enter your measurements</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        style={{ width: '100%' }}
      >
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="input-with-units">
            <input
              id="height"
              type="number"
              step="0.1"
              min="0"
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              placeholder={`Enter height in ${userData.heightUnit}`}
              inputMode="decimal"
            />
            <div className="unit-toggle">
              <button
                type="button"
                onClick={toggleHeightUnit}
                className={userData.heightUnit === 'cm' ? 'active' : ''}
              >
                cm
              </button>
              <button
                type="button"
                onClick={toggleHeightUnit}
                className={userData.heightUnit === 'in' ? 'active' : ''}
              >
                in
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <div className="input-with-units">
            <input
              id="weight"
              type="number"
              step="0.1"
              min="0"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              placeholder={`Enter weight in ${userData.weightUnit}`}
              inputMode="decimal"
            />
            <div className="unit-toggle">
              <button
                type="button"
                onClick={toggleWeightUnit}
                className={userData.weightUnit === 'kg' ? 'active' : ''}
              >
                kg
              </button>
              <button
                type="button"
                onClick={toggleWeightUnit}
                className={userData.weightUnit === 'lbs' ? 'active' : ''}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        <div className="navigation">
          <div></div> {/* Empty div for spacing */}
          <button
            type="submit"
            disabled={!isFormValid}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default MeasurementsPage