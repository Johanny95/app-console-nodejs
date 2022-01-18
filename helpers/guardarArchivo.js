const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));

}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, 'utf8');
    // console.log(info);
    const data = JSON.parse(info);
    // console.log(data);
    return data;
}


module.exports = {guardarDB,leerDB};