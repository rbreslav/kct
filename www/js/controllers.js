angular.module('starter.controllers', [])



.controller('SettingsCtrl', function($scope, $rootScope) {

	$scope.settings = $rootScope.settings;

	$scope.$watch('settings', function(settings) {

		$rootScope.settings = $scope.settings;

	});	
})

.controller('PiecesCtrl', function($scope, $state, $stateParams, $rootScope, $timeout) {

	angular.extend($scope, {

		pieces: {			

			byRank: ['king','queen','rook','bishop','knight','pawn'],

			currentPiece: $stateParams.piece,

			nextPiece: '',

			go: function() {

				var piece = this.nextPiece;

				$rootScope.lastPiece = $rootScope.lastPiece || [];

				$rootScope.lastPiece.push(this.currentPiece);

				this.audioDone();

				$state.go('tab.pieces-' + piece, { piece : piece });				

			},

			back: function() {

				var piece = $rootScope.lastPiece.pop();

				if (piece) {

					$state.go('tab.pieces-' + piece, { piece : piece });
				}
				else {

					$state.go('tab.pieces');
				}
			},

			audioOn: false,

			audioIsPlaying: function() {

				return this.audioOn;
			},

			audioDone: function() {

				this.audioOn = false;
			},

			toggleAudio: function(piece) {

				if (this.audioOn) {

					document.getElementById(piece + '-audio').pause();
					this.audioOn = false;
				}
				else {

					document.getElementById(piece + '-audio').play();
					this.audioOn = true;
				}
			}
		}
	});

	var setupCycle = function() {

		if ($rootScope.settings.cycleType === 'random') {

			if ($rootScope.forRandom.length === 0) {

				angular.copy($rootScope.doneRandom, $rootScope.forRandom);

				$rootScope.doneRandom = [];

				var piece = $rootScope.forRandom.splice(0, 1)[0];
				$scope.pieces.nextPiece = piece;
				$rootScope.doneRandom.push(piece);
			}
			else {

				var rand = Math.floor(Math.random() * $rootScope.forRandom.length)

				var piece = $rootScope.forRandom.splice(rand, 1)[0];

				$scope.pieces.nextPiece = piece;
				$rootScope.doneRandom.push(piece);
			}
		}

		else if ($rootScope.settings.cycleType === 'p2k') {

			for (var r = $scope.pieces.byRank.length - 1; r >= 0; r--) {

				if (!$scope.pieces.currentPiece || $scope.pieces.currentPiece === $scope.pieces.byRank[r] && r === 0) {

					$scope.pieces.nextPiece = $scope.pieces.byRank[5];
					break;
				}

				else if ($scope.pieces.currentPiece === $scope.pieces.byRank[r]) {

					$scope.pieces.nextPiece = $scope.pieces.byRank[r-1];
					break;
				}
			}
		}

		else {

			for (var r = 0; r < $scope.pieces.byRank.length; r++) {

				if (!$scope.pieces.currentPiece || $scope.pieces.currentPiece === $scope.pieces.byRank[r] && r === 5) {

					$scope.pieces.nextPiece = $scope.pieces.byRank[0];
					break;
				}

				else if ($scope.pieces.currentPiece === $scope.pieces.byRank[r]) {

					$scope.pieces.nextPiece = $scope.pieces.byRank[r+1];
					break;
				}
			}
		}

	}

	setupCycle();

	if ($scope.pieces.currentPiece && $rootScope.settings.autoPlay && $rootScope.settings.soundOn) {

		$timeout(function() {
			$scope.pieces.toggleAudio($scope.pieces.currentPiece);
		}, 1000);
	}

	$rootScope.$watch('settings', function(newValue, oldValue) {

		if (newValue.cycleType !== oldValue.cycleType) {

			$rootScope.lastPiece = [];
			$scope.pieces.nextPiece = "";
			$scope.pieces.currentPiece = "";
			setupCycle();

		}
	}, true);	
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

			boardStyle: function() {

				switch(this.rows.length) {
					case 3: 
					 return { width: '257px', height: '257px' };
					 break;
					case 4: 
					 return { width: '257px', height: '255px' };
					 break;
					case 5: 
					 return { width: '257px', height: '257px' };
					 break;
					case 6: 
					 return { width: '257px', height: '255px' };
					 break;
					case 7: 
					 return { width: '256px', height: '254px' };
					 break;
					case 8: 
					 return { width: '257px', height: '251px' };
					 break;
				}
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

					if ($rootScope.settings.soundOn) {
						document.getElementById('blip-audio').play();
					}

					this.currentSquare = toSquare;	  		

					var def = this.currentLevel > 1 ? 100 : 0;

					$timeout(function() {
						$scope.moves.findDrops();
					}, def * $scope.moves.rows.length);
				}

				else {

					if ($rootScope.settings.soundOn) {
						document.getElementById('error-audio').play();
					}
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
