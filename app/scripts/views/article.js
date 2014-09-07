/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ArticleView = Backbone.View.extend({

        template: JST['app/scripts/templates/article.hbs'],

        tagName: 'article',

        id: '',

        className: 'close',

        events: {

          'click': 'onClick'

        },

        initialize: function (options) {
            //this.listenTo(this.model, 'change', this.render);

            this.item = options.item || {};
            this.index = options.index || 0;

            this.render();

        },

        render: function () {
            this.$el.html(this.template(this.item));

            /*
            this.$el.css({

              'margin-left': (this.index * 50) + '%'

            });
            */

        },

        open: function () {

          this.$el.removeClass('close');


        },

        close: function () {

          this.$el.addClass('close');

        },

        onClick: function (e) {

          if (this.$el.hasClass('close')) {

            e.preventDefault();
            e.stopPropagation();

            this.trigger('show:article', this);

          }

        }


    });

    return ArticleView;
});
