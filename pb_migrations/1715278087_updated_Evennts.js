/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i8qpqo5mspih453")

  collection.name = "Events"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i8qpqo5mspih453")

  collection.name = "Evennts"

  return dao.saveCollection(collection)
})
