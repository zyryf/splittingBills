export default function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId: "603233220569288",
      cookie: true,
      xfbml: true,
      version: "v7.0",
    });

    FB.AppEvents.logPageView();
    //cant be called
    // FB.getLoginStatus(response => {
    //     //console.log(response)
    //   });
  };

  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}