

//New Library Instance
(function(){
var SarLibrary_instance; //defining somewhere for our instance to go on the window. It's a placeholder because the instance has to be set to something and this allows me to do that. Assigning the instance to a variable.

window.Library = function() { //constructor. Hoisting this up to the window.
  this._booksArray = [];
};
  if (SarLibrary_instance) {
    return SarLibrary_instance;
  }
  SarLibrary_instance = this; //once the instance is created, assign it to the instance.
})();

//Library Instance
var SarLibrary = new Library("sara");
//


Library.prototype.addBook = function(book) {
  if(Array.isArray(book)) {
    this.addBooks(book);
    return "array found, added books";
  }

  for (var i = 0; i < this._booksArray.length; i++) {
    var bookPicked = this._booksArray[i];
      if(bookPicked.title == book.title) {
        return false;
      }
  }
  this._booksArray.push(book);
  this.setLibraryObject("sara");
  // this.renderUpdate();
  return true;
};


// If books are removed, true. Otherwise, false.
Library.prototype.removeBookByTitle = function(title) {
 for (var i = 0; i < this._booksArray.length; i++) {
   var removedTitle = this._booksArray[i];

   if(removedTitle.title == title) {
     this._booksArray.splice(i,1);
     this.setLibraryObject("sara");
     return true;
   }
  }
  return false;
};

//title=parameter
// removeBookByTitle and removedTitle = methods
// var i = sets up the index, i < this._booksArray.length; i++ = checks the condition (i is less than the length of the array), i++ = increments the index by 1
// i is the same thing as "removedTitle"


Library.prototype.removeBooksByAuthor = function(author) {
  var outcome = false;
  for (var i = this._booksArray.length - 1; i >= 0; i--) {
    if(this._booksArray[i].author === author) {
      this._booksArray.splice(i, 1);
       outcome = true;
    }
  }
  return outcome;
};

Library.prototype.getRandomBook = function() {
  return this._booksArray[Math.floor(Math.random()*this._booksArray.length)];
};

Library.prototype.getBookByTitle = function(title) {
  var testArray = [];
  var lookingforsimilarities = RegExp(title,"i");
    for (var i = 0; i < this._booksArray.length; i++) {
      if (lookingforsimilarities.test(this._booksArray[i].title)) {
        testArray.push(this._booksArray[i].title);
      }
    }
      return testArray;
};

Library.prototype.getBooksByAuthor = function(author) {
  var testArray = [];
  var lookingforsimilarities = RegExp(author,"i");
    for (var i = 0; i < this._booksArray.length; i++) {
      if (lookingforsimilarities.test(this._booksArray[i].author)) {
        testArray.push(this._booksArray[i].author);
      }
    }
      return testArray;
};


