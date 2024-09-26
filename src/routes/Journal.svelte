<!-- Journal.svelte -->
<script>
  import { fade } from 'svelte/transition';
  import { forceRefresh } from '../lib/utils.js'; 
  import Modal from '../components/Modal.svelte';
  import { onMount } from 'svelte';


  forceRefresh()
  
  // Existing state variables and logic
  let isModalOpen = false;
  let name = 'Mike Smith';
  let date = '';
  let weight = '';
  let journalEntry = '';
  let selectedMood = null;// Initial mood value (can be any number from 1 to 10)
  let currentDay = new Date().toLocaleDateString(undefined, { weekday: 'long' });
  let shortDate = ""; // "09/24/2024 <- stylized to fit the default 'date' parameter"
  
  // Array to hold user entries
  let userEntries =
  [
    { date: "2024-09-01", weight: 180, mood: 7, journalEntry: "Had a good day!" },
    { date: "2024-09-02", weight: 178, mood: 7, journalEntry: "Feeling motivated!" },
    { date: "2024-09-03", weight: 176, mood: 9, journalEntry: "Lost some weight!" },
    { date: "2024-09-07", weight: 171, mood: 2, journalEntry: "Had an OK day!" },
    { date: "2024-09-16", weight: 173, mood: 4, journalEntry: "Bad day!" },
    { date: "2024-09-22", weight: 172, mood: 8, journalEntry: "Sometimes... I dream about...cheese" },
  ];

  let weightLossGoal = 15; // Example weight loss goal (Can be altered in settings in the future)
  let totalWeightLoss = userEntries[0].weight - userEntries[userEntries.length - 1].weight;
  let moodCounts = { 3: 1, 2: 1, 4: 1, 7: 2, 9: 1 };
  let entriesCount = userEntries.length;


  // Function to update the day 
  function updateDay()
  {
    const options = { weekday: 'long', month: 'long', day: 'numeric', };
    currentDay = new Date().toLocaleDateString(undefined, options);   //Couldn't find out why the overload happens
  
    const shortDateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
    shortDate = new Date().toLocaleDateString(undefined, shortDateOptions);  //Couldn't find out why the overload happens
    date = shortDate;
  }
  // This function updates statistics for the dataset
  function updateStatistics()
  {
    totalWeightLoss = 0;
    moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0};

    for (let i = 0; i < userEntries.length; i++)
    {
      if (i > 0)
      {
        totalWeightLoss += userEntries[i - 1].weight - userEntries[i].weight;
      }
      moodCounts[userEntries[i].mood]++;
    }

    entriesCount = userEntries.length;
  }

  // Function to add a new journal entry
  function addEntry()
  {
    if (date && weight && selectedMood)
    {
      userEntries = [
        ...userEntries,
        {

          date: date,
          weight: parseFloat(weight),
          mood: parseInt(selectedMood),
          journalEntry: journalEntry
        }
      ];

      // Updating statistics after each new entry
      updateStatistics();

      // Clearing the form inputs


      weight = '';
      journalEntry = '';
      selectedMood = null;
      alert("Entry submitted and added to record!");
    }
    else
    {
      alert("Please fill all the fields!");
    }
  }


// Function to get color based on mood value
  function getMoodColor(mood) {
    const gradientColors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffb700', '#e2db00', '#b8cc00  ', '#a7cc00', '#74cc00', '#00cc00']; // Red to Green gradient
    return gradientColors[mood - 1]; // Adjust index for 0-based array
  }
  // Updating the date when the component is mounted
  onMount(() =>
  {
  updateDay();
  });
  $: averageWeightLoss = totalWeightLoss / (entriesCount - 1); // Assumes you are tracking daily, which is of course not correct, but 
                                                              // I sadly didn't have time to implement true date difference logic
  $: percentOfGoal = (totalWeightLoss / weightLossGoal) * 100;

  
</script>

<!-- Main Page Content for Journal Entry (might separate into another component) -->

  <h1 class="title">{name}'s Journal</h1>
  <h2 class="title">Date: {currentDay}</h2>

