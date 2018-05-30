/* eslint-disable no-restricted-syntax */
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
  const counts = {};
  for (let i = 0; i < array.length; i += 1) {
    const el = array[i];
    if (Object.prototype.hasOwnProperty.call(counts, el)) {
      counts[el] += 1;
    } else {
      counts[el] = 1;
    }
  }
  return counts;
};

module.exports.getUniqueValues = function getUniqueValues(obj) {
  return Object.keys(obj).length;
};

module.exports.getVolatility = function getVolatility(uniqueValues, total) {
  return {
    isVolatile: (uniqueValues / total) >= 0.6 || false,
    isSteady: (uniqueValues / total) <= 0.1 || false,
  };
};

module.exports.isNumberType = function isNumberType(field) {
  return field.type === 'number' || field.type === 'floating point number';
};

module.exports.getSum = function getSum(acc, curr) {
  return acc + curr;
};

module.exports.calculateMedian = function calculateMedian(arr) {
  const array = arr.slice(0); // create copy
  const middle = (array.length + 1) / 2;
  const sorted = array.sort();
  return (sorted.length % 2) ?
    sorted[middle - 1] :
    (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
};

module.exports.getExtremes = function getExtremes(arr) {
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    const a = arr[i];
    if (a > max) max = a;
    if (a < min) min = a;
  }
  return { max, min };
};

module.exports.getStandardDeviation = function getStandardDeviation(arr, mean) {
  const distances = [];
  for (let i = 0; i < arr.length; i += 1) {
    const a = arr[i];
    distances.push((a - mean) ** 2);
  }
  return Math.sqrt(distances.reduce(module.exports.getSum) / arr.length);
};

module.exports.countRelativeOccurences = function countRelativeOccurences(counts, total, top = 5) {
  const keys = Object.keys(counts);
  const max = keys.length > top ? top : keys.length;
  const countsArray = [];
  for (const field of keys) {
    if (Object.prototype.hasOwnProperty.call(counts, field)) {
      countsArray.push([field, counts[field]]);
    }
  }
  countsArray.sort((a, b) => b[1] - a[1]);
  const relativeCounts = {};
  for (let i = 0; i < max; i += 1) {
    relativeCounts[countsArray[i][0]] = ((countsArray[i][1] / total) * 100).toFixed(2);
  }
  return relativeCounts;
};
