import React from 'react';
import {render} from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

import Navbar from './navbar.jsx';
import Viewport from './viewport.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.image = new Image();
    this.image.src = "./img/test.jpg";

    this.state = {
      image: this.image
    };
  }

  componentDidMount() {

  }

  updateSource(e) {
    let _this = this;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(fileEvt) {
      _this.image.src = fileEvt.target.result;
    }

    reader.readAsDataURL(file);
  }

  render() {

    return (
      <div>
        <Navbar handleChange={this.updateSource.bind(this)}/>
        <Viewport src={this.state.image}/>
      </div>
    );
  }
}

render(
  <App/>,
  document.body
);
