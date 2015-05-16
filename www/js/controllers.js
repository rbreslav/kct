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

		allMoves: {

			knight: [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]],

			king:   [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]],

			queen:  [[1,1],[2,2],[-1,-1],[-2,-2],[1,-1],[-1,1],[2,-2],[-2,2],
					 [0,1],[0,-1],[1,0],[-1,0],[0,2],[0,-2],[2,0],[-2,0]],

			bishop: [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],
			         [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7],
			         [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],
			         [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],

			rook:   [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
					 [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],
					 [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
					 [-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],

			pawn:   [[-1,0]]
		},

		rows: [1,2,3,4,5],

		cols: [1,2,3,4,5],

		currentLevel: 2,

		currentPiece: 'bishop',

		currentSquare: "square_5_5",

		isDragging: false,

		aboutToDrag: false,

		startDrag: function() {

			console.log('tapped');
			this.aboutToDrag = true;
		},

		setCurrentPiece: function(piece) {

			this.currentPiece = piece;
			this.currentSquare = "square_5_5";
		},

		squareColor: function(square) {

			var coords = this.getCoords(square);

			if (coords.y % 2 === 0) {

				if (coords.x % 2 === 0) {

					return { 'background-color' : '#ccc' };
				}
				else {

					return { 'background-color' : '#fff' };
				}
		}
		else {

				if (coords.x % 2 === 0) {

					return { 'background-color' : '#fff' };
				}
				else {

					return { 'background-color' : '#ccc' };
				}			
		}
		},

		onDropComplete: function(toSquare, event) {

			this.isDragging = false;

			if (this.canDrop(toSquare)) {

			this.currentSquare = toSquare;	  		
			}
		},

		canDrop: function(square) {

			var from = this.getCoords(this.currentSquare);

			var moves = this.allMoves[this.currentPiece];

			for (i in moves) {

				var x = from.x + moves[i][0];
				var y = from.y + moves[i][1];

				if (x > 0 && x < this.rows.length*this.cols.length && y > 0 && y < this.rows.length*this.cols.length && square === 'square_' + x + '_' + y) {

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
