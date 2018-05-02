

Library.prototype.initializationMethod = function(){
  this._booksArray = JSON.parse(localStorage.getItem("sara")) || [];
  this.$addBookBtn = $("#addbookbutton");
  $("#table_id").on("click", ".removeicon", $.proxy(this.removeRow, this));
  val = 0;
  tempArray = [];

  this._bindEvents();
};

$(document).ready(function () {
  window.SarLibrary = new Library ("sara");
  SarLibrary.initializationMethod();
  //SarLibrary.getLibraryObject("sara");
});


Library.prototype._bindEvents = function (){
  // this.$btn.on("click", $.proxy(this._handleClick, this));
  // this.$testBtn.on("click", $.proxy(this._handleTest, this));
  $('#addbookbutton').on('click', $.proxy(this.addBookToTempArray, this));
  $('#addbooksbutton').on('click', $.proxy(this.addBooksToLibrary, this));
  $("#modal").on('show.bs.modal', $.proxy(this.buildModal, this));
  // this.$getBookRec.on("click", $.proxy(this._handleGetBookRec, this));
  // $("#getrecbyauth").on("click", $.proxy(this._handlegetBookByAuth, this));
};

//Recommending a random book once "Get Book Recommendation" is clicked //
Library.prototype.buildModal = function() {
  var book = this.getRandomBook();
  $("#modalimage").attr('src',book.image);
  $("#modaltitle").text(book.title);
  $("#modalauthor").text('Author: ' + book.author);
  $("#modalpagenumbers").text('Number Of Pages: ' + book.numPages);
  $("#modalpublicationdate").text('Publication Date: ' + book.publishDate);
  $("#modalremovebutton").attr('src',book.removeButtonImg);
};

// TABLE //
var table = $("#table_id").DataTable({
  data: SarLibrary._booksArray,
  columns: [
    { data: "image", render: function(data, type, row, meta) {
              return (" <img class=\"cover\"src=" + row.image +">");
    }},
   { data: "title" },
   { data: "author" },
   { data: "numPages" },
   { data: "publishDate" },
   { data: "image", render: function(data, type, row, meta) {
          return (" <img class=\"removeicon\"src=\"Images/removeicon.png\">");
    }},
  ]
});

// Pushing each book to temp array on "addBook" //
Library.prototype.addBookToTempArray = function() {
  var image = $("#uploadImage").val();
  var title = $(".formTitle").val();
  var author = $(".formAuthor").val();
  var pages = $(".formPages").val();
  var date = $(".formPubDate").val();
  var button = $(".formRemoveImage").val();
  $("#uploadImage, .formTitle, .formAuthor, .formPages, .formPubDate, .formRemoveImage").val("");
    var book = new Book({image:image, title:title, author:author, numPages:pages, publishDate:date, removeButtonImg:button});
    tempArray.push(book);

    val++;
    $('#output').html("You have " + val + " book(s) in your library");
};


Library.prototype.addBooksToLibrary = function() {
  tempArray.forEach (function(book) {
    SarLibrary.addBook(book);
    this.table.row.add(book);

  });
  val = 0;
  tempArray = [];
  table.draw(false);
  $('#output').html("You have " + val + " book(s) in your library");
};


// REMOVE ROW BY BOOK TITLE //
Library.prototype.removeRow = function (e){
  var tableRow = $(e.currentTarget).parent().parent();
    var title = tableRow.children("td:nth-child(2)");
      this.removeBookByTitle(title);
      tableRow.remove();
      this.table.draw(false);
};


// HOVER ON RANDOM BOOK BUTTON //
$(".getbookrec").popover({ trigger: "manual" , html: true, animation:false})
  .on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(".hoverbutton").on("mouseleave", function () {
          $(_this).popover('hide');
      });
  })
  .on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
          if (!$(".hoverbutton:hover").length) {
              $(_this).popover("hide");
          }
      });
  });


  // function myCallbackFunction (updatedCell, updatedRow, oldValue) {
  //     console.log("The new value for the cell is: " + updatedCell.data());
  //     console.log("The values for each cell in that row are: " + updatedRow.data());
  // }
