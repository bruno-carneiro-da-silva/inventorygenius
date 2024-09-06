export interface SiderbarItem {
  id: string;
  name: string;
  route: string;
  icon: React.ReactNode;
  element?: React.ReactElement;
  subItems?: SubItem[];
}

export interface SubItem {
  id: string;
  name: string;
  route: string;
  notShow?: boolean;
  element: React.ReactElement;
}
