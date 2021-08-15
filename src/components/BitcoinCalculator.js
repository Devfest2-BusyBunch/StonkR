import { Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";

import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

const BitcoinCalculator = () => {
	const [amount, setAmount] = useState();

	const [investedAmt, setInvestedAmt] = useState(0);
	const [returns, setReturns] = useState(0);

	const handleCalculateBTC = () => {
		setInvestedAmt(amount);
		const returnAmt = Math.round((46855 / 909) * amount);
		setReturns(returnAmt);
	};

	return (
		<div>
			<h1 className="calc-title">BTC Calculator</h1>
			<div className="calc-items">
				<div className="center-align">
					<h2>
						What if you had invested in some Bitcoin back in 1st January, 2017?
					</h2>
				</div>
				<div className="center-align">
					<h2>Imagine how much that could be today</h2>
				</div>
				<Grid templateColumns="repeat(2, 1fr)" className="input-row btc-input">
					<GridItem>
						<label className="input-label">Amount (in USD): </label>
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
			</div>

			<Button
				onClick={handleCalculateBTC}
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
			<div className="calc-returns">Total Invested Amount: $ {investedAmt}</div>
			<div className="calc-returns">Maturity Amount: $ {returns}</div>
			<div className="calc-returns">Profit: $ {returns - investedAmt}</div>
			<h3 className="calc-subtitle">INR Amounts</h3>
			<div className="calc-returns">
				Total Invested Amount: ₹ {investedAmt * 74}
			</div>
			<div className="calc-returns">Maturity Amount: ₹ {returns * 74}</div>
			<div className="calc-returns">
				Profit: ₹ {(returns - investedAmt) * 74}
			</div>
		</div>
	);
};

export default BitcoinCalculator;
