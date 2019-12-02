module.exports.login = (req,res) => {
    res.status(200).json({
        login : "Successfully login"
    })
}

module.exports.register = (req,res) => {
    res.status(200).json({
        register : "Successfully registration"
    })
}


