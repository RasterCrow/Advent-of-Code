const fs = require('fs')

const getFile = (input) => new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            reject(err)
        } else {

            resolve(data)
        }
    })
});

function main() {

    getFile('./input.txt').then((data) => {
        const lines = data.split(/\r?\n/);
        for (let index1 = 0; index1 < lines.length; index1++) {

            let n1 = lines[index1];

            for (let index2 = index1; index2 < lines.length; index2++) {

                let n2 = lines[index2];

                if (parseInt(n1) + parseInt(n2) == 2020) {
                    console.log(n1 * n2)

                }
            }
        }
    }).catch(err => {
        console.log(err)
    })

}

main();