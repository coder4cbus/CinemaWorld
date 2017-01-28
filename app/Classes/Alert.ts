export class Alert {
  id: string;
  type: string;
  message: string;
  getType: GetType;
  title:string;
}

export enum GetType
{
  List,
  Details
}

