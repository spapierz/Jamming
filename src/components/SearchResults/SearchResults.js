import React from 'react'; 
import TrackList from '../TrackList/TrackList';
import ResultsFilter from '../ResultsFilter/ResultsFilter';
import './SearchResults.css';

class SearchResults extends React.Component {
	constructor(props) {
		super(props);

		this.test = this.test.bind(this);
	}

	test() {
        alert('test');
    }

	render() {
		return (
			<div className="SearchResults">
	            <h2>Results</h2>
	            {/*<ResultsFilter handleClick={this.test}/> */}
	            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
          	</div>
		);
	}
}

export default SearchResults;