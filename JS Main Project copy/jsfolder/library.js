//New Library Instance
(function () {
  var SarLibrary_instance; //defining somewhere for our instance to go on the window. It's a placeholder because the instance has to be set to something and this allows me to do that. Assigning the instance to a variable.

  window.Library = function (localStorageKey) { //constructor. Hoisting this up to the window.
    this._booksArray = [];
    this.localStorageKey = localStorageKey;
  };
  if (SarLibrary_instance) {
    return SarLibrary_instance;
  }
  SarLibrary_instance = this; //once the instance is created, assign it to the instance.
})();


//Library Instance
// var SarLibrary = new Library("sara");
//


Library.prototype.addBook = function (book) {
  if (Array.isArray(book)) {
    this.addBooks(book);
    return "array found, added books";
  }

  for (var i = 0; i < this._booksArray.length; i++) {
    var bookPicked = this._booksArray[i];
    if (bookPicked.title == book.title) {
      return false;
    }
  }

  this.addBookToDataBase(book);
  // this.setLibraryObject();
  // this.renderUpdate();
  return true;
};

// If books are removed, true. Otherwise, false.
Library.prototype.removeBookByTitle = function (title) {
  for (var i = 0; i < this._booksArray.length; i++) {
    var removedTitle = this._booksArray[i];

    if (removedTitle.title == title) {
      this._booksArray.splice(i, 1);
      // this.setLibraryObject();
      return true;
    }
  }
  return false;
};




Library.prototype.removeBooksByAuthor = function (author) {
  var outcome = false;
  for (var i = this._booksArray.length - 1; i >= 0; i--) {
    if (this._booksArray[i].author === author) {
      this._booksArray.splice(i, 1);
      outcome = true;
      // this.setLibraryObject();
    }
  }
  return outcome;
};

Library.prototype.getRandomBook = function () {
  return this._booksArray[Math.floor(Math.random() * this._booksArray.length)];
};

Library.prototype.getBookByTitle = function (title) {
  var testArray = [];
  var lookingforsimilarities = RegExp(title, "i");
  for (var i = 0; i < this._booksArray.length; i++) {
    if (lookingforsimilarities.test(this._booksArray[i].title)) {
      testArray.push(this._booksArray[i].title);
    }
  }
  return testArray;
};

Library.prototype.getBooksByAuthor = function (author) {
  var testArray = [];
  var lookingforsimilarities = RegExp(author, "i");
  for (var i = 0; i < this._booksArray.length; i++) {
    if (lookingforsimilarities.test(this._booksArray[i].author)) {
      testArray.push(this._booksArray[i].author);
    }
  }
  return testArray;
};


Library.prototype.addBooks = function (books) {
  if (!Array.isArray(books)) {
    this.addBook(book);
    return null;
  }
  var count = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      count++;
    }
  }
  return count;
};


Library.prototype.getAuthors = function () {
  var findAuthorArray = [];
  for (var i = 0; i < this._booksArray.length; i++) {
    if (findAuthorArray.indexOf(this._booksArray[i].author) === - 1) {
      findAuthorArray.push(this._booksArray[i].author);
    }
  }
  return findAuthorArray;
};

Library.prototype.getRandomAuthorName = function () {
  return this.getRandomBook().author;
};

Library.prototype.removeAllBooks = function () {
  var myArray = this._booksArray = [];
};


////////////////JQUERY PROJECT PROTOTYPES //////////////////////////////

Library.prototype.initializationMethod = function () {
  // this.getLibraryObject();
  this.$addBookBtn = $("#addbookbutton");
  $("#table_id").on("click", ".removeicon", $.proxy(this.removeRow, this));
  this.bookcount = 0;
  this.tempArray = [];
  this._bindEvents();
  this.getBooksFromDataBase();
  this.buildTable();
};

// Library.prototype.clickDelete = function(e) {
//   $("body").on("click", ".removeicon", function(e) {
//       var bookId = e.target.parentNode.parentNode.childNodes[0].innerText;
//       _this.deleteBookFromDatabase(bookId);
//   })
// }

