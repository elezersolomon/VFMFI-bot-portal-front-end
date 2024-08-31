// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userID: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
}

const initialState: UserState = {
  userID: 0,
  username: "",
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
