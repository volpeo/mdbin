//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require simplemde
//= require_tree .


$(document).ready(function(){
  if ($('body').is('.bins_new, .bins_edit')) {
    var simplemde = new SimpleMDE({
      element: $("#simplemde")[0],
      spellChecker: false,
      autofocus: true,
      indentWithTabs: true,
      status: false,
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
      {
        name: "URL",
        action: function customFunction(editor){
          $('#linkModal').modal();
          $('#insertLink').off('click').on('click', function() {
            $('#linkModal').modal('hide');
            var url = $('#linkUrl').val();
            $('#linkUrl').val('');
            var title = $('#linkTitle').val();
            $('#linkTitle').val('');
            var cm = editor.codemirror;
            var doc = cm.getDoc();
            var cursor = doc.getCursor(); // gets the line number in the cursor position
            var line = doc.getLine(cursor.line); // get the line contents
            var pos = { // create a new object to avoid mutation of the original selection
              line: cursor.line,
              ch: line.length // set the character position to the end of the line
            }
            var anchor = "["+title+"]("+url+")"
            console.log("je suis dedans")
            doc.replaceRange(anchor, pos); // adds a new line
          });
        },
        className: "fa fa-link",
        title: "link"
      },
      {
        name: "Image",
        action: function customFunction(editor){
          $('#imgModal').modal();
          $('#insertImg').off('click').on('click', function() {
            $('#imgModal').modal('hide');
            var url = $('#imgUrl').val();
            var alt = $('#imgAlt').val();
            var cm = editor.codemirror;
            var doc = cm.getDoc();
            var cursor = doc.getCursor(); // gets the line number in the cursor position
            var line = doc.getLine(cursor.line); // get the line contents
            var pos = { // create a new object to avoid mutation of the original selection
              line: cursor.line,
              ch: line.length - 1 // set the character position to the end of the line
            }
            var anchor = "!["+alt+"]("+url+")"
            doc.replaceRange(anchor, pos); // adds a new line
          });
        },
        className: "fa fa-image",
        title: "image"
      },
      "|",
      "preview",
      "side-by-side",
      "guide"
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

    $('#forkBin').on('click', function(e) {
      e.preventDefault();
      // alter the action route to new
      $('#theBin').attr('action', '/');
      $('#theBin').find('[name="_method"]').attr('value', 'post');
      $('#commitBin').trigger('click');

    });

    setTimeout(function() {
      $('.loading').fadeOut('slow')
    }, 500);
  }

})