angular.module('starter.controllers', [])

.controller('PiecesCtrl', function($scope, $state) {

	angular.extend($scope, {

		go: function(piece) {

			$state.go('tab.pieces-' + piece);
		}

	});

})

.controller('MovesCtrl', function($scope) {})

/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
