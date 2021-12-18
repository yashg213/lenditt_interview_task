var jwt = require('jsonwebtoken');
const {
    appSecret
} = require('../config/config');

const {
    handleError,handleResponse
} = require('./response.helper');

module.exports.generate = async data => {
    return jwt.sign(data, appSecret,{expiresIn : "1 days"});
}

module.exports.validate = async (req,res,next) => {
    try{
        const splitToken = req.headers.authorization ? true : null;

        if(splitToken)
        {
                let values = req.headers.authorization.split(' ');
                let token = values[0].length > 20 ? values[0] : values[1]            
            
            jwt.verify(token, appSecret, async (err, decoded) =>  {
                if(err)
                {
                    console.log('err', err);
                    return handleError({res , 
                        statusCode : 403 ,
                        msg : 'Token Expired'})
                }else{
                      
                        req.user = decoded;
                        next();
                   
                }
              });    
        }else{
            return handleError({res , statusCode : 500 , err :'Access Token Required'});
        }
    }catch(err){
        console.log('err', err);
        return handleError({res , statusCode : 500 , err :err});
            
    }
}


