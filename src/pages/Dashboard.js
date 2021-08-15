import { Box, Text, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Candle from "components/Chart";
import Trending from "components/Trending";
import { supabase } from "supabaseClient";

const Dashboard = () => {
    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const update = async () => {
            setUserID(JSON.parse(localStorage.getItem("userID")));

            const { data: userData, error } = await supabase
                .from("users")
                .select("user_id, username")
                .eq("user_id", userID);

            setUserName(userData[0].username);
        };

        update();
    }, [userID]);

    return (
        <Box>
            <Box>
                <Text>Dashboard</Text>
                {userName && <Heading>Welcome {userName}</Heading>}
            </Box>
            <Box className="container side-bar">
                <Trending />
            </Box>
            <Box className="container chart_outer">
                <Candle />
            </Box>
        </Box>
    );
};

export default Dashboard;
