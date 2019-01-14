var doubleQuote = '"';
var regExpQuotes = /'/g;
var vJson = '';
var vQueryOfferingObjects = '';

if (typeof vQueryOffering != 'undefined') {
	vJson = "{" + vQueryOffering.replace(regExpQuotes, doubleQuote) + "}";
	vQueryOfferingObjects = JSON.parse(vJson);
}