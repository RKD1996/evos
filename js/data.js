$(document).ready(function(){


  var config = {
    apiKey: "AIzaSyB0smPR2Gim2xphzbAieXdVxou-qSA-S4U",
    authDomain: "evos-3f75d.firebaseapp.com",
    databaseURL: "https://evos-3f75d.firebaseio.com",
    projectId: "evos-3f75d",
    storageBucket: "evos-3f75d.appspot.com",
    messagingSenderId: "901217485093"
  };
  firebase.initializeApp(config);


  var myDataRef = firebase.database();
  var name = $('#name').val();
  var email = $('email').val();
  var number = $('#no').val();
  var category = $('#Category_selector').val();
  var enquiry_about = $('textarea1').val();
  console.log(name.val()),
  console.log(email.val()),
  console.log(category.val()),
  console.log(enquiry_about.val())
  $('#small_btn').on('click', function(){
    myDataRef.push({name: name, email: email, number: number, category: category, enquiry_about: enquiry_about});
  });


});
