// DOCUMENT READY


Library.prototype.initializationMethod = function(){
  this._booksArray = JSON.parse(localStorage.getItem("sara")) || [];
  // this.$btn = $("button");
  // this.$testBtn = $("button.test");
  this.$addBookBtn = $("#addbookbutton");
  this.$getBookRec = $("#getbookrec");
  // this.$getBookByAuthBtn = $("button.getrecbyauth");


  this._bindEvents();
  return false;
};


Library.prototype._bindEvents = function (){
  // this.$btn.on("click", $.proxy(this._handleClick, this));
  // this.$testBtn.on("click", $.proxy(this._handleTest, this));
  this.$addBookBtn.on("click", $.proxy(this._handleAddBookBtn, this));
  // this.$getBookRec.on("click", $.proxy(this._handleGetBookRec, this));
  // $("#getrecbyauth").on("click", $.proxy(this._handlegetBookByAuth, this));
  return false;
};

Library.prototype._handleTest = function(){
  alert("fired");
  return false;
};

$('#modal').on('show.bs.modal', function (e) {
  var book = SarLibrary.getRandomBook();
  $("#modalimage").attr('src',book.image);
  $("#modaltitle").text(book.title);
  $("#modalauthor").text('Author: ' + book.author);
  $("#modalpagenumbers").text('Number Of Pages: ' + book.numPages);
  $("#modalpublicationdate").text('Publication Date: ' + book.publishDate);
  $("#modalremovebutton").attr('src',book.removeButtonImg);
});

Library.prototype._handleAddBookBtn = function(){
      // $(".addbookbutton").on('click', function(){
        var image = $("#uploadImage").val();
        var title = $(".formTitle").val();
        var author = $(".formAuthor").val();
        var pages = $(".formPages").val();
        var date = $(".formPubDate").val();
        var button = $(".formRemoveImage").val();
        $(".formImage, .formTitle, .formAuthor, .formPages, .formPubDate, .formRemoveImage").val("");
        $("tbody").append("<tr accept='image'><td><img src=" + image + "></td><td>" + title + "</td><td>" + author + "</td><td>" + pages + "</td><td>" + date + "</td><td>" + button + "</td></tr>");
          var book = new Book({image:image, title:title, author:author, numPages:pages, publishDate:date, removeButtonImg:button});

          SarLibrary.addBook(book);
};



      //Book Objects
      window.gPsychCyb = new Book({image:"Images/PC.jpg",title: "Psycho-Cybernetics", author: "Maxwell Maltz", numPages: 310,pubDate: "November 17, 1960 03:24:00", removeButtonImg:"Images/removeicon.png"});
      window.gIT = new Book({image:"Images/itbook.jpg",title: "IT", author: "Stephen King", numPages: 800,pubDate: "December 17, 1995 03:24:00", removeButtonImg:"Images/removeicon.png"});
      window.gCatcherInTheRye = new Book({image:"Images/citr.jpg", title: "Catcher In The Rye", author: "JD Salinger", numPages: 200,pubDate:"December 22, 1951, 03:24:00", removeButtonImg:"Images/removeicon.png"});
      window.gPrisonerOfTehran = new Book({image:"Images/pot.jpg", title: "Prisoner Of Tehran", author: "Marina Nemat", numPages: 400, pubDate:"January 20, 2007, 02:19:00", removeButtonImg:"Images/removeicon.png"});
      window.gTheObstacleIsTheWay = new Book({image:"Images/oitw.jpg", title: "The Obstacle Is The Way", author: "Ryan Holiday", numPages: 240, pubDate: "January 21, 2014, 01:19:00", removeButtonImg:"Images/removeicon.png"});
      window.gTheArtOfWar = new Book({image:"Images/aow.jpg", title: "The Art Of War", author: "Sun Tzu", numPages: 245, pubDate:"5th Century B.C., 04:21:00", removeButtonImg:"Images/removeicon.png"});
      window.gStormOfTheCentury = new Book({image:"Images/sotc.jpg",title: "Storm Of The Century", author: "Stephen King", numPages: 406, pubDate:"1999, 05:19:00", removeButtonImg:"Images/removeicon.png"});
      SarLibrary.addBook(gTheArtOfWar);
      SarLibrary.addBook(gTheObstacleIsTheWay);
      SarLibrary.addBook(gPsychCyb);
      SarLibrary.addBook(gIT);
      SarLibrary.addBook(gCatcherInTheRye);
      SarLibrary.addBook(gPrisonerOfTehran);
      SarLibrary.addBook(gStormOfTheCentury);



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
                  return (" <img class=\"removeicon\"src=" + row.removeButtonImg +">");
           }},
          ]
        });

        // table.MakeCellsEditable({
        //   "onUpdate": myCallbackFunction
        //    });

      $('#table_id').on( 'click', 'tr th', function (e) {
        table.cell( this.title ).edit();
      });

// REMOVE ROW //
     $('#table_id').on( 'click', '.removeicon', function () {
         table
             .row( $(this).parents('tr') )
             .remove()
             .draw();
     });

// HOVER ON RANDOM BOOK BUTTON //
     $(".getbookrec").popover({ trigger: "manual" , html: true, animation:false})
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".hoverbutton").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".hoverbutton:hover").length) {
                    $(_this).popover("hide");
                }
            }, 300);
      });


  function myCallbackFunction (updatedCell, updatedRow, oldValue) {
      console.log("The new value for the cell is: " + updatedCell.data());
      console.log("The values for each cell in that row are: " + updatedRow.data());
  }

  $(function (){
      window.SarLibrary = new Library ("sara");
      SarLibrary.initializationMethod();

  });
