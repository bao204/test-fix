export interface Progress {
    _id: string;
    progressName: string;
    projectid: { projectName: string };
    progressCategory: { progressCategoryName: string };
    progressStart: string;
    progressEnd: string;
    notificationSent?: { notification_name: string };
    taskAssignPerson: { employeeName: string };
    taskRecipient: { employeeName: string };
    priority: string;
    description: string;
    status: string;
  }
 export interface ProgressData {
    progressName: string;
    progressStart: string;
    progressEnd: string;
    priority: string;
    description: string;
    status: string;
    projectid?: string;
    progressCategory?: string;
    notificationSent?: string;
    taskAssignPerson?: string;
    taskRecipient?: string;
  }