const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    cargarTareasFromArray(array = []) {
        array.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        let tareaString = '';
        this.listadoArr.forEach((tarea, index) => {
            index = `${index + 1}`.green;
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${index} ${tarea.desc} :: ${estado}`);
        });
    }

    listadoCompleto() {
        let tareaString = '';
        this.listadoArr.forEach((tarea, index) => {
            index = `${index + 1}`.green;
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${index} ${tarea.desc} :: ${estado}`);
        });
    }

    listadoPendienesCompletadas(completadas = true) {
        let index = 0;
        this.listadoArr.forEach((tarea) => {
            let estado = '';
            if (tarea.completadoEn && completadas) {
                index += 1;
                estado = 'Completada'.green;
                console.log(`${(index + '.').green} ${tarea.desc} :: ${estado} | ${tarea.completadoEn.green}`);

            } else if (!tarea.completadoEn && !completadas) {
                index += 1;
                estado = 'Pendiente'.red;
                console.log(`${(index + '.').green} ${tarea.desc} :: ${estado}`);
            }
        });
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    toggleCompletadas(idsTareas = []) {
        idsTareas.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!idsTareas.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }


}


module.exports = Tareas; 