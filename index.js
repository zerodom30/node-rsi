const async = require('async');
const Decimal = require('decimal.js');

class RSI {
    constructor(values, period) {
        this.values = values.reverse();
        this.data = [];
        this.period = period;
    }

    calculate(callback) {
        async.series([
                (next) => this.lossOrGain(next),
            (next) => this.averageGain(next),
            (next) => this.averageLoss(next),
            (next) => this.calculateRS(next),
            (next) => this.calculateRSI(next)
    ],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[4]);
        });
    }

    lossOrGain(callback) {
        this.values.forEach((val, idx) => {
            if (idx > 0) {
            const prevVal = this.values[idx-1];
            const change = Decimal.sub(val, prevVal);
            this.data.push({
                value: val,
                change: change.toNumber(),
                gain: (change.toNumber() > 0) ? change.toNumber() : 0,
                loss: (change.toNumber() < 0) ? change.abs().toNumber() : 0
            });
        } else {
            this.data.push({
                value: val,
                gain: 0,
                loss: 0,
                change: 0
            })
        }
    });

        callback(null, this.data);
    }

    averageGain(callback) {
        this.getAverages('gain', callback)
    }

    averageLoss(callback) {
        this.getAverages('loss', callback)
    }

    getAverages(key, callback) {
        let sum = new Decimal(0);
        let avg = 0;
        let overallAvg = 0;
        const upperCaseKey = key.charAt(0).toUpperCase() + key.substr(1);
        this.data.forEach((val, idx) => {
            if (idx < this.period) {
            sum =  sum.plus(val[key]);
        } else if (idx === this.period) {
            sum =  sum.plus(val[key]);
            avg = sum.dividedBy(this.period);
            this.data[idx][`avg${upperCaseKey}`] =
                avg.toNumber();
        } else {
            overallAvg =
                Decimal.mul(this.data[idx-1][`avg${upperCaseKey}`], (this.period - 1))
                    .plus(val[key])
                    .dividedBy(this.period);
            this.data[idx][`avg${upperCaseKey}`] =
                overallAvg.toNumber();
        }
    });
        callback(null, this.data);
    }

    calculateRS(callback) {
        let rs = 0;
        this.data.forEach((val, idx) => {
            if (val.avgGain !== undefined && val.avgLoss !== undefined &&
        !isNaN(parseFloat(val.avgGain)) && !isNaN(parseFloat(val.avgLoss))) {
            val.rs = Decimal.div(val.avgGain, val.avgLoss).toNumber();
        }
    });
        callback(null, this.data);
    }

    calculateRSI(callback) {
        let rs = 0;
        this.data.forEach((val, idx) => {
            if (val.avgLoss) {
            this.data[idx].rsi = Decimal.sub(100, Decimal.div(100, Decimal.add(1, val.rs))).toNumber();
        } else if(val.rs != undefined) {
            this.data[idx].rsi = 100;
        }
    });
        return callback(null, this.data);
    }
}

module.exports = RSI;
