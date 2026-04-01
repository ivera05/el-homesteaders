export interface CategoryMenuItem {
  id: string;
  slug: string;
  name: string;
  children?: CategoryMenuItem[];
}
