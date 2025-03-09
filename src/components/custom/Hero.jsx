import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { FaBrain, FaBriefcase, FaBullseye } from 'react-icons/fa';

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user from localStorage
    }
  }, []);

  return (
    <div className="min-h-screen bg-FFF5EB text-3A3A3A flex flex-col items-center justify-center p-8">
      <h1 className="font-extrabold text-[50px] text-center leading-tight mb-4" style={{ color: '#F06225', marginTop: '-40px' }}>
        Welcome !
      </h1>
      <p className="text-xl max-w-2xl text-center mb-6">
        Empowering individuals in STEM with AI-Driven Career & Financial Planning.
      </p>
      <p className="text-lg max-w-2xl text-center mb-8">
        Take control of your career trajectory and financial future with personalized insights, actionable goals, and exclusive opportunities—all tailored for women in STEM.
      </p>

      {/* Feature Sections */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
        <div className="text-center max-w-sm">
          <FaBrain className="text-5xl text-F06225 mb-4" style={{ color: '#F06225' }} />
          <h2 className="font-bold text-2xl mb-2">AI Insights</h2>
          <p>Get personalized career and financial guidance powered by AI to accelerate your growth.</p>
        </div>

        <div className="text-center max-w-sm">
          <FaBriefcase className="text-5xl text-F06225 mb-4" style={{ color: '#F06225' }} />
          <h2 className="font-bold text-2xl mb-2">Tailored Opportunities</h2>
          <p>Discover exclusive career opportunities in STEM, tailored specifically for your aspirations.</p>
        </div>

        <div className="text-center max-w-sm">
          <FaBullseye className="text-5xl text-F06225 mb-4" style={{ color: '#F06225' }} />
          <h2 className="font-bold text-2xl mb-2">Goal Tracking</h2>
          <p>Set, track, and achieve your career and financial goals with ease and clarity.</p>
        </div>
      </div>

      {/* Only show the button if user is signed in */}
      {user ? (
        <Link to={'/create-plan'}>
          <Button className="bg-[#F06225] hover:bg-FFC145 text-white px-6 py-3 text-lg rounded-2xl shadow-lg mt-12">
            Get Started – It's Free
          </Button>
        </Link>
      ) : (
        <p className="text-lg mt-8">Please sign in to get started.</p> // Optional message if not signed in
      )}
    </div>
  );
}

export default HomePage;
