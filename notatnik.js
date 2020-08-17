// pobieram info

FB.getLoginStatus(res => {
    console.log(res);
    if(res.status === "connected") {
        fbLogIn(res.authResponse.accessToken)
    }

  });

// jeżeli (status != connected) nic nie robie (user musi nacisnąc log in with facebook)

// jezeli conected wywsyłam token na backend === naciśniecie log in with facebook
 
// backend sprawdza token 
// backend pobiera dane 
// backend wysyłą responsa z danymi jeżeli user juz istnieje u nas 
// jeżeli nie istnieje tworze konto i wysyłam dane 


async function fbLogIn(fbToken) {
    try {
        const res = await axios.post("/api/login/FB", {token: fbToken});
        this.$router.push("/dashboard");
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.title;
        } else {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
} 



