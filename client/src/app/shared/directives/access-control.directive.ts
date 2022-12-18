import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {DecodeTokenService} from "../services/decode-token.service";

@Directive({
  selector: '[appAccessControl]'
})
export class AccessControlDirective {
  @Input("appAccessControl") appAccessControl!: string[];
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private auth: DecodeTokenService
  ) {}

  ngOnInit() {
    /*console.log(this.elementRef.nativeElement.style.display)
    this.elementRef.nativeElement.style.display = "none";
    console.log(this.elementRef.nativeElement)*/
    this.checkAccess();
  }

  checkAccess() {
    const userRole: any = this.auth.getUser().role;
    // console.log({userRole})
    const isAccessible: boolean = this.appAccessControl.some(x => x.includes(userRole))
    if (isAccessible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
    // this.elementRef.nativeElement.style.display = isAccessible ? "block" : "none !important";
  }

}
