import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {AppConfig} from '../services/app.config';

@Pipe({ name: 'systemDate' })
export class DateFormatPipe extends DatePipe implements PipeTransform
{
    constructor(private config: AppConfig)
    {
        super('en-US');
    }

    override transform(date: any, format?: any): any
    {
        if(!format)
        {
            format = this.config.config("dateFormat");
            if(!format)
            {
                format = 'd/MMM/y';
            }
        }
        date = new Date(date);
        date.setDate(date.getDate());
        return new DatePipe('en-US').transform(date, format);
    }
}
