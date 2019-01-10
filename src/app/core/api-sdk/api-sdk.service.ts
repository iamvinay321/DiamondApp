import { EmployeeService } from './employee/employee.service';
import { ProjectService } from './project/project.service';
import {Injectable} from '@angular/core';
import {SystemService} from "./system/system.service";
import {AuthService} from "./auth/auth.service";
import {ApiHttpService} from "./api-http.service";
import {UserService} from "./user/user.service";


@Injectable()
export class ApiSdkService {

    constructor(public http: ApiHttpService,
                public auth: AuthService,
                public system: SystemService,
                public user: UserService,
                public project: ProjectService,
                public employee: EmployeeService) {
    }

}
