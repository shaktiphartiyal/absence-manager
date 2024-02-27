import {Injectable, isDevMode} from '@angular/core';

@Injectable()
export class AppConfig {

    public static _config: Object = {};

    constructor() {

    }

    public config(key:string): any {
        if(AppConfig._config.hasOwnProperty(key))
        {
            return (AppConfig._config as any)[key];
        }
        else
        {
            return null;
        }
    }

    public load() {
        return new Promise((resolve, reject) => {
            let configFile = 'config.json';
            if (!isDevMode())
            {
                configFile = 'config.prod.json';
            }
            fetch(`assets/config/${configFile}`).then(data => {
                return data.json();
            }).then(data => {
                AppConfig._config = data;
                resolve(true);
            }).catch(e => {
                reject(false);
            })
        });
    }
}