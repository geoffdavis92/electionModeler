import React, { Component } from 'react'
import AJAX from 'ajax.js'

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
		const { lD, c, g } = this.props.trendData,
			  districts = this.props.popData;
		let totalPop = 0,
			primaryElection = [];
		districts.forEach((el,i,arr) => {
			const { pop } = el;
			totalPop += pop;
		});

		[lD,c,g].forEach((party,i,arr) => {
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
					partyCandidates.push(candidate) //vote:(Math.floor(popularity*amount)),...
				}
			})
			
			// Vote for each primary nominee
			for(let currentVote=0;currentVote<amount;currentVote++) {
				
			}

			this.setState({
				[`primary${partyName.toUpperCase()}`]: 0
			})
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