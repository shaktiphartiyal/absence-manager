import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() year: number = new Date().getFullYear();
  @Input() appliedLeaves: Array<number> = [];
  @Input() approvedLeaves: Array<number> = [];
  @Input() rejectedLeaves: Array<number> = [];
  
  @Output() datesSelected = new EventEmitter<Array<Date>>();

  public selectedItems: any = [];

  public months: Array<{name: string, monthNumber: number}> = [
    {name: "January", monthNumber: 1},
    {name: "February", monthNumber: 2},
    {name: "March", monthNumber: 3},
    {name: "April", monthNumber: 4},
    {name: "May", monthNumber: 5},
    {name: "June", monthNumber: 6},
    {name: "July", monthNumber: 7},
    {name: "August", monthNumber: 8},
    {name: "September", monthNumber: 9},
    {name: "October", monthNumber: 10},
    {name: "November", monthNumber: 11},
    {name: "December", monthNumber: 12}
  ];


  public refresh()
  {
    this.selectedItems = [];
  }

  getWeeksArray(month:number) {
    const weeksArray: Array<Array<{day: number, date: Date | undefined}>> = [];
    const firstDay = new Date(this.year, month - 1, 1);
    const lastDay = new Date(this.year, month, 0);
    const daysInMonth = lastDay.getDate();
    let week: Array<{day: number, date: Date | undefined}> = [
      {day: 0, date: undefined},
      {day: 0, date: undefined},
      {day: 0, date: undefined},
      {day: 0, date: undefined},
      {day: 0, date: undefined},
      {day: 0, date: undefined},
      {day: 0, date: undefined}
    ]
    for(let i=1; i<=daysInMonth; i++)
    {
        const thisDate = new Date(this.year, month-1, i);
        const dayIndex = thisDate.getDay();
        week[dayIndex] = {day: i, date: thisDate};
        if(dayIndex === 6 || i === daysInMonth)
        {
          weeksArray.push(week);
          week = [
            {day: 0, date: undefined},
            {day: 0, date: undefined},
            {day: 0, date: undefined},
            {day: 0, date: undefined},
            {day: 0, date: undefined},
            {day: 0, date: undefined},
            {day: 0, date: undefined}
          ];
        }
    }
    return weeksArray;
  }

  isElementSelected(value: Date) : boolean
  {
    return this.selectedItems.includes(value.getTime());
  }

  selectDate(date: Date | undefined)
  {
    const timestamp = date?.getTime();
    if(this.selectedItems.includes(timestamp))
    {
      this.selectedItems.splice(this.selectedItems.indexOf(timestamp), 1);
    }
    else
    {
      this.selectedItems.push(timestamp);
    }
    this.datesSelected.emit(this.selectedItems.map((x:Date) => new Date(x)))
  }
  
  isDateApplied(value: Date) : boolean
  {
    return this.appliedLeaves.includes(value.getTime());
  }

  isDateApproved(value: Date) : boolean
  {
    return this.approvedLeaves.includes(value.getTime());
  }

  isDateRejected(value: Date) : boolean
  {
    return this.rejectedLeaves.includes(value.getTime());
  }


  ngOnInit(): void {
  }
  

}
