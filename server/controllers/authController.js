const users = [];

const signup = (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });

    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {

        return res.status(400).json({
            success: false,
            message: "Email already exists."
        });

    }

    const newUser = {

        id: Date.now(),

        fullName,

        email,

        password

    };

    users.push(newUser);

    res.status(201).json({

        success: true,

        message: "Signup successful!",

        user: {

            id: newUser.id,

            fullName: newUser.fullName,

            email: newUser.email

        }

    });

};
const login = (req, res) => {

    const { email, password } = req.body;

    const user = users.find(

        u => u.email === email && u.password === password

    );

    if (!user) {

        return res.status(401).json({

            success: false,

            message: "Invalid email or password."

        });

    }

    res.json({

        success: true,

        message: "Login successful!",

        user: {

            id: user.id,

            fullName: user.fullName,

            email: user.email

        }

    });

};

module.exports = {

    signup,
    login

};