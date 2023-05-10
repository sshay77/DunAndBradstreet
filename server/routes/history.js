const fs = require('fs');

class History {
    save(query) {
        fs.readFile('history.json',(err, oldData) => {
            let oldHistory;
            if(err) {
                console.error(err.message);
                oldHistory = []
            }else {
                oldHistory = JSON.parse(oldData);
                console.log(oldHistory);
            };

            oldHistory.push(query);
            
            fs.writeFile('history.json', JSON.stringify(oldHistory), err => {
                if(err) {
                    console.error(err.message);                    
                }else {
                    console.log('The file has been saved!');
                }
            });
        });
    }

    load() {
        return new Promise((resolve) => {
            fs.readFile('history.json',(err, oldData) => {
                let oldHistory;
                if(err) {
                    console.error(err.message);
                    oldHistory = []
                }else {
                    oldHistory = JSON.parse(oldData);
                    console.log(oldHistory);
                };
                resolve(oldHistory);
            });
        });
    }
}

module.exports = new History();