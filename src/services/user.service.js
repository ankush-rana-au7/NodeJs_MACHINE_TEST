const httpStatus = require('http-status');
const { User, UserLookUp } = require('../models');
const crypto = require('crypto')
const ApiError = require('../utils/ApiError');
const algorithm = 'aes-256-cbc';

const createUser = async (userBody, user_id) => {

    /* MiddleWare for Encrypting the Email*/
    const cipher = crypto.createCipher(algorithm, process.env.ENCRYPTION_KEY);
    const encryptedEmail = cipher.update(userBody.email, 'utf8', 'base64') + cipher.final('base64');

    try {

        const findEmail = await User.findOne({ Email: userBody.email });
        if (findEmail) {
            throw new ApiError(httpStatus.CONFLICT, 'Email already exist!');
        }
        const user = new User({
            Email: userBody.email,
            UID: user_id,
        });
        await user.save();   // Save user to user table

        // Create new userlookup entry
        const userlookup = new UserLookUp({
            UID: user_id,
            EID: encryptedEmail
        });

        await userlookup.save(); // Save userslookup entry to users_lookup table
        return {
            user,
            userlookup,
        }
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};


const searchEmail = async (email) => {
    try {

        /* MiddleWare for Encrypting the Email*/
        const cipher = crypto.createCipher(algorithm, process.env.ENCRYPTION_KEY);
        const encryptedEmail = cipher.update(email, 'utf8', 'base64') + cipher.final('base64');
        const findEmail = await UserLookUp.findOne({ EID: encryptedEmail }) //query for finding encrypted email in users_lookup table
        return findEmail;
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = {
    createUser,
    searchEmail,
};
