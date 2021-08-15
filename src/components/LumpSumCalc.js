import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./components.css";
import {
    Spacer,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";
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
    const [infProfits, setInfProfits] = useState(0);

    const handleCalculateLumpsum = () => {
        const maturityAmount = Math.round(
            amount * Math.pow(1 + rate / 100, years)
        );
        setReturns(maturityAmount);
        setInvestedAmt(amount);

        const maturityAmountInf = Math.round(
            amount * Math.pow(1 + 6 / 100, years)
        );

        const inflationProfit = maturityAmount - maturityAmountInf;
        setInfProfits(inflationProfit);
    };

    return (
        <Box>
            <Text
                as="h1"
                fontSize="30px"
                marginTop="50px"
                marginBottom="50px"
                color={"primary.400"}
            >
                LumpSum Calculator
            </Text>
            <Box className="calc-items">
                <Flex>
                    <FormControl className="calc_item">
                        <FormLabel width={220}>Amount in INR:</FormLabel>
                        <NumberInput width={220}>
                            <NumberInputField
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </NumberInput>
                        <FormLabel width={220}>Number of Years:</FormLabel>
                        <NumberInput width={220}>
                            <NumberInputField
                                placeholder="Years"
                                value={years}
                                onChange={(e) => {
                                    setYears(e.target.value);
                                }}
                            />
                        </NumberInput>
                        <FormLabel width={300}>
                            {" "}
                            Expected Rate of Return (in %):{" "}
                        </FormLabel>
                        <NumberInput width={220}>
                            <NumberInputField
                                placeholder="Rate"
                                value={rate}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                }}
                            />
                        </NumberInput>
                    </FormControl>
                    <Spacer />

                    <div className="expected_output_sip">
                        <Text
                            as="h1"
                            fontSize="30px"
                            width="240px"
                            marginBottom="50px"
                        >
                            Expected Amount
                        </Text>
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
                    </div>
                </Flex>
            </Box>

            <Button
                onClick={handleCalculateLumpsum}
                size="sm"
                rounded="md"
                marginTop="80px"
                marginBottom="40px"
                color={["primary.500", "primary.500", "white", "white"]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                    bg: [
                        "primary.100",
                        "primary.100",
                        "primary.600",
                        "primary.600",
                    ],
                }}
            >
                Calculate
            </Button>
        </Box>
    );
};

export default LumpSumCalc;
