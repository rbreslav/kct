angular.module('starter.controllers', [])



.controller('SettingsCtrl', function($scope, $rootScope) {

	$scope.settings = {
		boardSize: "3x3",
		level: 1,
	};

	$scope.$watch('settings', function(settings) {

		$rootScope.settings = $scope.settings;

	});	

	$rootScope.settings = $scope.settings;
})

.controller('PiecesCtrl', function($scope, $state) {

	angular.extend($scope, {

		go: function(piece) {

			$state.go('tab.pieces-' + piece);
		}

	});

})

.controller('MovesCtrl', function($scope, $timeout, $rootScope) {

	angular.extend($scope, { 

		moves: {

			allMoves: {

				knight: [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]],

				king:   [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]],

				queen:  [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],
				         [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7],
				         [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],
				         [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7],
				         [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
						 [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],
						 [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
						 [-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],

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

			rows: [1,2,3],

			cols: [1,2,3],

			currentLevel: 1,

			currentPiece: 'bishop',

			currentSquare: "square_1_1",

			isDragging: false,

			aboutToDrag: false,

			startDrag: function() {

				console.log('tapped');
				this.aboutToDrag = true;
			},

			setCurrentPiece: function(piece) {

				this.currentPiece = piece;
				this.currentSquare = "square_1_1";
				this.findDrops();
			},

			squareStyle: function(square) {

				var coords = this.getCoords(square);

				var width = 255 / this.cols.length;
				var height = 255 / this.rows.length

				if (coords.y % 2 === 0) {

					if (coords.x % 2 === 0) {

						return { 'background-color' : '#ccc', width: width + 'px', height: height + 'px' };
					}
					else {

						return { 'background-color' : '#fff', width: width + 'px', height: height + 'px' };
					}
				}
				else {

						if (coords.x % 2 === 0) {

							return { 'background-color' : '#fff', width: width + 'px', height: height + 'px' };
						}
						else {

							return { 'background-color' : '#ccc', width: width + 'px', height: height + 'px' };
						}			
				}
			},

			onDropComplete: function(toSquare, event) {

				this.isDragging = false;

				if (this.canDrop(toSquare)) {

					this.currentSquare = toSquare;	  		

					var def = this.currentLevel > 1 ? 100 : 0;

					$timeout(function() {
						$scope.moves.findDrops();
					}, def * $scope.moves.rows.length);
				}
			},

			canDropCache: {},

			canDrop: function(square) {

				if (this.canDropCache[square]) {

					return true;
				}

				return false;
			},

			findDrops: function() {

				this.canDropCache = {};

				for (var r in this.rows) {

					var row = this.rows[r];

					for (var c in this.cols) {

						var col = this.cols[c];

						var square = 'square_' + row + '_' + col;

						console.log(square);

						var from = this.getCoords(this.currentSquare);

						var moves = this.allMoves[this.currentPiece];

						for (i in moves) {

							var x = from.x + moves[i][0];
							var y = from.y + moves[i][1];

							if (square === 'square_' + x + '_' + y && x >= 1 && x <= this.rows.length && y >= 1 && y <= this.cols.length) {

								this.canDropCache[square] = true;
								continue;
							}
						}
					}
				}
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

	$scope.moves.findDrops();

	$rootScope.$watch('settings', function(settings) {

		if (settings != undefined) {

			var sizes = $rootScope.settings.boardSize.split('x');

			$scope.moves.rows = [];
			$scope.moves.cols = [];

			for (var i = 1; i <= sizes[0]; i++) {
			
				$scope.moves.rows.push(i);
			}

			for (var i = 1; i <= sizes[1]; i++) {
			
				$scope.moves.cols.push(i);
			}

			$scope.moves.setCurrentPiece($scope.moves.currentPiece);

			$scope.moves.currentLevel = $rootScope.settings.level;
		}
	}, true);
});
