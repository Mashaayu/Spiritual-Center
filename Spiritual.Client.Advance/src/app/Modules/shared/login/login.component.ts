import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClearUserState, LoginUserAction } from '../../../States/User/user.action';
import { GetDevoteeDataAction } from '../../../States/Devotee/devotee.actions';
import { GetDevoteeDataSelector } from '../../../States/Devotee/devotee.selector.';
import { UserState } from '../../../States/User/user.state';
import { getUser } from '../../../States/User/user.selector';
import { Router } from '@angular/router';
import { SignalRService } from '../../../Services/signal-r.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  Notification:string;
  SentMessage : string ;
  loginForm: FormGroup;
  val = true;
  otpVal = true;
  widget = true;
  InvalidCreds: string = '';
  buttontext :string = 'Submit Credential';
  @ViewChild('alerts') notificationBox : ElementRef; 
  constructor(
    private store:Store<{appstate:UserState}>,private router : Router,private signalRservice :SignalRService
    ,private renderer :  Renderer2  
  ) {

    // localStorage.removeItem('token');

    this.loginForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      Role: new FormControl('', Validators.required),
      OTP: new FormControl(''),
    });
    

  }
  // ngOnDestroy(): void {
  //  this.signalRservice.StopConnection();
  // }
  ngOnInit(): void {
   
    this.signalRservice.StartConnection().subscribe(()=>{
     
    });
    this.signalRservice.ReceiveNotification().subscribe((data) => {
      console.log("Received Notification : ",data);
      
      this.Notification = data;
      let p : HTMLParagraphElement = this.renderer.createElement('p');
      p.innerHTML = `${data}`;
      p.className = 'alert alert-success';
      (<HTMLDivElement>this.notificationBox.nativeElement).append(p);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  Login() {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();

    let user: string = this.loginForm.get('Role')?.value;
    let UserName: string = this.loginForm.get('UserName')?.value;
    let Password: string = this.loginForm.get('Password')?.value;

    if (this.loginForm.valid) {

      if (user == 'admin') {
        if (UserName == 'admin' && Password == 'admin') {
            this.store.dispatch(ClearUserState()); 
            // this.LoginSignupService.GetUserRole(UserName);
            this.store.dispatch(LoginUserAction({userName : UserName}));
            this.store.select(getUser).subscribe(
              data=>{
                this.router.navigate([data?.role])
              }
            )
            this.InvalidCreds = '';
        }
        else {

          this.InvalidCreds = 'Invalid user/password/role';
        }
      } else {
        /// we are clearing user state that has created before u logged in as  an admin
        // this.store.dispatch(ClearUserState());
        this.DevoteeLogin(UserName, Password);
      }
    } else {
      /// we are clearing user state that has created before u logged in as  an admin
      this.InvalidCreds = 'Invalid user/password/role';
    }
  }

  DevoteeLogin(Username: string, password: string) {
    this.val = false;
    let otp = this.loginForm.get('OTP')?.value;

    if (password == 'password' && otp == "000000"){
      this.store.dispatch(GetDevoteeDataAction({username:Username}));

      this.store.select(GetDevoteeDataSelector).subscribe( async data=>
        {
          if( await data?.devoteeLoginId != Username)
          {
            this.InvalidCreds = 'Invalid user/password/role';
          }
          else
          {
            this.InvalidCreds = '';
            this.store.dispatch(LoginUserAction({userName : Username}));
            this.store.select(getUser).subscribe(
              data=>{
                this.router.navigate([data?.role])
              }
            )
          }

        }
      );
    }
    else{
      this.InvalidCreds = 'Invalid user/password/role';
    }
  }

  OnValueChangeOfRole(role: string) {
    let Password: string = this.loginForm.get('Password')?.value;
    if (role == 'devotee') {
      this.val = false;
      this.buttontext = 'Submit OTP';
      if (Password != 'password') {
        this.InvalidCreds = '';
      }

      this.GetOTPControl().setValidators(Validators.required);
      this.GetOTPControl().updateValueAndValidity();
    }
    else {
      this.val = true;
      this.buttontext = 'Submit Credential';
      if (Password != 'admin') {
        this.InvalidCreds = '';
      }
      this.GetOTPControl().removeValidators(Validators.required);
      this.GetOTPControl().updateValueAndValidity();
    }
  }

  GetOTPControl(): FormControl {
    return this.loginForm.get('OTP') as FormControl;
  }

  openForm(){
    if(this.widget == true){
      this.widget = false
    }else{
      this.widget = true
    }

  }


 

}
