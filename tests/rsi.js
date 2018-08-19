'use strict'

const assert = require('assert');
const should = require('should');
const RSI = require('../index');

describe('RSI Indicator', () => {
    describe('lossGain', () => {
        it('should calculate loss/gain on a 14 day period', (done) => {
            const data = [
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];
            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 }
            ];

            const rsi = new RSI(data, 14);
            rsi.lossOrGain((err, data) => {
                assert.deepEqual(data, expected);
                done();
            });
        });
    });

    describe('averageGain', () => {
        it('should calculate average gain on a 14 day period', (done) => {
            const data = [
                48.08,
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];

            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 },
                { value: 48.08, change: 0.47, gain: 0.47, loss: 0, avgGain: 0.37357142857142855 }
            ];

            const rsi = new RSI(data, 14);
            rsi.lossOrGain((err, data) => {
                rsi.averageGain((err, data) => {
                    assert.deepEqual(data, expected);
                    done();
                });
            });
        });
    });

    describe('averageLoss', () => {
        it('should calculate average loss', (done) => {
            const data = [
                48.08,
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];

            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 },
                { value: 48.08, change: 0.47, gain: 0.47, loss: 0, avgLoss: 0.16428571428571428 }
            ];

            const rsi = new RSI(data, 14);
            rsi.lossOrGain((err, data) => {
                rsi.averageLoss((err, data) => {
                    assert.deepEqual(data, expected);
                    done();
                });
            });
        });
    });

    describe('Calculate Relative Strength', () => {
        it('should calculate RS', (done) => {
            const data = [
                48.08,
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];

            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 },
                { value: 48.08, change: 0.47, gain: 0.47, loss: 0,
                    avgGain: 0.37357142857142855, avgLoss: 0.16428571428571428,
                    rs: 2.273913043478261 }
            ];

            const rsi = new RSI(data, 14);
            rsi.lossOrGain((err, data) => {
                rsi.averageGain((err, data) => {
                    rsi.averageLoss((err, data) => {
                        rsi.calculateRS((err, data) => {
                            assert.deepEqual(data, expected);
                            done();
                        });
                    });
                });

            });
        });
    });

    describe('Calculate Relative Strength Index steps', () => {
        it('should calculate RSI step by step', (done) => {
            const data = [
                48.08,
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];

            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 },
                { value: 48.08, change: 0.47, gain: 0.47, loss: 0,
                    avgGain: 0.37357142857142855, avgLoss: 0.16428571428571428,
                    rs: 2.273913043478261, rsi: 69.45551128818062 }
            ];

            const rsi = new RSI(data, 14);
            rsi.lossOrGain((err, data) => {
                rsi.averageGain((err, data) => {
                    rsi.averageLoss((err, data) => {
                        rsi.calculateRS((err, data) => {
                            rsi.calculateRSI((err, data) => {
                                assert.deepEqual(data, expected);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    describe('Relative Strength Index', () => {
        it('should calculate Relative Strength Index', (done) => {
            const data = [
                46.21,
                46.68,
                46.76,
                47.21,
                48.08,
                47.61,
                47.57,
                48.2,
                49.23,
                49.25,
                47.54,
                47.69,
                46.83,
                46.03,
                46.08,
                46.23,
                46.5,
                46.26,
                45.15
            ];

            const expected = [
                { value: 45.15, gain: 0, loss: 0, change: 0 },
                { value: 46.26, change: 1.11, gain: 1.11, loss: 0 },
                { value: 46.5, change: 0.24, gain: 0.24, loss: 0 },
                { value: 46.23, change: -0.27, gain: 0, loss: 0.27 },
                { value: 46.08, change: -0.15, gain: 0, loss: 0.15 },
                { value: 46.03, change: -0.05, gain: 0, loss: 0.05 },
                { value: 46.83, change: 0.80, gain: 0.80, loss: 0 },
                { value: 47.69, change: 0.86, gain: 0.86, loss: 0 },
                { value: 47.54, change: -0.15, gain: 0, loss: 0.15 },
                { value: 49.25, change: 1.71, gain: 1.71, loss: 0 },
                { value: 49.23, change: -0.02, gain: 0, loss: 0.02 },
                { value: 48.2, change: -1.03, gain: 0, loss: 1.03 },
                { value: 47.57, change: -0.63, gain: 0, loss: 0.63 },
                { value: 47.61, change: 0.04, gain: 0.04, loss: 0 },
                { value: 48.08, change: 0.47, gain: 0.47, loss: 0, avgGain: 0.37357142857142855, avgLoss: 0.16428571428571428, rs: 2.273913043478261, rsi: 69.45551128818062 },
                { value: 47.21, change: -0.87, gain: 0, loss: 0.87, avgGain:  0.3468877551020408, avgLoss: 0.2146938775510204, rs: 1.615731939163498, rsi: 61.76978286544926 },
                { value: 46.76, change: -0.45, gain: 0, loss: 0.45, avgGain: 0.3221100583090379, avgLoss: 0.23150145772594752, rs: 1.3913953781248032, rsi: 58.18341002297398 },
                { value: 46.68,	change: -0.08, gain: 0.00, loss: 0.08, avgGain:	0.29910219700124946, avgLoss: 0.22067992503123698, rs: 1.3553665878711527, rsi: 57.54376388162029 },
                { value: 46.21, change:	-0.47, gain: 0.00,	loss: 0.47, avgGain: 0.27773775435830306, avgLoss: 0.23848850181472006, rs: 1.1645750308502314, rsi: 53.80155523612382 }
            ];

            const rsi = new RSI(data, 14);
            rsi.calculate((err, data) => {
                if (err) {
                    done(err);
                }
                assert.deepEqual(data, expected);
                done();
            });
        });
    });
});
