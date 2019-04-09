var Kahoot = require("kahoot.js-updated");

module.exports = function(pin, name) {
    var client = new Kahoot;
    try {
        client.join(pin, name)
    } catch (error) { 
        console.dir("ERROR")
        process.exit(0)
        // if(error.toString() == 'request error: Kahoot session header is undefined. (This normally means that the room no longer exists.)') {
        //     process.exit(0)
        // }
    }
    client.on("joined", () => {
        console.log(`Joined as ${name}`);
    });
    client.on("questionStart", question => {
        randomnumber = Math.floor(Math.random() * (question["client"]["quiz"]["answerCount"]+1));
        question.answer(randomnumber);
    });
    client.on("quizEnd", () => {
        client.leave()
        process.exit(0);
        console.log("The quiz has ended.");
    });
}