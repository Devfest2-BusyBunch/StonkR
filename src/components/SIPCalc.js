import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./components.css";

const SIPCalc = () => {
    const [amount, setAmount] = useState();
    const [years, setYears] = useState();
    const [rate, setRate] = useState();

    const [investedAmt, setInvestedAmt] = useState(0);
    const [returns, setReturns] = useState(0);

    const [colormode, setColormode] = useState("");

    useEffect(() => {
        setColormode(localStorage.getItem("chakra-ui-color-mode"));
    }, []);

    const handleCalculateSIP = () => {
        const periodicRate = rate / 1200;
        const maturityAmount = Math.round(
            (amount *
                (1 + periodicRate) *
                (Math.pow(1 + periodicRate, 12 * years) - 1)) /
                periodicRate
        );
        setReturns(maturityAmount);
        setInvestedAmt(amount * years * 12);
    };

    return (
        <div>
            <h1 className="calc-title">SIP Calculator</h1>
            <div className="calc-items">
                <Grid templateColumns="repeat(2, 1fr)">
                    <GridItem>
                        <label>Amount: </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Amount"
                            className={colormode == "dark" && "darkmode-input"}
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)">
                    <GridItem>
                        {" "}
                        <label>Number of Years: </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Years"
                            className={colormode == "dark" && "darkmode-input"}
                            value={years}
                            onChange={(e) => {
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
                            className={colormode == "dark" && "darkmode-input"}
                            value={rate}
                            onChange={(e) => {
                                setRate(e.target.value);
                            }}
                        />
                    </GridItem>
                </Grid>
            </div>

            <Button
                onClick={handleCalculateSIP}
                size="sm"
                rounded="md"
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
            <div>Total Invested Amount: ₹ {investedAmt}</div>
            <div>Maturity Amount: ₹ {returns}</div>
            <div>Profit: ₹ {returns - investedAmt}</div>
        </div>
    );
};

export default SIPCalc;
