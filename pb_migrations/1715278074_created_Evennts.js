/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i8qpqo5mspih453",
    "created": "2024-05-09 18:07:54.135Z",
    "updated": "2024-05-09 18:07:54.135Z",
    "name": "Evennts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p5c1i9s8",
        "name": "Title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qdx8qxdq",
        "name": "Date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i8qpqo5mspih453");

  return dao.deleteCollection(collection);
})
