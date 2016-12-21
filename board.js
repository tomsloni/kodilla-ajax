function addBoard(boardNew) { 
	$('.main').append(boardNew.$element); 
	initColSortable();
}

function Board(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.$element = createBoard();

	
	$element: $('.board .column-container');
	
	function createBoard() {
		var $board = $('<div>').addClass('board col-m-11 col-s-11');
		var $boardHead = $('<div>').addClass('board-head col-m-12 col-s-12');
		var $boardCntrLeft = $('<div>').addClass('boardCntrLeft col-m-2 col-s-12');
		var $boardCntrCenter = $('<div>').addClass('boardCntrCenter col-m-8 col-s-12');
		var $boardCntrRight = $('<div>').addClass('boardCntrRight col-m-2 col-s-12');
		var $boardAddColumn = $('<button>').addClass('create-column').text('Dodaj kolumnę');
		var $boardTitle = $('<h1>').text('Tablica ' + self.name);
		var $boardDelete = $('<button>').addClass('delete-board').text('x');
		var $boardColumns = $('<ul>').addClass('column-container');


		$boardDelete.click(function() {
			self.removeBoard();
		});

		$boardAddColumn.click(function() {
			var columnName = prompt('Wpisz nazwę kolumny');
			$.ajax({
				url: baseUrl + '/column',
				method: 'POST',
				data: {
					name: columnName
				},
				success: function(response) {
					var column = new Column(response.id, columnName);
					self.addColumn(column);
				}
			});
		});


/*
		$boardAddColumn.click(function() {
			self.addColumn(new Column(prompt('Wpisz nazwę kolumny')));
		});
*/
		$boardHead.append(
				$boardCntrLeft.append($boardAddColumn)
			)
			.append(
				$boardCntrCenter.append($boardTitle)
				)
			.append(
				$boardCntrRight.append($boardDelete)
				);

		$board.append($boardHead);

			return $board;
	}
}

Board.prototype = {
	addColumn: function(column) {
		this.$element.append(column.$element);
		initCardSortable();
	},
	removeBoard: function() {
		this.$element.remove();
	}
}

/*
Board.prototype = {
	addColumn: function(column) {
		this.$element.append(column.$element);
		initCardSortable();
	},
	removeBoard: function() {
		this.$element.remove();
	}
}

$('.create-column').click(function() {
		var columnName = prompt('Wpisz nazwę kolumny');
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response) {
				var column = new Column(response.id, columnName);
				board.createColumn(column);
			}
		});
	});
*/
function initCardSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

function initColSortable() {
	$('.column-container').sortable({
		connectWith: '.column-container',
		placeholder: 'card-placeholder'
	}).disableSelection();
}