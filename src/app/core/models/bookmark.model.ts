export interface Bookmark {
  id: string;
  name: string;
  url: string;
  date?: Date; // TODO check if this needs to be date or string
}