/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars'
    }
});

require([
    'jquery',
    'backbone',
    'views/root'
], function ($, Backbone, RootView) {
    Backbone.history.start();

    var root = new RootView({el: '#news'});

    // Global Keyboard Events

    $('body').on('keyup', function (e) {

      root.onKeyPressed(e);

    });

});
