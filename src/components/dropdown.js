import React from 'react';

class DropdownComponent extends React.Component {
    render() {
        return (
            <div className="dropdown">
                <select value={this.props.activeSound} id={this.props.soundId} onChange={evt => this.props.handleSoundChange(evt)} className="selectpicker">
                    <option value="clave">Clave</option>
                    <option value="hhcl">HHCL</option>
                    <option value="kick">Kick</option>
                    <option value="perc">Perc</option>
                    <option value="snare">Snare</option>
                </select>
            </div>
        );
    }
}

export default DropdownComponent;