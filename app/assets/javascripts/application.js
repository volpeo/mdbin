//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require simplemde
//= require_tree .

var simplemde = new SimpleMDE({
  element: $("#simplemde")[0],
  spellChecker: false,
  autofocus: true,
  indentWithTabs: true,
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "code",
    "unordered-list",
    "ordered-list",
    "|",
    "preview",
    "side-by-side",
    "guide",
    {
      name: "URL",
      action: function customFunction(editor){
        var url = prompt("URL");
        var label = prompt("Label");
        var cm = editor.codemirror;
        var doc = cm.getDoc();
        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = { // create a new object to avoid mutation of the original selection
          line: cursor.line,
          ch: line.length - 1 // set the character position to the end of the line
        }
        var anchor = "["+label+"]("+url+")"
        doc.replaceRange(anchor, pos); // adds a new line
      },
      className: "fa fa-link",
      title: "link"
    },
    "|"
    ]
});

simplemde.toggleSideBySide();
simplemde.toggleSideBySide();

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    $('#commitBin').trigger('click');
  }
}, false);

$('#saveBin').on('click', function(e) {
  e.preventDefault();
  $('#commitBin').trigger('click');
});