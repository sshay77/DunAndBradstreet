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
            };

            oldHistory.push(query);
            
            fs.writeFile('history.json', JSON.stringify(oldHistory), err => {
                if(err) {
                    console.error(err.message);                    
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
                };
                resolve(oldHistory);
            });
        });
    }
}

module.exports = new History();