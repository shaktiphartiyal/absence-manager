/**
 * @author Shakti Phartiyal
 * @desc Generic Cache service to serve/storage cached data.
 */
 import { Injectable } from "@angular/core";
 import { AppConfig } from "./app.config";
 
 @Injectable({
    providedIn: 'root'
 })
 export class CacheService
 {

    constructor(private config: AppConfig){

    }

    private getCache(): any
    {
        const lsData = localStorage.getItem(this.config.config('cacheKey'));
        if(null === lsData)
        {
            console.log("Main cache miss.");
            return null;
        }
        return JSON.parse(lsData);
    }

    private getItem(data: any, key: string) :any
    {
        if(key in data)
        {
            return data[key];
        }
        return null;
    }

    public get(key: any):any
    {
        let cacheData = this.getCache();
        if(null === cacheData)
        {
            console.log("Cache miss : ", key);
            return null;
        }
        return this.getItem(cacheData, key);
    }
 
    public set(key: String, value: any)
    {
        let cacheData = this.getCache();
        if(null === cacheData)
        {
            cacheData = {};
        }
        cacheData[key as keyof typeof cacheData] = value;
        localStorage.setItem(this.config.config('cacheKey'), JSON.stringify(cacheData));
    }

    public clearAll()
    {
        localStorage.clear();
    }


    public delete(name: string)
    {
        if(name.trim() == '')
        {
            return;
        }
        let cacheData = this.getCache();
        if(!!cacheData)
        {
            cacheData = JSON.parse(cacheData);
            delete cacheData[name];
        }
        else
        {
            cacheData = {};
        }
        localStorage.setItem(this.config.config('cacheKey'), JSON.stringify(cacheData));
    }

 }