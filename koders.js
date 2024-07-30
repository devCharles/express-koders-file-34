const db = require("./db");

function add(name) {
  if (!name) {
    throw new Error("name is required");
  }

  const koders = db.getDB();
  koders.push(name);
  db.updateDB(koders);
  return koders;
}

function removeByName(name) {
  if (!name) {
    throw new Error("name is required");
  }

  const koders = db.getDB();

  const koderFound = koders.find(
    (koder) => koder.toLowerCase() === name.toLowerCase()
  );

  if (!koderFound) {
    throw new Error("koder not found");
  }

  const newKoders = koders.filter(
    (koder) => koder.toLowerCase() !== name.toLowerCase()
  );

  db.updateDB(newKoders);

  return newKoders;
}

function removeAll() {
  db.updateDB([]);
}

function getAll() {
  return db.getDB();
}

module.exports = {
  add,
  removeByName,
  removeAll,
  getAll,
};
