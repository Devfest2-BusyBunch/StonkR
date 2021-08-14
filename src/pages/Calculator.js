import React from "react";
import SipCalc from "../components/SIPCalc";
import LumpSumCalc from "../components/LumpSumCalc";
import BitcoinCalculator from "../components/BitcoinCalculator";

const Calculator = () => {
    return (
        <div>
            <SipCalc />
            <LumpSumCalc />
            <BitcoinCalculator />
        </div>
    );
};

export default Calculator;
