import {ApiHttpService} from "./api-http.service";
import {ApiSdkService} from "./api-sdk.service";
import {AuthService} from "./auth/auth.service";
import {SystemService} from "./system/system.service";
import {UserService} from "./user/user.service";


export const API_SDK = [
    ApiHttpService,
    ApiSdkService,
    AuthService,
    SystemService,
    UserService
];
