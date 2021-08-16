import { useState } from "react";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import { Spacer, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import "./components.css";

const SIPCalc = () => {
	const [amount, setAmount] = useState();
	const [years, setYears] = useState();
	const [rate, setRate] = useState();

	const [investedAmt, setInvestedAmt] = useState(0);
	const [returns, setReturns] = useState(0);
	const [infProfits, setInfProfits] = useState(0);

	const handleCalculateSIP = () => {
		const periodicRate = rate / 1200;
		const maturityAmount = Math.round(
			(amount *
				(1 + periodicRate) *
				(Math.pow(1 + periodicRate, 12 * years) - 1)) /
				periodicRate
		);
		const returns = maturityAmount;
		setReturns(returns);
		setInvestedAmt(amount * years * 12);

		const periodicRateinf = 6 / 1200;
		const maturityAmountInf = Math.round(
			(amount *
				(1 + periodicRateinf) *
				(Math.pow(1 + periodicRateinf, 12 * years) - 1)) /
				periodicRateinf
		);

		const inflationProfit = maturityAmount - maturityAmountInf;
		setInfProfits(inflationProfit);
	};

	return (
		<Box>
			<Heading
				as="h1"
				fontSize="30px"
				marginTop="50px"
				marginBottom="50px"
				color={"primary.400"}>
				SIP Calculator
			</Heading>
			<Box className="calc-items">
				<Flex>
					<FormControl className="calc_item">
						<FormLabel width={220}>Amount in INR:</FormLabel>
						<NumberInput width={220} min={500}>
							<NumberInputField
								placeholder="Amount"
								value={amount}
								onChange={e => {
									setAmount(e.target.value > 500 ? e.target.value : 500);
								}}
							/>
						</NumberInput>
						<FormLabel width={220}>Number of Years:</FormLabel>
						<NumberInput width={220} min={2}>
							<NumberInputField
								placeholder="Years"
								value={years}
								onChange={e => {
									setYears(e.target.value > 2 ? e.target.value : 2);
								}}
							/>
						</NumberInput>
						<FormLabel width={300}> Expected Rate of Return (in %): </FormLabel>
						<NumberInput width={220} min={2}>
							<NumberInputField
								placeholder="Rate"
								value={rate}
								onChange={e => {
									setRate(e.target.value > 2 ? e.target.value : 2);
								}}
							/>
						</NumberInput>
					</FormControl>
					<Spacer />

					<Box className="expected_output_sip">
						<Heading as="h1" fontSize="30px" width="240px" marginBottom="50px">
							Expected Amount
						</Heading>
						<Box className="calc-returns" marginBottom="30px">
							<Text as="span" fontSize="20px">
								{" "}
								Total Invested Amount:
							</Text>
							<Text as="p" fontSize="20px" color={"primary.300"}>
								{" "}
								₹ {investedAmt}
							</Text>
						</Box>
						<Box className="calc-returns" marginBottom="30px">
							<Text as="span" fontSize="20px">
								{" "}
								Maturity Amount:
							</Text>
							<Text as="p" fontSize="20px" color={"primary.300"}>
								{" "}
								₹ {returns}
							</Text>
						</Box>
						<Box className="calc-returns" marginBottom="30px">
							<Text as="span" fontSize="20px">
								{" "}
								Profit:
							</Text>
							<Text as="p" fontSize="20px" color={"primary.300"}>
								{" "}
								₹ {returns - investedAmt}
							</Text>
						</Box>
						<Box className="calc-returns" marginBottom="30px">
							<Text as="span" fontSize="20px">
								{" "}
								Profit (adjusted for inflation):
							</Text>
							<Text as="p" fontSize="20px" color={"primary.300"}>
								{" "}
								₹ {infProfits}
							</Text>
						</Box>
					</Box>
				</Flex>
			</Box>

			<Button
				onClick={handleCalculateSIP}
				size="sm"
				rounded="md"
				marginTop="80px"
				marginBottom="40px"
				color={["primary.500", "primary.500", "white", "white"]}
				bg={["white", "white", "primary.500", "primary.500"]}
				_hover={{
					bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
				}}>
				Calculate
			</Button>
		</Box>
	);
};

export default SIPCalc;
