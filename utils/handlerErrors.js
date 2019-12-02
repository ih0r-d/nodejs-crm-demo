module.exports = (e, res) => {
    res.status(500).json({
        success: false,
        msg: e.message ? e.message : e
    })
}
