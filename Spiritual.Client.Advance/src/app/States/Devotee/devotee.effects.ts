import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DevoteeapiService } from "../../Services/devoteeapi.service";
import { GetDevoteeDataAction, GetDevoteeDataFailAction, GetDevoteeDataSuccessAction, GetPaymentListAction, GetPaymentListFailAction, GetPaymentListSuccessAction, MakePaymentAcion, MakePaymentFailAcion, MakePaymentSucessAcion } from "./devotee.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { DevoteePostModel } from "../../Model/Devotee.Model";
import { DonationApiService } from "../../Services/donation-api.service";

@Injectable()
export class DevoteeeEffects
{
    constructor(private action$ : Actions,private DevoteeService : DevoteeapiService,private donationService:DonationApiService){}

    GetDevoteeDataEffect$ = createEffect(()=>{
        return this.action$.pipe(ofType(GetDevoteeDataAction),exhaustMap((action)=>{
            return this.DevoteeService.DevoteeLogin(action.username)
            .pipe(
                map((data)=>
                {
                    let devoteeData : DevoteePostModel = data;
                    return GetDevoteeDataSuccessAction({DevoteeData:devoteeData})
                }),
                catchError((err:any)=>{
                    return of(GetDevoteeDataFailAction({error:err}))
                })
            );
        }
        ));
    });

    GetMyPaymentListEffect$ = createEffect(()=>{
        return this.action$.pipe(ofType(GetPaymentListAction),exhaustMap((action)=>{
            return this.donationService.GetDonationForDevotee(action.devoteeId)
            .pipe(
                map((data)=>{
                    return GetPaymentListSuccessAction({DonationList:data})
                }),
                catchError((err:any)=>{
                    return of(GetPaymentListFailAction({error:err}))
                })
            );
        }))
    });

    MakePaymentEffect$ = createEffect(()=>{
        return this.action$.pipe(ofType(MakePaymentAcion),exhaustMap((action)=>{
            return this.donationService.PostDonation(action.Donation)
            .pipe(
                map((data)=>{
                    return MakePaymentSucessAcion({Donation : data})
                }),
                catchError((err : any)=>{
                    return of(MakePaymentFailAcion({Error:err}))
                })
            )
        }))
    })
}