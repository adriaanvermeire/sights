/* eslint-disable no-restricted-syntax */
const chrono = require('chrono-node');

const FLOATING_POINT = /^[-+]?[0-9]*[.,][0-9]+([eE][-+]?[0-9]+)?$/i;
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

function toPercentage(num, total, decimals = 2) {
  return ((num / total) * 100).toFixed(decimals);
}

module.exports.objectToArray = function objToArray(object) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const result = [];
  for (let i = 0; i < keys.length; i += 1) {
    result.push([keys[i], values[i]]);
  }
  return result;
};

module.exports.detectType = function detectType(samples) {
  const results = [];
  for (let i = 0; i < samples.length; i += 1) {
    const sample = samples[i];
    if (FLOATING_POINT.test(sample)) {
      results.push('floating point number');
    } else if (NUMBER.test(sample)) {
      results.push('number');
    } else if (chrono.strict.parseDate(sample)) {
      results.push('timestamp');
    } else {
      results.push('string');
    }
  }
  return mostFrequent(results);
};

module.exports.countOccurences = function countOccurences(array) {
  const counts = {};
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    const el = array[i];
    if (Object.prototype.hasOwnProperty.call(counts, el)) {
      counts[el] += 1;
    } else {
      counts[el] = 1;
    }
  }
  const fields = Object.keys(counts);
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    result.push([field, counts[field]]);
  }

  return result;
};

module.exports.getUniqueValues = function getUniqueValues(array) {
  return array.length;
};

module.exports.getVolatility = function getVolatility(uniqueValues, total) {
  return {
    isVolatile: (uniqueValues / total) >= 0.7 || false,
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
  const remainder = keys.length - max;
  const relativeCounts = [];
  for (let i = 0; i < max; i += 1) {
    const field = counts[i][0];
    const percentage = toPercentage(counts[i][1], total);
    relativeCounts.push([field, percentage]);
  }
  // let other = 0;
  // for (let i = max; i < remainder; i += 1) {
  //   other += counts[i][1];
  //   if (i === remainder - 1) other = toPercentage(other, total);
  // }
  // if (other > 0) relativeCounts[max] = ['other', other];
  return relativeCounts;
};


module.exports.complementedFilter = function complementedFilter(arr, test) {
  const complement = [];
  const filtered = arr.filter((element) => {
    if (!test(element)) {
      complement.push(element);
      return false;
    }
    return true;
  });
  return { complement, filtered };
};

module.exports.pickRandom = function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports.longestCategory = function longestCategory(categories) {
  let maxLength = -Infinity;
  for (const [category] of categories) {
    maxLength = category.length > maxLength ? category.length : maxLength;
  }
  return maxLength;
};

