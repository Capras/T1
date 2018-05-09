
class data {
  constructor(infoParams) {
    this.country = infoParams.country;
    this.city = infoParams.city;
    this.state = infoParams.state;
    this.zip = infoParams.zip;
    this.ranking = infoParams.ranking;
    this.membercount = infoParams.membercount;
  }
}

class Meetups {
    constructor() {
    // this.localStorageKey = localStorageKey;
    this.refreshApiUrl = "https://api.meetup.com/2/cities?key=61582d1f43754f1e42e74e36104b2c&";
  }

initializationMethod() {
  this.bindEvents();
  this.$searchByParams = $(".searchbutton");
  this.$returnResults = $(".searchbutton");
  this.$formClone = $("#formid").clone();
}

bindEvents() {
$(".searchbutton").on('click', $.proxy(this.searchByParams, this));
$(".searchbutton").on('click', $.proxy(this.returnResults, this));

}

  searchByParams() {
    event.preventDefault();
    let inputValues = $("#formid").serialize();
    $.ajax ({
      dataType: 'jsonp',
      type:"GET",
      url: this.refreshApiUrl + inputValues,
      data: {
      }

      }).done($.proxy(this.returnResults, this));
        fail(function(){
        return "fail";
        });
      } 

  returnResults(response) {
    $("formid").children().remove(); 
    for (let i = 0; i < response.results.length; i++) {
     let newArray = $('#listid').append(
      "<tbody><thead><tr><td><b>Zip Code: </b>" + response.results[i].zip + "</td>" +  
      "<td><b>Country: </b>" + response.results[i].country + "</td>" + 
      "<td><b>Distance: </b>" + response.results[i].distance + "</td>" + 
      "<td><b>City: </b>" + response.results[i].city + "</td>" + 
      "<td><b>Ranking: </b>" + response.results[i].ranking + "</td>" + 
      "<td><b>State: </b>" + response.results[i].state + "</td>" + 
      "<td><b>Member Count: </b>" + response.results[i].member_count + "</td></thead></tbody>");
    }
    // $(".form-control").val(placeholder.attr('placeholder').empty()
    // $("ul").append(formClone).clone()
  }
}

  $(document).ready(function () {
    Meetups = new Meetups();
    Meetups.initializationMethod();
  });









