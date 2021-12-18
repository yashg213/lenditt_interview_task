const { handleError } = require('./../helper/response.helper');
const {
    isUndefined,
    isEmail,
    isNotEmpty,
} = require('../helper/validation.helper');
module.exports.signupValidation = async (req, res, next) => {
    let validationErr = "";
    try {
        console.log('req.body',req.body)

        validationErr +=  isUndefined(['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'countryCode'], req);
        if (validationErr === "") {
            validationErr += isEmail(req.body.email);
            validationErr += isNotEmpty(req.body.firstName);
            validationErr += isNotEmpty(req.body.lastName);
            validationErr += isNotEmpty(req.body.phoneNumber);
            validationErr += isNotEmpty(req.body.countryCode);
            validationErr += isNotEmpty(req.body.password);
        }
        if (validationErr === "") {
            next();
        } else {
            return handleError({ res: res, status: 422, err: validationErr, result: 0, data: {} })
        }
    } catch (err) {
        console.log('error', err);
        return handleError({ res: res, status: 422, err: err.message, result: 0, data: {} })
    }
}