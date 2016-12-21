function Card(id, name, column_id) {
	var self = this;

	this.id = id;
	this.name = name || 'Untitled';
	this.bootcamp_kanban_column_id = column_id;
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card col-m-10 col-offset-m-1 col-s-10 col-offset-s-1');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete float-right').text('x');

		$cardDelete.click(function() {
			self.removeCard();
		});

		$card.append($cardDelete)
				.append($cardDescription);
			return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	}
}