import { Injectable } from '@angular/core';

import {
  GoalDetails,
  RegistrationDetails,
  GoalCategory,
} from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class CalorieService {
  calcDailyIntakeCalorie(
    goalDetails: GoalDetails,
    registrationDetails: RegistrationDetails
  ): number {
    const BMR = this.calcBMR(registrationDetails);
    const TDEE = BMR * 1.55;

    let dailyIntakeCalories;
    switch (goalDetails.category) {
      case GoalCategory.FAT_LOSS:
        dailyIntakeCalories = TDEE * 0.8;
        break;
      case GoalCategory.MUSCLE_GAIN:
        dailyIntakeCalories = TDEE * 1.2;
        break;
      case GoalCategory.MAINTAIN_WEIGHT:
        dailyIntakeCalories = TDEE;
    }

    return dailyIntakeCalories;
  }

  calcBMR(registrationDetails: RegistrationDetails): number {
    const BMR =
      10 * registrationDetails.weight +
      6.25 * registrationDetails.height -
      5 * registrationDetails.age +
      5;
    return BMR;
  }
}
