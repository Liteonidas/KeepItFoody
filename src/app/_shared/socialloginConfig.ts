// Link z rozwiązaniem: https://codinglatte.com/posts/angular/facebook-login-angular-rest-api/
// Uzupełnić FACEBOOK_APP_ID_HERE i GOOGLE_APP_ID_HERE
// Tutaj https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/
// opisane jak wyłączyć https
import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angular5-social-login';
  
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('383960062445006')
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('24986625823-70frfbkahoaapo2rk7l4gp08ok9pigmd.apps.googleusercontent.com')
    }
  ]);
  return config;
}