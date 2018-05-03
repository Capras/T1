
$(document).ready(function () {
  window.SarLibrary = new Library ("sara");
  window.SarLibrary.initializationMethod();

  


  // HOVER ON RANDOM BOOK BUTTON // put in doc.ready
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
