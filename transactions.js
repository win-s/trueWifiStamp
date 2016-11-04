"use strict";
var path = require("path");
var moment = path.resolve(__dirname,"node_modules","moment","moment.js");
var CONST = require("const.js");

class transactions{
    constructor(transactionData,config){
        this._transactionData = transactionData;
        this._config = config;
        this._duration = [];
        this.currDuration = null;
    }
    print(){
        console.log();
    }
    processData(){
        var startDate = null;
        var cmd,date,stopDate,spentTime;
        this._transactionData.forEach( (transaction)=>{
            transaction = transaction.split(" ");
            cmd = transaction[0];
            date = transaction[1];

            if(cmd === CONST.START){
                startDate = moment( date,this._config.dateTimeFormat );
            }else if(cmd === CONST.STOP){
                if(startDate !== null){
                    stopDate = moment( date, this._config.dateTimeFormat);
                    this.calculateDuration(startDate,stopDate);

                }
            }
        });
    }
    _calculateDuration(startDate,stopDate){
        var currDuration = this._duration[ this._duration.length-1 ];
        this._isSameMonth( currDuration );
        var spentTime = moment.duration( stopDate.diff(startDate) );

        this._duration += spentTime.minutes();
        this._duration += spentTime.seconds() > 0 ?1:0;// if seconds greater than 0 just shit up one minute

        startDate = null;
    }
    _shiftPeriod(){

    }
    _isSameMonth(){
        
    }
}
module.exports = transactions;