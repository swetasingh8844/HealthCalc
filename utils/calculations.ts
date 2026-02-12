
import { Gender, ActivityLevel, WeightGoal } from '../types';

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const getBMICategory = (bmi: number): { category: string; color: string; description: string } => {
  if (bmi < 18.5) return { 
    category: 'Underweight', 
    color: 'text-blue-500',
    description: 'A BMI below 18.5 indicates that you may be underweight. It is recommended to consult with a healthcare provider.'
  };
  if (bmi < 25) return { 
    category: 'Normal Weight', 
    color: 'text-green-500',
    description: 'A BMI of 18.5–24.9 is considered healthy. Great job maintaining a balanced lifestyle!'
  };
  if (bmi < 30) return { 
    category: 'Overweight', 
    color: 'text-yellow-500',
    description: 'A BMI of 25–29.9 suggests you are slightly over the healthy weight range for your height.'
  };
  return { 
    category: 'Obese', 
    color: 'text-red-500',
    description: 'A BMI of 30 or higher is categorized as obesity. Consider consulting a doctor for a weight management plan.'
  };
};

export const calculateBMR = (gender: Gender, weightKg: number, heightCm: number, age: number): number => {
  if (gender === Gender.Male) {
    return  (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  }
  return  (10 * weightKg) + (6.25 * heightCm) - (5 * age) -161;
};

export const calculateDailyCalories = (bmr: number, activityLevel: ActivityLevel, goal: WeightGoal): number => {
  const maintenance = bmr * activityLevel;
  switch (goal) {
    case WeightGoal.Loss: return maintenance - 500;
    case WeightGoal.Gain: return maintenance + 500;
    default: return maintenance;
  }
};

export const calculateIdealWeight = (gender: Gender, heightCm: number): number => {
  const heightInches = heightCm / 2.54;
  const overFiveFeet = Math.max(0, heightInches - 60);
  if (gender === Gender.Male) {
    return 50 + (2.3 * overFiveFeet);
  }
  return 45.5 + (2.3 * overFiveFeet);
};

export const calculateWaterIntake = (weightKg: number): number => {
  return weightKg * 0.033; // ~33ml per kg
};