Library.prototype.buildTable = function () {
  this.table = $("#table_id").DataTable({
    data: this._booksArray,
    columns: [
      { data: "_id"},
      {
        data: "cover", render: function (data, type, row, meta) {
          return (" <img class=\"cover\"src=" + row.cover + ">");
        }
      },
      { data: "title" },
      { data: "author" },
      { data: "numPages" },
      { data: "publishDate" },
      // {
      //   data: "edit", render: function (data, type, row, meta) {
      //     return("<button class=\"edit-btn\">Edit</button>");
      //   }
      // },
      {
        data: "image", render: function (data, type, row, meta) {
          return (" <img class=\"removeicon\"src=\"Images/removeicon.png\">");
        }
      },
    ]
  });
};

Library.prototype._bindEvents = function () {
  $('#addbookbutton').on('click', $.proxy(this.addBookToTempArray, this));
  $('#addbooksbutton').on('click', $.proxy(this.addBooksToLibrary, this));
  $("#modal").on('show.bs.modal', $.proxy(this.buildRecModal, this));
  $("#getauthorsbutton").on("click", $.proxy(this.buildAuthorModal, this));
  $("#getauthorsmodalbody").on('click', '.deleteauth', $.proxy(this.attachTableToAuthModal, this));
  // $('.edit-btn').on('click', function(){
  //   $('body').addClass("modal-open");
  //   $('#editBook').addClass("modal show");
  //
  // })
  // $.proxy(this.updateBookInDb, this));
};

//Recommending a random book once "Get Book Recommendation" is clicked //
Library.prototype.buildRecModal = function () {
  var book = this.getRandomBook();
  $("#modalimage").attr('src', book.image);
  $("#modalimage").attr('src', book.image);
  $("#modaltitle").text(book.title);
  $("#modalauthor").text('Author: ' + book.author);
  $("#modalpagenumbers").text('Number Of Pages: ' + book.numPages);
  $("#modalpublicationdate").text('Publication Date: ' + book.publishDate);
  $("#modalremovebutton").attr('src', book.removeButtonImg);
  $("#authormodal").on('click', book.buildAuthorModal);

};

Library.prototype.buildAuthorModal = function () {
  var holdingAuthorsinArray = this.getAuthors();
  var authorsInfo = "";
  for (var i = 0; i < holdingAuthorsinArray.length; i++) {
    authorsInfo = authorsInfo + "<li class=\"listitemclass\"><button class=\"deleteauth\">'Delete Author'</button> <span>" + holdingAuthorsinArray[i] + "</span></li>";
  }
  $('.listitemclass').remove();
  $('#getauthorsmodalbody').append(authorsInfo);
};

Library.prototype.attachTableToAuthModal = function (e) {
  var grabAuthor = $(e.currentTarget).parent();
  grabAuthor.remove();
  this.removeBooksByAuthor(grabAuthor.find('span').text());
  this.table.destroy();
  this.buildTable();

};

// Pushing each book to temp array on "addBook" //
Library.prototype.addBookToTempArray = function () {
  var cover = $("#uploadImage").val();
  var title = $(".formTitle").val();
  var author = $(".formAuthor").val();
  var pages = $(".formPages").val();
  var date = $(".formPubDate").val();
  var button = $(".formRemoveImage").val();
  $("#uploadImage, .formTitle, .formAuthor, .formPages, .formPubDate, .formRemoveImage").val("");
  var book = new Book({ cover: cover, title: title, author: author, numPages: pages, publishDate: date, removeButtonImg: button });
  this.tempArray.push(book);

  this.bookcount++;
  $('#output').html("You have " + this.bookcount + " book(s) in your library");
};

Library.prototype.addBooksToLibrary = function () {
  var self = this;
  this.tempArray.forEach(function (book) {
    self.addBook(book);
    // self.table.row.add(book);
  });

  this.bookcount = 0;
  this.tempArray = [];
  this.table.draw(false);
  $('#output').html("You have " + this.bookcount + " book(s) in your library");
};

// REMOVE ROW BY BOOK TITLE //
Library.prototype.removeRow = function (e) {
  var tableRow = $(e.currentTarget).parent().parent();
  var title = tableRow.children("td:nth-child(2)").text();
  var id = e.target.parentNode.childNodes[0].innerText;
  // this.clickDelete(e);
  this.removeBookByTitle(title);
  this.table.row(tableRow).remove();
  this.table.draw(false);
};

