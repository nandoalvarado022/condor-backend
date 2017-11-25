var express = require('express'); 
var Item = require('../models/item');

var itemRouter = express.Router();

itemRouter
  .route('/items')
  .get(function (request, response) { // obtener todos
    console.log('GET /items');
    Item.find(function (error, items) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      console.log(items);
      response.json(items);
    });
  })
  .put(function (request, response) { // insert
    var node = request.query;
    Item.collection.insert(node, onInsert);
    function onInsert(err, docs) {
      if (err) console.log("Error");
      else response.status(200).json({'message': 'El item ' + node + ' fue añadido.'});      
    }
  })

itemRouter
  .route('/items/:itemId')
  .get(function (request, response) { // obtener uno
    console.log('Obteniendo un elemento');
    var itemId = request.params.itemId;
    Item.findOne({ _id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      // console.log(item);
      response.json(item);
    });
  })
  .put(function (request, response) { // update
    var itemId = request.params.itemId;
    conditions = { _id: itemId };
    update = request.query;
    Item.update(conditions, update, onUpdate);
    function onUpdate(err, docs) {
      if (err) console.log("Error");
      else response.status(200).json({'message': 'El item ' + itemId + ' fue actualizado.'});
    }
  })
  .delete(function (request, response) { // delete
    console.log('Borrando elemento');
    var itemId = request.params.itemId;
    Item.findOne({ _id: itemId }, function (error, item) {      
      if (error) {
        response.status(500).send(error);
        return;
      }
      if (item) {
        item.remove(function (error) {
          if (error) {response.status(500).send(error); return;}          
          response.status(200).json({'message': 'El item ' + itemId + ' fue removido.'});
        });
      } else {
        response.status(404).json({
          message: 'No se encuentra el item ' + itemId
        });
      }
    });
  });

module.exports = itemRouter;