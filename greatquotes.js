﻿var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?';
var tweetLink = "https://twitter.com/intent/tweet?text=";

var $button = $('#generate').click(function() {
	getQuote();
});

function getQuote() {
	$.getJSON(url, createTweet());
}

function createTweet(input) {
	if (!input.quoteAuthor.lenght) {
		input.quoteAuthor = 'Unknown author';
	}

	var tweetText = 'Quote of the day - ' + input.quoteText + ' Author: ' + input.quoteAuthor;

	if (tweetText.lenght > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('#quote').text(input.quoteText);
		$('#author').text(input.quoteAuthor);
		$('#tweet').attr('href', tweet);
	}
}

$(function(){ getQuote(); });