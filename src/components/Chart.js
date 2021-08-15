import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { Box } from "@chakra-ui/react";

const Candle = ({dataProp}) => {
	const [series, setSeries] = useState([]);
	const data = dataProp

	const formattedData = []
	
	data.map((doc) => {
		var currentITem = {
			x: new Date(doc.updated),
			y: [doc.close, doc.high, doc.low, doc.open]
		}
		formattedData.push(currentITem)
	})
	useEffect(() => {
		setSeries([
			{
				name: "candle",
				data: formattedData,
			},
		]);
	}, [])

	const options = {
		chart: {
			height: 350,
			type: "candlestick",
		},
		title: {
			
			text: "CandleStick Chart - Category X-axis",
			align: "left",
		},
		annotations: {
			xaxis: [
				{
					x: "Oct 06 14:00",
					borderColor: "#00E396",
					label: {
						borderColor: "#00E396",
						style: {
							fontSize: "12px",
							color: "#fff",
							background: "#00E396",
						},
						orientation: "horizontal",
						offsetY: 7,
						text: "Annotation Test",
					},
				},
			],
		},
		tooltip: {
			enabled: true,
		},
		xaxis: {
			type: "category",
			labels: {
				formatter: function (val) {
					return dayjs(val).format("MMM DD HH:mm");
				},
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};

	return (
		<Box id="chart">
			<Box className="candlestick-chart">
				<Chart
					options={options}
					series={series}
					type="candlestick"
					width="500"
				/>
			</Box>
		</Box>
	);
};

export default Candle;
