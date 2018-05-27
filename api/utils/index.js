const FLOATING_POINT = /^[-+]?[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?$/i;
const NUMBER = /^[-+]?[0-9]+$/i;

function mostFrequent(arr) {
  const counts = {};
  let highestCount = 0;
  let mostFreq = arr[0];
  for (let i = 0; i < arr.length; i += 1) {
    const a = arr[i];
    counts[a] = counts[a] ? counts[a] + 1 : 1;
    if (highestCount < counts[a]) {
      highestCount = counts[a];
      mostFreq = a;
    }
  }
  return mostFreq;
}

module.exports.detectType = function detectType(samples) {
  const results = [];
  for (let i = 0; i < samples.length; i += 1) {
    const sample = samples[i];
    if (FLOATING_POINT.test(sample)) {
      results.push('floating point number');
    } else if (NUMBER.test(sample)) {
      results.push('number');
    } else {
      results.push('string');
    }
  }
  return mostFrequent(results);
};
