const signup = (req, res) => {
    res.json({
        success: true,
        message: "Signup route working!"
    });
};

module.exports = {
    signup
};