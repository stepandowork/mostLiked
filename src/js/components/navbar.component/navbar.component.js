import AuthService from './../../services/auth.service';
import UserService from './../../services/user.service';
import Routing from '../../core/routing.service';
import './navbar.component.css';
import {routes} from './../../router/routes.js';

export default class NavbarComponent {
    constructor() {        
        this.routing = new Routing();
        this.userService = new UserService();
        this.authservice = new AuthService();
        this.routes = routes;
    }
    
    async beforeRender() {
        this._user = await this.authservice.userId;
    }

    render() {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/#/">App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                                     
            </ul>
            <button class="btn btn-primary logout-btn" id="logout-btn">Logout</button>
            </div>
        </nav>
    `
    }
    
    afterRender() {
        let navbar = document.querySelector("ul.navbar-nav");
        let fragment = document.createDocumentFragment();
        for(let route in routes) {
            if (this.generateRouteLink(route, routes[route])){
                fragment.appendChild(this.generateRouteLink(route, routes[route]));
            }            
        }
        navbar.appendChild(fragment);
        document.getElementById("logout-btn").addEventListener("click", (e)=> {            
            this.authservice.logout()
            .then( () => this.routing.navigate("/login"));
            
        })
    }

    generateRouteLink(key, route) {
        if (route.name && route.name !== "Login" && route.name !== "Registration"){ 
            let li = document.createElement("li");
            li.classList.add("nav-item");
            li.innerHTML = `<a class="nav-link" href="/#${route.name === "Profile" ? '/user/' + this._user : key}">${route.name}</a>`
            return li;
        } else {
            return "";
        }
        
    }
}