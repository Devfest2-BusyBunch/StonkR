import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Spacer,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { NumberInput, NumberInputField } from "@chakra-ui/react";

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
		<Box marginBottom="80px">
			<Text
				as="h1"
				fontSize="30px"
				marginTop="50px"
				marginBottom="50px"
				color={"primary.400"}>
				BTC Calculator
			</Text>
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
						</NumberInput>
					</GridItem>
				</Grid>
			</div>

			<Button
				onClick={handleCalculateBTC}
				size="sm"
				rounded="md"
				marginTop="80px"
				marginBottom="80px"
				color={["primary.500", "primary.500", "white", "white"]}
				bg={["white", "white", "primary.500", "primary.500"]}
				_hover={{
					bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
				}}>
				Calculate
			</Button>

			<Flex textAlign="left">
				<Box marginBottom="30px">
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Total Invested Amount:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							$ {investedAmt}
						</Text>
					</Box>
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Maturity Amount:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							$ {returns}
						</Text>
					</Box>
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Profit:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							$ {returns - investedAmt}
						</Text>
					</Box>
				</Box>

				<Spacer />

				<Box marginBottom="30px">
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Total Invested Amount:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							₹ {investedAmt * 74}
						</Text>
					</Box>
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Maturity Amount:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							₹ {returns * 74}
						</Text>
					</Box>
					<Box className="calc-returns">
						<Text as="span" fontSize="20px">
							Profit:
						</Text>
						<Text as="p" fontSize="20px" color={"primary.300"}>
							₹ {(returns - investedAmt) * 74}
						</Text>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default BitcoinCalculator;
