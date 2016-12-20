var url = 'https://restcountries.eu/rest/v1/name/';
var countries = $('#countries')

$('#search').click(searchCountries);

function searchCountries() {
	var countryName = $('#country-name').val();
	if (!countryName.length) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList
	});
}

function showCountriesList(resp) {
	countries.empty();
	resp.forEach(function(item) {
		var record = $('<div>').addClass('record');
		var flagAndName = $('<div>').addClass('row')
			.append(
				$('<div>')
					.attr('style', 'background-image: url("http://flagpedia.net/data/flags/small/' + item.alpha2Code.toLowerCase() + '.png");'
					).attr('id', 'image')
				).append(
				$('<h1>').text(item.name)
				);
		var bckgInfo = $('<div>').addClass('bar')
			.append(
				$('<h2>').text('Background information')
				);
		var native = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Native name')
				).append(
				$('<p>').text(item.nativeName)
				);
		var capitalCity = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Capital')
				).append( 
				$('<p>').text(item.capital)
				);
		var landArea = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Land Area')
				).append( 
				$('<p>').text(item.area)
				);
		var countryPopulation = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Population')
				).append( 
				$('<p>').text(item.population)
				);
		var countryLanguage = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Language')
				).append( 
				$('<p>').text(item.languages[0])
				);		
		var countryCurrency = $('<div>').addClass('row')
			.append(
				$('<h3>').text('Currency')
				).append( 
				$('<p>').text(item.currencies[0])
				);
		var bottomBar = $('<div>').addClass('bar');

		record
			.append(flagAndName)
			.append(bckgInfo)
			.append(native)
			.append(capitalCity)
			.append(landArea)
			.append(countryPopulation)
			.append(countryLanguage)	
			.append(countryCurrency)
			.append(bottomBar);	

		countries.append(record);																
		});
}