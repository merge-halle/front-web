import React, { useState, useEffect } from "react";
import RobotImage from "../../assets/robot.png";
import "./Loading.scss";
import { Button, Modal } from "antd";

export default function Loading({ text }) {
	const [dots, setDots] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
		}, 500); // 0.5초마다 점을 추가하거나 초기화

		return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
	}, []);

	return (
		<div>
			<Modal
				open={true}
				footer={null}
				closable={false}
				className="loading-container"
			>
				<div style={{ width: "150px", display:"flex", flexDirection:'column' ,justifyContent:'center', alignContent:'center'}}>
					<img src={RobotImage} alt="robotImage" />
					<p>
						{text}
						{dots}
					</p>
				</div>
			</Modal>
		</div>
	);
}
