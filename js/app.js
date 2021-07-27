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

$("#btnGenerate").addEventListener("click", () => {
  generateSchema();
});

class Table {
  name = "";
  fields = {};
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setField(field, type) {
    this.fields[field] = type;
  }

  toSQL() {
    return `CREATE TABLE ${this.name} (
${(() => {
  let fields = "";
  const keys = Object.keys(this.fields);
  for (let key of keys) {
    fields += `    ${key} ${this.fields[key]?.toUpperCase() || ""},\n`;
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
      const [_, nameField, typeField] = line.split(" ");
      table.setField(nameField, typeField);
    }
  });
  let tables = "";
  schema.tables.map((table) => {
    tables += table.toSQL() + "\n\n";
  });
  $("#taOutput").value = tables.substring(0, tables.length - 2);
}

$("#taInput").addEventListener("keyup", () => {
  generateSchema();
});
