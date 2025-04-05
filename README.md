# T-Shirt Size Calculator

A web application for calculating t-shirt size recommendations based on user measurements and preferences.

## Features

- Input height and weight with unit conversion (inches/cm and kg/stone)
- Select body shape characteristics (tummy and chest shape)
- Enter age for better fit recommendations
- Adjust fit preference from very tight to very loose
- Get personalized size recommendations with fit percentages

## Technologies Used

- React
- TypeScript
- Vite
- React Router

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## How Size Recommendations Work

The application uses several factors to calculate your ideal t-shirt size:

1. **Basic Measurements**: Height and weight (converted to BMI)
2. **Body Shape**: Tummy shape (flat, average, rounder) and chest shape (slimmer, average, broader)
3. **Age**: Adjusts for typical body shape changes and fit preferences by age group
4. **Fit Preference**: Your preference for tighter or looser t-shirts

These factors are combined to calculate fit percentages for standard t-shirt sizes (XS, S, M, L, XL, 2XL, 3XL).