import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import MeasurementsPage from './pages/MeasurementsPage'
import TummyShapePage from './pages/TummyShapePage'
import ChestShapePage from './pages/ChestShapePage'
import AgePage from './pages/AgePage'
import FitPreferencePage from './pages/FitPreferencePage'
import ResultsPage from './pages/ResultsPage'

export type UserData = {
  height: number
  weight: number
  heightUnit: 'cm' | 'in'
  weightUnit: 'kg' | 'lbs'
  tummyShape: 'flat' | 'average' | 'rounder'
  chestShape: 'slimmer' | 'average' | 'broader'
  age: number
  fitPreference: number // 0-100 scale from tight to loose
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState<UserData>({
    height: 0,
    weight: 0,
    heightUnit: 'cm',
    weightUnit: 'kg',
    tummyShape: 'average',
    chestShape: 'average',
    age: 0,
    fitPreference: 50
  })

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  // Page transition animation effect
  useEffect(() => {
    const appElement = document.querySelector('.app-container')
    if (appElement) {
      appElement.classList.add('page-transition')
      setTimeout(() => {
        appElement.classList.remove('page-transition')
      }, 500)
    }
  }, [location.pathname])

  // Progress indicator calculation
  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/': return 1
      case '/tummy-shape': return 2
      case '/chest-shape': return 3
      case '/age': return 4
      case '/fit-preference': return 5
      case '/results': return 6
      default: return 1
    }
  }

  const totalSteps = 6
  const currentStep = getCurrentStep()
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="app">
      <div className="app-header">
        <div className="logo-container">
          <h1>Fitly</h1>
        </div>

        {location.pathname !== '/results' && (
          <div className="progress-indicator">
            <div className="progress-track">
              <div
                className="progress-fill-indicator"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              <span className="progress-text">Step {currentStep} of {totalSteps}</span>
            </div>
          </div>
        )}
      </div>

      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <MeasurementsPage
                userData={userData}
                updateUserData={updateUserData}
                onNext={() => navigate('/tummy-shape')}
              />
            }
          />
          <Route
            path="/tummy-shape"
            element={
              <TummyShapePage
                userData={userData}
                updateUserData={updateUserData}
                onNext={() => navigate('/chest-shape')}
                onBack={() => navigate('/')}
              />
            }
          />
          <Route
            path="/chest-shape"
            element={
              <ChestShapePage
                userData={userData}
                updateUserData={updateUserData}
                onNext={() => navigate('/age')}
                onBack={() => navigate('/tummy-shape')}
              />
            }
          />
          <Route
            path="/age"
            element={
              <AgePage
                userData={userData}
                updateUserData={updateUserData}
                onNext={() => navigate('/fit-preference')}
                onBack={() => navigate('/chest-shape')}
              />
            }
          />
          <Route
            path="/fit-preference"
            element={
              <FitPreferencePage
                userData={userData}
                updateUserData={updateUserData}
                onNext={() => navigate('/results')}
                onBack={() => navigate('/age')}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsPage
                userData={userData}
                onRestart={() => {
                  setUserData({
                    height: 0,
                    weight: 0,
                    heightUnit: 'cm',
                    weightUnit: 'kg',
                    tummyShape: 'average',
                    chestShape: 'average',
                    age: 0,
                    fitPreference: 50
                  })
                  navigate('/')
                }}
                onBack={() => navigate('/fit-preference')}
              />
            }
          />
        </Routes>
      </div>

      <div className="app-footer">
        <p>Find your perfect fit with <span className="brand-text">Fitly</span></p>
      </div>
    </div>
  )
}

export default App