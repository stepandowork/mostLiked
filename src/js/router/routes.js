import HomeComponent from '../components/home.component/home.component.js';
import LoginComponent from '../components/login.component/login.component.js';
import NotFoundComponent from '../components/notfound.component/notfound.component.js';
import RegisterComponent from '../components/register.component/register.component';
import UserComponent from '../components/user.component/user.component.js';
import NewsComponent from '../components/news.component/news.component.js';
import WinnersComponent from '../components/winners.component/winners.component.js';
import AuthGuard from '../guard/auth.guard.js';

const authGuard = new AuthGuard();

export let routes = {
    '/' : {
      component:new HomeComponent(),
      name: "Home"
    },
    '/login' : {
      component: new LoginComponent(),
      name: "Login"
    },
    '/register' : {
      component: new RegisterComponent(),
      name: "Registration"
    },
    '/user/:id' : {
      component: new UserComponent(), 
      guard: authGuard.canActivate(),
      name: "Profile"
    },
    '/news' : {
      component:new NewsComponent(),
      guard: authGuard.canActivate(),
      name: "News"
    },
    '/winners': {
      component:new WinnersComponent(),
      guard: authGuard.canActivate(),
      name: "Winners"
    },
    '**' : {
      component: new NotFoundComponent()
    } 
  }