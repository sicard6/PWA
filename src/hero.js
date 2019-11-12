import React, { Component } from 'react';
import * as serviceWorker from './serviceWorker';

export default class Hero extends Component {
	render() {
		return (
			<div className="card col-3">
				<div className="card-body">
					<h5 className="card-title">{this.props.value.name}</h5>
					<p className="card-text">{this.props.value.description}</p>
					<a href={this.props.value.urls[0].url} className="btn btn-primary">
						detail
					</a>
				</div>
			</div>
		);
	}
}

serviceWorker.register();
