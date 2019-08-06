import WinnersService from "../../services/winners.service";
import './winners.component.css'


export default class WinnersComponent {
    
    constructor() {
        this.winnersService = new WinnersService();
        this.iterator = 1;
    }
    
    /**
     * @description gets winners
     */
    async beforeRender() {
        this.winners = await this.winnersService.getWinners({part: this.iterator, limit: 15}).then(response=>response.winners);        
    }

    /**
     * 
     * @param {object} winner one winner
     * @description creates card for one winner
     * @returns {object} HTML div element with class card
     */
    createWinnerCard(winner){
        let card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.innerHTML = `
            <div class="card-header row">
                <div class="col-md-1 text-center">
                    <img src="${winner.member_id.user_id.avatar}" alt="${winner.member_id.user_id.full_name}">
                </div>
                <div class="col-md-11 text-center">                    
                    <h2>${winner.member_id.user_id.full_name}</h5>
                </div>                
            </div>
            <div class="card-body align-items-center row justify-content-around">
                ${this.createWinnerPictures(winner)}
            </div>
        `;
        return card;
    }

    /**
     * 
     * @param {object} winner one winner
     * @description gets images for one winner
     * @returns {string} string with HTML for all the images for 1 winner
     */
    createWinnerPictures(winner) {
        let pictures = "";
        for (let image of winner.member_id.images){
            pictures += `
                <div class="col-md-4 text-center">
                    <img src="${image.image_basic.url}" alt="..."  class="winner-picture">
                </div>
            `
        }
        return pictures;
    }


    /**
     * @description creates document fragment with all the winners
     * @returns {object} document fragment with all the winners
     */
    createWinnersFragment() {
        let fragment = document.createDocumentFragment();
        for(let winner of this.winners){
            if (winner.member_id.images.length) {                
                fragment.appendChild(this.createWinnerCard(winner));
            }
        }
        return fragment;
    }

    /**
     * @description inserts fragment into winners container
     */
    insertWinnerCards() {
        let winnersContainer = document.getElementById("winners-container");
        winnersContainer.appendChild(this.createWinnersFragment());
    }

    /**
     * @description creates winner container
     * @returns {string} string with html div
     */
    render() { 
        return `
        <div id="winners-container">
        </div>
        `;
    }

    /**
     * @description inserts winner cards to winners container
     */
    afterRender() {
        this.insertWinnerCards();
        window.addEventListener("scroll", e=> {
            let scrollable = document.documentElement.scrollHeight - window.innerHeight;
            let scrolled = window.scrollY;           
            if(Math.ceil(scrolled) === scrollable){ 
                this.iterator++;
                this.beforeRender().then(()=> this.insertWinnerCards());           
            }
        })
    }
}