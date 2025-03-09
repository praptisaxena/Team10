import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import CareerInfoSection from '../components/CareerInfoSection';

function ViewCareerAndFinancialGoals() {
    const { goalId } = useParams();  
    const [careerAndFinancialData, setCareerAndFinancialData] = useState(null);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (goalId) {
            fetchCareerAndFinancialData();
        }
    }, [goalId]);

    const fetchCareerAndFinancialData = async () => {
        try {
            const docRef = doc(db, 'CareerPlans', goalId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const docData = docSnap.data();

                // Check if careerPlanData is a string or object
                const careerPlanData = docData.careerPlanData;
                let parsedData;

                // If it's a string, parse it; otherwise, use it as it is
                if (typeof careerPlanData === 'string') {
                    parsedData = JSON.parse(careerPlanData);
                } else {
                    parsedData = careerPlanData;
                }

                console.log("Career and Financial Data:", parsedData);
                
                // Set the parsed data in the state
                setCareerAndFinancialData(parsedData);
            } else {
                console.log("No Such Document");
                toast('No career and financial goal data found');
            }
        } catch (error) {
            console.error("Error fetching career and financial data:", error);
            toast('Error fetching career and financial data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {loading ? (
                <p>Loading career and financial data...</p>
            ) : careerAndFinancialData ? (
                <>
                    <CareerInfoSection careerData={careerAndFinancialData} />
                </>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}

export default ViewCareerAndFinancialGoals;
