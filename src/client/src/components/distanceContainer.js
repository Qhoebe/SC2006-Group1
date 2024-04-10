import React, { useState, useEffect, useCallback } from 'react';
import DistanceList from './distanceList'; 
import DistanceForm from './distanceForm';
import {handleDeleteDistance, handleUpdateDistance, handleAddNewDistance, handleFetchDistance} from '../apiCalls/distanceApi.js'
import '../styles/container.css'; 
import { useUpdate  } from '../context/UpdateContext.js'; 


const DistanceContainer = ({ username }) => {

  // State to manage expenses data
  const [distances, setDistances] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editDistance, setEditDistance] = useState({}); // State to store expense being edited
  const { triggerUpdate } = useUpdate();


  const handleDelete = useCallback(async (distanceToDelete) => {
    try {
      // Call handleDeleteDistance to delete the expense
      const success = await handleDeleteDistance(distanceToDelete._id);
      
      if (success) {
        // If deletion is successful, update the expenses state
        setDistances(prevDistance => prevDistance.filter(distance => distance._id !== distanceToDelete._id));
        triggerUpdate(); // This notifies other components of the update
      } else {
        // If deletion fails, log an error or handle it accordingly
        console.error('Failed to delete distance');
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('An error occurred while deleting distance:', error);
    }
  }, []);
   

  const handleSaveDistance = useCallback(async (distanceData) => {
    distanceData.username = username;

    try {
      // Check if the expenseData has an _id property to determine if it's an update
      if (distanceData && '_id' in distanceData) {
        await handleUpdateDistance(distanceData);
      } else {
        await handleAddNewDistance(distanceData);
      }

      triggerUpdate(); // This notifies other components of the update
      setIsFormOpen(false);
      setEditDistance({});

      // After saving the distance, fetch the updated distance data and set the state
      const fetchedDistance = await handleFetchDistance(username);
      setDistances(fetchedDistance);
    } catch (error) {
      console.error('An error occurred while saving distance:', error);
    }
  }, [username]);


  const handleEdit = useCallback((distanceToEdit) => {
    setEditDistance(distanceToEdit); // Set the expense being edited
    setIsFormOpen(true); // Open the form for editing
  }, []); // No dependencies


  useEffect(() => {

    const fetchDistance = async () => {
      try {
        const fetchedDistance = await handleFetchDistance(username);
        setDistances(fetchedDistance);
      } catch (error) {
        return <div>Error: Cant fetch data from server</div>;
      }
    };

    fetchDistance();

  }, [username, handleDelete, handleSaveDistance, handleEdit]);

  return (
    <div className="container">
     <header className="container-header">
       DISTANCE
       <button className='container-button'>
       <img
           src="/icons/add.png"
           alt="add"
           style={{ width: '50px', height: '50px' }}
           onClick={() => setIsFormOpen(true)}
         /></button>
     </header>
     <DistanceList distances={distances} onDelete={handleDelete} onEdit={handleEdit} />
     {isFormOpen && (
       <div className='form-backdrop'> 
         <DistanceForm 
           isOpen={isFormOpen} 
           onClose={() => {
             setIsFormOpen(false);
             setEditDistance({});
           }} 
           onSave={handleSaveDistance} 
           distances={editDistance} 
         />
       </div>
     )}
   </div>
 );
};

export default DistanceContainer;