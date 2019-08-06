import Routing from './../core/routing.service';
import AuthService from './../services/auth.service';

export default class AuthGuard {
    constructor() {
        this._routing = new Routing();
        this.authService = new AuthService();
    }

    canActivate() {
        if (!this.authService.userToken) {
           /*  this._routing.navigate("/login"); */
            return false;
        }
        return true;
    }
}