const responseHandler = (res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
      statusText: status,
      message: message,
      data: data,
      statusCode: statusCode,
    });
  };
  
  export default responseHandler;