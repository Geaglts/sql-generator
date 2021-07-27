/*
tabla users
campo email varchar(64)
campo password varchar(64)
campo username varchar(16)

tabla auth
campo email varchar(64)
campo password varchar(64)
campo username varchar(16)
*/
const $ = (selector) => document.querySelector(`${selector}`);

class Table {
  name = "";
  fields = {};
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setField(field, type, properties) {
    this.fields[field] = { type, properties };
  }

  sqlProperties(field) {
    const properties = this.fields[field].properties;
    if (properties.length < 1) return "";
    let stringProperties = "";
    const SQL_PROPERTIES = {
      "!nulo": "NOT NULL ",
      unico: "UNIQUE",
      nulo: "NULL",
      primario: "PRIMARY KEY",
    };
    for (let property of properties) {
      stringProperties += " " + SQL_PROPERTIES[property];
    }
    return stringProperties;
  }

  toSQL() {
    return `CREATE TABLE ${this.name} (
${(() => {
  let fields = "";
  const keys = Object.keys(this.fields);
  for (let key of keys) {
    if (key.includes("id")) {
      fields += `    ${key} SERIAL PRIMARY KEY NOT NULL UNIQUE,\n`;
    } else {
      fields += `    ${key} ${this.fields[key].type?.toUpperCase() || ""}`;
      fields += `${this.sqlProperties(key)},\n`;
    }
  }
  return fields.substring(0, fields.length - 2);
})()}
);`;
  }
}

class Schema {
  tables = [];
  constructor() {}

  addTable(table) {
    this.tables.push(table);
  }

  findTable(name) {
    return this.tables.find((table) => table.name === name);
  }
}

function generateSchema() {
  const inputValue = $("#taInput").value;
  const lines = inputValue.split("\n");
  const schema = new Schema();
  let currentTable = "";
  lines.forEach((line) => {
    if (line.includes("tabla")) {
      const tableName = line.split(" ")[1];
      currentTable = tableName;
      const table = new Table(tableName);
      schema.addTable(table);
    } else if (line.includes("campo")) {
      const table = schema.findTable(currentTable);
      const data = line.split(" ");
      const [_, nameField, typeField] = data;
      const properties = data.splice(3, line.length);
      table.setField(nameField, typeField, properties);
    }
  });
  let tables = "";
  schema.tables.map((table) => {
    tables += table.toSQL() + "\n\n";
  });
  $("#taOutput").value = tables.substring(0, tables.length - 2);
}

$("#btnGenerate").addEventListener("click", () => {
  generateSchema();
});

$("#taInput").addEventListener("keyup", () => {
  generateSchema();
});

$("#btnCopy").addEventListener("click", () => {
  $("#taOutput").select();
  document.execCommand("copy");
  document.getSelection().removeAllRanges();
});
