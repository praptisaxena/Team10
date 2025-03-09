import React from 'react';
import { Link } from 'react-router-dom';

function CareerPlanCardItem({ plan }) {
    // Check if careerPlanData is a string before parsing it
    let parsedCareerPlanData = plan?.careerPlanData;
    
    if (typeof parsedCareerPlanData === 'string') {
        try {
            parsedCareerPlanData = JSON.parse(parsedCareerPlanData); // Only parse if it's a string
        } catch (error) {
            console.error("Error parsing careerPlanData:", error);
        }
    }

    console.log("Parsed Career Plan Data:", parsedCareerPlanData); // Log to verify if it is parsed correctly

    return (
        <Link to={`/view-career-plan/${plan?.id}`}>
            <div className="hover:scale-105 transition-all">
                <div className="p-3">
                    {/* Career Path Information */}
                    <h2 className="font-bold text-lg">
                        {parsedCareerPlanData?.careerPath?.jobTitle || 'Career Path Title'}
                    </h2>
                    <h3 className="text-sm text-gray-500">
                        {parsedCareerPlanData?.careerPath?.salaryExpectation
                            ? `Salary Expectation: $${parsedCareerPlanData?.careerPath?.salaryExpectation}`
                            : 'Salary Expectation: Not Provided'}
                    </h3>
                    <h3 className="text-sm text-gray-500">
                        {parsedCareerPlanData?.careerPath?.growthPotential
                            ? parsedCareerPlanData?.careerPath?.growthPotential
                            : 'No Growth Potential Provided'}
                    </h3>

                    {/* Financial Goal Information */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-sm text-gray-600">Financial Goal</h3>
                        <p className="text-sm text-gray-500">
                            Goal: {parsedCareerPlanData?.financialGoalPlan?.goal || 'Not Provided'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Deadline: {parsedCareerPlanData?.financialGoalPlan?.deadline || 'Not Provided'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Monthly Savings Goal: ${parsedCareerPlanData?.financialGoalPlan?.monthlySavingsGoal || 'Not Provided'}
                        </p>
                    </div>

                    {/* Investment Strategy Information */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-sm text-gray-600">Investment Strategy</h3>
                        {parsedCareerPlanData?.financialGoalPlan?.investmentStrategy ? (
                            <p className="text-sm text-gray-500">{parsedCareerPlanData?.financialGoalPlan?.investmentStrategy}</p>
                        ) : (
                            <p className="text-sm text-gray-500">No investment strategies provided</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CareerPlanCardItem;


