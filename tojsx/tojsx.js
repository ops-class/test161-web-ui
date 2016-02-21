var fs = require('fs'),
    path = require('path'),
		HTMLtoJSX = require('./htmltojsx.js'),
		cheerio = require('cheerio'),
		yaml_front_matter = require('yaml-front-matter'),
		asciidoctor = require('asciidoctor.js')().Asciidoctor(),
		footnotes = require('../www/lib/footnotes.js'),
		hacks = require('../www/lib/hacks.js'),
		sections = require('../www/lib/sections.js'),
		highlight = require('../www/lib/highlight.js'),
		handlebars = require('handlebars');

var argv = require('minimist')(process.argv.slice(2));
if (argv._.length != 2) {
	console.log("usage: node opstojsx.js <index.html> <output_dir>");
	return -1;
}

// Header
$ = cheerio.load(fs.readFileSync(argv._[0]));
var head = $('head').first();
$(head).find('title').text("Test Your OS/161 Kernel Online");
fs.writeFileSync(path.join(argv._[1], 'head.html'), $.html(head));

// Navbar
var nav = $(".navbar").first().parent();
var external = new RegExp(/^((?:http\:|https\:|\/\/))/);

$(nav).find("a").each(function () {
	var href = $(this).attr('href').trim();
	if (href === "#" || !href || external.exec(href)) {
		return;
	}
	$(this).attr('href', 'https://www.ops-class.org' + $(this).attr('href'));
});
$(nav).find('.active').removeClass('.active');
$(nav).find('#menu-test161').addClass('active');

var converter = new HTMLtoJSX({
	createClass: true,
	outputClassName: "NavigationComponent"
});
var component = converter.convert($.html(nav));
component = component.replace(/^var /, '', component);
fs.writeFileSync(path.join(argv._[1], 'views', 'navigation.jsx'), component);

// Documentation
var file = yaml_front_matter.loadFront(fs.readFileSync('test161.adoc'));
file.contents = asciidoctor.$convert(file.__content.toString());

file.doSections = true;
footnotes.doFootnotes(file);
hacks.doHacks(file);
sections.doSections(file);
highlight.doHighlight(file);

var template = handlebars.compile(fs.readFileSync('test161.hbt').toString());
file.contents = template(file);
var converter = new HTMLtoJSX({
	createClass: true,
	outputClassName: "IntroComponent"
})
var component = converter.convert(file.contents);
component = component.replace(/^var /, '', component);
component = component.replace(/^\s*<a/gm, '{ " " }<a', component);
fs.writeFileSync(path.join(argv._[1], 'views', 'intro.jsx'), component);
