export class UserNotificationModel {
  id: string;
  UserNotification: [UserNotification];
  title: string;
  message: string;
  icon?: string;
  url?: string;
  event: eventType;
}
export interface UserNotification {
  userId?: string;
  email: string;
  read: boolean;
}
export enum eventType {
  create_property = "create_property",
  confirm_property = "confirm_property",
  list_property = "list_property",
  buy_property = "buy_property",
  confirm_buy = "confirm_buy",
  reject_buy = "reject_buy",
}