Meteor.loginAsAdmin = function(password, callback) {
  //create a login request with admin: true, so our loginHandler can handle this request
  var loginRequest = {admin: true, password: password};

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};




Template.login.events({
    
  "click button": function () {
      // template data, if any, is available in 'this'
      //console.log("You pressed the button222");
      var email = $("#email").val();
      var passwd = $("#passwd").val();
      
      if (typeof console !== 'undefined')
        console.log("Login as  " + email);
        //check entries
        Meteor.loginWithPassword = function (email, passwd){
          console.log(Meteor.userId);
          };
        alert("Login.....");
        
  },
    
  "keydown #message": function(event){
    if(event.which == 13){
      // Submit the form
      //var name = document.getElementById('name');
      //var message = document.getElementById('message');
      console.log("You pressed the key");
  
    }
  }
});




Meteor.Router.add({
  '/': 'login',
  '/main': 'main',
  '*': 'not_found'
});




