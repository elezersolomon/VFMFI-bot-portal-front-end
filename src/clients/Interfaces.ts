interface user {
  telegramUserName: string;
  telegramID: number;
  userFName: string;
  userLName: string;
  phoneNumber: number;
  isCustomer: boolean;
}

interface chatData {
  telegramUserName: string;
  telegramID: number;
  data: {};
}

interface update {
  table: string;
  values: Record<string, any>;
  condition: string;
}

interface feedback {
  telegramUserName?: string;
  feedback: string;
  userID: number;
  leadID: number;
}

interface lead {
  telegramID: number;
  vfclientID?: string;
  userFName: string | undefined;
  userLName: string | undefined;
  PhoneNumber?: number;
  telegramUserName: string | undefined;
}

export type { user, update, lead, feedback, chatData };
