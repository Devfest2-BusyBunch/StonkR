import { Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const BitcoinCalculator = () => {
    const [amount, setAmount] = useState();

    const [investedAmt, setInvestedAmt] = useState(0);
    const [returns, setReturns] = useState(0);

    const [colormode, setColormode] = useState("");

    useEffect(() => {
        setColormode(localStorage.getItem("chakra-ui-color-mode"));
    }, []);

    const handleCalculateBTC = () => {
        setInvestedAmt(amount);
        const returnAmt = Math.round((46855 / 909) * amount);
        setReturns(returnAmt);
    };

    return (
        <div>
            <h1 className="calc-title">BTC Calculator</h1>
            <div className="calc-items">
				<div>
					<h2>What if you had invested in some BTC back in 1st January, 2017?</h2>
					<h2>Imagine how much that could be today</h2>
				</div>
                <Grid templateColumns="repeat(2, 1fr)">
                    <GridItem>
                        <label>Amount (in USD): </label>
                    </GridItem>
                    <GridItem>
                        <input
                            type="number"
                            placeholder="Amount"
                            className={colormode === "dark" && "darkmode-input"}
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    </GridItem>
                </Grid>
            </div>

            <Button
                onClick={handleCalculateBTC}
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
			<h2>Total Invested Amount: $ {investedAmt}</h2>
			<h2>Maturity Amount: $ {returns}</h2>
			<h2>Profit: $ {returns - investedAmt}</h2>
			<h1 className="calc-subtitle">INR Amounts</h1>
			<h2>Total Invested Amount: ₹ {investedAmt * 74}</h2>
			<h2>Maturity Amount: ₹ {returns * 74}</h2>
			<h2>Profit: ₹ {(returns - investedAmt) * 74}</h2>
        </div>
    );
};

export default BitcoinCalculator;
