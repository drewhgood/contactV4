
$(document).ready(function() {


  var contacts; 

  $.ajax({
      url: '/contacts.json',
      type: 'GET',
    })
    .done(function(data) {
      // console.log("success");
        contacts = data;
        insertContacts();
    })
    .fail(function() {
      console.log("error, contats did not load properly.");
    })
    .always(function() {
      console.log("contacts loaded successfuly");
    });

  var insertContacts = function(){
    $.each(contacts, function( k, v ) {
      $('#contacts_list').append("<tr><td>"+v.first_name+"</td><td>"+v.last_name+"</td><td>"+v.email+"</td><td>"+v.phone+"</td></tr>")
    });
  }

  $('#addContactForm').on('click', function(event){
    event.preventDefault() 
    var row = "<tr id="+'newForm'+"><td><input type='text' name='first_name'></td><td><input type='text' name='last_name'></td><td><input type='text' name='email'></td><td><input type='text' name='phone'><button id='addContact' class='btn btn-lrg'>+</button></td></tr>"

    $('#contacts_list').prepend(row);


    $('#addContact').on('click', function(){
   
    var first_name = $("input[name=first_name]").val();
    var last_name = $("input[name=last_name]").val();
    var phone = $("input[name=phone]").val();
    var email = $("input[name=email]").val();
  
      $.ajax({
        url: '/contacts/new',
        type: 'POST',
        // dataType: 'default: json',
        data: {first_name: first_name, last_name: last_name, email: email, phone: phone },
      })
      .done(function() {
        emptyForm();
        $('#newForm').fadeOut(300, function(){
          $('#contacts_list').prepend("<tr><td>"+first_name+"</td><td>"+last_name+"</td><td>"+email+"</td><td>"+phone+"</td></tr>").fadeIn(300)
        });
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
      
    });

  });

  var emptyForm = function(){
    $("input[name=first_name]").val('');
    $("input[name=last_name]").val('');
    $("input[name=phone]").val('');
    $("input[name=email]").val('');
   
  }


 

});





