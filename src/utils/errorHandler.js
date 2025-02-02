

const handleError = (res, error) => {
    console.error("Error occurred:", error.message);

    const responseMessage = 
      process.env.NODE_ENV === "development"
      ? { message: error.message, stack: error.stack }  
      : { message: "Internal server error"};

    res.status(500).json(responseMessage);
};

module.exports = {
    handleError,
};