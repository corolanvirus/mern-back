//const express = require("express");
const port = 1337;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
 /*    const app = express();

    app.get("/", (req, res) => {
        res.send("HomeView");
    });

    app.get("/list", (req, res) => {
        var list = ["explication nodejs", "explication pm2 vs cluster", "init projet" , "tailwind vs carbon", "chercher une platforme de leak gratuite (ou pas)"];
        res.json(list);
        console.log('Sent list of items');
    });

    // randomInt
    app.get("/:n", function (req, res) {
        let n = parseInt(req.params.n);
        let count = 0;

        if (n > 5000000000) n = 5000000000;

        for (let i = 0; i <= n; i++) {
            count += i;
        }

        res.json(count);
    }); */

    console.log(`Worker ${process.pid} started`); // multithread
    const server = new ApolloServer({resolvers, typeDefs});
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}