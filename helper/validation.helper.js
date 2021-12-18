const path = require('path');
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegex = /^\d*$/;
const dateTimeRegex = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
const timeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
const dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/; //dd-mm-yyyy formate

module.exports.isRequired = (param, body, name) => {

    if (body[param] && body[param] !== undefined) {
        if (body[param].trim() != '') {
            return '';
        } else {
            if (name) {
                return ` ${name} is required`;
            } else {
                return ` ${param} is required `;
            }
        }
    } else {
        if (name) {
            return ` ${name} is required`;
        } else {
            return ` ${param} is required `;
        }
    }
}
module.exports.isUndefined = (paramArray, req) => {
    var response = ""
    paramArray.forEach(element => {
        if (req.body[element] === undefined) {
            response += element + " parameter required ";
        }
    });
    return response;
}
module.exports.isAlphabet = (value, name) => {
    var response = ""

    if (value.length === 0) {
        response += name + " can not empty "
    } else if (!nameRegex.test(value)) {
        response += name + " only contains alphabets ,"
    }
    return response;
}
module.exports.isEmail = (value) => {
    var response = ""
    var atPosition = value.indexOf("@");
    var dotPosition = value.lastIndexOf(".");
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= value.length) {
        response = " Email is not valid ,"
    } else {
        if (value.length === 0) {
            response = " Email Can not Empty ,"
        } else if (!emailRegex.test(value)) {
            response = " Email is not valid ,"
        }
    }
    return response;

}
module.exports.isContactNumber = (value) => {
    var response = ""
    if (value.length === 0) {
        response = " contactNumber can not Empty ,"
    } else if (value.length != 10) {
        response = " contact number should be 10 numbers ,"
    } else if (!numberRegex.test(value)) {
        return " only allow digit's in contact number ,"
    }
    return response;
}

module.exports.isNotEmpty = (value, field) => {
    var response = ""
    if (value.length === 0) {
        response = field + " Can not Empty ,"
    }
    return response;
}
module.exports.isDate = (value, field) => {
    var response = ""
    if (!dateRegex.test(value)) {

        response = field + " is not in valid formate acceptable formate is dd-mm-yyyy ,"
    }
    return response;
}
module.exports.isOnlyValue = (value, field, valueArr) => {
    let isCorrect = false;
    let accept = "[ ";
    var response = ""
    valueArr.forEach(element => {
        if (element === value) {
            isCorrect = true;
        }
        accept += element + " "
    });
    accept += " ]";
    if (!isCorrect) {
        response = field + " is only accept " + accept + " values , ";
    }
    return response;
}
module.exports.arrayLength = (value, length, field) => {
    let response = {};
    response = Array.isArray(value) ? "" : "" + field + " must be an array";
    if (response = "") {
        if (response.length == length) {
            response = field + "must be in length of " + length;
        }
    } else {
        return response;
    }
}

