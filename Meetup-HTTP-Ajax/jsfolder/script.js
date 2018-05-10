
// class data {
//   constructor(infoParams) {
//     this.country = infoParams.country;
//     this.city = infoParams.city;
//     this.state = infoParams.state;
//     this.zip = infoParams.zip;
//     this.ranking = infoParams.ranking;
//     this.membercount = infoParams.membercount;
//   }
// }

class Meetups {
    constructor(localStorageKey) { 
    this.localStorageKey = localStorageKey;
    this.refreshApiUrl = "https://api.meetup.com/2/cities?key=61582d1f43754f1e42e74e36104b2c&";
  }
  
  initializationMethod() {
    this.bindEvents();
    this.$searchByParams = $(".searchbutton");
    this.$returnResults = $(".searchbutton");
  }

  bindEvents() {
  $(".searchbutton").on('click', $.proxy(this.searchByParams, this));
  $(".searchbutton").on('click', $.proxy(this.returnResults, this));

  }

  searchByParams(event) {
    event.preventDefault();
    let inputValues = $("#formid").serialize();
    $.ajax ({
      dataType: 'jsonp',
      type:"GET",
      url: this.refreshApiUrl + inputValues,
      data: { }

    }).done($.proxy(this.returnResults, this));
  } 


  returnResults(response) {
    $("tbody").empty(); 
    for (let i = 0; i < response.results.length; i++) {
     $('#listid tbody').append(
      "<tr><td>" + response.results[i].zip + "</td>" +  
      "<td>" + response.results[i].country + "</td>" + 
      "<td>" + response.results[i].city + "</td>" + 
      "<td>" + response.results[i].ranking + "</td>" + 
      "<td>" + response.results[i].state + "</td>" + 
      "<td>" + response.results[i].member_count + "</td></tr>");
      $("#formid")[0].reset();
    }
      return localStorage.setItem(this.localStorageKey, JSON.stringify(response.results));
  }


}
  


$(document).ready(function () {
  Meetups = new Meetups("key");
  Meetups.initializationMethod();
})










