[![Coverage Status](https://coveralls.io/repos/github/zerodom30/node-rsi/badge.svg?branch=master)](https://coveralls.io/github/zerodom30/node-rsi?branch=master)

# node-rsi

A simple node module to calculate the Relative Strength Index and avoid JavaScript precision issues.

# Usage:

```
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

   const rsi = new RSI(data, 14);
   const result = rsi.calculate((err, result) => {
        if (err) {
            return err;
        }
        console.log('RSI: ', result);
        /*
        RSI:

        [
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
        */
   });
```

###### Commit Message With Emoji Prefix
See reference [here](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
 inspiration & reference by
  [dannyfritz/commit-message-emoji](https://github.com/dannyfritz/commit-message-emoji).
