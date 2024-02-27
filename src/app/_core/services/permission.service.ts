/**
 * @author Shakti Phartiyal
 * @desc Generic Permission service to get user permissions.
 */
import { Injectable } from "@angular/core";
import { CacheService } from "./cache.service";

@Injectable({
   providedIn: 'root'
})
export class PermissionService
{
    constructor(
        private cache: CacheService
    )
    {

    }

    async hasPermission(permissionKey: string): Promise<boolean>
    {
        const permissions = this.cache.get('permissions');
        if(permissions instanceof Array)
        {
            return permissions.includes(permissionKey);
        }
        return false;
    }
}