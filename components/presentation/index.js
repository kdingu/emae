import React from "react";
import styles from "./styles.module.css"

const Presentation = () => {
	return (
		<div>
			<iframe
				className={styles.iframe}
				style={{ borderRadius: "30px" }}
				width="100%"
				height="575"
				src="https://www.youtube.com/embed/t9ZZymyrXKQ?controls=0"
				allow="autoplay;"></iframe>
		</div>
	);
};

export default Presentation;
