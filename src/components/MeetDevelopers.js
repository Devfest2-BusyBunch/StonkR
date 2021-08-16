import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Button,
	Link,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialProfileSimple({
	githubpfp,
	name,
	linkedinbtn,
	githubbtn,
}) {
	return (
		<Center py={6}>
			<Box
				maxW={"320px"}
				w={"full"}
				boxShadow={"2xl"}
				borderRadius="15px"
				p={6}
				textAlign={"center"}>
				<Avatar
					size={"xl"}
					src={githubpfp}
					alt={"Avatar Alt"}
					mb={4}
					pos={"relative"}
				/>
				<Heading fontSize={"2xl"} fontFamily={"body"} marginBottom="20px">
					{name}
				</Heading>
				<Text fontWeight={600} color={"gray.500"} mb={4}>
					Undergrad @ BITS Goa
				</Text>

				<Stack mt={8} direction={"row"} spacing={4}>
					<Link className="meet-dev-button" href={linkedinbtn}>
						<Button
							flex={1}
							height="50px"
							width="50px"
							fontSize={"sm"}
							rounded={"full"}
							bg={"blue.400"}
							color={"white"}
							boxShadow={
								"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
							}
							_hover={{
								bg: "blue.500",
							}}
							_focus={{
								bg: "blue.500",
							}}
							flex={1}
							fontSize={"sm"}
							rounded={"full"}
							_focus={{
								bg: "blue.200",
							}}>
							<FaLinkedin className="meet-dev-socials" />
						</Button>
					</Link>
					<Link className="meet-dev-button" href={githubbtn}>
						<Button
							flex={1}
							height="50px"
							width="50px"
							fontSize={"sm"}
							rounded={"full"}
							bg={"gray.500"}
							color={"white"}
							boxShadow={
								"0px 1px 25px -5px rgb(140 140 140 / 48%), 0 10px 10px -5px rgb(140 140 140 / 43%)"
							}
							_hover={{
								bg: "gray.600",
							}}
							_focus={{
								bg: "gray.600",
							}}>
							<FaGithub className="meet-dev-socials" />
						</Button>
					</Link>
				</Stack>
			</Box>
		</Center>
	);
}
