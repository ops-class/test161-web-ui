var fs = require('fs'),
    path = require('path'),
		HTMLtoJSX = require('htmltojsx'),
		cheerio = require('cheerio'),
		yaml_front_matter = require('yaml-front-matter'),
		asciidoctor = require('asciidoctor.js')().Asciidoctor();

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
fs.writeFileSync(path.join(argv._[1], 'views', 'navigation.jsx'), converter.convert($.html(nav)));

// Documentation
var metadata = yaml_front_matter.loadFront(fs.readFileSync('test161.adoc'));
var html = asciidoctor.$convert(metadata.__content.toString());
var converter = new HTMLtoJSX({
	createClass: true,
	outputClassName: "IntroComponent"
});
fs.writeFileSync(path.join(argv._[1], 'views', 'intro.jsx'), converter.convert(html));
