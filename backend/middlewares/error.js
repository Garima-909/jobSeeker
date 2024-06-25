
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `Resource not found! Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code === 11000){//for db
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "JsonWebTokenError"){
        const message = `JSON web token is invalid! Try again.`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpireError"){
        const message = `Json web token is expired! Try again.`;
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
};

export default ErrorHandler;