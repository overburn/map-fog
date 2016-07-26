import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div  id="file-load-button">
        <input type="file" onChange={this.props.handleChange}/>
      </div>
    )
  }
}

export default Navbar;
