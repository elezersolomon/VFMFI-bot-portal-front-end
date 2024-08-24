import axios from "axios";

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    username,
    password,
  });
  console.log("response", response);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};
