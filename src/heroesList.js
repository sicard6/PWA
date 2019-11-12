import React, { Component } from 'react';
import Hero from './hero';
import * as serviceWorker from './serviceWorker';
var md5 = require('md5');

export default class HeroesList extends Component {
	state = {
		heroes: [],
		online: true
	};

	componentDidMount() {
		if (!navigator.onLine || localStorage.getItem('heroes') !== null) {
			if (localStorage.getItem('heroes') === null)
				this.setState({ online: false });
			else {
				this.setState({ heroes: JSON.parse(localStorage.getItem('heroes')) });
				console.log('get cashed data');
			}
		}
	}

	constructor(props) {
		super(props);

		if (localStorage.getItem('heroes') === null) {
			this.publicKey = '5e0292c4fccf2ddeffffdc26fbc7b497';
			this.privateKey = '96df783de3d0eb22222e5284a2afde979e224265';
			this.ts = 'marvelts';
			let hash = md5(this.ts + this.privateKey + this.publicKey);
			fetch(
				`https://gateway.marvel.com/v1/public/characters?ts=${this.ts}&hash=${hash}&apikey=${this.publicKey}`
			)
				.then(x => {
					x.json().then(y => {
						this.setState({
							heroes: y.data.results
						});
						localStorage.setItem('heroes', JSON.stringify(y.data.results));
						console.log('Solicite info url');
					});
				})
				.catch(e => {
					console.log(e);
				});
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					{this.state.heroes.map((data, i) => (
						<Hero value={data} key={data.name} />
					))}
				</div>
			</div>
		);
	}
}

serviceWorker.register();
