import { Client } from "pg"; // Ensure this is the correct import for your PostgreSQL client
import client from "./DB_Connection"; // Adjust import according to your actual setup

type TargetColumnsType = string[];

const Select = async (
  table: string,
  targetColumns?: TargetColumnsType,
  condition?: string
): Promise<any[]> => {
  try {
    // Prepare target columns
    const stringifiedTargetColumn =
      targetColumns && targetColumns.length > 0
        ? targetColumns.map((value) => `"${value}"`).join(", ")
        : "*";

    // Prepare condition
    const conditionString = condition ? `WHERE ${condition}` : "";

    // Create query
    const query = `SELECT ${stringifiedTargetColumn} FROM "${table}" ${conditionString}`;

    // Perform the query
    const Client = await client; // Ensure `client` returns a `Client` instance
    const result = await Client.query(query);

    // Return rows
    return result.rows;
  } catch (error: any) {
    console.error("Select error:", error.message);
    throw new Error(error.message); // Throw error to be handled by calling code
  }
};

export default Select;
