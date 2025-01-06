//User controller handles fetching and updating user details

const { User } = require("../models/UserModel");


//CRUD methods for User controller


//GET by id
const getUserById = async (req, res) => { };

//UPDATE
const updateUser = async (req, res) => { };

//DELETE
const deleteUser = async (req, res) => { };

//ALLOCATE ROLE
const allocateRole = async (req, res) => { };

//REMOVE ROLE
const revokeRole = async (req, res) => { };


module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
}

