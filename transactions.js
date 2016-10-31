"use strict";
var path = require("path");
var moment = path.resolve(__dirname,"node_modules","moment","moment.js");

class transactions{
    constructor(transactionData,config){
        this._transactionData = transactionData;
        this._config = config;
    }
    print(){

    }
    processData(){
        
    }
    

}
module.exports = transactions;