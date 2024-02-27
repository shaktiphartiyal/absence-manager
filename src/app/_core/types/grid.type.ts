export interface GridConfig
{
  maxRows: number;
  rowsClickable: boolean
}

export interface GridColumn
{
  name: string;
  field?: string;
  sortable?: boolean;
  action?: boolean;
  width?: string;
}

export interface GridType
{
  total: number;
  config: GridConfig;
  columns: Array<GridColumn>;
  data: any
}