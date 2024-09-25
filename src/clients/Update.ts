import client from "./DB_Connection";
import { update } from "./Interfaces";
export default async function Update({ table, values, condition }: update) {
  try {
    const Client = await client;

    const setClause = Object.entries(values)
      .map(([key, value]) => `"${key}" = ${value}`)
      .join(", ");

    const query = `UPDATE "${table}" SET ${setClause} WHERE ${condition}`;
    const res = await Client.query(query);
    return res;
  } catch (error) {
    console.error("update error", error);
    throw error;
  }
}
