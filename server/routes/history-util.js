const fs = require('fs');

class History {
    save(query) {
        fs.readFile('history.json',(err, oldData) => {
            let history;
            if(err) {
                console.error(err.message);
                history = []
            }else {
                history = JSON.parse(oldData);
            };

            history.push(query);
            
            fs.writeFile('history.json', JSON.stringify(history), err => {
                if(err) {
                    console.error(err.message);                    
                }
            });
        });
    }

    load() {
        return new Promise((resolve) => {
            fs.readFile('history.json',(err, oldData) => {
                let history;
                if(err) {
                    console.error(err.message);
                    history = []
                }else {
                    history = JSON.parse(oldData);
                };
                resolve(history);
            });
        });
    }
}

module.exports = new History();