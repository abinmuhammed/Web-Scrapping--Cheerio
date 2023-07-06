let constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVERERROR: 500,
  };
  
  const senderrormessage = (res, Title, message, stackTrace) => {
    res.json({
      Title: Title,
      message: message,
      stackTrace: stackTrace,
    });
  };
  const Errorhandler = (err, req, res, next) => {
    console.log("Caught in error handler ,It is working... ");
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        senderrormessage(res, "Validation Error", err.message, err.stack);
        break;
      case constants.UNAUTHORISED:
        senderrormessage(res, "Unauthorized ", err.message, err.stack);
        break;
      case constants.NOT_FOUND:
        senderrormessage(res, "Not_Found", err.message, err.stack);
        break;
      case constants.FORBIDDEN:
        senderrormessage(res, "Not_Found", err.message, err.stack);
        break;
      case constants.SERVERERROR:
        senderrormessage(res, "Not_Found", err.message, err.stack);
        break;
  
      default:
        senderrormessage(
          res,
          "Ooops ! Some error Occured",
          err.message,
          err.stack
        );
  
        break;
    }
  };
  
  module.exports = {
    Errorhandler
  };
  