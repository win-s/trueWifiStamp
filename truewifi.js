"use strict";

var fs = require("fs");
var os = require("os");
var path = require("path");
var transactions = require( path.resolve(__dirname,"transactions.js"));

// var transactions = require( "./transactions.js");
// var transactions = {};
var command = process.argv[2];

class app{
    constructor(){
        this._config = {};
        this._argument = [];
        this._configPromise = this._readConfig();
    }
    start(command,argument){
        this._argument = argument;
        this._runCommand(command);
    }
    _runCommand(command){
        switch(command){
            case "start": this._start(); break;
            case "stop" : this._stop(); break;
            case "view": this._view(); break;
        }
    }
    _start(){

    }
    _stop(){

    }
    _view(){
        this._showProcessing();

        var promises = [
            this._readTransaction(),
            this._configPromise
        ];
        Promise.all(promises).then( (values)=>{
            let transactionData = values[0];
            let transactionModel = new transactions(transactionData,this._config);
            transactionModel.processData();
            transactionModel.print();
        });
    }
    _showProcessing(){
        console.log("Processing...");
    }
    _readConfig(){
        var promise = new Promise( ( resolve, reject) =>{
            fs.readFile( path.resolve(__dirname,'config.json') , (err,data) =>{
                if(err) {
                    reject(err);
                    console.log("Error : reading config file (config.json)");
                    return;
                }
                this._config = data;
                resolve(data);
            });
        } );
        return promise;
    }
    _readTransaction(){
        var promise = new Promise( ( resolve, reject) =>{
            fs.readFile( path.resolve(__dirname,'transactions.txt'), ( err, data) =>{
                if(err){
                    reject(err);
                    console.log("Error : reading transaction file(tranactions.txt)");
                    return err;
                }
                resolve(data);
            });
        });
        return promise;
    }
}

// (new app()).start(command,process.argv);
(new app()).start("view",process.argv);