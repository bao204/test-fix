
export interface Project {
    _id: string;
    projectName: string;
    projectCategory: { projectCategoryName: string };
    projectImage: string;
    projectStart: string;
    projectEnd: string;
  }
export interface ProjectData {
  projectName: string;
  projectImage: FileList;
  projectStart: string;
  projectEnd: string;
  budget: number;
  priority: string;
  description?: string;
  projectCategory: string; 
  notificationSent: string; 
  assignedPerson?: string;  
}