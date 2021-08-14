import React, { useState } from "react";

const SIPCalc = () => {
	const [amount, setAmount] = useState();
	const [years, setYears] = useState();
	const [rate, setRate] = useState();

	const [returns, setReturns] = useState(0);

	const handleCalculateSIP = () => {
		const periodicRate = rate / 1200;
		const maturityAmount = Math.round(
			(amount *
				(1 + periodicRate) *
				(Math.pow(1 + periodicRate, 12 * years) - 1)) /
				periodicRate
		);
		setReturns(maturityAmount);
	};

	return (
		<div>
			<h1>SIP Calculator</h1>
			<div>
				<label>Amount</label>
				<input
					type="number"
					placeholder="Amount"
					value={amount}
					onChange={e => {
						setAmount(e.target.value);
					}}
				/>
			</div>
			<div>
				<label>Number of Years</label>
				<input
					type="number"
					placeholder="Years"
					value={years}
					onChange={e => {
						setYears(e.target.value);
					}}
				/>
			</div>
			<div>
				<label>Expected Rate of Return (in %)</label>
				<input
					type="number"
					placeholder="Rate"
					value={rate}
					onChange={e => {
						setRate(e.target.value);
					}}
				/>
			</div>
			<button onClick={handleCalculateSIP}>Calculate</button>
			<div>Maturity Amount: {returns}</div>
		</div>
	);
};

export default SIPCalc;
