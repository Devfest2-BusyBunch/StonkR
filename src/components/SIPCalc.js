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
                <Grid templateColumns="repeat(2, 1fr)" className="input-row">
                    <GridItem>
                        <label className="input-label">Amount: </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Amount"
                            className={
                                colormode === "dark"
                                    ? "darkmode-input calc-inputs"
                                    : "lightmode-input calc-inputs"
                            }
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" className="input-row">
                    <GridItem>
                        {" "}
                        <label className="input-label">Number of Years: </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Years"
                            className={
                                colormode === "dark"
                                    ? "darkmode-input calc-inputs"
                                    : "lightmode-input calc-inputs"
                            }
                            value={years}
                            onChange={(e) => {
                                setYears(e.target.value);
                            }}
                        />
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" className="input-row">
                    <GridItem>
                        <label className="input-label">
                            Expected Rate of Return (in %):{" "}
                        </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Rate"
                            className={
                                colormode === "dark"
                                    ? "darkmode-input calc-inputs"
                                    : "lightmode-input calc-inputs"
                            }
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
        </div>
    );
};

export default SIPCalc;
