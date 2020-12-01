export function groupBy(data = [], keyFn) {
  return data.reduce((groupedData, item) => {
    const dayKey = keyFn(item);

    return {
      ...groupedData,
      [dayKey]: [...(groupedData[dayKey] || []), item]
    };
  }, {});
}
