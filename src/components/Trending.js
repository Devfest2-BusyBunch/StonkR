import React, { useState, useEffect } from "react";
// import {Box} from '@chakra-ui/react'
import axios from "axios";

import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
        <Stat
            bg="cyan.400"
            color="white"
            px={{ base: 2, md: 4 }}
            py={"2"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
        >
            <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={"medium"} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={"auto"}
                    color={useColorModeValue("gray.800", "gray.200")}
                    alignContent={"center"}
                >
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

function Trending() {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=false&price_change_percentage=14d",
        })
            .then((res) => res.data)
            .then((doc) => {
                setTrends(doc);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid rows={{ base: 1, md: 3 }} spacing={{ base: 1, lg: 2 }}>
                {trends.map((trend) => {
                    return (
                        <StatsCard
                            title={trend.name}
                            stat={trend.price_change_percentage_24h}
                            icon={
                                trend.price_change_percentage_24h > 0 ? (
                                    <FiTrendingUp color={'green'} size={"1em"} />
                                ) : (
                                    <FiTrendingDown color={'red'} size={"1em"} />
                                )
                            }
                        />
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}
export default Trending;
