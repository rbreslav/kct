angular.module('starter.controllers', [])

.controller('PiecesCtrl', function($scope, $state) {

	angular.extend($scope, {

		go: function(piece) {

			$state.go('tab.pieces-' + piece);
		}

	});

})

.controller('MovesCtrl', function($scope) {

  angular.extend($scope, { 

	moves: {

	  rows: [1,2,3],

	  cols: [1,2,3],

	  currentSquare: "square_1_1",

	  isDragging: false,

	  onDropComplete: function(toSquare, event) {

	  	this.isDragging = false;

	  	if (this.canDrop(toSquare)) {

			this.currentSquare = toSquare;	  		
	  	}
	  },

	  canDrop: function(square) {

		var from = this.getCoords(this.currentSquare);

		var moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

		for (i in moves) {

		  var x = from.x + moves[i][0];
		  var y = from.y + moves[i][1];

		  if (x > 0 && x < 9 && y > 0 && y < 9 && square === 'square_' + x + '_' + y) {

			return true;
		  }
		}

		return false;
	  },

	  isVisible: function(square) {

		if (square === this.currentSquare) {

		  return true;
		}

		return false;
	  },

	  isPlaceholderVisible: function(square) {

		if (square === this.currentSquare && !this.isDragging) {

		  return true;
		}

		return false;
	  },  

	  getCoords: function(square) {

		var parts = square.split('_');

		return {
		  x: parseInt(parts[1]),
		  y: parseInt(parts[2])
		}
	  }
	}

  });

})

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
