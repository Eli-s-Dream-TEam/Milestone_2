/**
 * @param {File} csvFile
 * @returns {Object}
 */
export default function parse(csvFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const parsedCsv = reader.result.split("\n");
      const features = parsedCsv[0].split(",");
      const rawData = parsedCsv.slice(1);
      let data = {};

      features.forEach((feature, index) => {
        let featureData = [];
        rawData.forEach((row) => featureData.push(row.split(",")[index]));
        data[feature] = featureData;
      });

      resolve(data);
    };

    reader.readAsBinaryString(csvFile);
  });
}
