import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button className={this.props.squareClicked ? "square clicked" : "square"} onClick={this.props.onClick}></button>
        );
    }
}

export default Square;