var board = {
	name: 'Kanban Plus',

	addColumn: function(column) {
		this.element.append(column.$element);
// TO DZIAŁA ALE PRZESŁANIA SORTOWANIE KART - DO ROZKMINIENIA
//		initColSortable();
	},
	element: $('.column-container')
}

$('.delete-board').click(function() {
	window.alert('W tej wersji nie możesz usunąć tablicy');
});

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
			board.addColumn(column);
			}
		});
 	});


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
