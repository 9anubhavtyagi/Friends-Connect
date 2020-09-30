module.exports.home = function(req, res){
    return res.render('home',
    {
        title: "Friends-Connect",
        heading: "Friends-Connect"
    });
};