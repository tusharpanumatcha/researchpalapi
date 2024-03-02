export class CreateActivityDto {
    createdBy: string; // Assuming string for the user id, adjust as needed
    activityName: string;
    activityNotes?: string;
    createdDate: Date;
  }
  