Library.prototype.addBooks = function(books) {
  if(!Array.isArray(books)) {
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


Library.prototype.getAuthors = function() {
  var findAuthorArray = [];
  for (var i = 0; i < this._booksArray.length; i++) {
      if(findAuthorArray.indexOf(this._booksArray[i].author) === - 1){
        findAuthorArray.push(this._booksArray[i].author);
      }
  }
      return findAuthorArray;
};

Library.prototype.getRandomAuthorName = function() {
  return this.getRandomBook().author;
};

Library.prototype.removeAllBooks = function() {
    var myArray = this._booksArray = [];
};

// **Practice**
//   Library.prototype.removeAllBooks = function() {
//     var myArray = this._booksArray = [];
//     if(this.booksArray = []){
//       return true;
//     }
//   }


function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}


//Work on this
  Library.prototype.filterForProperties = function(bookStringBeingPassed) {
    var arrayToPushBooksTo = [];
    this.getBooksByAuthor(bookStringBeingPassed);
    arrayToPushBooksTo.push(this.getBooksByAuthor(bookStringBeingPassed));
    this.getBookByTitle(bookStringBeingPassed);
      arrayToPushBooksTo.push(this.getBookByTitle(bookStringBeingPassed));
        return arrayToPushBooksTo;
  };


//LOCAL STORAGE SECTION
Library.prototype.setLibraryObject = function(localStorageKey){
  localStorage.setItem(localStorageKey, JSON.stringify(this._booksArray));
  return true;
};

Library.prototype.getLibraryObject = function(localStorageKey){
 var getLocalStorageBooks = localStorage.getItem(localStorageKey);
 // if (getLocalStorageBooks !== null){
 //   var parseBooks = JSON.parse(getLocalStorageBooks);
 //   for (var i = 0; i < parseBooks.length; i++) {
 //     this.addBook(new Book(parseBooks[i]));
 //    }
 //  }
};
// Library.prototype.getLibraryObject = function(localStorageKey){
//   var getLocalStorageBooks = JSON.parse(localStorage.getItem(localStorageKey));
//     if (getLocalStorageBooks) {
//       for (var i = 0; i < getLocalStorageBooks[i].length; i++); {
//       var book = getLocalStorageBooks[i];
//       this.addBook(new Book(book));
//       }
//   return true;
//     }
// };

// Library.prototype.renderUpdate = function() {
//   $("body").trigger("renderUpdate");
// };

// Testing Singleton//
// var singleA = SarLibrary_instance.getInstance();
// var singleB = SarLibrary_instance.getInstance();
// console.log( singleA === singleB ); // true


// Book Constructor
var Book = function(bookparams) {
  this.image = bookparams.image;
  this.title = bookparams.title;
  this.author = bookparams.author;
  this.numPages = bookparams.numPages;
  this.publishDate = new Date(bookparams.pubDate);
  this.removeButtonImg = bookparams.removeButtonImg;
};

//Book Objects
var gPsychCyb = new Book({image:"Images/PC.jpg",title: "Psycho-Cybernetics", author: "Maxwell Maltz", numPages: 310,pubDate: "November 17, 1960", removeButtonImg:"Images/removeicon.png"});
var gIT = new Book({image:"Images/itbook.jpg",title: "IT", author: "Stephen King", numPages: 800,pubDate: "December 17, 1995 03:24:00", removeButtonImg:"Images/removeicon.png"});
var gCatcherInTheRye = new Book({image:"Images/citr.jpg", title: "Catcher In The Rye", author: "JD Salinger", numPages: 200,pubDate:"December 22, 1951", removeButtonImg:"Images/removeicon.png"});
var gPrisonerOfTehran = new Book({image:"Images/pot.jpg", title: "Prisoner Of Tehran", author: "Marina Nemat", numPages: 400, pubDate:"January 20, 2007", removeButtonImg:"Images/removeicon.png"});
var gTheObstacleIsTheWay = new Book({image:"Images/oitw.jpg", title: "The Obstacle Is The Way", author: "Ryan Holiday", numPages: 240, pubDate: "January 21, 2014", removeButtonImg:"Images/removeicon.png"});
var gTheArtOfWar = new Book({image:"Images/aow.jpg", title: "The Art Of War", author: "Sun Tzu", numPages: 245, pubDate:"March 30, 1", removeButtonImg:"Images/removeicon.png"});
var gStormOfTheCentury = new Book({image:"Images/sotc.jpg",title: "Storm Of The Century", author: "Stephen King", numPages: 406, pubDate:"April 2, 1999,", removeButtonImg:"Images/removeicon.png"});
  // SarLibrary.addBook(gTheArtOfWar);
  // SarLibrary.addBook(gTheObstacleIsTheWay);
  // SarLibrary.addBook(gPsychCyb);
  // SarLibrary.addBook(gIT);
  // SarLibrary.addBook(gCatcherInTheRye);
  // SarLibrary.addBook(gPrisonerOfTehran);
  // SarLibrary.addBook(gStormOfTheCentury);


var allBooksInArray = ([gPsychCyb, gIT, gCatcherInTheRye, gPrisonerOfTehran, gTheObstacleIsTheWay, gTheArtOfWar, gStormOfTheCentury]);
