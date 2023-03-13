module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				green: "#ccff00",
			},
			spacing: {
				'130': "130%",
				'150': "150%",
				'170': "170%",
				'190': "190%",
			},
		},
	},
	variants: {
		extend: {
			scale: ["active", "group-hover"],
		},
	},
	plugins: [],
};
