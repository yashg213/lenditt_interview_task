const  { handleResponse, handleError } = require('../helper/response.helper')
const bcrypt =  require('bcryptjs');
var jwt = require('jsonwebtoken');

const { generate } = require('../helper/token.helper');
const { userDetails, saveUser, userUpdateService } = require('../service/user.service');
module.exports.signupUser = async (req, res) => {
try {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const { email } = req.body;

    if (emailRegexp.test(email)) {
        if ((await userDetails(req.body.email, 'email')) === null) {

            let signupUser = await saveUser(req.body)
            if (signupUser) {
                delete signupUser.password;
                delete signupUser.userToken;

                return handleResponse({ res, data:signupUser , msg: 'SUCCESS' });
            } else {
                return handleError({ res, data: {}, err: 'SOMETHING WENT WRONG' });
            }
        } else {
            return handleError({ res, data: {}, err: 'USER ALREADY REGISTERED' });

        }

    } else {
        return handleError({ res, data: {}, err: responseMessage.ENTER_CORRECT_EMAIL });
    }  
} catch (error) {
    console.log(error)
}
   
}
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    let checkEmail = await userDetails(email, 'email');

    if (!checkEmail) return handleError({ res, data: {}, err: 'no user Found ' })


    return await bcrypt
        .compare(password, checkEmail.password)
        .then(async function (response, err) {
            if (response) {
                delete checkEmail.userToken;
                let token = await generate(checkEmail);
                let userUpdate = await userUpdateService(checkEmail._id, { userToken: token });
                delete userUpdate.password;
                return handleResponse({ res, data: userUpdate, msg: 'LOGIN SUCCESSFULLY' });
            } else {
                console.log('err',err)

                return handleError({ res, data: [], err: 'INCORRECT PASSWORD' })
            }
        }).catch(err => {
            console.log('err',err)
            return handleError({ res, data: [], err: 'INCORRECT PASSWORD' }) });

}
module.exports.logout = async (req, res) => {
    try {
    // remove token form database
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify( token, 'Test');
    let removeToken = await userUpdateService(decoded._id, { userToken: '' });
    if (removeToken) {
        delete removeToken.password;
        delete removeToken.userToken;

        handleResponse({ res, data: removeToken.id, msg: 'Successfully Logout' });
    } else {
        
        return handleError({ res, data: {}, err: 'Something Went Wrong Please Try Again' });
    } 
    } catch (error) {
       console.log(error) 
    }
   
}