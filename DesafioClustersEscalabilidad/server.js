const express = require('express')
const { routerGeneral } = require('./routes/connection.js')
const parseArgs = require('minimist')

/*Clusters*/
const cluster = require("cluster");
const {cpus} = require('os');
const cpuNum = cpus().length;

const yargs = require("yargs");
const args = yargs(process.argv.slice(2))

.alias({
	m: "modo",
	p: "puerto",
	d: "debug",
})
.default({
	modo: "FORK",
	puerto: 8080,
	debug: false
})
.argv

const mCluster = args.m === "CLUSTER"

if(mCluster){console.log("Server iniciado en modo CLUSTER")}
else{console.log("Server iniciado en modo FORK")}

if(mCluster && cluster.isPrimary){
    console.log(`Cluster iniciado. CPUS: ${cpuNum}`);
    console.log(`PID: ${process.pid}`);
    for(let i = 0; i < cpuNum; i++ ){
        cluster.fork();
    }

    cluster.on("exit", worker =>{
        console.log(`${new Date().toLocaleString()}:
        Worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
	const app = express()
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())

	app.use(express.static("/public"))
	app.use("/", routerGeneral)

	app.set("view engine", "ejs");
	app.set("views", "./views");

	//const args = parseArgs(process.argv.splice(2) ,{default: {puerto: 8080}})
	//const PORT = args.puerto

	const server = app.listen(args.p, () => {
		console.log(`Servidor conectado en puerto ${server.address().port}`)
	})
	server.on("error", (error) => console.log(`Error en servidor ${error}`))
}	