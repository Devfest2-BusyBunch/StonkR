import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./components.css";
import {
    Spacer,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";

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
        const returns = maturityAmount - amount * years * 12;
        setReturns(returns);
        setInvestedAmt(amount * years * 12);

        const periodicRateinf = 6 / 1200;
        const maturityAmountInf = Math.round(
            (amount *
                (1 + periodicRateinf) *
                (Math.pow(1 + periodicRateinf, 12 * years) - 1)) /
                periodicRateinf
        );

        // const maturityAmountInf = Math.round(
        //     amount * Math.pow(1 + 6 / 100, years)
        // );

        const inflationProfit =
            maturityAmount - amount * years * 12 - maturityAmountInf;
        setInfProfits(inflationProfit);
    };

    return (
        <div>
            <h1 className="calc-title">SIP Calculator</h1>
            <div className="calc-items">
                <Flex>
                    <FormControl id="sip_calc">
                        <FormLabel width={220}>Amount in INR:</FormLabel>
                        <NumberInput width={220}>
                            <NumberInputField
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
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
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormLabel width={300}> Expected Rate of Return (in %):{" "}</FormLabel>
                        <NumberInput width={220}>
                            <NumberInputField
                                placeholder="Rate"
                                value={rate}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                }}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        
                    </FormControl>
                    <Spacer/>
                                
                    <div className="expected_output_sip">
                        <h1 style={{fontSize:'30px'}} >Expected Amount</h1>
                        <div className="calc-returns">
                            <h1>Total Invested Amount: </h1>
                            <p>  ₹{investedAmt}</p>
                        </div>
                        <div className="calc-returns">Maturity Amount: ₹ {returns}</div>
                        <div className="calc-returns">
                            Profit: ₹ {returns - investedAmt}
                        </div>
                        <div className="calc-returns">
                            Profit (adjusted for inflation): ₹ {infProfits}
                        </div>
                    </div>
                </Flex>
                
                
            </div>

            <Button
                onClick={handleCalculateSIP}
                size="sm"
                rounded="md"
                marginTop="50px"
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

            
        </div>
    );
};

export default SIPCalc;
