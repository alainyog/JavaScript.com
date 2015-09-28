var express = require('express'),
    fs      = require('fs'),
    RouteGenerator = require(path.join(__dirname, 'route_generator'));

module.exports = function(parent, options) {
  var verbose     = options.verbose;
  var controllers = path.join(__dirname, '..', 'controllers');

  fs.readdirSync(controllers).forEach(function(name) {
    verbose && console.log('\n   %s', name);

    var controller = require(path.join(__dirname, '..', 'controllers', name)),
        app        = express(),
        routes     = RouteGenerator.generate(name, controller);

    app.set('views', path.join(__dirname, '..', 'views', name));

    routes.forEach(function(route) {
      if (route.before) {
        app[route.method](route.path, route.before, route.handler);

        verbose && console.log('     %s %s -> before -> %s', route.method.toUpperCase(), route.path, route.name);
      } else {
        app[route.method](route.path, route.handler);

        verbose && console.log('     %s %s -> %s', route.method.toUpperCase(), route.path, route.name);
      }
    });

    parent.use(app);
  });
};
