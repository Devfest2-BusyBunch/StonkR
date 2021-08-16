import { useState, useEffect, useCallback } from "react";
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
	Spinner,
	Divider,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { supabase } from "supabaseClient";
import assets from "utils/supabaseUtils";

const PriceWrapper = ({ children }) => {
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
};

const Leaderboard = () => {
	// eslint-disable-next-line
	const [userData, setUserData] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const loadData = useCallback(async () => {
		// eslint-disable-next-line
		const { data, error } = await supabase.from("users").select("user_id");
		let user_list = data.map(el => el["user_id"]);

		user_list.forEach(async user => {
			console.log("starting with user", user);
			await assets(user);
			console.log("user asset completed", user);
		});

		// eslint-disable-next-line no-unused-vars
		const { data: usersData, error: userError } = await supabase
			.from("users")
			.select("username, cash, assets")
			.order("assets", { ascending: false })
			.limit(10);

		setUserData(usersData);
	}, []);

	useEffect(() => {
		loadData();
		setTimeout(() => {
			setLoaded(true);
		}, 4000);
	}, [loadData]);

	const v1 = useColorModeValue("gray.50", "gray.700");
	const v2 = useColorModeValue("red.300", "red.700");
	const v3 = useColorModeValue("gray.900", "gray.300");
	const v4 = useColorModeValue("gray.50", "gray.700");
	const v5 = useColorModeValue("gray.50", "gray.700");

	if (!loaded) {
		return (
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		);
	}

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
						<Text fontWeight="500" fontSize="xl">
							Second
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="3xl" fontWeight="900">
								{userData[1]?.username || "username"}
							</Text>
						</HStack>
					</Box>
					<VStack bg={v1} py={4} borderBottomRadius={"xl"}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>Cash - $ {userData[1]?.cash || "xyz"}</ListItem>
							<ListItem>Assets - $ {userData[1]?.cash || "xyz"}</ListItem>
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
								bg={v2}
								px={3}
								py={1}
								color={v3}
								fontSize="sm"
								fontWeight="600"
								rounded="xl">
								King
							</Text>
						</Box>
						<Box py={4} px={12}>
							<Text fontWeight="500" fontSize="3xl">
								First
							</Text>
							<HStack justifyContent="center">
								<Text fontSize="4xl" fontWeight="900">
									{userData[0]?.username || "username"}
								</Text>
							</HStack>
						</Box>
						<VStack bg={v4} py={4} borderBottomRadius={"xl"}>
							<List spacing={3} textAlign="start" px={12}>
								<ListItem>Cash - $ {userData[0]?.cash || "xyz"}</ListItem>
								<ListItem>Assets - $ {userData[0]?.cash || "xyz"}</ListItem>
							</List>
						</VStack>
					</Box>
				</PriceWrapper>
				<PriceWrapper>
					<Box py={4} px={12}>
						<Text fontWeight="500" fontSize="xl">
							Third
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="3xl" fontWeight="900">
								{userData[2]?.username || "username"}
							</Text>
						</HStack>
					</Box>
					<VStack bg={v5} py={4} borderBottomRadius={"xl"}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>Cash - $ {userData[2]?.cash || "xyz"}</ListItem>
							<ListItem>Assets - $ {userData[2]?.cash || "xyz"}</ListItem>
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
							<Box className="userInfo">
								{" "}
								<Heading fontSize="2xl">Rank</Heading>
								<Heading fontSize="2xl" className="username">
									Username
								</Heading>
							</Box>

							<Box className="money">
								<Heading fontSize="2xl" className="cash">
									Cash ($){" "}
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
								</Heading>
								<Heading fontSize="2xl" className="assets">
									Assets ($){" "}
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
								</Heading>
							</Box>
						</Flex>
					</Box>
					<Box py={2} px={12}>
						{userData.slice(3).map((data, idx) => (
							<>
								<Flex
									justifyContent={"space-between"}
									className="leaderboardLabel"
									mb={2}
									mt={2}>
									<Box className="userInfo">
										<Text fontSize="xl" fontWeight="200">
											{idx + 3}
										</Text>
										<Text fontSize="xl" fontWeight="200" className="username">
											{data.username}
										</Text>
									</Box>
									<Box className="money">
										<Text fontSize="xl" fontWeight="200" className="cash">
											{data.cash}
										</Text>
										<Text fontSize="xl" fontWeight="200" className="assets">
											{data.assets}
										</Text>
									</Box>
								</Flex>
								<Divider />
							</>
						))}
					</Box>
				</PriceWrapper>
			</Stack>
		</Box>
	);
};

export default Leaderboard;
