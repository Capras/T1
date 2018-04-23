
  $(document).ready( function (){
    window.SarLibrary = new Library ("sara");
    SarLibrary.init();



      //Book Objects
      window.gIT = new Book({title: "IT", author: "Stephen King", numPages: 800,pubDate: "December 17, 1995 03:24:00"});
      window.gCatcherInTheRye = new Book({title: "Catcher In The Rye", author: "JD Salinger", numPages: 200,pubDate:"December 22, 1951, 03:24:00"});
      window.gPrisonerOfTehran = new Book({title: "Prisoner Of Tehran", author: "Marina Nemat", numPages: 400, pubDate:"January 20, 2007, 02:19:00"});
      window.gTheObstacleIsTheWay = new Book({title: "The Obstacle Is The Way", author: "Ryan Holiday", numPages: 240, pubDate: "January 21, 2014, 01:19:00"});
      window.gTheArtOfWar = new Book({title: "The Art Of War", author: "Sun Tzu", numPages: 245, pubDate:"5th Century B.C., 04:21:00"});
      window.gStormOfTheCentury = new Book({title: "Storm Of The Century", author: "Stephen King", numPages: 406, pubDate:"1999, 05:19:00"});
      SarLibrary.addBook(gIT)
      SarLibrary.addBook(gCatcherInTheRye)
      SarLibrary.addBook(gPrisonerOfTehran)
      SarLibrary.addBook(gTheArtOfWar)
      SarLibrary.addBook(gStormOfTheCentury)
      SarLibrary.addBook(gTheObstacleIsTheWay)

      var table = $("#table_id").DataTable({
          data: SarLibrary._booksArray,
          columns: [
           { data: "title" },
           { data: "author" },
           { data: "numPages" },
           { data: "publishDate" },
           // { “orderable”: false, data: “icons”, render: function(data, type, row, meta) {
           //       return (“<a href=\“javascript:deleteRow(” + row + “)\“> <img class=\“delete\” src=\“Images/aow.png\“>”);
           //   }}
          ]
        });

        // $('tbody tr[role="row"]').on("click", function (){
        //   console.log($(this).text())
        // })

          table.MakeCellsEditable({
            "onUpdate": myCallbackFunction
             });


         $('#table_id').on( 'click', 'td', function () {
             table
                 .row( $(this).parents('tr') )
                 .remove()
                 .draw();
         });

      var newbookrow = 1;
        $("#addRow").on( 'click', function (book) {
            table.row.add( [
                book.title,
                book.author,
                book.numPages,
                book.publishDate,
            ] ).draw( false );

            newbookrow++;
        });



    });


  function myCallbackFunction (updatedCell, updatedRow, oldValue) {
      console.log("The new value for the cell is: " + updatedCell.data());
      console.log("The values for each cell in that row are: " + updatedRow.data());
  }
