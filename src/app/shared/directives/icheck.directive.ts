import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import 'icheck';


declare var $: any;

@Directive({
    selector: '[icheck]'
})
export class IcheckDirective implements OnInit {
    @Input() 'skin': string = 'square-blue';

    constructor(private eleRef: ElementRef) {
    }

    ngOnInit(): void {
        $(this.eleRef.nativeElement).iCheck({
            checkboxClass: `icheckbox_${this.skin}`,
            radioClass:    `iradio_${this.skin}`,
        });
    }

}
