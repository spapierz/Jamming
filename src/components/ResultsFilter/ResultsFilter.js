import React from 'react'; 
import './ResultsFilter.css';

class ResultsFilter extends React.Component {
	render() {
		return (
			<div className="resultsFilter">
				<nav>
					<ul>
						<li onClick={this.props.handleClick}>Top Results</li>
						<li>Artists</li>
						<li>Tracks</li>
						<li>Albums</li>
						<li>Playlists</li>
					</ul>
				</nav>
          	</div>
		);
	}
}

export default ResultsFilter;