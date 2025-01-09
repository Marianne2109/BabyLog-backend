const handleError = (res, error) => {
    console.error(error);

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
};


module.exports = {
    handleError,
}