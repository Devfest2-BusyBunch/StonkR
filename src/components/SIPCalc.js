import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./components.css";

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
                <Grid templateColumns="repeat(2, 1fr)" className="input-row">
                    <GridItem>
                        <label className="input-label">Amount: </label>
                    </GridItem>
                    <GridItem>
                        <NumberInput>
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
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" className="input-row">
                    <GridItem>
                        {" "}
                        <label className="input-label">Number of Years: </label>
                    </GridItem>
                    <GridItem>
                        <NumberInput>
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
                                onChange={(e) => {
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
            <div className="calc-returns">
                Total Invested Amount: ₹ {investedAmt}
            </div>
            <div className="calc-returns">Maturity Amount: ₹ {returns}</div>
            <div className="calc-returns">
                Profit: ₹ {returns - investedAmt}
            </div>
            <div className="calc-returns">
                Profit (adjusted for inflation): ₹ {infProfits}
            </div>
        </div>
    );
};

export default SIPCalc;
