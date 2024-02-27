import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'system-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit, OnChanges {

  @Input() public tableClass: any = '';
  @Input() public footerColspan:number = 1;
  @Input() public data: Array<any> = [];
  @Input() public dataKey: String = '';
  @Input() public total: number = 0;
  @Input() public columns: Array<any> = [];
  @Input() public gridConfig:any = {
    maxRows: 10,
    rowsClickable: false
  };
  @Input() public currentPage: number = 1;
  @Input() public filterBarOpen: boolean = false;
  @Input() public loading:boolean = false;
  @Output() public onPageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onSort: EventEmitter<any> = new EventEmitter<any>();

  public buckets: number = 0;
  public paginationArray:Array<number> = [];


  public sortingArray: Array<any> = [];

  

  constructor(
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if('data' in  changes)
    {
      this.makeBucket();
    }
  }

  ngOnInit(): void {

  }

  get recordsShown()
  {
    if(this.dataKey && this.data[this.dataKey as keyof typeof this.data])
    {
      return this.data[this.dataKey as keyof typeof this.data].length;
    }
    return 0;
  }



  makeBucket()
  {
    this.buckets = Math.ceil(this.total/this.gridConfig.maxRows);
    let range = this.pageRange();
    this.paginationArray = [];
    for(let i=range.start; i <= range.end; i++)
    {
      this.paginationArray.push(i);
    }
  }


  private pageRange()
  {
    let start = this.currentPage - 2,
    end = this.currentPage + 2;

    if (end > this.buckets) {
      start -= (end - this.buckets);
      end = this.buckets;
    }
    if (start <= 0) {
      end += ((start - 1) * (-1));
      start = 1;
    }
    end = end > this.buckets ? this.buckets : end;
    return {
      start: start,
      end: end
    };
  }

  first()
  {
    this.navigateTo(1);
  }

  last()
  {
    this.navigateTo(this.buckets);
  }

  next()
  {
    if(this.currentPage < this.buckets)
    {
      this.navigateTo(this.currentPage+1);
    }
  }

  previous()
  {
    if (this.currentPage > 1)
    {
      this.navigateTo(this.currentPage - 1);
    }
  }

  updateMaxRows()
  {
    this.onPageChange.emit(1);
  }

  navigateTo(pageNo:number)
  {
    this.currentPage = pageNo;
    this.makeBucket();
    this.onPageChange.emit(this.currentPage);
  }

  toggleGridSelection(triggeRedEvent: any)
  {
    const isChecked = triggeRedEvent.target.checked;
    const parentTable: HTMLTableElement = triggeRedEvent.target.closest('table.system-grid');
    if(!!parentTable)
    {
      try
      {
        const selectors = parentTable.querySelectorAll('.grid-record-selector');
        selectors.forEach((x: any) => {
          x.checked = isChecked;
          const event = new Event("change", {"bubbles":false, "cancelable":true});
          x.dispatchEvent(event);
        });
      }
      catch(e){}
    }
  }

  doSort(column:any)
  {
    if(!column.hasOwnProperty('sort'))
    {
      column['sort'] = 'asc';
      this.updateSortingArray(column);
    }
    else
    {
      if (column['sort'] == 'asc')
      {
        column['sort'] = 'desc';
        this.updateSortingArray(column);
      }
      else if (column['sort'] == 'desc')
      {
        column['sort'] = '';
        this.updateSortingArray(column);
      }
      else
      {
        column['sort'] = 'asc';
        this.updateSortingArray(column);
      }
    }
    this.onSort.emit(column);
  }


  private updateSortingArray(column:any)
  {
    let index = this.sortingArray.findIndex(x => x.field == column.field);
    if(!!column.sort)
    {
      if(index > -1)
      {
        this.sortingArray[index].field = column.field;
        this.sortingArray[index].order = column.sort;
      }
      else
      {
        this.sortingArray.push({
          field: column.field,
          order: column.sort
        });
      }
    }
    else
    {
      if(index > -1)
      {
        this.sortingArray.splice(index, 1);
      }
    }

  }


  public generateQueryString()
  {
    let queryString = `page=${this.currentPage}&rows=${this.gridConfig.maxRows}`;
    if (this.sortingArray.length > 0)
    {
      queryString += `&sort=`;
      for (let sortItem of this.sortingArray) {
        queryString += `${sortItem.field}&order=${sortItem.order}&`;
      }
    }
    return queryString;
  }


  toggleFilterBar()
  {
    this.filterBarOpen = !this.filterBarOpen;
  }

}
