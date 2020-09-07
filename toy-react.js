
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.child = [];
        this._root = null;
    }

    get root() {
        if (!this._root) {
            this._root = this.render().root;
        } 
        return this._root;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.child.push(component);
    }
}

export function render(component, parentElement) {
    parentElement.appendChild(component.root);
}

export function createElement(type, attributes, ...children) {
    let  e;
    if (typeof type == "string") {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }

    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }

    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === "string") {
                child = new TextWrapper(child);
            }
            if (typeof child == "object" && child instanceof Array) {
                insertChildren(child);
            } else if (typeof child == "object") {
                e.appendChild(child);
            }
        }
    }

    insertChildren(children);
    
    return e;
}