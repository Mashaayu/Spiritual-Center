import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DevoteeapiService } from "../../Services/devoteeapi.service";
import { DeleteDevoteeAction, DeleteDevoteeFailAction, DeleteDevoteeSucessAction, GetDevoteesAction, GetDevoteesDescAction, GetDevoteesDescFailAction, GetDevoteesDescSucessAction, GetDevoteesFailAction, GetDevoteesSuccessAction, GetDonationListAction, GetDonationListDESCAction, GetDonationListDESCSuccessAction, GetDonationListDescFailAction, GetDonationListFailsAction, GetDonationListSuccessAction, PostDevoteeAction, PostDevoteeFailAction, PostDevoteeSucessAction, UpdateDevoteeAction, UpdateDevoteeFailAction, UpdateDevoteeSucessAction } from "./admin.actions";
import {  catchError, exhaustMap, map, of } from "rxjs";
import { DonationApiService } from "../../Services/donation-api.service";

@Injectable()
export class AdminEffects{

    constructor(private actions$:Actions, private DevoteeService : DevoteeapiService,private DonationService : DonationApiService) {}

    GetDevoteeListEffect$ = createEffect(()=>{
        return this.actions$.pipe(ofType(GetDevoteesAction),
            exhaustMap(()=>
                {
                    return this.DevoteeService.GetAescOrder().pipe(
                        map((data)=>
                            {
                                 return GetDevoteesSuccessAction({DevoteeList:data});
                            }
                        ),
                        catchError((err:any)=>
                        {
                            return of(GetDevoteesFailAction({error:err.message}));
                        })
                    )
                }
            )
        );
    });


    GetDonationListEffect = createEffect(()=>{
        return this.actions$.pipe (ofType(GetDonationListAction),
            exhaustMap(()=>
                {
                    return this.DonationService.GetDonationList().pipe(
                        map((data)=>
                        {
                            return GetDonationListSuccessAction({Donation : data})
                        }),
                        catchError((err:any)=>{
                            return of(GetDonationListFailsAction({error:err.message}));
                        })
                    );
                }
            )
        );
    });

    UpdateDevoteeEffect$ = createEffect(
        ()=> {
            return this.actions$.pipe(
                ofType(UpdateDevoteeAction),exhaustMap((action)=>{
                    return this.DevoteeService.PutDevotee(action.Devotee,action.Id).pipe(
                        map((data)=>{
                            return UpdateDevoteeSucessAction({Devotee:data})
                        }),
                        catchError((err:any)=>
                        {
                            return of(UpdateDevoteeFailAction({error:err}));
                        })
                    )
                })
            )
        }
    );

    PostDevoteeEffect$ = createEffect(
        ()=> {
            return this.actions$.pipe(
                ofType(PostDevoteeAction),exhaustMap((action)=>
                {
                    return this.DevoteeService.PostDevotee(action.Devotee).pipe(
                        map(
                            (Devoteedata)=>{
                                return PostDevoteeSucessAction({Devotee:Devoteedata})
                            }
                        ),
                        catchError((err:any)=>
                            {
                                return of(PostDevoteeFailAction({error:err.message}));
                            })
                         
                    )
                })
            );
        }
    )

    DeleteDevoteeEffect$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(DeleteDevoteeAction),exhaustMap((action)=>
            {
                return this.DevoteeService.DeleteDevotee(action.Id).pipe (
                    map(()=>
                    {
                        return DeleteDevoteeSucessAction({Id:action.Id});
                    }),
                    catchError((err:any)=>
                    {
                        return of(DeleteDevoteeFailAction({error:err.message}));
                    })
                );
            })
        );
    });

    GetDonationListDescEffect$ = createEffect(()=>
    {
        return this.actions$.pipe(ofType(GetDonationListDESCAction),
            exhaustMap(()=>
            {
                return this.DonationService.GetDonationListDesc().pipe(
                    map((data)=>
                    {
                        return GetDonationListDESCSuccessAction({Donations:data});
                    }),
                    catchError((err:any)=>{
                        return of(GetDonationListDescFailAction({error:err}));
                    })
                );
            }
            )
        );
    })

    GetDevoteeListDescEffect$ = createEffect(()=>{
        return this.actions$.pipe(ofType(GetDevoteesDescAction),
            exhaustMap(()=>
                {
                    return this.DevoteeService.GetDescOrder().pipe(
                        map((data)=>
                            {
                                return GetDevoteesDescSucessAction({DevoteeList:data});
                            }
                        ),
                        catchError((err:any)=>
                        {
                            return of(GetDevoteesDescFailAction({error:err.message}));
                        })
                    )
                }
            )
        );
    });
    
}