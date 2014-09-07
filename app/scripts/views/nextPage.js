/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NextPageView = Backbone.View.extend({

        template: JST['app/scripts/templates/nextPage.hbs'],

        tagName: 'article',

        id: '',

        className: 'close next',

        events: {

          'click': 'onClick'

        },

        initialize: function (options) {

            this.render();

        },

        render: function () {

            this.$el.html(this.template(this.item));

        },

        onClick: function (e) {

          e.preventDefault();

          this.trigger('next:page', this);

        }


    });

    return NextPageView;
});
