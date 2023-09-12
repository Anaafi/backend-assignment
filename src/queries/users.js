/**
 * Add New User
 */
const addUser = `
  INSERT INTO users(
    firstName,
    lastName,
    username,
    password
  )
  VALUES ($1,$2,$3,$4) RETURNING id, firstName, lastName, username, created_at
`;

const findUserByUsername = `
 SELECT firstName, lastName, username FROM users WHERE username=$1
`;

const findUserById = `
 SELECT id, firstName, lastName, username FROM users WHERE id=$1
`;

const updateUserById = `
  UPDATE users SET firstName=$1, lastName=$2, username=$3 WHERE id=$4 RETURNING id, firstName, lastName, username
`;

const deleteUserById = `
  DELETE FROM users WHERE id=$1 RETURNING id, firstName, lastName, username
`;

module.exports = {
    addUser,
    findUserByUsername,
    findUserById,
    updateUserById,
    deleteUserById
};