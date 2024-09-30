export interface ColumnTable {
  id: string;
  label?: string;
  width?: string;
  align?: string;
  render?: (data: any) => React.ReactNode;
}

export interface KebabMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (item?: any) => void;
}
