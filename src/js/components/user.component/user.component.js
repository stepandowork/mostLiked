import UserService from './../../services/user.service';
import AuthService from './../../services/auth.service';
import ActiveRoute from './../../core/active.route.service';
import Routing from './../../core/routing.service';
import DeleteImageModalComponent from './../deletemodal.component/deleteModal.component.js';
import './user.component.css';

export default class UserComponent {
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
    this.activeRoute = new ActiveRoute();
    this.routing = new Routing();
    this.deleteModal = new DeleteImageModalComponent();
    this.authUserId = this.authService.userId;   
    this.activeUserId = this.activeRoute.parseRequestURL().id;     
  }

  async beforeRender() {
    this._user = await this.userService.getUser(this.activeUserId);
    this._userImages = await this.userService.getUserImages(this.activeUserId);
    this.imagesTemplate = this._userImages.images.map(image=> this.singleImageTemplate(image));
  }



  render() {
    console.log(this._userImages);
    return `
      <user-component>
        <div class="user-avatar-container d-flex justify-content-center">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${this._user.avatar}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${this._user.full_name}</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>        
        <div class="images-container container">
          <div class="row">
            ${this.imagesTemplate.join("")}
          </div>
        </div>
        <div class="model-container"></div>
      </user-component>
    `;
  }  

  singleImageTemplate(image) {
    return `
    <div class="col col-4">
      <div class="img-item" data-imageId="${image._id}">
        <img src="${image.url}" alt="">
        <div class="img-item-bottom">
          <span>
            <i class="fas fa-eye"></i>
            ${image.views.length}
          </span>
          <span>
            <i class="fas fa-thumbs-up"></i>
            ${image.likes.length}
          </span>
          <span>
              <i class="fas fa-trash-alt delete-image"></i>          
          </span>
        </div>
      </div>
    </div>
    `
  }

  modalClose() {
    document.querySelector(".model-container").innerHTML = "";
  }
  deleteImage(image_id, image_url) {
    let imagesContainer = document.querySelector(".images-container .row");
    imagesContainer = "";
    this._userImages.images = this._userImages.images.filter(img => img._id !== img._id);

    this.imagesTemplate = this._userImages.images.map(image => {
      this.singleImageTemplate(image);
    });

    imagesContainer.innerHTML = this.imagesTemplate.join("");
    this.modalClose();
  }

  afterRender() {
    document.getElementsByClassName("images-container")[0]
    .addEventListener("click", e => {
      if (e.target.classList.contains("delete-image")) {
        const imageId = e.target.closest("[data-imageId]").dataset.imageId;
        const [image] = this._userImages.images.filter(img => img._id === imageId);
        this.deleteModal.imageForDelete = image;
        this.deleteModal.closeCallback = this.modalClose.bind(this);
        this.deleteModal.deleteImageCallback = this.deleteImage.bind(this);
        document.querySelector(".model-container").innerHTML = this.deleteModal.render();
        this.deleteModal.afterRender();
      }
    })
  }
}