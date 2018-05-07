$(function(){
  $("button").on('click', function() {

  $.ajax({
      dataType: 'jsonp',
      type:"GET",
      url:"https://api.meetup.com/2/cities",
      data: {
        page: "20"
      }
    }).done(function(response){
      console.log(response)
    }).fail(function(){
      console.log("fail")
    })
  })
});
