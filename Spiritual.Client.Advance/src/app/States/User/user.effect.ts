import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetActiveUsers, GetActiveUsersFail, GetActiveUsersSucess, LoginUserAction, LoginUserFail, LoginUserSuccess } from "./user.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { LoginSignupService } from "../../Services/login-signup.service";
import { User } from "../../Model/User.Model";
import { Router } from "@angular/router";
import { DevoteeapiService } from "../../Services/devoteeapi.service";

@Injectable()
export class UserEffects {
    constructor(private actions$ : Actions,private  LodinSignupService:LoginSignupService,private devoteeService : DevoteeapiService){}

    LoginEffect$ = createEffect(()=>{
        return this.actions$.pipe(ofType(LoginUserAction),
            exhaustMap((action)=>
                { 
                    return this.LodinSignupService.GetUserRole(action.userName).pipe(
                        map((data)=>{
                            let userdata: User = data;
                        
                            return LoginUserSuccess({User:userdata})
                            }
                        ),
                        catchError((err : any)=>{
                            
                            return of(LoginUserFail({error : err.message}));
                        })
                    );

                }
            )
        );
    });


    UsersEffect$ = createEffect(()=>{
        return this.actions$.pipe(ofType(GetActiveUsers),
            exhaustMap(()=>{
                return this.devoteeService.GetactiveDevotees().pipe(
                    map((data)=>{
                         return GetActiveUsersSucess({Users: data})
                    }),
                    catchError((err:any)=>{
                        return of(GetActiveUsersFail({Error:err.message}));
                    })
                )
            })  
        );

    })

}