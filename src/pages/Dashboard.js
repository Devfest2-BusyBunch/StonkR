import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Trending from "components/Trending";
import { supabase } from "supabaseClient";
import Portfolio from "components/Portfolio";
import UserWallet from "components/Userwallet";

const Dashboard = () => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState(null);

    const v1 = useColorModeValue("gray.50", "gray.700");

    useEffect(() => {
        setUserID(JSON.parse(localStorage.getItem("userID")));
        const update = async () => {
            const { data: userData, error } = await supabase
                .from("users")
                .select("user_id, username")
                .eq("user_id", userID);
            userData.length > 0
                ? setUserName(userData[0].username)
                : setUserName(null);
        };

        update();
    }, [userID]);

    return (
        <Flex
            direction={isNotSmallerScreen ? "row" : "column-reverse"}
            justifyContent="space-between"
            width="90vw"
            alignItems="center"
        >
            <Box mt={!isNotSmallerScreen && "100px"}>
                <Trending />
            </Box>
            <Flex direction="column" order={!isNotSmallerScreen && 1}>
                <Box>
                    {userName ? (
                        <Heading pt={!isNotSmallerScreen && 10}>
                            Welcome {userName}
                        </Heading>
                    ) : (
                        console.log("err")
                    )}
                </Box>
                <Box>
                    <Portfolio />
                </Box>
            </Flex>
            <Box
                bg={v1}
                d="flex"
                alignItems="center"
                justifyContent="center"
                mt={isNotSmallerScreen ? 16 : 5}
                height={"min"}
                width={"min"}
                py={4}
                borderBottomRadius={"xl"}
                borderTopRadius={"xl"}
                className="wallet"
            >
                {" "}
                <UserWallet />
            </Box>
            <Box
                d="flex"
                alignItems="center"
                justifyContent="center"
                mt={16}
                width={"min"}
                className="container chart_outer"
            ></Box>
        </Flex>
    );
};

export default Dashboard;
