import { Http } from '@angular/http';
import { environment } from './../../../../environments/environment.var';
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/user.service";
import {Router} from "@angular/router";


@Component({
    selector:    'app-header',
    templateUrl: './header.component.html',
    styleUrls:   ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    url = environment.apiUrl;
    first_name:string = '';
    constructor(public user: UserService, 
                private router: Router,
                private _http: Http) {
    }

    ngOnInit() {
        //  this.first_name = JSON.parse(localStorage.getItem('id')).result.first_name;
    }

    logout() {
        this.user.clear();
        this.router.navigate(['/auth/login']);
    }
    disable(){
        const id = JSON.parse(localStorage.getItem('id')).result.id; 
        console.log(JSON.parse(localStorage.getItem('id')))
        console.log(this.url)
        if(confirm('Are you sure to disable' +id ))
        this._http.get(this.url+'user/disable/'+id).subscribe((data)=>{
            console.log(data)
            
            
        })
    }

}
