import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal'; // Your AI service
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig'; // Firebase configuration
import axios from 'axios';

function GenerateCareerFinancialGoals() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('Form Data:', formData); // Log form data when it changes
  }, [formData]);

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  // Fetch user profile after Google login
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      })
      .then((resp) => {
        console.log('Google User Info:', resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false); // Close the dialog after successful login
        OnGenerateCareerPlan(); // Generate plan after login
      })
      .catch((error) => {
        console.log('Error fetching user profile:', error);
      });
  };

  // Generate Career & Financial Goals
  const OnGenerateCareerPlan = async () => {
    const user = localStorage.getItem('user');
    console.log('User:', user);

    if (!user) {
      setOpenDialog(true); // Open dialog if user is not logged in
      return;
    }

    // Check if all necessary fields are filled
    if (
      !formData?.careerPath ||
      !formData?.salaryExpectation ||
      !formData?.financialGoal ||
      !formData?.savings ||
      !formData?.deadline
    ) {
      toast('Please fill all details');
      return;
    }

    setLoading(true);

    // Construct a simplified prompt for the AI model
    const SIMPLE_PROMPT = `
    Generate a simple career path and financial goal plan based on the following details:
    
    Career Path: ${formData?.careerPath}
    Salary Expectation: ${formData?.salaryExpectation}
    Current Savings: ${formData?.savings}
    Financial Goal: ${formData?.financialGoal}
    Deadline (in years): ${formData?.deadline}
    Return the response in the following JSON format:
    {
  "careerPath": {
    "jobTitle": "Software Engineer",
    "salaryExpectation": "$80,000",
    "steps": [
      "Gain experience in software development",
      "Build a portfolio",
      "Network with professionals"
    ]
  },
  "financialGoalPlan": {
    "goal": "Buy a house",
    "deadline": "5",
    "currentSavings": "$5,000",
    "monthlySavingsTarget": "$2,000",
    "investmentStrategy": [
      "Invest in mutual funds",
      "Save in high-yield accounts"
    ],
    "additionalConsiderations": [
      "Down payment",
      "Property taxes"
    ],
    "advice": [
      "Increase your monthly savings by 10% to reach your goal faster.",
      "Consider investing in retirement funds with higher returns such as index funds, stocks, or bonds. The earlier you start, the more compound interest you can earn."
    ]
  }
}

    `;

    console.log('Generated Prompt:', SIMPLE_PROMPT); // Log the generated prompt

    try {
      const result = await chatSession.sendMessage(SIMPLE_PROMPT);
      console.log('Gemini Response:', result); // Log the entire Gemini response

      const responseText = result?.response?.text();
      console.log('Raw response text:', responseText); // Log raw response

      if (responseText) {
        // Proceed with parsing if the text is not empty
        let parsedResponse;
        try {
          parsedResponse = JSON.parse(responseText);
          console.log('Parsed Response:', parsedResponse); // Log the parsed response
        } catch (error) {
          console.error('Error parsing the response:', error);
          toast('Error: Could not parse the response. Please try again later.');
        }

        if (parsedResponse) {
          // Save the response after validating the parsed response
          SaveCareerPlan(parsedResponse); // Save the parsed career plan
        } else {
          toast('No valid response from Gemini. Please try again.');
        }
      } else {
        toast('No response text received. Check the API or prompt.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error generating career plan:', error);
      toast('Error generating career plan');
    }
  };

  // Save the generated career plan
  const SaveCareerPlan = async (careerPlanData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString(); // Using timestamp as document ID
    await setDoc(doc(db, 'CareerPlans', docId), {
      userSelection: formData,
      careerPlanData: careerPlanData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    router('/view-career-plan/' + docId); // Redirect to view the career plan
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xk:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your career and financial goals💡</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some information, and we will generate a customized career path and financial goals plan for you.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Career Path Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Career Path</h2>
          <Input
            placeholder="Ex. Software Engineer"
            onChange={(e) => handleInputChange('careerPath', e.target.value)}
          />
        </div>

        {/* Salary Expectation Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Salary Expectation</h2>
          <Input
            placeholder="Ex. $80,000"
            onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
          />
        </div>

        {/* Savings Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Current Savings</h2>
          <Input
            placeholder="Ex. $5,000"
            onChange={(e) => handleInputChange('savings', e.target.value)}
          />
        </div>

        {/* Financial Goal Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Financial Goal</h2>
          <Input
            placeholder="Ex. Buy a house, save for retirement"
            onChange={(e) => handleInputChange('financialGoal', e.target.value)}
          />
        </div>

        {/* Deadline Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Deadline (in years)</h2>
          <Input
            placeholder="Ex. 5"
            type="number"
            onChange={(e) => handleInputChange('deadline', e.target.value)}
          />
        </div>

        {/* Generate Career & Financial Plan Button */}
        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={OnGenerateCareerPlan}>
            {loading ? (
              <AiOutlineLoading className="h-7 w-7 animate-spin" />
            ) : (
              'Generate Career & Financial Goals'
            )}
          </Button>
        </div>
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GenerateCareerFinancialGoals;






