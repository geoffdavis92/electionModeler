import React, { Component } from 'react'
import AJAX from 'ajax.js'

const random = n => Math.floor(Math.random() * n)

export class PrimaryGenerator extends Component {
	constructor() {
		super()
		this.state = {electionCompleted: false}
		this.initGenerator = this.initGenerator.bind(this)
		this.getPrimaryVoteAmount = this.getPrimaryVoteAmount.bind(this)
		this.votePrimaries = this.votePrimaries.bind(this)
	}
	getPrimaryVoteAmount(party,totalVotes) {
		const { share } = party;
		return Math.floor(share * totalVotes);
	}
	initGenerator() {
		console.clear()
		const { l, c, g } = this.props.trendData,
			  districts = this.props.popData;
		let totalPop = 0,
			primaryElection = [];
		districts.forEach((el,i,arr) => {
			const { pop } = el;
			totalPop += pop;
		});

		[l,c,g].forEach((party,i,arr) => {
			primaryElection.push({partyName:party.name,amount:this.getPrimaryVoteAmount(party,totalPop)})
		})

		this.setState({
			totalPop,
			primaryElection
		})
		setTimeout(() => this.votePrimaries(primaryElection), 500)
	}
	votePrimaries(elections) {
		const primaryWinners = []
		elections.forEach((election,i,arr) => {
			const { partyName, amount } = election,
			 	  partyCandidates = [],
			 	  vote = random(100);
			this.props.candidates.forEach((candidate,_i,_arr) => {
				const { name, party, popularity } = candidate
				if (party === partyName) {
					partyCandidates.push({...candidate, popularity:(popularity*100)}) //vote:(Math.floor(popularity*amount)),...
				}
			})

			let victorious = false
			partyCandidates.forEach(candidate => {
				const { range, name, party, popularity } = candidate
				console.log({ name, party: candidate.party, vote, rangeMin: range.min, comparison: (vote >= range.min && vote <= range.max) })
				if (vote >= range.min && vote <= range.max) {
					victorious = {
						name,
						party,
						vote,
						range,
						popularity
					}
					return victorious
				}
			})

			if (victorious) {
				primaryWinners.push(victorious)
			} else {
				console.error('ln 67: vote is faulty.')
			}
		});
		const { conservativesPrimaryWinner, greenPrimaryWinner, liberalsPrimaryWinner } = this.state
		// console.log({ conservativesPrimaryWinner, greenPrimaryWinner, liberalsPrimaryWinner })
		this.setState({
			primaryWinners,
			electionCompleted: true
		})
		this.props.electionCompleteCallback(primaryWinners)
	}
	render() {
		if ( this.state.electionCompleted ) {
			const primaryWinners = this.state.primaryWinners.map((winner,i) => (
				  	<tr key={i}>
				  		<td>{winner.name}</td>
				  		<td className={`party-${winner.party.toLowerCase()}`}>{winner.party}</td>
				  	</tr>
				  ))
			return (
				<article>
					<table>
						<thead>
							<tr>
								<th>Candidate</th>
								<th>Party</th>
							</tr>
						</thead>
						<tbody>
							{primaryWinners}
						</tbody>
					</table>
				</article>
			)
		} else {
			return (
				<article>
					<button id="init" onClick={this.initGenerator}>Init</button>
				</article>
			)
		}
	}
}