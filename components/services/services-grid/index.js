import React from "react";
import ServiceCard from "../service-card";

const general = ''
const normal = `col-span-2 lg:col-span-1 ${general}`
const middle = `col-span-2 ${general}`

const ServicesGrid = () => {
	return (
		<div className={`grid grid-cols-2 grid-flow-row gap-10`}>
			<ServiceCard
				className={normal}
				primaryText={"PRIMARY"}
				secondaryText={"SECONDARY"}
				src={"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"}
			/>
			<ServiceCard
				className={normal}
				textFirst={false}
				primaryText={"PRIMARY"}
				secondaryText={"SECONDARY"}
				src={"https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"}
			/>
			<ServiceCard
				className={middle}
				size={"lg"}
				primaryText={"PRIMARY"}
				secondaryText={"SECONDARY"}
				src={"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"}
			/>
			<ServiceCard
				className={normal}
				textFirst={false}
				primaryText={"PRIMARY"}
				secondaryText={"SECONDARY"}
				src={"https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
			/>
			<ServiceCard
				className={normal}
				textFirst={false}
				primaryText={"PRIMARY"}
				secondaryText={"SECONDARY"}
				src={"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}
			/>
		</div>
	);
};

export default ServicesGrid;
