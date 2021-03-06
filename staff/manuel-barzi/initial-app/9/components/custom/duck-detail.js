/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckDetail(container) {
    Component.call(this, container);
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

DuckDetail.prototype.displayDuck = function(duck) {
    var title = this.container.getElementsByTagName('h3')[0];
    title.innerText = duck.title;

    var image = this.container.getElementsByTagName('img')[0];
    image.src = duck.imageUrl;

    var price = this.container.getElementsByTagName('span')[0];
    price.innerText = duck.price;

    var description = this.container.getElementsByTagName('p')[0];
    description.innerText = duck.description;

    var link = this.container.getElementsByTagName('a')[0];
    link.href = duck.link;
};