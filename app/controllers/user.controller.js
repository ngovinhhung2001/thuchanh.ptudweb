exports.showSignInPage = (req, res) => {
    res.send({ message: "show signIn page" });
}

exports.signIn = (req, res) => {
    res.send({ message: "signIn handler" });
}

exports.showSignUpPage = (req, res) => {
    res.send({ message: "show signUp page" });
}

exports.signUp = (req, res) => {
    res.send({ message: "signUp handler" });
}