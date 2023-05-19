export const getMean = (arr: any, key: string) => {
  let total = 0;
  for (const element of arr) {
    if (element[key]) {
      total += element[key]
    }
  }
  return (total / arr.length).toFixed(3);
};

export const getMedian = (arr: any, key: string) => {
  const { length } = arr;

  arr.sort((a: any, b: any) => a[key] - b[key]);

  if (length % 2 === 0) {
    return ((arr[length / 2 - 1][key] + arr[length / 2][key]) / 2).toFixed(3);
  }

  return (arr[(length - 1) / 2][key]).toFixed(3);
};

export const getMode = (arr: any, key: string) => {
  const mode: any = {};
  let max = 0,
    count = 0;

  for (const element of arr) {
    const item = element[key];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }

  return max;
};
