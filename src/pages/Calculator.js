import SipCalc from "components/SIPCalc";
import LumpSumCalc from "components/LumpSumCalc";
import BitcoinCalculator from "components/BitcoinCalculator";
import { Box } from "@chakra-ui/react";

const Calculator = () => {
	return (
		<Box>
			<SipCalc />
			<LumpSumCalc />
			<BitcoinCalculator />
		</Box>
	);
};

export default Calculator;
