export default class DeleteImageModalComponent {
    constructor() {
        
    }

    set imageForDelete(image) {
        this.image = image;
    }

    set closeCallback(callback) {
        this.close = callback;
    }

    set deleteCallback(callback) {
        this.delete = callback;
    }

  render() {
    return `
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Delete image</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="close">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <p>Deleete image _id : ${this.image._id}?</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger close">Yes delete</button>
            <button type="button" class="btn btn-secondary btn-delete" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>
    `
  }

  afterRender() {
    document.querySelector(".modal").addEventListener("click", e=> {
        if (e.target.classList.contains("close")) {
            this.close();
        }
        if (e.target.classList.contains("btn-delete")) {
            this.deleteImage(this.image._id, this.image.url);
        }
    })
  }
}