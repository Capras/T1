
$(document).ready(function () {
    window.SarLibrary = new Library ("sara");
    window.SarLibrary.initializationMethod();
  
    // Book Objects
  var gPsychCyb = new Book({ image: "Images/PC.jpg", title: "Psycho-Cybernetics", author: "Maxwell Maltz", numPages: 310, pubDate: "November 17, 1960", removeButtonImg: "Images/removeicon.png" });
  var gIT = new Book({ image: "Images/itbook.jpg", title: "IT", author: "Stephen King", numPages: 800, pubDate: "December 17, 1995 03:24:00", removeButtonImg: "Images/removeicon.png" });
  var gCatcherInTheRye = new Book({ image: "Images/citr.jpg", title: "Catcher In The Rye", author: "JD Salinger", numPages: 200, pubDate: "December 22, 1951", removeButtonImg: "Images/removeicon.png" });
  var gPrisonerOfTehran = new Book({ image: "Images/pot.jpg", title: "Prisoner Of Tehran", author: "Marina Nemat", numPages: 400, pubDate: "January 20, 2007", removeButtonImg: "Images/removeicon.png" });
  var gTheObstacleIsTheWay = new Book({ image: "Images/oitw.jpg", title: "The Obstacle Is The Way", author: "Ryan Holiday", numPages: 240, pubDate: "January 21, 2014", removeButtonImg: "Images/removeicon.png" });
  var gTheArtOfWar = new Book({ image: "Images/aow.jpg", title: "The Art Of War", author: "Sun Tzu", numPages: 245, pubDate: "March 30, 1", removeButtonImg: "Images/removeicon.png" });
  var gStormOfTheCentury = new Book({ image: "Images/sotc.jpg", title: "Storm Of The Century", author: "Stephen King", numPages: 406, pubDate: "April 2, 1999,", removeButtonImg: "Images/removeicon.png" });
    window.SarLibrary.addBook(gTheArtOfWar);
    window.SarLibrary.addBook(gTheObstacleIsTheWay);
    window.SarLibrary.addBook(gPsychCyb);
    window.SarLibrary.addBook(gIT);
    window.SarLibrary.addBook(gCatcherInTheRye);
    window.SarLibrary.addBook(gPrisonerOfTehran);
    window.SarLibrary.addBook(gStormOfTheCentury);
  
  
    // HOVER ON RANDOM BOOK BUTTON
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
  
  
  });
  
  