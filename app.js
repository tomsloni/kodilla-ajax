var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '660',
	'X-Auth-Token': '0a4699fb2a7ecf4a812873cb763f8f8e'
};

$.ajaxSetup({
	headers: myHeaders
	});

// BOARD LOADING

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		var board = new Board(response.id, response.name);
		setupColumns(response.columns, board);
	}
})

function setupColumns(columns, board) {
	columns.forEach(function (column) {
			var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		card.createCard();
	})
}

// BOARD CREATION

$('.create-board').click(function() {
		var boardName = prompt('Wpisz nazwę tablicy');
		$.ajax({
			url: baseUrl + '/board',
			method: 'POST',
			data: {
				name: boardName,
				id: self.id
			},
			success: function(response) {
				var boardNew = new Board(response.id, boardName);
				addBoard(boardNew);
			}
		});


	});
/*
	$columnAddCard.click(function() {
		var cardName = prompt('Wpisz nazwę karty');
		$.ajax({
			url: baseUrl + '/card',
			method: 'POST',
			data: {
				name: cardName,
				bootcamp_kanban_column_id: self.id
			},
			success: function(response) {
				var card = new Card(response.id, cardName);
				self.addCard(card);
			}
		});
	});

/*
$('.create-board').click(function() {
		var name = prompt('Wpisz nazwę tablicy');
		var boardNew = new Board(name);
		addBoard(boardNew);
	});
	*/