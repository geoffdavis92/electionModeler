import React, { Component } from 'react'

import Ballot from '../ballot/index.js'
import { PrimaryGenerator } from '../components/generator'

import { districts, parties, candidates, trends } from '../data'

export default class Home extends Component {
	constructor() {
		super()
	}
	render() {
		return (
			<main>
				<header></header>
				<Ballot />
				<PrimaryGenerator popData={districts} candidates={candidates} trendData={trends}/>
			</main>
		)
	}
}