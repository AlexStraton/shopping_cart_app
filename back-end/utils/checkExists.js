import format from "pg-format";
import db from "../db/connection.js";
const checkExists = async (table, column, value) => {
    const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
    const dbOutput = await db.query(queryStr, [value]);
    if (dbOutput.rows.length === 0) {
        throw { status: 404, msg: "Resource Not Found" };
    }
};
export default checkExists;
