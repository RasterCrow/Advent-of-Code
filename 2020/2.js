const fs = require("fs");

const getFile = (input) =>
  new Promise((resolve, reject) => {
    fs.readFile(input, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

function main1() {
  getFile("./2.txt")
    .then((data) => {
      const lines = data.split(/\r?\n/);
      //get values from line in
      let linesTrimmed = lines.map((line) =>
        line.split(" ").map((element, index) => {
          return index == 0
            ? element.split("-")
            : index == 1
            ? element.charAt(0)
            : index == 2
            ? element
            : null;
        })
      );
      //find occurences
      let validPsw = linesTrimmed.filter((element) => {
        let count = 0;
        element[2].split("").forEach((char) => {
          if (char == element[1]) {
            count += 1;
          }
        });
        if (
          count >= parseInt(element[0][0]) &&
          count <= parseInt(element[0][1])
        ) {
          return element;
        }
      });
      console.log(validPsw.length);
    })
    .catch((err) => {
      console.log(err);
    });
}
function main2() {
  getFile("./2.txt")
    .then((data) => {
      const lines = data.split(/\r?\n/);
      //get values from line in
      let linesTrimmed = lines.map((line) =>
        line.split(" ").map((element, index) => {
          return index == 0
            ? element.split("-")
            : index == 1
            ? element.charAt(0)
            : index == 2
            ? element
            : null;
        })
      );
      //find occurences
      let validPsw = linesTrimmed.filter(
        (element) =>
          !(
            element[2].charAt(element[0][0] - 1) == element[1] &&
            element[2].charAt(element[0][1] - 1) == element[1]
          ) &&
          (element[2].charAt(element[0][0] - 1) == element[1] ||
            element[2].charAt(element[0][1] - 1) == element[1])
      );
      console.log(validPsw.length);
    })
    .catch((err) => {
      console.log(err);
    });
}
main2();
