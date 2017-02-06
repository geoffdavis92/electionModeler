import React, { Component } from 'react'
import AJAX from 'ajax.js'

const random = n => Math.floor(Math.random() * n)

export class PrimaryGenerator extends Component {
	constructor() {
		super()
		this.state = {}
		this.initGenerator = this.initGenerator.bind(this)
		this.getPrimaryVoteAmount = this.getPrimaryVoteAmount.bind(this)
		this.votePrimaries = this.votePrimaries.bind(this)
	}
	getPrimaryVoteAmount(party,totalVotes) {
		const { share } = party;
		return Math.floor(share * totalVotes);
	}
	initGenerator() {
		const { l, c, g } = this.props.trendData,
			  districts = this.props.popData;
		let totalPop = 0,
			primaryElection = [];
		districts.forEach((el,i,arr) => {
			const { pop } = el;
			totalPop += pop;
		});

		[l,c,g].forEach((party,i,arr) => {
			console.log(party)
			primaryElection.push({partyName:party.name,amount:this.getPrimaryVoteAmount(party,totalPop)})
		})

		this.setState({
			totalPop,
			primaryElection
		})
		setTimeout(() => this.votePrimaries(primaryElection), 500)
	}
	votePrimaries(elections) {
		elections.forEach((election,i,arr) => {
			const { partyName, amount } = election,
			 	  partyCandidates = [];
			this.props.candidates.forEach((candidate,_i,_arr) => {
				const { name, party, popularity } = candidate
				if (party === partyName) {
					partyCandidates.push({...candidate, popularity:(popularity*100)}) //vote:(Math.floor(popularity*amount)),...
				}
			})

			console.log(partyCandidates)

			// use Math.random to choose a candidate
			// if mathRandom 
			let simpleVictory = false
			partyCandidates.forEach(candidate => {
				const vote = random(100)
				if (vote >= candidate.popularity) {
					simpleVictory = candidate.name
					return simpleVictory
				}
			})

			if (simpleVictory) {
				this.setState({
					[`primary${partyName.toUpperCase()}`]: simpleVictory
				})
			} else {
				console.error('ln 67: vote is faulty.')
			}
		})
	}
	render() {
		return (
			<article>
				<button id="init" onClick={this.initGenerator}>Init</button>
			</article>
		)
	}
}