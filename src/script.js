//script.js

const apiUrl = 'https://moment3-2dt207g.onrender.com/workexperiences';

// Function to fetch and display all work experiences
async function fetchWorkExperiences() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET'
    });
    const workExperiences = await response.json();

    const workExperienceList = document.getElementById('work-experience-list');
    workExperienceList.innerHTML = '';

    workExperiences.forEach(experience => {
      const listItem = document.createElement('li');
      
      // Create a container for the work experience details
      const detailsContainer = document.createElement('div');
      
      // Display work experience details
      detailsContainer.textContent = `${experience.companyname} - ${experience.jobtitle} (${experience.location})`;
      workExperienceList.appendChild(listItem);
      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteWorkExperience(experience._id));
      
  
      detailsContainer.appendChild(deleteButton);
      
      listItem.appendChild(detailsContainer);
      
     
    });
  } catch (error) {
    console.error('Error fetching work experiences:', error);
  }
}
// Function to handle form submission for adding a new work experience
async function addWorkExperience(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    if (response.ok) {
      alert('Work experience added successfully');
      form.reset();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error adding work experience:', error);
  }
}

// Function to delete a work experience
async function deleteWorkExperience(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Are you sure');
      fetchWorkExperiences(); // Refresh the list of work experiences
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error deleting work experience:', error);
  }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
  fetchWorkExperiences(); // Fetch work experiences when the page loads
});

const addWorkForm = document.getElementById('add-work-form');
if (addWorkForm) {
  addWorkForm.addEventListener('submit', addWorkExperience);
}
