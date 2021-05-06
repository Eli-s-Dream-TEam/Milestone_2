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
      let data = {};
      for(var i = 1; i < parsedCsv.length; i++) {
        var mydata = parsedCsv[i].split(',');
        for(var j = 0; j < mydata.length; j++) {
          if (i == 1){
            var lineData = [];
            var flo = parseFloat(mydata[j].trim());
            lineData.push(flo);
            data[features[j].trim()] = lineData;
          }
          else {
              var floa = parseFloat(mydata[j].trim());
              data[features[j].trim()].push(floa);
          }
        }
      }
      resolve(data);
    };

    reader.readAsBinaryString(csvFile);
  });
}
