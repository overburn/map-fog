import React from 'react';
import ReactDOM from 'react-dom';

class Viewport extends React.Component {


  constructor(props) {
    super(props);

    this.ctx = null;
    this.layerCtx = null;
  }

  onTouchMove(e) {
    let x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY;

    this.clip(x, y);
  }

  onMouseDown(e) {
    this.isDrag = true;
  }

  onMouseUp(e) {
    this.isDrag = false;
  }

  onMouseMove(e) {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    if(this.isDrag == true) {
        this.clip(x, y);
    }
  }

  clip(x, y) {
    this.layerCtx.beginPath();
    this.layerCtx.arc(x, y, 30, 0, 2 * Math.PI, false);
    this.layerCtx.save();
    this.layerCtx.clip();

    this.layerCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.layerCtx.restore();
  }

  componentDidMount() {
    var _this = this;

    let canvas = ReactDOM.findDOMNode(this.refs.vp);
    let layer = ReactDOM.findDOMNode(this.refs.layer);

    this.ctx = canvas.getContext('2d');
    this.layerCtx = layer.getContext('2d');



    this.props.src.onload = function() {

      let img = _this.props.src;
      let imgWidth = img.naturalWidth;
      let imgHeight = img.naturalHeight;

      let startX = 0;
      let startY = 0;
      let width = window.innerWidth;
      let height = window.innerHeight;

      let ratio = imgHeight/imgWidth;

      if(imgWidth > imgHeight) {
        width = height / ratio;
      } else {
        height = width * ratio;
      }

        startY = (window.innerHeight - height) / 2;
        startX = (window.innerWidth - width) / 2;



      _this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      _this.layerCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      _this.ctx.drawImage(_this.props.src, startX, startY, width, height);

      _this.layerCtx.beginPath();
      _this.layerCtx.fillStyle = "rgba(0, 0, 0, 0.95)";
      _this.layerCtx.fillRect(0, 0, window.innerWidth - 1, window.innerHeight - 1);
      _this.layerCtx.stroke();
    }
  }

  render() {
    return (
      <div>
        <canvas className='absolute-canvas' ref="vp"  width={window.innerWidth - 1} height={window.innerHeight - 1}/>
        <canvas className='absolute-canvas' ref="layer" onTouchMove={this.onTouchMove.bind(this)} width={window.innerWidth - 1} height={window.innerHeight - 1}/>
      </div>
    );
  }
}

export default Viewport;
