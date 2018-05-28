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

module.exports.countOccurences = function countOccurences(array) {
  const result = {
    total: array.length,
    data: array,
    counts: {},
    uniqueValues: 0,
    isVolatile: false,
    isSteady: false,
  };
  for (let i = 0; i < array.length; i += 1) {
    const el = array[i];
    if (Object.prototype.hasOwnProperty.call(result.counts, el)) {
      result.counts[el] += 1;
    } else {
      result.counts[el] = 1;
    }
  }
  result.uniqueValues = Object.keys(result.counts).length;
  if ((result.uniqueValues / result.total) > 0.6) result.isVolatile = true;
  else if (result.uniqueValues / result.total <= 0.1) result.isSteady = true;
  return result;
};
