import {
    Box,
    chakra,
    Container,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

<<<<<<< HEAD
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
=======
const Logo = (props) => {
    return (
        <Box className="footer-topdiv">
            <Image
                src={
                    "https://foodict.s3.ap-south-1.amazonaws.com/misc/coins+(1).png"
                }
                height="40px"
                marginRight="20px"
                {...props}
            />
            <Heading color={"primary.400"}>StonkR</Heading>
        </Box>
    );
>>>>>>> 56d9e0bf26208db5e776d1ad1249cee84095dc8d
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
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				spacing={4}
				justify={"center"}
				align={"center"}>
				<Logo />
				<Stack direction={"row"} spacing={6}>
					<Link as={RouterLink} to="/">
						Home
					</Link>
					<Link as={RouterLink} to="/dashboard">
						Dashboard
					</Link>
					<Link as={RouterLink} to="/leaderboard">
						Leaderboard
					</Link>
					<Link as={RouterLink} to="/quote">
						Quote
					</Link>
					<Link as={RouterLink} to="/calculator">
						Calculator
					</Link>
					<Link as={RouterLink} to="/about">
						About
					</Link>
				</Stack>
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
					<Text>© 2021 | Made for fulfilment of Devfest2.0</Text>
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
