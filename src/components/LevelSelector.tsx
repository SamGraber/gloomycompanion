import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export class LevelSelector extends React.Component<any, any> {
    state = {
		level: 1,
	};
	private max_level = 7;
	
	setLevel = (event) => {
		this.setState({ level: event.target.value });
	}
    
    // get_selection() {
    //     return (+this.spinner.value > this.max_level) ? this.max_level : this.spinner.value;
    // }

    // set_value(value: number) {
    //     this.spinner.value = ((value > this.max_level) ? this.max_level : value).toString();
	// }
	
	render() {
		return <span className="selectionlist">
			<TextField
				className="level-selector"
				label={this.props.label}
				value={this.state.level}
				inputProps={{min: 0, max: this.max_level}}
				onChange={this.setLevel}
				type="number" />
			{/* <label htmlFor="level-selector">{this.props.label}</label>
			<input type="number" value={this.state.level} min={0} max={this.max_level}/> */}
		</span>
	}
}
