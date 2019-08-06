import ActiveRoute from '../core/active.route.service';
import AuthGuard from '../guard/auth.guard.js';
import NavbarComponent from '../components/navbar.component/navbar.component.js';
import {routes} from './routes.js';

const authGuard = new AuthGuard();


const activeRoute = new ActiveRoute();

export default class Router {
    async route() {
        const header = document.getElementsByTagName("app-header")[0];
        const container = document.getElementsByTagName("app-container")[0];
        const request = activeRoute.parseRequestURL();
        const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');    
        const component = routes[url] ? routes[url]["component"] : routes['**']["component"];  
        const guard = routes[url] ? routes[url]["guard"] : routes['**']["guard"];
        
        if (guard) {
            if(!authGuard.canActivate()) {this._routing.navigate("/login"); return;}
        }

        if(authGuard.canActivate()) {
            const navbarComponent = new NavbarComponent();
            navbarComponent.beforeRender && await navbarComponent.beforeRender();
            header.innerHTML = navbarComponent.render();
            navbarComponent.afterRender && navbarComponent.afterRender(); 
        } else {
            header.innerHTML = "";
        }
        

        component.beforeRender && await component.beforeRender();
        container.innerHTML = component.render();
        component.afterRender && component.afterRender();
    }
}
