/**
 * If a prefix is provided, the value will be prepended to the routes defined.
 *
 * It is optional to override the controller name if prefix is being used, so
 * with the example given it would create routes like this:
 *
 * /users/:user_id/pets
 * /users/:user_id/pets/:pets_id
 **/
exports.prefix = '/users/:user_id';

/**
 * name is an optional argument that you'll usually only modify if you've
 * added a prefix to the controller. name is generally assumed based off the
 * file name, but if you've named the file something like user-pets then you'd
 * get whacky routes like /users/:user_id/user-pets and that would be weird.
 **/
exports.name = 'pets';

/**
 * Dictates what kind of route set we're defining. Two valid values are:
 *
 * resource, resources
 *
 * If it is a resources it will check for member routes.
 **/
exports.type = 'resources';

// Code to execute before a request.
exports.before = function(req, res, next) {
}

exports.routes = {
  // /users/:user_id/pets
  index: function(req, res, next) {   // GET
  },

  // /users/:user_id/pets/:pets_id
  // /users/:user_id/pets
  show: function(req, res, next) {    // GET
  },

  // /users/:user_id/pets/new
  new: function(req, res, next) {     // GET
  },

  // /users/:user_id/pets
  create: function(req, res, next) {  // POST
  },

  // /users/:user_id/pets/:pets_id/edit
  // /users/:user_id/pets/edit
  edit: function(req, res, next) {    // GET
  },

  // /users/:user_id/pets/:pets_id
  // /users/:user_id/pets
  update: function(req, res, next) {  // PUT
  },

  // /users/:user_id/pets/:pets_id
  // /users/:user_id/pets
  destroy: function(req, res, next) { // DELETE
  },

  members: { // GET
    // /users/:user_id/pets/:pet_id/name
    name: function(req, res, next) {
    }
  },

  collection: { // GET
    // /users/:user_id/pets/search
    search: function(req, res, next) {
    }
  }
}
