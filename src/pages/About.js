import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import aboutsvg from "../aboutsvg.svg";

const About = () => {
    return (
        <Box>
            <Heading
                as="h1"
                fontSize="50px"
                marginTop="30px"
                marginBottom="100px"
                color={"primary.400"}
            >
                About
            </Heading>

            <Text
                as="h2"
                fontSize="40px"
                marginTop="80px"
                marginBottom="50px"
                color="white"
                className="about-stonkr"
            >
                StonkR
            </Text>
            <HStack spacing="30px">
                <Box>
                    <Box textAlign="left">
                        <Text color={"gray.500"} maxW={"3xl"}>
                            Do you have the fear of losing your money in the
                            stock market? Do you want to try the market out
                            without putting your money at stake? Well,{" "}
                            <Text as={"span"} color={"primary.400"}>
                                StonkR
                            </Text>{" "}
                            is here for you!
                        </Text>
                        <Text color={"gray.500"} maxW={"3xl"} marginTop="20px">
                            Use the{" "}
                            <Text as={"span"} color={"primary.400"}>
                                StonkR
                            </Text>{" "}
                            website to try mock trading using REAL stock market
                            data from the USA stock market. The{" "}
                            <Text as={"span"} color={"primary.400"}>
                                Dashboard
                            </Text>{" "}
                            page shows you your portfolio, which includes your
                            investments and assets.
                        </Text>
                        <Text color={"gray.500"} maxW={"3xl"} marginTop="20px">
                            Thinking about investing in mutual funds instead?
                            Head over to the{" "}
                            <Text as={"span"} color={"primary.400"}>
                                Calculators
                            </Text>{" "}
                            page and check out how much returns you could get if
                            you invest by using our{" "}
                            <Text as={"span"} color={"primary.400"}>
                                SIP Calculator
                            </Text>{" "}
                            or the{" "}
                            <Text as={"span"} color={"primary.400"}>
                                Lumpsum Calculator
                            </Text>
                            . Even better, your profits are adjusted for
                            inflation! So you know, exactly how much your
                            profits will be after maturity!
                        </Text>
                    </Box>
                </Box>

                <Box>
                    <Image src={aboutsvg} w="300px" marginTop="120px" />
                </Box>
            </HStack>
            <Text
                as="h2"
                fontSize="30px"
                marginTop="100px"
                marginBottom="0px"
                color="white"
            >
                Meet the Developer Team
            </Text>
        </Box>
    );
};

export default About;
