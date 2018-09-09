import React from 'react';
import { modelInstance } from '../model/model';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sounds: modelInstance.getSounds(),
        };
    }

    render() {
        return (
            <div className="test">
                
            </div>
        );
    }
}

export default Test;