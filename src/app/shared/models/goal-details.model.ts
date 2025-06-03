export enum GoalCategory {
  FAT_LOSS = 'FAT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
}

export interface GoalDetails {
  goal: string;
  category: GoalCategory;
}
