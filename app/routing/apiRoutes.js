var path = require("path");
var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {
        var newUser = req.body;
        var newUserResponses = newUser.scores;
        console.log(newUser);
        // ------------------------------compatibility logic--------------------------
        var matchName = "";
        var matchPhoto = "";
        var difference = 1000;
        for(var i = 0; i < friends.length; i++) {
            var sub = 0;
            for(var j = 0; j < friends[i].scores.length; j++) {
                sub += Math.abs(friends[i].scores[j] - newUserResponses[j]);
                console.log("sub:" + sub);
            }
            if (sub < difference) {
                difference = sub;
                matchName = friends[i].name;
                matchPhoto = friends[i].photo;
            }
        }

        friends.push(newUser);
        res.json({matchName: matchName, matchPhoto: matchPhoto});
    });
};