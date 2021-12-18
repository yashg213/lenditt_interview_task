const { user } = require('../model/userModel');

module.exports.userDetails = async (value,field = '_id') => {
    return await user.findOne({
        [`${field}`] : value
    }).lean();
}
module.exports.saveUser =   async (userData) => {
    const newUser = new user(userData);
    const saveUser = await newUser.save();
    return saveUser;
}
module.exports.userUpdateService = async (userId , userData) => {

    console.log('userId',userId);
    console.log('userData',userData);
    const updatedUser = await user.findOneAndUpdate({
        _id : userId
    },{
        ...userData
    },{
        new : true 
    }).lean();
    console.log('userUser',updatedUser);
    return updatedUser;
}