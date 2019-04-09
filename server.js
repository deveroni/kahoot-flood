var http = require('http');
var shell = require('shelljs')
// var cluster = require('cluster');

// if(cluster.isMaster) {
    http.createServer(function (req, res) {
        console.log('A request appeared...')
        if(req.headers.amount && req.headers.pin && req.headers.prefix) {
            amount = Number(req.headers.amount),
            pin = Number(req.headers.pin),
            prefix = req.headers.prefix
            if(shell.exec('go run spam.go ' + pin + ' ' + prefix + ' ' + amount).code !== 0) {
                res.write('Error: Kahoot spam failed');
                res.end();
                shell.exit(1);
            } else {
                setTimeout(shell.exit(0), 5000)
                res.write('Hij is bezig hoor! Powered by Netlob');
                res.end();
            }
            // for (var i = 0; i < amount; i += 1) {
            //     cluster.fork();
            // }
            // cluster.on('exit', function () {
            //     cluster.fork();
            // });
            // var bot = {
            //     "amount": amount,
            //     "pin": pin,
            //     "prefix": prefix
            // }
            // cluster.on('message', (worker, msg, handle) => {
            //     if(msg = 'Bot please')
            //         worker.send(bot);
            // });
        } else {
            res.write('Geef een pin, aantal en prefix op aub.');
            res.end();
        }
    }).listen(7890), console.log('Server started...');

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//         worker.kill();
//     });
// } else if(cluster.isWorker) {
//     process.send('Bot please');
//     process.on('message', (msg) => {
//         var join = require('./index');
//         join(msg["pin"], msg["prefix"]+cluster.worker.id);
//     })
// }