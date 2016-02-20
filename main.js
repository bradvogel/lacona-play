var lacona = require('lacona');
var laconaPhrase = require('lacona-phrase');
var datetime = require('lacona-phrase-datetime');
var string = require('lacona-phrase-string');
var parser = new lacona.Parser({
	grammar: laconaPhrase.createElement('sequence', {
		children: [
			laconaPhrase.createElement('literal', {
				text: 'remind me to '
			}),
			laconaPhrase.createElement(string.String, {
				id: 'activity'
			}),
			laconaPhrase.createElement('literal', {
				text: ' '
			}),
			laconaPhrase.createElement('choice', {
				id: 'date',
				children: [
					laconaPhrase.createElement(datetime.DateTime, {
						past: false
					})
				]
			})
		]
	})
});

var _ = require('underscore');
var moment = require('moment');

function parse(text) {
	var results = parser.parseArray(text);
	var topResult = _.first(_.sortBy(results, 'score').reverse());
	return topResult ? topResult.result : null;
}

console.log(parse('remind me to exercise well at 1pm'));