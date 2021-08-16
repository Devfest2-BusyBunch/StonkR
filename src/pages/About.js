import { Box, Heading, HStack, Image, Text, Wrap } from "@chakra-ui/react";
import aboutsvg from "../aboutsvg.svg";

import MeetDevelopers from "components/MeetDevelopers";

const About = () => {
	return (
		<Box>
			<Heading
				as="h1"
				fontSize="50px"
				marginTop="30px"
				marginBottom="100px"
				color={"primary.400"}>
				About
			</Heading>

			<Text
				as="h2"
				fontSize="40px"
				marginTop="80px"
				marginBottom="50px"
				className="about-stonkr">
				StonkR
			</Text>
			<HStack spacing="30px">
				<Box>
					<Box textAlign="left">
						<Text color={"gray.500"} maxW={"3xl"}>
							Do you have the fear of losing your money in the stock market? Do
							you want to try the market out without putting your money at
							stake? Well,{" "}
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
							website to try mock trading using REAL stock market data from the
							USA stock market. The{" "}
							<Text as={"span"} color={"primary.400"}>
								Dashboard
							</Text>{" "}
							page shows you your portfolio, which includes your investments and
							assets.
						</Text>
						<Text color={"gray.500"} maxW={"3xl"} marginTop="20px">
							Thinking about investing in mutual funds instead? Head over to the{" "}
							<Text as={"span"} color={"primary.400"}>
								Calculators
							</Text>{" "}
							page and check out how much returns you could get if you invest by
							using our{" "}
							<Text as={"span"} color={"primary.400"}>
								SIP Calculator
							</Text>{" "}
							or the{" "}
							<Text as={"span"} color={"primary.400"}>
								Lumpsum Calculator
							</Text>
							. Even better, your profits are adjusted for inflation! So you
							know, exactly how much your profits will be after maturity!
						</Text>
					</Box>
				</Box>

				<Box>
					<Image src={aboutsvg} w="300px" />
				</Box>
			</HStack>
			<Text
				as="h2"
				fontSize="35px"
				marginTop="120px"
				marginBottom="70px"
				className="about-stonkr">
				Meet the Developer Team
			</Text>
			<Wrap spacing="20px" justify="center">
				<MeetDevelopers
					name="Arihant Bansal"
					githubpfp="https://avatars.githubusercontent.com/u/17180950?v=4"
					linkedinbtn={"https://www.linkedin.com/in/arihantbansal/"}
					githubbtn={"https://github.com/arihantbansal"}
				/>
				<MeetDevelopers
					name="Piyush Mohite"
					githubpfp="https://avatars.githubusercontent.com/u/75901900?v=4"
					linkedinbtn={"https://www.linkedin.com/in/piyush-mohite-2b66421ba/"}
					githubbtn={"https://github.com/git-pi-e"}
				/>
				<MeetDevelopers
					name="Pranay Varshney"
					githubpfp="https://avatars.githubusercontent.com/u/75934932?v=4"
					linkedinbtn={"https://www.linkedin.com/in/pranay-varshney-43b677204/"}
					githubbtn={"https://github.com/pranayvarshney"}
				/>
				<MeetDevelopers
					name="Swarnab Garang"
					githubpfp="https://avatars.githubusercontent.com/u/72680953?v=4"
					linkedinbtn={"https://www.linkedin.com/in/swarnabgarang/"}
					githubbtn={"https://github.com/swarnabgarang"}
				/>
			</Wrap>
		</Box>
	);
};

export default About;
