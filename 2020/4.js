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

//IDEA
//traverse till yPos==treeMaps[0].length
//if xPos>treeMaps[x][y].length ? addMap treeMaps.append(map)

function main1() {
    getFile("./4.txt")
        .then((data) => {

            let passports = data.split("\r\n\r\n")
            let formattedPassports = passports.join("\r\n")
            //let passports = lines.filter(x => x != "")

            // passports = passports.map(line => {
            //     return line.split(" ")
            // });

            console.log(formattedPassports[2])

        }).catch((err) => {
            console.log(err);
        });
}

main1();