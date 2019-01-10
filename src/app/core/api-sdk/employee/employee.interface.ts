

// extends UserRequest
export interface Employee extends Address , Company {
     id?:             number;
     full_name:       string;
     first_name :     string;
     middle_name:     string;
     last_name :      string;
     prior_last_name :string;
     suffix :         string;
     gender :         string;
     birth_date :     string;
     employee_status_effective_date :  string;
     employee_status :string;
    
}

export interface Address {
     address_1 :  string;
     address_2 :  string;
     city :       string;
     state :      string;
     zip_code :   string;
     country :    string;
     disability : string;
     ethnicity :  string;
     smoker :     string;
     veteran :    string;
}
export interface Company {
     hire_date :         string;
     rehire_date :       string;
     termination_date :  string;
     user_account_deactivation_date :  string;
     annual_salary :     number;
     cost_code :         number;
     department :        string;
     division :          string;
     eeo_class :         number;
     employment_type :   string;
     is_supervisor_reviewer :  string;
     job_title :         string;
     position :          string;
}
