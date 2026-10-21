// Function to handle Search execution (Task 7 & Task 8)
function searchCondition() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous search results
  
    if (!input) {
      alert('Please enter a keyword to search.');
      return;
    }
  
    // Fetch travel recommendations from JSON (Task 6)
    fetch('./travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let matchedResults = [];
  
        // Task 7: Keyword variation logic
        if (input === 'beach' || input === 'beaches') {
          matchedResults = data.beaches;
        } else if (input === 'temple' || input === 'temples') {
          matchedResults = data.temples;
        } else {
          // Search by country name or individual city/country matches
          data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(input)) {
              matchedResults.push(...country.cities);
            } else {
              country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(input)) {
                  matchedResults.push(city);
                }
              });
            }
          });
        }
  
        // Task 8: Display results (at least 2 recommendations with image, title, and description)
        if (matchedResults.length > 0) {
          matchedResults.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('result-card');
  
            card.innerHTML = `
              <img src="${item.imageUrl}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <button class="btn-visit">Visit</button>
            `;
  
            resultsContainer.appendChild(card);
          });
        } else {
          resultsContainer.innerHTML = '<p class="no-results">No recommendations found for your search.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching travel data:', error);
        resultsContainer.innerHTML = '<p class="no-results">Failed to load travel recommendations.</p>';
      });
  }
  
  // Task 9: Clear Button Logic
  function resetForm() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results-container').innerHTML = '';
  }
  
  // Task 10: Country date and time logic (Optional Task)
  function displayCountryTime(timeZone, countryName) {
    const options = {
      timeZone: timeZone,
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const countryTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${countryName}:`, countryTime);
    return countryTime;
  }
  
  // Example usage for Task 10 verification in Console
  displayCountryTime('America/New_York', 'New York');


  // Dynamically load the CSS stylesheet
  const link = document. createElement('link');
  link.rel = 'stylesheet';
  link.href = './travel_recommendation.css';
  document.head.appendChild(link);