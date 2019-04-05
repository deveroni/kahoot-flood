var Kahoot = require("kahoot.js-updated");
module.exports = function(pin, name) {
    var client = new Kahoot;
    client.join(pin, name);
    client.on("joined", () => {
        console.log(`Joined as ${name}`);
    });
    client.on("questionStart", question => {
        randomnumber = Math.floor(Math.random() * (question["client"]["quiz"]["answerCount"]+1));
        question.answer(randomnumber);
    });
    client.on("quizEnd", () => {
        console.log("The quiz has ended.");
    });
}