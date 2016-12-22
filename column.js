function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'Untitled';
	this.$element = createColumn();

	function createColumn() {
//		var $column = $('<li>').addClass('column col-m-3 col-s-10 col-offset-s-1');
		var $column = $('<div>').addClass('column col-m-3 col-s-10 col-offset-s-1');
		var $columnHead = $('<div>').addClass('column-head col-m-12 col-s-12');
		var $columnCntrLeft = $('<div>').addClass('columnCntrLeft col-m-2 col-s-12');
		var $columnCntrCenter = $('<div>').addClass('columnCntrCenter col-m-8 col-s-12');
		var $columnCntrRight = $('<div>').addClass('columnCntrRight col-m-2 col-s-12');
		var $columnTitle = $('<h2>').addClass('column-title').text('Kolumna ' + self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('+');

		$columnDelete.click(function() {
			self.removeColumn();
		});

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

		$columnHead.append(
				$columnCntrLeft.append($columnAddCard)
				)
			.append(
				$columnCntrCenter.append($columnTitle)
				)
			.append(
				$columnCntrRight.append($columnDelete)
				);

		$column.append($columnHead)
			.append($columnCardList);

		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
		initCardSortable();
	},
	removeColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.$element.remove();
			}
		});
	}
}
