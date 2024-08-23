import db from "../db/connection.js";
const fetchAllUsers = async () => {
    return db.query(`SELECT * FROM users;`);
};
export default fetchAllUsers;
