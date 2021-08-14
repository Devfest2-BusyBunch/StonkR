import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import "./components.css";

import { Grid, GridItem } from "@chakra-ui/react";

const LumpSumCalc = () => {
	const [amount, setAmount] = useState();
	const [years, setYears] = useState();
	const [rate, setRate] = useState();

	const [returns, setReturns] = useState(0);
	const [investedAmt, setInvestedAmt] = useState(0);

	const handleCalculateLumpsum = () => {
		const maturityAmount = Math.round(amount * Math.pow(1 + rate / 100, years));
		setReturns(maturityAmount);
		setInvestedAmt(amount);
	};

	return (
		<div>
			<h1 className="calc-title">LumpSum Calculator</h1>
			<div className="calc-items">
				<Grid templateColumns="repeat(2, 1fr)">
					<GridItem>
						<label>Amount: </label>
					</GridItem>
					<GridItem>
						<input
							type="number"
							placeholder="Amount"
							value={amount}
							onChange={e => {
								setAmount(e.target.value);
							}}
						/>
					</GridItem>
				</Grid>
				<Grid templateColumns="repeat(2, 1fr)">
					<GridItem>
						<label>Number of Years: </label>
					</GridItem>
					<GridItem>
						<input
							type="number"
							placeholder="Years"
							value={years}
							onChange={e => {
								setYears(e.target.value);
							}}
						/>
					</GridItem>
				</Grid>
				<Grid templateColumns="repeat(2, 1fr)">
					<GridItem>
						<label>Expected Rate of Return (in %): </label>
					</GridItem>
					<GridItem>
						<input
							type="number"
							placeholder="Rate"
							value={rate}
							onChange={e => {
								setRate(e.target.value);
							}}
						/>
					</GridItem>
				</Grid>
			</div>

			<Button
				onClick={handleCalculateLumpsum}
				size="sm"
				rounded="md"
				color={["primary.500", "primary.500", "white", "white"]}
				bg={["white", "white", "primary.500", "primary.500"]}
				_hover={{
					bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
				}}>
				Calculate
			</Button>
			<div>Total Invested Amount: ₹ {investedAmt}</div>
			<div>Maturity Amount: ₹ {returns}</div>
			<div>Profit: ₹ {returns - investedAmt}</div>
		</div>
	);
};

export default LumpSumCalc;
