let db = require("mssql");

// aqui você muda pro seu banco
let config = {
    user: "bandtec",
    password: "!Vini123",
    server: "bdtestesvini.database.windows.net",
    database: "TwitterClone",
    options: {
        encrypt: true
    }
}

function SQLQuery(queryLine)
{
    if(global.conn)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
        .catch(err => {
            console.log(err);
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
            .catch(err =>{
                console.log(err);
            });
    }
}

module.exports.Arduino = {
    insertMeasurement: (measurement) => 
    {
        // aqui você coloca o insert do jeito que é la no seu banco
        
        return SQLQuery(`insert into Medicao values(${measurement.temp}, ${measurement.umi}, ${measurement.co2}, ${measurement.arduino}, '${measurement.d}','${measurement.h}')`);
    },
    getAllMeasurement: () => {
        return SQLQuery(`select idBox as serieBox from Box`);
    }
}
