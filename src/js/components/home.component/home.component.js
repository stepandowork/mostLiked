import Routing from './../../core/routing.service';

export default class HomeComponent {
  constructor() {
    this._routing = new Routing();
  }

  render() {
    return `
    <div>
      <div>Home</div>
      <button type="button" class="btn btn-success" id="login-btn">Login</button>
      <button type="button" class="btn btn-dark" id="register-btn">Register</button>
    </div>`
  }

  afterRender() {
    //UI
    let loginButton = document.getElementById("login-btn");
    let registerButton = document.getElementById("register-btn");

    //Events
    loginButton.addEventListener("click", () => {
      location.hash = "/login";
    })
    registerButton.addEventListener("click", () => {
      this._routing.navigate("/register");      
    })
  }
}