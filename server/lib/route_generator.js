"use strict"

class RouteGenerator {
  constructor(key, controller, handler, type) {
    self.controller = controller;
    self.name       = controller.name;
    self.idParam    = ':' + name + '_id';

    self.route = {
      before:  controller.before,
      handler: handler,
      name:    controller.name
    };

    self.makeRoute(name, type);

    return self.route;
  }

  makeRoute(name, type) {
    if (type === 'resources') {
      self.routeHasId = true;
      self.makeResource(name);
    } else if (type === 'resource') {
      self.makeResource(name);
    } else if (type === 'members') {
      self.routeHasId   = true;
      self.route.method = 'get';
      self.generateUrl(name);
    } else if (type === 'collection') {
      if (self.controller.type === 'resources') {
        self.route.method = 'get';
        self.generateUrl(name);
      }
    }
  }

  makeResource(name) {
    switch(name) {
      case 'index':
        if (self.routeHasId) {
          self.route.method = 'get';
          self.generateUrl();
        }
        break;
      case 'show':
        self.route.method = 'get';
        self.generateUrl();
        break;
      case 'new':
        self.route.method = 'get';
        self.generateUrl('new')
        break;
      case 'create':
        self.route.method = 'post';
        self.generateUrl();
        break;
      case 'edit':
        self.route.method = 'get';
        self.generateUrl('edit');
        break;
      case 'update':
        self.route.method = 'put';
        self.generateUrl();
        break;
      case 'destroy':
        self.route.method = 'delete';
        self.generateUrl();
        break;
    }
  }

  generateUrl() {
    var prefix = self.controller.prefix || '',
        path   = prefix + '/' + self.name + '/';

    if (self.routeHasId) path += self.idParam + '/';

    self.route.path   = path + arguments.join('/');
  }

  static generate(name, controller) {
    var collection = controller.routes.collection,
        members    = controller.routes.members,
        routes     = [];

    if (!controller.name) controller.name = name;

    if (!['resources', 'resource'].indexOf(controller.type)) {
      throw 'No controller type assigned or recognized.';
    }

    for (key in controller.routes) {
      if (~['member', 'collection'].indexOf(key)) continue;

      routes.push(
        new RouteGenerator(key, controller, controller.routes[key], controller.type)
      );
    }

    if (members && controller.type === 'resources') {
      for (key in members) {
        routes.push(
          new RouteGenerator(key, controller, members[key], 'members')
        );
      }
    }

    if (collection) {
      for (key in collection) {
        routes.push(
          new RouteGenerator(key, controller, collection[key], 'collection')
        );
      }
    }

    return routes;
  }
}

module.exports = RouteGenerator;
