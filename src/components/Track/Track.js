import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			isRemoval: '+'
		}

		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.addOrRemove = this.addOrRemove.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	addOrRemove() {
		if (this.state.isRemoval === '+') {
			return this.addTrack;
		} else {
			return this.removeTrack;
		}
	}

	renderAction() {	
		const newState = this.state.isRemoval === '+' ? '-' : '+';
		this.addOrRemove;
		this.setState({ isRemoval: newState });
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				<a className="Track-action" onClick={this.renderAction}>{this.state.isRemoval}</a>
			</div>
		);
	}
}

export default Track;