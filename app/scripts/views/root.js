/*global define, Hammer*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/article'
], function ($, _, Backbone, JST, ArticleView) {
    'use strict';

    var API_URL = 'http://api.ihackernews.com/',
        RootView = Backbone.View.extend({

        //template: JST['app/scripts/templates/root.ejs'],

        tagName: 'div',

        initialize: function () {

            _.bindAll(this, 'onLoad', 'onLoadError');

            this._views = [];

            // Loading API

            this.nextPage = 0;

            this.$loading = this.$('#loading');
            this.$error = this.$('#error');

            this.loadNews(this.nextPage);

            // Init Swipe Gesture
            this.setupGestures();


        },

        loadNews: function (page) {

          var self = this;

          if (page !== 0) {
            page = '/' + page;
          } else {
            page = '';
          }

          $.getJSON(API_URL + 'page' + page +'?format=jsonp&callback=?')
              .done(function (data) {
                self.onLoad(data);
              })
              .error(this.onLoadError);

        },

        onLoadError: function () {

          this.$error.removeClass('hidden');
          this.$loading.addClass('hidden');

        },

        onLoad: function (json) {

          this.$loading.addClass('hidden');

          this.data = json;

          if (this.data && this.data.nextId) {
            this.nextPage = this.data.nextId;
          }

          this.render();

        },

        render: function () {
            //this.$el.html(this.template());

            var i = 0,
                t = this.data.items.length;
                //nextPageView;

            for (i; i < t; i++) {

              this.addArticle(this.data.items[i], i);

            }

            this.$el.width( i * 60 + 330 );

            this.show(this.currentIndex || 0);

            //Add next page button

            //!!! API Broken, can't get next page !!!

            // nextPageView = new NextPageView();
            // this.listenTo(nextPageView, 'next:page', this.onNextPage);
            //
            // this.$el.append(nextPageView.$el);


        },

        addArticle: function (item, index) {

          var article = new ArticleView({index: index, item: item});

          this.listenTo(article, 'show:article', this.onSelectArticle);

          this.$el.append(article.$el);

          this._views.push( article );

        },

        show: function (index) {

          this.views(index).open();

          if (this.currentIndex !== undefined && this.currentIndex !== index) {

            this.views(this.currentIndex).close();

          }

          this.$el.css({
            'margin-left': (index * -60 - 165) + 'px'
          });

          this.currentIndex = index;


        },

        next: function () {

          var t = this.data.items.length,
              index = this.currentIndex;

          if (index === undefined) {
            index = 0;
          }

          index++;

          if (index >= t) {

            index = 0;

          }

          this.show(index);

        },

        prev: function () {

          var t = this.data.items.length,
              index = this.currentIndex;

          if (index === undefined) {
            index = 0;
          }

          index--;

          if (index < 0) {

            index = t - 1;

          }

          this.show(index);

        },

        views: function (index) {
          return this._views[index];
        },

        onSelectArticle: function (view) {

          this.show(view.index);

        },

        onNextPage: function (view) {

          //Remove Next Page button
          view.remove();

          //Loading next news page
          this.loadNews(this.nextPage);

        },

        onKeyPressed: function (e) {

          // Left
          if (e.keyCode === 37) {
              this.prev();
          }

          // Right
          if (e.keyCode === 39) {
              this.next();
          }

          // Up

          if (e.keyCode === 38) {
              this.show(0);
          }

          // Down
          if (e.keyCode === 40) {
              this.show(this.data.items.length - 1);
          }

          // Enter

          if (e.keyCode === 13) {
              this.openCurrentArticle();
          }

        },

        openCurrentArticle: function () {

          if (this.data && this.data.items && this.data.items[this.currentIndex]) {

            window.open(this.data.items[this.currentIndex].url, '_blank');

          }

        },

        setupGestures: function () {

          var self = this,
              hammertime = new Hammer(this.el, {
                threshold: 5
              });

          hammertime.on('swipeleft', function() {

            self.next();

          });

          hammertime.on('swiperight', function() {

            self.prev();

          });

        },

        // stopSlideShow: function () {
        //
        //   clearInterval(this.SI);
        //
        // },
        //
        // startSlideShow: function () {
        //
        //   var self = this, oo = 0;
        //
        //   clearInterval(this.SI);
        //
        //   this.SI = setInterval(function () {
        //
        //     self.show(oo++);
        //
        //
        //   }, 5000);
        //
        // }


    });

    return RootView;
});
