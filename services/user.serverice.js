const userModel = require("../models/user.model");
module.exports.createUser = async ({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password) {
        throw new Error("Missing required fields");
    }
    const user = await userModel.create({
        fullname: {
            firstname: firstName,
            lastname: lastName},
        email: email,
        password: password
    });
    return user;
}