import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LDClient from 'ldclient-js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			songsLoaded: false,
			flagsLoaded: false,
			sortOrder: 'dateadded',
			songs: [],
		};
	}
	componentDidMount() {
		var ldclient = LDClient.initialize('5a4f9483e5a5862173399d24', { key: 'productowner@ourorg.com' });
		ldclient.on('ready', () =>
			this.setState({
				flagsLoaded: true,
				sortOrder: ldclient.variation('default-sort-dateadded') ? 'dateadded' : 'manual',
			})
		);
		setTimeout(() => {
			this.setState({
				songsLoaded: true,
				songs: [
					{ name: 'Only One', added: '2017-11-27' },
					{ name: 'Strongest', added: '2017-11-30' },
					{ name: 'Dreamer', added: '2017-12-02' },
					{ name: 'River', added: '2017-12-03' },
				],
			});
		}, 1000);
	}
	render() {
		const sortedSongs =
			this.state.sortOrder === 'manual'
				? this.state.songs
				: this.state.songs
						.slice()
						.sort((a, b) => Date.parse(a.added) > Date.parse(b.added))
						.reverse();
		return (
			<div className="App">
				{!this.state.songsLoaded && !this.state.flagLoaded ? (
					<div>Loading!!!!</div>
				) : (
					<div>
						<div
							style={{ fontWeight: this.state.sortOrder === 'manual' ? 'bold' : 'normal' }}
							onClick={() => this.setState({ sortOrder: 'manual' })}
						>
							Sort by manual
						</div>
						<div
							style={{ fontWeight: this.state.sortOrder === 'dateadded' ? 'bold' : 'normal' }}
							onClick={() => this.setState({ sortOrder: 'dateadded' })}
						>
							Sort by date added
						</div>
						<ul>{sortedSongs.map(song => <li>{song.name}</li>)}</ul>
					</div>
				)}
			</div>
		);
	}
}

export default App;
