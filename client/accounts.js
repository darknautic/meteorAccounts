/*Meteor.loginAsAdmin = function(password, callback) {
  //create a login request with admin: true, so our loginHandler can handle this request
    var loginRequest = {admin: true, password: password};

    //send the login request
    Accounts.callLoginMethod({
      methodArguments: [loginRequest],
      userCallback: callback
    });
  };

*/


Template.login.events({

  'submit #loginForm' : function(e, t){
    
    e.preventDefault();
    //verify if passwdBox2 exists
    //if ($("#passwdBox2").length > 0) { }
    
    
    var email = $('#emailBox').val();
    var passwd= $('#passwdBox').val();

    
    // Here verify inputs  <-------------
    //check(email, Number);
   
    
    
    Meteor.loginWithPassword(email, passwd, function(err){
      if (err) {
        window.location.replace("/");
        console.log("Error :  Login attempt has failed.");
        console.log(err.reason);
        alert("Failed : User or Password Incorrect !¡");
        
        
      }
             
      else {

        console.log("Info : mail " + Meteor.user().emails[0].address);
        console.log("Info : id " + Meteor.userId());
        
        // Hash Value
        /*var current_date = (new Date()).valueOf().toString();
          var random = Math.random().toString();
          console.log(crypto.createHash('sha1').update(current_date + random).digest('hex'));
          */
                          
       
        alert("Continue ?");
        //window.location.href = "/main";
        //Session.set('SessionID',Meteor.userId());
        Session.set('loggedUser',Meteor.user().emails[0].address);
        alert(Session.get('loggedUser'));
        //window.location.href = "/main";
        //alert(Session.get('loggedUser'));
        console.log("Info : Successfully logged");                  

      }
      

    });
    
  }

   
});  //login events end


Template.signUp.events({
  'submit #signUpForm': function (e, t){
      
      e.preventDefault();
      
      var email = $('#emailBox').val();
      var passwd= $('#passwdBox').val();
      var passwd2= $('#passwd2Box').val();
      
      //verify inputs <--------------------------
      
      if (passwd != passwd2) {      
        alert("Password Does Not Match !¡");
      }
      else{
        //create account
        Accounts.createUser({email: email, password : passwd}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log("Error : Creation Failed");
            console.log(err);
            alert(err.reason);
            alert("Failed : Verify your data !¡");
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            console.log("Info : Account Creation Successful");
            console.log(Meteor.userId);
            alert("Your account has been created successfully !¡");
            //window.location.replace("/"); //does not put the originating page in the session history.
            window.location.href = "/";
            
          }

        });
        
        
      }
      
      return false;
  }
  
}); //signUp events end
  


Template.whois.events({
  'click a#whois' : function(){
    Meteor.logout(function(err){
        if (err) {
          console.log("Err - signOut Process");
          console.log(err);
          //alert('Err - signOut Process');
        }
        else{
          //Session.set('loggedUser',null);
          
          delete Session.keys['loggedUser'];
          window.location.replace("/");
          //console.log("Ok - signoOut successfully");
          //alert('Ok - signoOut successfully');
        }

    });
  }
});

Template.whois.loggedUser = function(){
  var whois = Session.get('loggedUser');
  //if(!whois){whois = "Sign out";}
  alert(whois);
  return whois;
  };
  


Meteor.Router.add({
  '/': 'login',
  '/main': 'main',
  '/signUp': 'signUp',
  '*': 'not_found'
});




