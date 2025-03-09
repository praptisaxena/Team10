import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
};

const safety_settings = [
	{
		category: "HARM_CATEGORY_DANGEROUS",
		threshold: "BLOCK_NONE",
	},
	{
		category: "HARM_CATEGORY_HARASSMENT",
		threshold: "BLOCK_NONE",
	},
	{
		category: "HARM_CATEGORY_HATE_SPEECH",
		threshold: "BLOCK_NONE",
	},
	{
		category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
		threshold: "BLOCK_NONE",
	},
	{
		category: "HARM_CATEGORY_DANGEROUS_CONTENT",
		threshold: "BLOCK_NONE",
	},
];

// This is the updated prompt for generating career paths and financial goals.
export const chatSession = model.startChat({
	generationConfig,
	safety_settings,
	history: [
		{
			role: "user",
			parts: [
				{
					text: `
						I am a professional with the following details:
						- Years of Experience: 5 years
						- Current Salary Expectation: $75,000 per year
						- Financial Goal: Save $300,000 for retirement
						- Current Savings: $50,000
						- Deadline: 15 years

						Please suggest:
						1. Possible career paths I can follow, including potential salary growth and job titles.
						2. A plan to achieve my financial goal, including monthly savings suggestions, investments, and timeline.
						
						Make sure the suggestions are based on my experience, salary expectations, and goals.
					`,
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: `
						{
							"careerPaths": [
								{
									"jobTitle": "Software Engineer",
									"potentialSalaryGrowth": "$80,000 - $120,000",
									"jobDescription": "Develop software applications, work with front-end/back-end technologies, collaborate with cross-functional teams."
								},
								{
									"jobTitle": "Data Scientist",
									"potentialSalaryGrowth": "$90,000 - $130,000",
									"jobDescription": "Analyze complex datasets, build machine learning models, and provide data-driven insights for decision-making."
								},
								{
									"jobTitle": "Product Manager",
									"potentialSalaryGrowth": "$100,000 - $150,000",
									"jobDescription": "Oversee the development and launch of products, collaborate with engineering, design, and marketing teams."
								}
							],
							"financialPlan": {
								"monthlySavings": "$1,000",
								"investmentSuggestions": [
									{
										"type": "Stocks",
										"percentage": "60%",
										"details": "Invest in a diversified portfolio of stocks. Focus on high-growth industries like technology."
									},
									{
										"type": "Bonds",
										"percentage": "20%",
										"details": "Allocate to government or corporate bonds for stability and low risk."
									},
									{
										"type": "Real Estate",
										"percentage": "20%",
										"details": "Consider investing in rental properties or real estate funds to generate passive income."
									}
								],
								"timeline": "Achieve financial goal in 15 years with disciplined savings and investments."
							}
						}
					`,
				},
			],
		},
	],
});
