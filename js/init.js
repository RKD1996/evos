$(document).ready(function(){
  $('.parallax').parallax();
  $("nav").css("background", "white");
  $("body").css("background", "#f0f5f5");
  $('.slider').slider();
  $('.sidenav').sidenav();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('select').formSelect();
  $('.progress').hide();
  $("#confirm_text").hide();
  $("#unconfirm_text").hide();
  if(window.innerWidth > 600){
    $("#div_frow").show();
    $("#div_frow1").show();
    $("#div_frow2").show();
    $("#footer_open").hide();
    $("#footer_open1").hide();
    $("#footer_open2").hide();
  }
  $('#contact_send_btn').click(function(){
    var name = $("#name").val();
    var email =  $("#email").val();
    var enquiry =  $("#textarea1").val();
    $.ajax({
      type: "POST",
      url: "https://api-evos.herokuapp.com/enquiries",
      headers: { contentType: "application/json"},
      data: {
        "name": name,
        "email": email,
        "enquiry": enquiry
      },
      success: function () {
        $("#confirm_text").show();
        $("#contact_info_table").hide();
      },
      error: function (err) {
        M.toast({html: 'Fill the required details to send Enquiry', classes: 'rounded'});
        $("#unconfirm_text").show();
      }
    });
  });
  $('#send_btn').click(function(){
    var name = $("#name").val();
    var email =  $("#email").val();
    var number =  $("#no").val();
    var category =  $("#Category_selector").val();
    var enquiry =  $("#textarea1").val();
    $('.progress').show();
    $('#modal1').show();
    $.ajax({
      type: "POST",
      url: "https://api-evos.herokuapp.com/enquiries",
      headers: { contentType: "application/json"},
      data: {
        "mobile": number,
        "name": name,
        "email": email,
        "category_id": category,
        "enquiry": enquiry
      },
      success: function () {
        $('.progress').hide();
        $('#modal1').hide();
        $("#confirm_text").show();
        $('#confirm_text').delay(3000).fadeOut();
        $("#name").val(" ");
        $("#email").val(" ");
        $("#no").val(" ");
        $("select").val('None');
        $('select').formSelect();
        $("#textarea1").val(" ");
      },
      error: function (err) {
        M.toast({html: 'Fill the required details to send Enquiry', classes: 'rounded'});
        console.log('ok')
        $('.progress').hide();
        $('#modal1').hide();
        $("#unconfirm_text").show();
        $('#unconfirm_text').delay(3000).fadeOut();
      }
    });
  });

  $('#small_btn').click(function(){
    var name = $("#name").val();
    var email =  $("#email").val();
    var number =  $("#no").val();
    var category =  $("#Category_selector").val();
    var enquiry =  $("#textarea1").val();
    $.ajax({
      type: "POST",
      url: "https://api-evos.herokuapp.com/enquiries",
      headers: { contentType: "application/json"},
      data: {
        "mobile": number,
        "name": name,
        "email": email,
        "category_id": category,
        "enquiry": enquiry
      },
      success: function () {
        M.toast({html: 'Request Has been Successfully Submitted!', classes: 'rounded'});
      },
      error: function (err) {
        M.toast({html: 'Fill the required details to send Enquiry', classes: 'rounded'});
      }
    });
  });

  $("#request_call").click(function() {
    var name = $("#name").val();
    var number =  $("#no").val();
    $('#modal1').show();
    M.toast({html: 'Please Wait', classes: 'rounded'});
    $.ajax({
      type: "POST",
      url: "https://api-evos.herokuapp.com/callbacks",
      headers: { contentType: "application/json"},
      data: {
        "mobile": number,
        "name": name
      },
      success: function () {
        $('#modal1').hide();
        M.toast({html: 'Thanks for The Request. We will get back to You as Soon as Possible ', classes: 'rounded'});
      },
      error: function (err) {
        M.toast({html: 'Sorry for the Inconvenience caused Please Try After Some Time', classes: 'rounded'});
      }
    });
  });

  if(window.innerWidth <= 600){
    $("#div_frow").hide();
    $("#div_frow1").hide();
    $("#div_frow2").hide();
    $('#small_enq').hide();
    $("#footer_open").on('click', function(){
      $("#div_frow").toggle();
    });
    $("#footer_open1").on('click', function(){
      $("#div_frow1").toggle();
    });
    $("#footer_open2").on('click', function(){
      $("#div_frow2").toggle();
    });
  }
  if(window.innerWidth <= 800){
    $('#small_enq').hide();
  }

});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('footer').outerHeight();

$(window).scroll(function(event){
  didScroll = true;
});
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if(Math.abs(lastScrollTop - st) <= delta)
  return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight){
    // Scroll Down
    $('Enquiry_Request').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
      $('Enquiry_Request').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;
}

$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if (scroll > 150) {
    $("nav").css("background" , "#0099cc");
    $("body").css("background" , "white");
  }

  else{
    $("nav").css("background" , "white");
    $("body").css("background" , "#f0f5f5");
  }
});

$(document).ready(function () {
  var cat = new Array();
  $.ajax({
    type: "GET",
    url: "https://api-evos.herokuapp.com/get_all_categories",
      headers: { contentType: "application/json"},
    dataType: "json",
    success: function (data) {
      cat = data.categories
      var i;
      var o1 = $("#Category_selector")
      for (i = 0; i < cat.length; i++) {
        o1 = "<option value='" + cat[i].id + "'>" + cat[i].category_name + "</option>"
        $("#Category_selector").append(o1).formSelect();
        // console.log("<option value='" + cat[i].id + "'>" + cat[i].category_name + "</option>")
      }
    }
  });
});
