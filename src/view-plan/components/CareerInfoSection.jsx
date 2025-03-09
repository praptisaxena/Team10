import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PiShareNetworkFill } from "react-icons/pi";

function CareerInfoSection({ careerData }) {
  const [careerDetails, setCareerDetails] = useState(null);

  useEffect(() => {
    if (careerData) {
      setCareerDetails(careerData); // Set career data from parent component (passed as prop)
    }
  }, [careerData]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Career Path Section */}
      <div className="my-6 p-6 bg-orange-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-orange-700">Career Path</h2>
        <div className="my-4">
          <h3 className="text-lg font-medium text-orange-600">Job Title: {careerDetails?.careerPath?.jobTitle || 'No Job Title Available'}</h3>
          <h3 className="text-lg font-medium text-orange-600">Salary Expectation: ${careerDetails?.careerPath?.salaryExpectation || 'Not Provided'}</h3>
        </div>

        {/* Career Growth Opportunities */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-orange-700">Growth Opportunities:</h3>
          {careerDetails?.careerPath?.steps?.map((item, index) => (
            <div key={index} className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Goal Section */}
      <div className="my-6 p-6 bg-orange-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-orange-700">Financial Goal</h2>
        <div className="my-4">
          <h3 className="text-lg font-medium text-orange-600">Goal: {careerDetails?.financialGoalPlan?.goal || 'Not Provided'}</h3>
          <h3 className="text-lg font-medium text-orange-600">Current Savings: ${careerDetails?.financialGoalPlan?.currentSavings || 'Not Provided'}</h3>
          <h3 className="text-lg font-medium text-orange-600">Deadline: {careerDetails?.financialGoalPlan?.deadline || 'Not Provided'}</h3>
          <h3 className="text-lg font-medium text-orange-600">Monthly Savings Target: ${careerDetails?.financialGoalPlan?.monthlySavingsTarget || 'Not Provided'}</h3>
        </div>

        {/* Investment Strategy */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-orange-700">Investment Strategy:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {careerDetails?.financialGoalPlan?.investmentStrategy?.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        </div>

        {/* Additional Considerations */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-orange-700">Additional Considerations:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {careerDetails?.financialGoalPlan?.additionalConsiderations?.map((consideration, index) => (
              <li key={index}>{consideration}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Share Button */}
      <div className="my-5 flex justify-end">
        <Button className="bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <PiShareNetworkFill />
          Share
        </Button>
      </div>
    </div>
  );
}

export default CareerInfoSection;
