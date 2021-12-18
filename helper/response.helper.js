module.exports.handleResponse = ({
    res,
    statusCode = 200,
    msg = 'Success',
    result = true,
    data = {},
  }) => {
    return res.status(statusCode).send({msg, data , result});
  };
  
  module.exports.handleError = ({
    res,
    statusCode = 500,
    err = 'error',
    result = false  ,
    data = {},
  }) => {
    console.log('statusCode',statusCode,err, data , result)
  
    return res.status(statusCode).send({
      result,
      msg: err,
      data,
    });
  };
  
  