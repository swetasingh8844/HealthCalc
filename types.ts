
export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum UnitSystem {
  Metric = 'metric',
  Imperial = 'imperial'
}

export enum ActivityLevel {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
  ExtraActive = 1.9
}

export enum WeightGoal {
  Loss = 'loss',
  Maintain = 'maintain',
  Gain = 'gain'
}

export interface BMIResult {
  value: number;
  category: string;
  color: string;
  description: string;
}
