import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { accounts } from './data';
import { cloneDeep } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class AccountsMockApi
{
    private readonly _accounts:any[];
    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        this._accounts = accounts;
        // Register Mock API handlers
        this.registerHandlers();
    }

    /**
    * Register Mock API handlers
    */
    registerHandlers(): void
    {
        this._fuseMockApiService
        .onGet('api/v1/account')
        .reply(({request}) =>{
            const accounts = cloneDeep(this._accounts);
            const findAccount = accounts.find(acc => acc.accountNumber == request.params.get('accountNumber'));
            //return
            return findAccount != undefined ? [200,findAccount] : [404,'No existe una cuenta con ese numero'];
        });
    }
}