import {
	Box,
	chakra,
	Container,
	Flex,
	Heading,
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
	VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Logo = props => {
	return (
		<Box className="footer-topdiv">
			<Image
				src={"https://foodict.s3.ap-south-1.amazonaws.com/misc/coins+(1).png"}
				height="40px"
				marginRight="20px"
				{...props}
			/>
			<Heading color={"primary.400"}>StonkR</Heading>
		</Box>
	);
};

const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			marginTop="80px">
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				spacing={4}
				justify={"center"}
				align={"center"}>
				<Logo />
				<Flex
					direction={isNotSmallerScreen ? "row" : "column"}
					alignItems={"center"}>
					<Link
						as={RouterLink}
						to="/"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						Home
					</Link>
					<Link
						as={RouterLink}
						to="/dashboard"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						Dashboard
					</Link>
					<Link
						as={RouterLink}
						to="/leaderboard"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						Leaderboard
					</Link>
					<Link
						as={RouterLink}
						to="/quote"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						Quote
					</Link>
					<Link
						as={RouterLink}
						to="/calculator"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						Calculator
					</Link>
					<Link
						as={RouterLink}
						to="/about"
						marginBottom={!isNotSmallerScreen && 1}
						marginRight={isNotSmallerScreen && 3}>
						About
					</Link>
				</Flex>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.700")}>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}>
					<Text>© 2020 StonkR | All rights reserved</Text>
					<Stack direction={"row"} spacing={0}>
						<SocialButton
							label={"Github"}
							href={"https://github.com/Devfest2-BusyBunch"}>
							<FaGithub />
						</SocialButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
