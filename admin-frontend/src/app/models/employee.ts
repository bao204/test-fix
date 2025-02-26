export interface Employee {
    _id: string;
    employeeName: string;
    employeeProfile?: string;
    joiningDate?: string;
    phone?: string;
    department_id?: {
      _id: string;
      nameDepartment: string;
    };
    designation_id?: {
      _id: string;
      designationName: string;
    };
    description?: string;
    account: {
      userName: string;
      email: string;
    };
  }
  
  export interface EmployeeFormData {
    employeeName: string;
    employeeProfile?: FileList;
    joiningDate?: string;
    phone?: string;
    department?: string;
    designation?: string;
    description?: string;
    account: {
      userName: string;
      email: string;
    };
  }