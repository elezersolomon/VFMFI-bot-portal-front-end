import axios from "axios";
import { AppDispatch } from "../redux";
import { User, Customer, Feedback, Content } from "../models";
import { botData } from "../models";
import { userSlice } from "../redux/userSlice"; // Import the store
import { store } from "../redux/store";
import { setUser, updateToken } from "../redux/userSlice";
let token = "";

axios.interceptors.response.use(
  (response) => {
    const newToken = response.headers.token; // Ensure the backend sends it here
    console.log("consoleData_new token", newToken);
    if (newToken) {
      store.dispatch(updateToken(newToken.replace("Bearer ", newToken))); // Update Redux token
    }

    return response;
  },
  (error) => {
    if (error.response?.data?.message === "token expired") {
      window.location.href = "/login"; // Redirect to login on token expiry
    }
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (response) => {
//     const newToken = response.headers["token"]; // Check if token is in headers
//     console.log("consoleData_ response", newToken);
//     if (newToken) {
//       console.log("consoleData_newtoken", newToken);
//       token = newToken; // Update token in Redux
//     }
//     console.log("consoleData_ tok", token);
//     return response;
//   },
//   (error) => {
//     if (error.response?.data?.message === "token expired") {
//       window.location.href = "/login"; // Redirect to login on token expiry
//     }
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     if (response.data.message === "token expired") {
//       console.log(
//         "consoleData_ token expired response",
//         response.headers.token
//       );
//       window.location.href = "/login"; // Direct navigation for simplicity
//     }

//     const state = userSlice.getInitialState();
//     store.dispatch(
//       setUser({
//         ...state,
//         token: response.headers.token,
//       })
//     );
//     console.log("consoleData_ state", state);

//     return response;
//   },
//   (error) => {
//     if (error.response?.data?.message === "token expired") {
//       // Navigate to login
//       window.location.href = "/login"; // Direct navigation for simplicity
//     }
//     return Promise.reject(error);
//   }
// );

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
  // token = response.data.token;
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
          Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const fetchFeedbacks = async (token: string): Promise<Feedback[]> => {
  // console.log("consoleData_ token", token);
  try {
    const response = await axios.get(
      "http://localhost:5000/api/data/getFeedbacks",
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

export const getBotData = async (token: string): Promise<botData[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/data/BotData", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
    if (response.headers.token == "token expired") {
    }
    console.log("value", token);
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
          Authorization: `Bearer ${token}`,
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
