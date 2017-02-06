import React, { Component } from 'react'

import Ballot from '../ballot/index.js'
import { PrimaryGenerator } from '../components/generator'

import { districts, parties, candidates, trends } from '../data'

export default class Home extends Component {
	constructor() {
		super()
		this.handlePrimaryElection = this.handlePrimaryElection.bind(this)
		this.state = {}
	}
	handlePrimaryElection(primaryData) {
		this.setState({
			primaryData
		})
	}
	render() {
		return (
			<main>
				<header></header>
				<Ballot />
				<PrimaryGenerator popData={districts} candidates={candidates} parties={parties} trendData={trends} electionCompleteCallback={this.handlePrimaryElection}/>
			</main>
		)
	}
}