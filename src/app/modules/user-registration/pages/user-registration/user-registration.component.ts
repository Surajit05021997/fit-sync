import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';

import { SupabaseService, AuthService } from 'src/app/core/services';
import {
  SpinnerService,
  LlmService,
  CalorieService,
} from 'src/app/shared/services';
import { GoalCategory, GoalDetails, Gender } from 'src/app/shared/models';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  user: firebase.User | null = null;
  isExistingUser: boolean = false;
  userName: string = '';
  userAge: number | null = null;
  userGender: Gender | null = null;
  userWeight: number | null = null;
  userHeight: number | null = null;
  userGoal: string = '';
  goalDetails: GoalDetails = {
    goal: '',
    category: GoalCategory.MAINTAIN_WEIGHT,
  };
  dailyIntakeCalories: number | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private llmService: LlmService,
    private calorieService: CalorieService
  ) {}

  async ngOnInit(): Promise<void> {
    this.spinnerService.showSpinner();
    this.authService.user$.subscribe(async (user) => {
      // chk if uid is present, if yes that means user registration is completed
      if (user) {
        this.user = user;
        try {
          const isUserRegistrationAlreadyCompleted =
            await this.supabaseService.isUserRegistrationAlreadyCompleted(
              user.uid
            );
          if (isUserRegistrationAlreadyCompleted) {
            this.router.navigate(['./dashboard']);
          }
        } catch (error) {
          console.error('Some thing went wrong', error);
        } finally {
          this.spinnerService.hideSpinner();
        }
      }
    });
  }

  async registerUser() {
    try {
      this.spinnerService.showSpinner(
        'Calculating your daily intake calorie...'
      );

      const categorizeGoalPrompt = `
        Below is my fitness goal:
        ${this.userGoal}

        Categorize this in one of the following category: FAT_LOSS or MUSCLE_GAIN or MAINTAIN_WEIGHT.
        Give the result as below json. And, only give json as result and nothing else, no statement.
        Example:
        {
          "goal": "I want to lose fat.",
          "category": "FAT_LOSS"
        }
      `;

      this.llmService
        .getDeepSeekChatV3Completion(categorizeGoalPrompt)
        .subscribe({
          next: (response) => {
            const cleanedResponse = response.content
              .replace(/```json|```/g, '')
              .trim();
            this.goalDetails = JSON.parse(cleanedResponse);
            if (
              this.userName &&
              this.userAge &&
              this.userGender &&
              this.userHeight &&
              this.userWeight &&
              this.userGoal
            ) {
              this.dailyIntakeCalories =
                this.calorieService.calcDailyIntakeCalorie(this.goalDetails, {
                  name: this.userName,
                  age: this.userAge,
                  gender: this.userGender,
                  height: this.userHeight,
                  weight: this.userWeight,
                  goal: this.userGoal,
                });
            }
            this.spinnerService.hideSpinner();
          },
          error: (error) => {
            console.log(error);
            this.spinnerService.hideSpinner();
          },
        });

      if (this.user) {
        // store user registration details in supabase registration table
        const { error: insertUserRegistrationDetailsError } =
          await this.supabaseService.insertUserRegistrationDetails({
            uid: this.user.uid,
            name: this.userName,
            age: this.userAge,
            gender: this.userGender,
            height: this.userHeight,
            weight: this.userWeight,
            goal: this.userGoal,
          });
        if (insertUserRegistrationDetailsError) {
          throw insertUserRegistrationDetailsError;
        }

        // update user table with registration_complete to true
        await this.supabaseService.updateUser(this.user.uid, true);

        this.router.navigate(['./dashboard']);
      }
    } catch (error) {
      console.error('Something went wrong!', error);
      this.spinnerService.hideSpinner();
    }
  }
}
