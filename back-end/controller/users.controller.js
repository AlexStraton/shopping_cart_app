import fetchAllUsers from "../models/users.models.js";
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await fetchAllUsers();
        res.status(200).send({ users: allUsers.rows });
    }
    catch (err) {
        next(err);
    }
};
export { getAllUsers };
