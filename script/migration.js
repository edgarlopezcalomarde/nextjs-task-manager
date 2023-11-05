import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(
  "../taskmangment.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE ,
  (err) => {
    if (err) {
      console.log("No se pudo acceder a la base de datos");
      return console.log(err);
    }
    console.log("Acceso  exitoso");
  }
);

db.serialize(() => {
  db.run(
    `
            CREATE TABLE IF NOT EXISTS tasks(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                type TEXT NOT NULL,
                show TEXT NOT NULL
            )
        `,
    (err) => {
      if (err) {
        console.log("Fallo al crear la tabla tasks: ");
        return console.log(err?.message);
      }

      const query =
        "INSERT INTO tasks(title, content, type, show) VALUES(?,?,?,?)";
      const values = [
        "Mañana tengo que estudiar un poco de SQL🚀",
        "Concretamente tengo que realizar esta tarea por la madrugada porque me concentro mas.",
        "1",
        "1",
      ];

      db.run(query, values, (err) => {
        if (err) {
          return console.log(err);
        }

        console.log("Tarea creada con exito");
      });

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Conexion cerrada");
      });
    }
  );
 
});
