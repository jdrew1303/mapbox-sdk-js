'use strict';

var makeService = require('../make_service'),
  invariant = require('../../vendor/invariant'),
  constants = require('../constants');

var Tilesets = module.exports = makeService('MapboxTilesets');

/**
 * Retrieve data about specific vector features at a specified location within a vector tileset
 *
 * @param {String} tilesetid
 * @param {Array} position
 * @param {Object} options
 * @param {Number} options.radius
 * @param {Number} options.limit
 * @param {Function} callback called with (err, response)
 * @returns {Promise} response
 * @example
 * var MapboxClient = require('mapbox');
 * var client = new MapboxClient('ACCESSTOKEN');
 * client.tilequery('mapbox.mapbox-streets-v7', [-77, 38], {}, function(err, response) {
 *   console.log(response);
 * });
 */
Tilesets.prototype.tilequery = function(tilesetid, position, options, callback) {
  invariant(typeof tilesetid === 'string', 'tilesetid must be a string');
  invariant(typeof position === 'object', 'position must be an array');
  invariant(position.length == 2, 'position must be an array of length 2');
  invariant(typeof position[0] === 'number' && typeof position[1] === 'number', 'position must be an array of two numbers');

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  return this.client({
    path: constants.API_TILESETS_TILEQUERY,
    params: {
      tilesetid: tilesetid,
      longitude: position[0],
      latitude: position[1],
      radius: options.radius,
      limit: options.limit
    },
    callback: callback
  });
};
