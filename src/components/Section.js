export class Section {
    constructor ({items, renderer, newCardRenderer}, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this.newCardRenderer=newCardRenderer;
        this._container=document.querySelector(containerSelector);
    }
    addItem(renderedItem) {
        this._container.append(renderedItem);
    }
    addNewItem(renderedItem) {
        this._container.prepend(renderedItem);
    }
    renderItems() {
        this._items.then(res => {
            res.forEach(item => {
                this.renderer({link: item.link,name: item.name, likes: item.likes, cardID: item._id, owner: item.owner._id});
            })
        })
        .catch((err)=>{console.log(err)})
    }
}