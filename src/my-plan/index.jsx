import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CareerPlanCardItem from './components/UserPlanCardItem'; // Updated component name to match the one you have

function MyCareerPlans() {
    const navigate = useNavigate();
    const [careerPlans, setCareerPlans] = useState([]);

    useEffect(() => {
        GetCareerPlans(); // Fetch the career plans when the component mounts
    }, []);

    const GetCareerPlans = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

        if (!user) {
            navigate('/'); // Redirect to login page if no user is found
            return;
        }

        setCareerPlans([]); // Clear previous data
        const q = query(collection(db, 'CareerPlans'), where('userEmail', '==', user?.email)); // Query for user's career plans
        const querySnapshot = await getDocs(q);

        const fetchedPlans = [];

        querySnapshot.forEach((doc) => {
            // Push each career plan into the fetchedPlans array
            fetchedPlans.push(doc.data());
        });

        setCareerPlans(fetchedPlans); // Set the fetched career plans in the state
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Career Plans</h2>

            {/* Display the saved career plans */}
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {careerPlans?.length > 0 ? (
                    careerPlans.map((plan, index) => (
                        <CareerPlanCardItem plan={plan} key={index} />
                    ))
                ) : (
                    // Placeholder skeleton loading
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyCareerPlans;
