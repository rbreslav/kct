// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngDraggable'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });


  $rootScope.settings = {
      boardSize: "3x3",
      level: 1,
      cycleType: 'k2p',
      autoPlay: false,
      soundOn: true
    };

  $rootScope.forRandom = ['king','queen','rook','bishop','knight','pawn'];
  $rootScope.doneRandom = [];

  $rootScope.nav = function(tab) {

    $state.go('tab.' + tab);
  }

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.pieces', {
    url: '/pieces',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces.html',
        controller: 'PiecesCtrl'
      }
    }
  })

  .state('tab.pieces-king', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  })  

  .state('tab.pieces-queen', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  })  

  .state('tab.pieces-rook', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  })  

  .state('tab.pieces-bishop', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  })

 .state('tab.pieces-knight', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  }) 

 .state('tab.pieces-pawn', {
    url: '/pieces/:piece',
    views: {
      'tab-pieces': {
        templateUrl: 'templates/tab-pieces-piece.html',
        controller: 'PiecesCtrl'
      }
    }
  })    

  .state('tab.moves', {
      url: '/moves',
      views: {
        'tab-moves': {
          templateUrl: 'templates/tab-moves.html',
          controller: 'MovesCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/pieces');

});
