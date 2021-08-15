import React from "react";
import {
	Box,
	Stack,
	HStack,
	Heading,
	Text,
	VStack,
	useColorModeValue,
	List,
	ListItem,
	Button,
	Flex,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

function PriceWrapper({ children }) {
	return (
		<Box
			mb={4}
			shadow="base"
			borderWidth="1px"
			alignSelf={{ base: "center", lg: "flex-start" }}
			borderColor={useColorModeValue("gray.200", "gray.500")}
			borderRadius={"xl"}>
			{children}
		</Box>
	);
}

export default function Leaderboard() {
	return (
		<Box py={4}>
			<VStack spacing={1.5} textAlign="center">
				<Heading as="h1" fontSize="4xl">
					Leaderboards
				</Heading>
			</VStack>
			<Stack
				direction={{ base: "column", md: "row" }}
				textAlign="center"
				justify="center"
				spacing={{ base: 4, lg: 10 }}
				py={10}>
				<PriceWrapper>
					<Box py={4} px={12}>
						<Text fontWeight="500" fontSize="2xl">
							Second
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="4xl" fontWeight="900">
								username
							</Text>
						</HStack>
					</Box>
					<VStack
						bg={useColorModeValue("gray.50", "gray.700")}
						py={4}
						borderBottomRadius={"xl"}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>$asdasdas - Cash</ListItem>
							<ListItem>$asdasdas - Assets</ListItem>
						</List>
					</VStack>
				</PriceWrapper>

				<PriceWrapper>
					<Box position="relative">
						<Box
							position="absolute"
							top="-16px"
							left="50%"
							style={{ transform: "translate(-50%)" }}>
							<Text
								textTransform="uppercase"
								bg={useColorModeValue("red.300", "red.700")}
								px={3}
								py={1}
								color={useColorModeValue("gray.900", "gray.300")}
								fontSize="sm"
								fontWeight="600"
								rounded="xl">
								King
							</Text>
						</Box>
						<Box py={4} px={12}>
							<Text fontWeight="500" fontSize="4xl">
								First
							</Text>
							<HStack justifyContent="center">
								<Text fontSize="5xl" fontWeight="900">
									username
								</Text>
							</HStack>
						</Box>
						<VStack
							bg={useColorModeValue("gray.50", "gray.700")}
							py={4}
							borderBottomRadius={"xl"}>
							<List spacing={3} textAlign="start" px={12}>
								<ListItem>$asdasdas - Cash</ListItem>
								<ListItem>$asdasdas - Assets</ListItem>
							</List>
						</VStack>
					</Box>
				</PriceWrapper>
				<PriceWrapper>
					<Box py={4} px={12}>
						<Text fontWeight="500" fontSize="2xl">
							Third
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="4xl" fontWeight="900">
								username
							</Text>
						</HStack>
					</Box>
					<VStack
						bg={useColorModeValue("gray.50", "gray.700")}
						py={4}
						borderBottomRadius={"xl"}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>$asdasdas - Cash</ListItem>
							<ListItem>$asdasdas - Assets</ListItem>
						</List>
					</VStack>
				</PriceWrapper>
			</Stack>
			<Stack
				direction={{ base: "row", md: "row" }}
				// textAlign="center"
				// justify="center"
				spacing={{ base: 4, lg: 10 }}
				py={10}>
				<PriceWrapper>
					<Box py={2} px={12}>
						<Flex className="leaderboardLabel">
							<div className="userInfo">
								{" "}
								<h1>Rank </h1>
								<h1 className="username">Username</h1>
							</div>

							<div className="money">
								<h1 className="cash">
									Cash($){" "}
									<Button
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
										}}>
										<TriangleUpIcon w={6} h={6} />
									</Button>
								</h1>
								<h1 className="assets">
									Assets($){" "}
									<Button
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
										}}>
										<TriangleUpIcon w={6} h={6} />
									</Button>
								</h1>
							</div>
						</Flex>
					</Box>
					<Box py={2} px={12}>
						<Flex justifyContent={"space-between"} className="leaderboardLabel">
							<Box className="userInfo">
								<h3>3</h3>
								<h3 className="username">jesadasdasdasde</h3>
							</Box>
							<Box className="money">
								<h3 className="cash">10022</h3>
								<h3 className="assets">12</h3>
							</Box>
						</Flex>
					</Box>
				</PriceWrapper>
			</Stack>
		</Box>
	);
}