// Book Constructor
var Book = function (bookparams) {
  this.cover = bookparams.cover;
  this.title = bookparams.title;
  this.author = bookparams.author;
  this.numPages = bookparams.numPages;
  this.publishDate = new Date(bookparams.pubDate);
  // this.edit = bookparams.edit;
  // this.removeButtonImg = bookparams.removeButtonImg;
  this._id = bookparams._id;
};

Library.prototype.getBooksFromDataBase = function() {
     _this = this;
     $.ajax ({
       dataType: 'json',
       type:'GET',
       url: "http://localhost:3000/library/",
     }).done(function(response) {
       for (i = 0; i < response.length; i++) {
         book = new Book(response[i]);
         _this._booksArray.push(book);
         _this.table.row.add(book);
       }
       _this.table.draw();
       console.log(response);

     }).fail(function(error) {
       console.log(error);
     });
   }

Library.prototype.addBookToDataBase = function(book) {
  $.ajax ({
    dataType: 'json',
    type:"POST",
    url: "http://localhost:3000/library/",
    data: book


  }).done(function(response) {
    book = new Book(response);
    _this._booksArray.push(book);
   _this.table.row.add(book);
    _this.table.draw();
    console.log(response);
  })

.fail(function(error) {
    console.log(error);
  });
}

Library.prototype.deleteBookFromDatabase = function (bookId) {
   _this = this;
   let bookID = bookId;
  return $.ajax ({
    url: 'http://localhost:3000/library/' + bookID,
    type:'DELETE',
    dataType: 'json'
  }).done(function() {
  })
}

$("body").on("click", this.deleteBookListener);

function deleteBookListener(e) {
  if (e.target.classList.contains("removeicon")) {
    var bookId = e.target.parentNode.parentNode.childNodes[0].innerText;
    _this.deleteBookFromDatabase(bookId);
  }
}

//
// Library.prototype.updateBookInDb = function (bookId, book) {
//    _this = this;
//    let bookID = bookId;
//   return $.ajax ({
//     url: 'http://localhost:3000/library/' + bookID,
//     type:'PUT',
//     dataType: 'json',
//     data: book
//   }).done(function() {
//
//   })
//
//
//
// }







//move to doc.ready with objects

// Book Objects
// var gPsychCyb = new Book({ cover: "Images/PC.jpg", title: "Psycho-Cybernetics", author: "Maxwell Maltz", numPages: 310, pubDate: "November 17, 1960", removeButtonImg: "Images/removeicon.png" });
// var gIT = new Book({ image: "Images/itbook.jpg", title: "IT", author: "Stephen King", numPages: 800, pubDate: "December 17, 1995 03:24:00", removeButtonImg: "Images/removeicon.png" });
// var gCatcherInTheRye = new Book({ image: "Images/citr.jpg", title: "Catcher In The Rye", author: "JD Salinger", numPages: 200, pubDate: "December 22, 1951", removeButtonImg: "Images/removeicon.png" });
// var gPrisonerOfTehran = new Book({ image: "Images/pot.jpg", title: "Prisoner Of Tehran", author: "Marina Nemat", numPages: 400, pubDate: "January 20, 2007", removeButtonImg: "Images/removeicon.png" });
// var gTheObstacleIsTheWay = new Book({ image: "Images/oitw.jpg", title: "The Obstacle Is The Way", author: "Ryan Holiday", numPages: 240, pubDate: "January 21, 2014", removeButtonImg: "Images/removeicon.png" });
// var gTheArtOfWar = new Book({ image: "Images/aow.jpg", title: "The Art Of War", author: "Sun Tzu", numPages: 245, pubDate: "March 30, 1", removeButtonImg: "Images/removeicon.png" });
// var gStormOfTheCentury = new Book({ image: "Images/sotc.jpg", title: "Storm Of The Century", author: "Stephen King", numPages: 406, pubDate: "April 2, 1999,", removeButtonImg: "Images/removeicon.png" });
  // window.SarLibrary.addBook(gTheArtOfWar);
  // window.SarLibrary.addBook(gTheObstacleIsTheWay);
  // window.SarLibrary.addBook(gPsychCyb);
  // window.SarLibrary.addBook(gIT);
  // window.SarLibrary.addBook(gCatcherInTheRye);
  // window.SarLibrary.addBook(gPrisonerOfTehran);
  // window.SarLibrary.addBook(gStormOfTheCentury);
