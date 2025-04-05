import { useMemo } from 'react'
import { UserData } from '../App'
import { convertHeight, convertWeight } from '../utils/unitConversions'

interface ResultsPageProps {
  userData: UserData
  onRestart: () => void
  onBack: () => void
}

const ResultsPage = ({ userData, onRestart, onBack }: ResultsPageProps) => {
  const sizeResults = useMemo(() => {
    // Standardize measurements to metric for calculations
    const heightCm = userData.heightUnit === 'cm' ? userData.height : convertHeight(userData.height, 'in', 'cm')
    const weightKg = userData.weightUnit === 'kg' ? userData.weight : convertWeight(userData.weight, 'lbs', 'kg')

    // Calculate BMI as a base sizing factor
    const bmiScore = weightKg / Math.pow(heightCm / 100, 2)

    // Calculate body shape factors
    const tummyFactor = userData.tummyShape === 'flat' ? -1 :
                       userData.tummyShape === 'average' ? 0 : 1

    const chestFactor = userData.chestShape === 'slimmer' ? -1 :
                       userData.chestShape === 'average' ? 0 : 1

    // Age can affect fit preference (younger may prefer tighter fit)
    const ageFactor = userData.age < 25 ? -0.5 :
                     userData.age > 50 ? 0.5 : 0

    // User's fit preference (normalized to -1 to 1 range)
    const fitFactor = (userData.fitPreference - 50) / 50

    // Combine all factors to determine size
    const baseSize = bmiScore + tummyFactor + chestFactor + ageFactor + fitFactor

    // Size thresholds calibrated based on standard clothing size charts and BMI ranges
    // These thresholds are adjusted to account for body shape, age, and fit preference
    const sizeRanges = [
      { size: 'XS', threshold: 18.5 },  // Underweight to normal BMI boundary
      { size: 'S', threshold: 20.5 },   // Lower normal BMI range
      { size: 'M', threshold: 23.5 },   // Middle normal BMI range
      { size: 'L', threshold: 26.5 },   // Upper normal BMI range
      { size: 'XL', threshold: 30 },    // Overweight BMI range
      { size: '2XL', threshold: 35 },   // Class I obesity BMI range
      { size: '3XL', threshold: 40 }    // Class II obesity BMI range
    ]

    // Calculate fit percentages for each size
    return sizeRanges.map(({ size, threshold }, index) => {
      let fitPercentage = 0

      // Calculate how close the user is to the "perfect" fit for this size
      const lowerThreshold = index === 0 ? 0 : sizeRanges[index - 1].threshold
      const upperThreshold = threshold
      const midPoint = (lowerThreshold + upperThreshold) / 2

      if (baseSize <= lowerThreshold) {
        // Too small
        // More gradual decline for smaller sizes (10% per BMI point below threshold)
        fitPercentage = Math.max(0, 100 - (lowerThreshold - baseSize) * 10)
      } else if (baseSize >= upperThreshold) {
        // Too large
        // More gradual decline for larger sizes (10% per BMI point above threshold)
        fitPercentage = Math.max(0, 100 - (baseSize - upperThreshold) * 10)
      } else {
        // Within range - calculate how close to the ideal midpoint
        const distanceFromIdeal = Math.abs(baseSize - midPoint)
        const rangeSize = (upperThreshold - lowerThreshold) / 2
        // Perfect fit at midpoint, declining as you move away (30% reduction at edges)
        fitPercentage = Math.max(0, 100 - (distanceFromIdeal / rangeSize) * 30)
      }

      // Apply body shape adjustments
      // Rounder tummy reduces fit for smaller sizes
      if (tummyFactor === 1) {
        if (['XS', 'S'].includes(size)) fitPercentage -= 15;
        else if (size === 'M') fitPercentage -= 5;
      }
      // Flat tummy reduces fit for larger sizes
      else if (tummyFactor === -1) {
        if (['XL', '2XL', '3XL'].includes(size)) fitPercentage -= 10;
        else if (size === 'L') fitPercentage -= 5;
      }

      // Broader chest reduces fit for smaller sizes
      if (chestFactor === 1) {
        if (['XS', 'S'].includes(size)) fitPercentage -= 20;
        else if (size === 'M') fitPercentage -= 10;
      }
      // Slimmer chest reduces fit for larger sizes
      else if (chestFactor === -1) {
        if (['XL', '2XL', '3XL'].includes(size)) fitPercentage -= 15;
        else if (size === 'L') fitPercentage -= 5;
      }

      // User fit preference adjustment
      // Preference for tight fit reduces larger sizes' fit percentage
      if (fitFactor < -0.3) {
        if (['XL', '2XL', '3XL'].includes(size)) fitPercentage -= 15;
        else if (size === 'L') fitPercentage -= 10;
        else if (size === 'M') fitPercentage -= 5;
      }
      // Preference for loose fit reduces smaller sizes' fit percentage
      else if (fitFactor > 0.3) {
        if (['XS', 'S'].includes(size)) fitPercentage -= 15;
        else if (size === 'M') fitPercentage -= 10;
        else if (size === 'L') fitPercentage -= 5;
      }

      return {
        size,
        fitPercentage: Math.round(Math.min(100, Math.max(0, fitPercentage)))
      }
    }).sort((a, b) => b.fitPercentage - a.fitPercentage)
  }, [userData])

  return (
    <div className="container results-page">
      <h2>Your Perfect Fit</h2>

      <div className="results-container">
        {/* Only display the top two sizes with highest percentages */}
        {sizeResults.slice(0, 2).map((result, index) => (
          <div
            key={result.size}
            className={`result-item ${index === 0 ? 'primary-result' : 'secondary-result'}`}
          >
            <span className="size-label">{result.size}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${result.fitPercentage}%` }}
              ></div>
            </div>
            <span className="percentage">{result.fitPercentage}%</span>
          </div>
        ))}

        <div className="fit-summary">
          <p>Based on your measurements, body shape, age, and fit preference, we recommend size <strong>{sizeResults[0].size}</strong>.</p>

          <div className="measurements-summary">
            <p>Height: {userData.height} {userData.heightUnit}</p>
            <p>Weight: {userData.weight} {userData.weightUnit}</p>
            <p>Tummy Shape: {userData.tummyShape.charAt(0).toUpperCase() + userData.tummyShape.slice(1)}</p>
            <p>Chest Shape: {userData.chestShape.charAt(0).toUpperCase() + userData.chestShape.slice(1)}</p>
          </div>
        </div>
      </div>

      <div className="navigation">
        <button onClick={onBack}>Back</button>
        <button onClick={onRestart}>Start Over</button>
      </div>
    </div>
  )
}

export default ResultsPage