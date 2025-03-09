import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PiDownload } from "react-icons/pi"; // Example download icon
import { jsPDF } from "jspdf"; // Import jsPDF

function CareerInfoSection({ careerData }) {
  const [careerDetails, setCareerDetails] = useState(null);

  useEffect(() => {
    if (careerData) {
      console.log(careerData); // Log the career data to see if financialGoalPlan is part of it
      setCareerDetails(careerData); // Set career data from parent component (passed as prop)
    }
  }, [careerData]);

  // Function to download the career details as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);  // Set font size for the content

    let yOffset = 20;  // Start at Y=20 for the first line
    const lineHeight = 10;  // Define a line height to control spacing between lines

    // Career Path Section
    doc.text('Career Plan', 20, yOffset);
    yOffset += lineHeight * 2; // Leave extra space after the title

    doc.text(`Job Title: ${careerDetails?.careerPath?.jobTitle || 'No Job Title Available'}`, 20, yOffset);
    yOffset += lineHeight;

    doc.text(`Salary Expectation: $${careerDetails?.careerPath?.salaryExpectation || 'Not Provided'}`, 20, yOffset);
    yOffset += lineHeight * 2; // Add extra spacing after the career section

    doc.text('Growth Opportunities:', 20, yOffset);
    yOffset += lineHeight;

    careerDetails?.careerPath?.steps?.forEach((item, index) => {
      doc.text(`- ${item}`, 20, yOffset);
      yOffset += lineHeight;  // Adjust spacing between each list item
    });

    yOffset += lineHeight * 2; // Space after growth opportunities

    // Financial Goal Section
    doc.text('Financial Goal:', 20, yOffset);
    yOffset += lineHeight;

    doc.text(`Goal: ${careerDetails?.financialGoalPlan?.goal || 'Not Provided'}`, 20, yOffset);
    yOffset += lineHeight;

    doc.text(`Current Savings: $${careerDetails?.financialGoalPlan?.currentSavings || 'Not Provided'}`, 20, yOffset);
    yOffset += lineHeight;

    doc.text(`Deadline: ${careerDetails?.financialGoalPlan?.deadline || 'Not Provided'}`, 20, yOffset);
    yOffset += lineHeight;

    doc.text(`Monthly Savings Target: $${careerDetails?.financialGoalPlan?.monthlySavingsTarget || 'Not Provided'}`, 20, yOffset);
    yOffset += lineHeight * 2; // Add some extra space before investment strategy

    doc.text('Investment Strategy:', 20, yOffset);
    yOffset += lineHeight;

    careerDetails?.financialGoalPlan?.investmentStrategy?.forEach((strategy, index) => {
      doc.text(`- ${strategy}`, 20, yOffset);
      yOffset += lineHeight;  // Adjust spacing between each strategy item
    });

    yOffset += lineHeight * 2; // Space after investment strategy

    doc.text('Additional Considerations:', 20, yOffset);
    yOffset += lineHeight;

    careerDetails?.financialGoalPlan?.additionalConsiderations?.forEach((consideration, index) => {
      doc.text(`- ${consideration}`, 20, yOffset);
      yOffset += lineHeight;  // Adjust spacing between each consideration item
    });

    yOffset += lineHeight * 2; // Space after additional considerations

    // Financial Goal Advice
    doc.text('Advice:', 20, yOffset);
    yOffset += lineHeight;

    careerDetails?.financialGoalPlan?.advice?.forEach((advice, index) => {
      doc.text(`- ${advice}`, 20, yOffset);
      yOffset += lineHeight;  // Adjust spacing between each advice item
    });

    // Save the PDF
    doc.save('career_plan.pdf');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Career Path Section */}
      <div className="my-6 p-6 bg-orange-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-orange-700">Career Path</h2>
        <div className="my-4">
          <h3 className="text-lg font-medium text-orange-600">Job Title: {careerDetails?.careerPath?.jobTitle || 'No Job Title Available'}</h3>
          <h3 className="text-lg font-medium text-orange-600">Salary Expectation: {careerDetails?.careerPath?.salaryExpectation || 'Not Provided'}</h3>
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
      {careerDetails?.financialGoalPlan && (
        <div className="my-6 p-6 bg-orange-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-orange-700">Financial Goal</h2>
          <div className="my-4">
            <h3 className="text-lg font-medium text-orange-600">Goal: {careerDetails?.financialGoalPlan?.goal || 'Not Provided'}</h3>
            <h3 className="text-lg font-medium text-orange-600">Current Savings: {careerDetails?.financialGoalPlan?.currentSavings || 'Not Provided'}</h3>
            <h3 className="text-lg font-medium text-orange-600">Deadline: {careerDetails?.financialGoalPlan?.deadline || 'Not Provided'}</h3>
            <h3 className="text-lg font-medium text-orange-600">Monthly Savings Target: {careerDetails?.financialGoalPlan?.monthlySavingsTarget || 'Not Provided'}</h3>
          </div>

          {/* Investment Strategy */}
          <div className="my-6">
            <h3 className="text-xl font-semibold text-orange-700">Investment Strategy:</h3>
            {careerDetails?.financialGoalPlan?.investmentStrategy?.map((strategy, index) => (
              <div key={index} className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600">{strategy}</p>
              </div>
            ))}
          </div>

          {/* Additional Considerations */}
          <div className="my-6">
            <h3 className="text-xl font-semibold text-orange-700">Additional Considerations:</h3>
            {careerDetails?.financialGoalPlan?.additionalConsiderations?.map((consideration, index) => (
              <div key={index} className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600">{consideration}</p>
              </div>
            ))}
          </div>

          {/* Financial Goal Advice */}
          <div className="my-6">
            <h3 className="text-xl font-semibold text-orange-700">Advice:</h3>
            {careerDetails?.financialGoalPlan?.advice?.map((advice, index) => (
              <div key={index} className="my-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600">{advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download Button */}
      <div className="my-5 flex justify-end">
        <Button
          onClick={handleDownloadPDF} // Download career details as PDF
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PiDownload />
          Download as PDF
        </Button>
      </div>
    </div>
  );
}

export default CareerInfoSection;