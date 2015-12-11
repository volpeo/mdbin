//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require simplemde
//= require_tree .

'use strict';

$(document).ready(function() {

  var SAVED = true;

  if (!$('body').is('.bins_new, .bins_edit')) {
    return;
  }
  var insertInto = function(editor, item){
    var cm = editor.codemirror;
    var doc = cm.getDoc();
    var cursor = doc.getCursor();
    var line = doc.getLine(cursor.line);
    var pos = {
      line: cursor.line,
      ch: line.length - 1
    };
    doc.replaceRange(item, pos);
  };
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
          var link = "["+title+"]("+url+")";
          var cm = editor.codemirror;
          insertInto(editor, link)
        });
      },
      className: "fa fa-link",
      title: "Insert link"
    },
    {
      name: "Image",
      action: function customFunction(editor){
        $('#imgModal').modal();
        $('#insertImg').off('click').on('click', function() {
          $('#imgModal').modal('hide');
          var url = $('#imgUrl').val();
          var alt = $('#imgAlt').val();
          $('#imgUrl').val('');
          $('#imgAlt').val('');
          var image = "!["+alt+"]("+url+")";
          insertInto(editor, image);
        });
      },
      className: "fa fa-image",
      title: "Insert image"
    },
    "|",
    "preview",
    "side-by-side",
    {
      name: "About",
      action: function customFunction(editor){
        $('#aboutModal').modal();
      },
      className: "fa fa-question-circle",
      title: "About"
    },
    ]
  });

  simplemde.codemirror.on("change", function(){
    SAVED = false;
  });

  // do it twice you maggot
  simplemde.toggleSideBySide();
  simplemde.toggleSideBySide();

  var loadSaveFlash = function () {
    var $flashSave = $('#flash-save').clone()
      .removeAttr('id')
      .removeClass('hidden')
      .addClass('alert-to-delete');
    $(".flashes").first().append($flashSave);
  };

  var saveBin = function() {
    loadSaveFlash();
    $('#commitBin').trigger('click');
    SAVED = true;
  };

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      saveBin();
    }
  }, false);

  $('#saveBin').on('click', function(e) {
    e.preventDefault();
    saveBin();
  });

  $('#forkBin').on('click', function(e) {
    e.preventDefault();
    // alter the action route to new
    $('#theBin').attr('action', '/');
    $('#theBin').find('[name="_method"]').attr('value', 'post');
    $('#commitBin').trigger('click');

  });

  setTimeout(function() {
    $('.loading').fadeOut('slow');
  }, 500);

  $(window).bind('beforeunload', function(){
    if (SAVED) {
      return;
    }
    return 'You have unsaved work, are you sure you want to quit this page?';
  });
});

