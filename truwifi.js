var fs = require("fs");
var os = require("os");
var transactions = require("transactions.js");
var command = process.argv[2];

class app{
    constructor(){
        this._config = {};
        this._argument = [];
        this._configPromise = _readConfig();
    }
    start(command,argument){
        this._argument = argument;
        this._runCommand(command);
    }
    _runCommand(command){
        switch(command){
            case "start": _start(); break;
            case "stop" : _stop(); break;
            case "view": _view(); break;
        }
    }
    _start(){

    }
    _stop(){

    }
    _view(){
        _showProcessing();

        var promises = [
            _readTransaction(),
            this._configPromise
        ];
        Promise.all(promises).then( (values)=>{

        });
    }
    _showProcessing(){
        console.log("Processing...");
    }
    _readConfig(){
        var promise = new Promise( ( resolve, reject) =>{
            fs.readFile('config.json', (err,data) =>{
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
            fs.readFile('transactions.txt', ( err, data) =>{
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

(new app()).start(command,process.argv);