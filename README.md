# SQL SCRIPTS GENERATOR | GENERADOR DE SCRIPTS SQL

## 🖥 Página WEB

[SQL GENERATOR](https://geaglts.github.io/sql-generator/)

## Sintaxis

### 🚀 Estructuras basicas

### Esquemas

```
# Crea un esquema
crea el esquema [nombre]

# Elimina un esquema
borra el esquema [nombre]

# Define un esquema por defecto para las tablas
esquema [nombre]
```

### Tablas

```
# Declaracion de tabla
tabla [nombre]

# Nuevo campo
campo [nombre] [tipo] [propiedad o propiedades]

# Relacion con otra tabla
relacion/a [id_local] con [id_remoto] en [tabla_remota] [propiedad o propiedades]
```

## 🧷 Propiedades

|  Syntax   |     Description      |
| :-------: | :------------------: |
|   !nulo   |      "NOT NULL"      |
|   unico   |       "UNIQUE"       |
|   nulo    |        "NULL"        |
| primario  |    "PRIMARY KEY"     |
|   enulo   | "ON DELETE SET NULL" |
| ecascada  | "ON DELETE CASCADE"  |
|   unulo   | "ON UPDATE SET NULL" |
| ucascada  | "ON UPDATE CASCADE"  |
| primario  |    "PRIMARY KEY"     |
|   falso   |   "DEFAULT FALSE"    |
| verdadero |    "DEFAULT TRUE"    |
|     0     |     "DEFAULT 0"      |

## 🛠 Ejemplo

### 🍇 Estructura ingresada

```
borra el esquema dev
crea el esquema dev

esquema dev

tabla auth
campo id
campo email varchar(64)
campo password varchar(64)
campo username varchar(16)

tabla users
campo id
campo email varchar(64)
campo password varchar(64)
campo username varchar(16)
relacion id,id con auth

tabla prueba
campo id
campo nombre text unico
relaciona id con id en auth
relaciona nombre con email en users enulo
```

### 🍷 Estructura generada

```sql
DROP SCHEMA dev CASCADE;
CREATE SCHEMA dev;

CREATE TABLE dev.auth (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    email VARCHAR(64),
    password VARCHAR(64),
    username VARCHAR(16)
);

CREATE TABLE dev.users (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    email VARCHAR(64),
    password VARCHAR(64),
    username VARCHAR(16),
    FOREIGN KEY (id) REFERENCES undefined(id)
);

CREATE TABLE dev.prueba (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre TEXT UNIQUE,
    FOREIGN KEY (id) REFERENCES auth(id),
    FOREIGN KEY (nombre) REFERENCES users(email) ON DELETE SET NULL
);
```
