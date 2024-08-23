import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const [data, setData] = useState(null);
  console.log(useParams())
  const { mealid } = useParams();
  console.log("hello")
  console.log(mealid)
  useEffect(() => {
    const fetchData = async () => {
      if (!mealid) return; // Check if meal ID is provided

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
        console.log(response)
        console.log("hello")
        if (!response.ok) {
          // Check if the response is not OK (e.g., 404 or other errors)
          console.error('Error fetching the data, status:', response.status);
          setData(null);
          return;
        }

        const jsonData = await response.json();

        console.log('Fetched data:', jsonData); // Log the fetched data to see its structure

        // Check if the response has meals and is not null
        if (jsonData && jsonData.meals && jsonData.meals.length > 0) {
          setData(jsonData.meals[0]);
        } else {
          console.warn('No meals found in the response:', jsonData);
          setData(null); // Set data to null if no meals are found
        }
      } catch (error) {
        console.error('Error fetching the meal data:', error);
        setData(null); // Set data to null in case of error
      }
    };

    fetchData();
  }, [mealid]); // Dependency array to call fetchData only when 'meal' changes

  if (!data) {
    return <p>Not Found</p>;
  }

  return (
    <>
      <div className='msg'>
        <img src={data.strMealThumb} alt={data.strMeal} />
        <div className='info'>
          <h1>Recipe Details</h1>
          <button>{data.strMeal}</button>
          <h3>Instructions :</h3>
          <p>{data.strInstructions}</p>
        </div>
      </div>
    </>
  );
}

export default Recipe;
