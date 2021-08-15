import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import "./components.css";

import { Grid, GridItem } from "@chakra-ui/react";

import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

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
				<Grid templateColumns="repeat(2, 1fr)" className="input-row">
					<GridItem>
						<label className="input-label">Amount: </label>
					</GridItem>
					<GridItem>
						<NumberInput>
							<NumberInputField
								placeholder="Amount"
								value={amount}
								onChange={e => {
									setAmount(e.target.value);
								}}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</GridItem>
				</Grid>
				<Grid templateColumns="repeat(2, 1fr)" className="input-row">
					<GridItem>
						<label className="input-label">Number of Years: </label>
					</GridItem>
					<GridItem>
						<NumberInput>
							<NumberInputField
								placeholder="Years"
								value={years}
								onChange={e => {
									setYears(e.target.value);
								}}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</GridItem>
				</Grid>
				<Grid templateColumns="repeat(2, 1fr)" className="input-row">
					<GridItem>
						<label className="input-label">
							Expected Rate of Return (in %):{" "}
						</label>
					</GridItem>
					<GridItem>
						<NumberInput>
							<NumberInputField
								placeholder="Rate"
								value={rate}
								onChange={e => {
									setRate(e.target.value);
								}}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</GridItem>
				</Grid>
			</div>

			<Button
				onClick={handleCalculateLumpsum}
				size="sm"
				rounded="md"
				marginTop="50px"
				marginBottom="40px"
				color={["primary.500", "primary.500", "white", "white"]}
				bg={["white", "white", "primary.500", "primary.500"]}
				_hover={{
					bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
				}}>
				Calculate
			</Button>
			<div className="calc-returns">Total Invested Amount: ₹ {investedAmt}</div>
			<div className="calc-returns">Maturity Amount: ₹ {returns}</div>
			<div className="calc-returns">Profit: ₹ {returns - investedAmt}</div>
		</div>
	);
};

export default LumpSumCalc;