<!--Please disregard the artifact wrapper. It serves no purpose now, but I was trying to have inline-block stats and weight dev's
but stats gave me a lot of trouble so its retired now-->
    <div id="wrapper">
          <!-- Weight Entry -->
      <div class="weight-entry" id="div1">
        <label for="weight">Weight</label>
        <input id="weight" type="number" bind:value={weight} class="input-box" placeholder="Enter weight (lbs)" />
      </div>

     </div>


  <!-- Feelings (Mood) -->
  <div class="feelings">
    <label for="myRange">Mood</label>
    <div class="slidecontainer">
      <input type="range" min="1" max="10" bind:value={selectedMood} class="slider" id="myRange">
      <div class="mood-display" style="background-color: {getMoodColor(selectedMood)};">
        Selected Mood: {selectedMood}
        <style>
          .slidercontainer{
            
          }
        </style>
      </div>
    </div>
  </div>


  <!-- Journal Entry -->
  <div class="journal-entry">
    <label for="entry">Journal Entry</label>
    <textarea id="entry" bind:value={journalEntry} class="text-area" placeholder="Write something..."></textarea>
  </div>

  <!-- Submit Button -->
  <div class="submit-section">
    <span role="checkbox" aria-labelledby="foo" class="submit-btn" tabindex="0" on:click={addEntry}>Submit Entry</span>
  </div>

  <!-- Include the modal component and pass the message -->
  <Modal isOpen={isModalOpen} message="Entry added to logbook!" />
  <!-- Display of Statistics -->
  <div id="average-weight-loss">Average Weight Loss: {averageWeightLoss.toFixed(2)} lbs/day ({percentOfGoal.toFixed(2)}% of goal)</div>
  <div id="mood-count">Mood Count: {Object.entries(moodCounts).map(([mood, count]) => `${mood}: ${count} times`).join(' | ')}</div>



  <!-- Display the last entry. Updates when new entry is added!-->
  {#if userEntries.length > 0}
    <div class="last-entry">
      <label for="entry-window">Previous journal entry:</label>
        <div class="entry-window">
          Date: {userEntries[userEntries.length - 1].date}, 
          Weight: {userEntries[userEntries.length - 1].weight} lbs, 
          Mood: <span style="color: {getMoodColor(userEntries[userEntries.length - 1].mood)}">
          {userEntries[userEntries.length - 1].mood}</span>, 
          Entry: {userEntries[userEntries.length - 1].journalEntry}
        </div>
    </div>
  {:else}
    <p>No entries available</p>
  {/if}


<!-- Styles -->
<style>


  #average-weight-loss
  {
    margin-top: 10px;
    margin-bottom: 5px;
    line-height: normal;
  }
  
  #mood-count
  {
    margin-bottom: 10px;
  }
  .entry-window
  {
    padding: 10px;
    font-size: large;
    overflow: hidden;
  }

  .submit-section
  {
    print-color-adjust:123;
  }

  .text-area
  {
    overflow: hidden;
    font: 1em 'Rimini';
    height: 100px;
    border: 1px solid #ccc;
    color: #ffffff;
  }

  label
  {
    color: #ffa077;
  }  

  h1.title
  {
    float:left;
    margin-top:5px;
    padding: 0px;
    font-size: 34px;
    color: #62c3fd;
    text-transform: uppercase;
  }    

  h2.title 
  {      
    padding: 0px;
    margin-top: -10px;
    float:left;
    font-size: 24px;
    color: #62c3fd;
    text-transform: uppercase;
  }
  
  .input-box, .text-area
  {
    width: 90%;
    padding: 10px;
    font: 1em 'Rimini';
    color: #ffffff;
    margin-top: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1em;
    
    background-color: #c3c3c3;
  }

  .feelings
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  .slidecontainer
  {
    width: 100%;
    max-width: 400px;
    margin: 20px 0;
    
  }

  .slider
  {
    width: 90%;
    height: 25px;
    background: #ddd;
    accent-color: rgb(190, 190, 190);
    position: relative;
    z-index: 1;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 10px;
  }

  .slider:hover
  {
    opacity: 1;
  }

  .slidecontainer
  {
    width: 100%;
    max-width: 400px;
    margin: 20px 0;
    position: relative; 

  }


  .mood-display
  {
    transform: translateY(-105%);
    z-index: 0;
    height: 44px;
    margin-top: 10px;
    margin-bottom: -80px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff9f1;
    font-weight: bold;
    text-align:center;
    min-width: 100px;
  }
  .submit-btn
  {
    position: absolute;
    width: 72%;
    left: 52px;
    bottom: 40px;
    padding: 15px;
    font-size: 1.2em;
    color: white;
    background-color: #62c3fd;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .submit-btn:hover
  {
    background-color: #3b94a3;
  }

  h1
  {
    font-size: 2em;
    color: #4CAF50;
  }
</style>
