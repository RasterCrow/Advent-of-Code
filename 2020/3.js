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

function main1While() {
    getFile("./3.txt")
        .then((data) => {
            let lines = data.split(/\r?\n/)
            //get values from line in

            let map = lines.map(line => {

                return line.split('')
            });
            let treeMaps = [map];
            let treesFound = 0;
            let freeSpaces = 0;
            let yPos = 0;
            let xPos = 0;
            let currentMap = 0
            console.log(yPos)
            while (yPos < map.length - 1) {
                //move
                xPos += 3;
                yPos += 1;
                //logic to add another map on the right
                if (xPos >= map[0].length) {

                    treeMaps.push(map);
                    xPos = xPos % map[0].length;
                    currentMap += 1;
                }
                //check if tree or free space
                if (treeMaps[currentMap][yPos][xPos] == '#') {

                    treesFound += 1;
                } else {

                    freeSpaces += 1;
                }
                //breakpoint
            }
            console.log(`Trees found : ${treesFound}, Free spaces found : ${freeSpaces}`)

        }).catch((err) => {
            console.log(err);
        });
}

function main1Rec() {
    getFile("./3.txt")
        .then((data) => {
            let lines = data.split(/\r?\n/)
            //get values from line in
            let map = lines.map(line => {
                return line.split('')
            });
            let treeMaps = [map];
            //arguments are (treeMaps, xPos, yPos, currentMap, treesFound, freeSpaces,slopeRight, slopeDown, map)
            let treesFound = recursion(treeMaps, 0, 0, 0, 0, 0, 3, 1, map)
            console.log(`Trees found : ${treesFound}`)
        }).catch((err) => {
            console.log(err);
        });
}

function recursion(treeMaps, xPos, yPos, currentMap, treesFound, freeSpaces, slopeRight, slopeDown, map) {
    if (yPos == map.length - 1) {
        return treesFound
    } else {
        //move
        xPos += slopeRight;
        yPos += slopeDown;
        //logic to add another map on the right
        if (xPos >= map[0].length) {
            treeMaps.push(map);
            xPos = xPos % map[0].length;
            currentMap += 1;
        }
        //check if tree or free space
        if (treeMaps[currentMap][yPos][xPos] == '#') {
            treesFound += 1;
        } else {
            freeSpaces += 1;
        }
        //recursion 
        return recursion(treeMaps, xPos, yPos, currentMap, treesFound, freeSpaces, slopeRight, slopeDown, map)
    }
}

function main2Rec() {
    getFile("./3.txt")
        .then((data) => {
            let lines = data.split(/\r?\n/)
            //get values from line in
            let map = lines.map(line => {
                return line.split('')
            });
            let treeMaps = [map];

            //arguments are (treeMaps, xPos, yPos, currentMap, treesFound, freeSpaces,slopeRight, slopeDown, map)
            let treesMultiplied = recursion(treeMaps, 0, 0, 0, 0, 0, 1, 1, map) * recursion(treeMaps, 0, 0, 0, 0, 0, 3, 1, map) * recursion(treeMaps, 0, 0, 0, 0, 0, 5, 1, map) * recursion(treeMaps, 0, 0, 0, 0, 0, 7, 1, map) * recursion(treeMaps, 0, 0, 0, 0, 0, 1, 2, map)
            console.log(`Trees multiplied : ${treesMultiplied}`)
        }).catch((err) => {
            console.log(err);
        });
}
main2Rec();