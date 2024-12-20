export interface User {
  userID: number;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface Customer {
  userID: number;
  isCustomer: boolean;
  userFName: string;
  userLName: string;
  phoneNumber: string;
  telegramUserName: string;
  status: string; // Changing the status here
  dateRegistered: string;
  address: String;
}

export interface Feedback {
  commentID: string;
  dateCreated: string;
  feedback: string;
  leadID: string;
  telegramUserName: string;
  userID: string;
}
