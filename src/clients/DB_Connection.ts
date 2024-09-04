import { error } from "console";
import { Client } from "pg";

async function setDBConnection(): Promise<Client> {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "VFMFI",
    database: "VFMFI_ChatBot_DB",
  });

  // Return a Promise that resolves to the connected client or an error
  return new Promise((resolve, reject) => {
    client.connect((error: any) => {
      if (error) {
        console.log("Error", "Database Connection Error", error);
        reject(error); // Reject the Promise if there's an error
      } else {
        console.log("Success", "Database connected");
        resolve(client); // Resolve the Promise with the connected client
      }
    });
  });
}
const client = setDBConnection();
export default client;
