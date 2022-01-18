require('colors');

const Tareas = require('./models/tareas');

const { inquiererMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasChecklist } = require('./helpers/inquierer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');



const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasdb = leerDB();
    if (tareasdb) {
        tareas.cargarTareasFromArray(tareasdb);
    }
    do {

        opt = await inquiererMenu();

        switch (opt) {
            case '1':
                //opcion de crear
                const desc = await leerInput("Descripción:");
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listadoPendienesCompletadas(true)
                break;
            case '4':
                tareas.listadoPendienesCompletadas(false)
                break;
            case '6':
                const idTarea = await listadoTareasBorrar(tareas.listadoArr);
                if (idTarea !== '0') {
                    if (isOk) {
                        const isOk = await confirmar('¿Está seguro?');
                        tareas.borrarTarea(idTarea);
                        console.log('Tarea Borrada');
                    }
                }
                break;
                case '5':
                    const idsTareas = await listadoTareasChecklist(tareas.listadoArr);
                    tareas.toggleCompletadas(idsTareas);
                    // console.log(idsTareas);
                // tareas.completarTarea(false);
                break;
        }


        guardarDB(tareas.listadoArr);
        await pausa();

    } while (opt !== '0')


}


main();