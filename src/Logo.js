import React from "react";
import { Image } from "@chakra-ui/react";

// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

export const Logo = props => {
	return (
		<Image
			src={"https://foodict.s3.ap-south-1.amazonaws.com/misc/coins+(1).png"}
			{...props}
		/>
	);
};
