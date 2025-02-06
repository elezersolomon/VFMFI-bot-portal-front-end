import axios from "axios";
import { AppDispatch } from "../redux";
import { User, Customer, Feedback, Content } from "../models";
import { botData } from "../models";
import { userSlice } from "../redux/userSlice"; // Import the store
import { store } from "../redux/store";
import { setUser, updateToken } from "../redux/userSlice";
let Token = "";
axios.interceptors.response.use(
  (response) => {
    const newToken = response.headers["token"]; // Check if token is in headers
    console.log("consoleData_ response", newToken);
    if (newToken) {
      console.log("consoleData_newtoken", newToken);
      Token = newToken; // Update token in Redux
    }
    console.log("consoleData_ tok", Token);
    return response;
  },
  (error) => {
    if (error.response?.data?.message === "token expired") {
      window.location.href = "/login"; // Redirect to login on token expiry
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    username,
    password,
  });
  const { id, firstName, lastName, role, email, phoneNumber, status } =
    response.data.user;
  const token = response.data.token;
  Token = response.data.token;
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
      status,
    })
  );

  return { role: role, status: status };
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

// New function to update user data
export const updateUser = async (
  userData: {
    userName: string;
    email: string;
    phoneNumber: string;
    role: string;
    userID: number;
    status: string;
  },
  token: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const resetUserPassword = async (
  data: {
    username: string;
    firstName: string;
    userID: string;
    phoneNumber: string;
  },
  token: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/resetUserPassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const fetchCustomers = async (token: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/Customers`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching customers");
  }
};

export const updateCustomer = async (customer: Customer, token: string) => {
  const response = await axios.put(
    "http://localhost:5000/api/customers",
    customer,
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );
  return response.data;
};

export const createCustomer = async (
  customerData: {
    telegramUserName: string;
    firstName: string;
    lastName: string;
    isCustomer: boolean;
    telegramID: string;
    phoneNumber: string;
    address: string;
  },
  token: string
) => {
  const response = await axios.post(
    "http://localhost:5000/api/customers/",
    customerData,
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

  return response.data;
};

export const fetchFeedbacks = async (token: string): Promise<Feedback[]> => {
  console.log("consoleData_ Token", Token);
  try {
    const response = await axios.get(
      "http://localhost:5000/api/data/getFeedbacks",
      {
        headers: {
          Authorization: `Bearer ${Token}`, // Include the token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getBotData = async (token: string): Promise<botData[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/data/BotData", {
      headers: {
        Authorization: `Bearer ${Token}`, // Include the token in the request headers
      },
    });
    if (response.headers.token == "token expired") {
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export async function updateBotData(
  token: string,
  botData: Content,
  description: string,
  entry?: string
) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/data/setBotData`,
      botData,

      {
        headers: {
          Authorization: `Bearer ${Token}`,
          entry: entry,
          description: description,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}
