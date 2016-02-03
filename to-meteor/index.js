var fs = require('fs'),
    path = require('path'),
    HTMLtoJSX = require('htmltojsx');

var jsdom = require("jsdom").jsdom;
var serializeDocument = require("jsdom").serializeDocument;

var viewPath = "../app/client/views"
var headPath = "../app/client"

var to_meteor = function() {
  fs.exists('../app/.meteor', function (exists) {
    if (exists) {
      var content = loadHtml();
      convertToMeteor(content);
    } else {
      console.log('cancel to_meteor.');
    }
  });
}

to_meteor();

function loadHtml() {
  return fs.readFileSync('../www/build/index.html').toString();
}

function convertToMeteor(content) {
  var doc = jsdom(content);
  var element = doc.documentElement;

  var headStr = element.getElementsByTagName("head")[0].outerHTML;
  writeToFile(headStr, 'head.html', headPath);

  var navbar = element.getElementsByClassName("navbar")[0].parentNode;
  var navbarStr = navbar.outerHTML;
  toMeteor(navbarStr, 'navigation', 'NavigationComponent');

  var containers = element.getElementsByClassName("container");
  var footer = containers[containers.length - 1];
  var footerStr = footer.outerHTML;
  toMeteor(footerStr, 'footer', 'FooterComponent');
}

function toMeteor(html, filename, className) {
  className = className || filename + "Component";
  filename += '.jsx';
  var converter = new HTMLtoJSX({
    createClass: true,
    outputClassName: className
  });
  var str = converter.convert(html);
  // remove 'var ' for meteor
  str = str.substring(4);
  writeToFile(str, filename, viewPath);
}

function writeToFile(str, filename, pathname) {
  fs.writeFile(path.join(pathname, filename), str, function(err) {
    if (err) {
      throw err;
    }
  });
}
