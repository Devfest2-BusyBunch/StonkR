import {
	Box,
	chakra,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";

const StatsCard = ({ title, quantity, amount }) => {
	return (
		<Stat
			px={{ base: 4, md: 8 }}
			py={"5"}
			shadow={"xl"}
			border={"1px solid"}
			borderColor={useColorModeValue("gray.800", "gray.500")}
			rounded={"lg"}>
			<StatLabel color={"red"} fontWeight={"medium"} isTruncated>
				{title}
			</StatLabel>
			<StatNumber fontSize={"1xl"} fontWeight={"medium"}>
				{quantity}
			</StatNumber>
			<StatNumber fontSize={"3xl"} fontWeight={"medium"}>
				{amount}
			</StatNumber>
		</Stat>
	);
};

const Portfolio = () => {
	return (
		<Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={10}
				fontWeight={"bold"}>
				Your Portfolio!
			</chakra.h1>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
				<StatsCard title={"Bitcoin"} quantity={"Volume"} amount={"$Amount"} />
				<StatsCard title={"Dogecoin"} quantity={"Volume"} amount={"$Amount"} />
				<StatsCard
					title={"Apple Stock  "}
					quantity={"Volume"}
					amount={"$Amount"}
				/>
				<StatsCard title={"Bitcoin"} quantity={"Volume"} amount={"$Amount"} />
				<StatsCard title={"Dogecoin"} quantity={"Volume"} amount={"$Amount"} />
				<StatsCard
					title={"Apple Stock  "}
					quantity={"Volume"}
					amount={"$Amount"}
				/>
			</SimpleGrid>
		</Box>
	);
};

export default Portfolio;
