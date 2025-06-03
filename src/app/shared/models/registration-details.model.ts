export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface RegistrationDetails {
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  goal: string;
}
