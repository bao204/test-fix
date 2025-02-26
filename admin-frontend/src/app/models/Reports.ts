

export interface Report {
    _id: string;
    reportName: string;
    submission_time?: string;
    status: string;
    notereport: string;
    filerepport?: string;


    id_employee?: {
      _id: string;
      employeeName: string;
    };

    id_task?: {
        _id: string;
        taskName: string;
      };

      
      id_progress?: {
        _id: string;
        progressName: string;
      };

   
  }
  
  export interface ReportFormData {
    reportName: string;
    submission_time:string;
    status:string;
    notereport?: string;
    filerepport?: FileList;

    id_employee?: string;
    id_task?: string;
    id_progress?: string;
   
  }