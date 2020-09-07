import { createElement, render, Component } from './toy-react.js';

class MyComponent extends Component {
    render() {
        return <div>
            <h1>My Compoent</h1>
            {this.children}
        </div>
    }
}


render(<div id="main">
    <MyComponent />
    <div class="hello">111</div> 
    <div></div>
</div>, document.body);