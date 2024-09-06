import axios from "axios";
import { setUser } from "../redux/userSlice";
import { AppDispatch } from "../redux";
import { User } from "../models/user";
export const loginUser = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    username,
    password,
  });
  const { id, firstName, lastName, role, email, phoneNumber } =
    response.data.user;
  const token = response.data.token;

  dispatch(
    setUser({
      userID: id,
      username,
      firstName,
      lastName,
      role,
      email,
      phoneNumber,
      token,
    })
  );

  return role;
};

export const fetchUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      "http://localhost:5000/api/users",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const createUser = async (
  userData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
  },
  token: string
) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
