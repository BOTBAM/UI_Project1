<!-- Logbook.svelte -->
<script>
  import { writable } from 'svelte/store';
  import { forceRefresh } from '../lib/utils.js';
  forceRefresh()

  // Initial log entries (same as journal entries for consistency)
  let logEntries = writable
  ([
    { id: 1, date: "2024-09-01", weight: 180, mood: 7, journalEntry: "Had a good day!" },
    { id: 2, date: "2024-09-02", weight: 178, mood: 7, journalEntry: "Feeling motivated!" },
    { id: 3, date: "2024-09-03", weight: 176, mood: 9, journalEntry: "Lost some weight!" },
    { id: 4, date: "2024-09-07", weight: 171, mood: 2, journalEntry: "Had an OK day!" },
    { id: 5, date: "2024-09-12", weight: 173, mood: 4, journalEntry: "Bad day!" },
    { id: 6, date: "2024-09-23", weight: 172, mood: 8, journalEntry: "What is the meaning of life..." },

  ]);

  let editMode = null; // Track which entry is being edited
  let editWeight = '';
  let editMood = 1;
  let editJournalEntry = '';

  // Enter edit mode for a specific entry
  function editEntry(entry)
  {
    editWeight = entry.weight.toString();
    editMood = entry.mood;
    editJournalEntry = entry.journalEntry;
    editMode = entry.id;
  }

  // Save the edited entry
  function saveEntry() {
    logEntries.update(entries => {
      return entries.map(entry => {
        if (entry.id === editMode) {
          return {
            ...entry,
            weight: parseFloat(editWeight),
            mood: editMood,
            journalEntry: editJournalEntry
          };
        }
        return entry;
      });
    });
    resetEditForm();
  }

  // Cancel editing
  function cancelEdit() {
    resetEditForm();
  }

  // Reset edit form fields
  function resetEditForm() {
    editWeight = '';
    editMood = 1;
    editJournalEntry = '';
    editMode = null;
  }
</script>
<div class="logbook-container">
  <h1>Logbook</h1>

  <!-- Scrollable Log Entries -->
  <div class="entry-list">
    <h3>Your Entries</h3>
    <ul>
      {#each $logEntries as entry (entry.id)}
        <li class="entry">
          <!-- Showing edit form if this entry is in edit mode -->
          {#if editMode === entry.id}
            <div class="edit-form">
              <label for="editWeight">Weight (lbs)</label>
              <input id="editWeight" type="number" bind:value={editWeight} />

              <label for="editMood">Mood</label>
              <select id="editMood" bind:value={editMood}>
                {#each Array(10) as _, index}
                  <option value={index + 1}>{index + 1}</option>
                {/each}
              </select>

              <label for="editJournalEntry">Journal Entry</label>
              <textarea id="editJournalEntry" bind:value={editJournalEntry}></textarea>

              <button class="save-btn" on:click={saveEntry}>Save</button>
              <button class="cancel-btn" on:click={cancelEdit}>Cancel</button>
            </div>
          {:else}
            <div class="entry-content">
              <strong>Date:</strong> {entry.date} | 
              <strong>Mood:</strong> {entry.mood} | 
              <strong>Weight:</strong> {entry.weight} lbs
              <p>{entry.journalEntry}</p>
            </div>
            <div class="entry-actions">
              <button class="edit-btn" on:click={() => editEntry(entry)}>Edit</button>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .logbook-container
  {
    display: flex;
    flex-direction: column;
    gap: 2px;
    height: 80%;
    min-height: 100px;
    height: fit-content;
  }

  .entry-list
  {
    align-items:start;
    max-height: 480px; 
    height:480px;
    bottom:22px;
    overflow-y: scroll; /* I will forever insure scrolling is enabled... */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    
    /* I used custom scrollbar styles */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer and Edge */
  }
  

  .entry-list::-webkit-scrollbar
  {
    display: none; /* Chrome, Safari, Opera, this took me SO LONG to find haha*/
  }

  .entry-list h3 {
    margin-bottom: 10px;
  }

  .entry {
    display: flex;
    justify-content: space-between;  /* Distribute space between content */
    align-items: center; /* Center align items vertically */
    width: 81%;         /* Ensure entries take the full width of the container */
    padding: 10px;
    margin: 10px 0;

    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .entry-content p {
    margin: 5px 0 0;
  }

  .entry-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .edit-btn {
    padding: 5px 10px;
    background-color: #a7a7a7;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  .edit-btn:hover {
    background-color: #ffa077;
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .edit-form input,
  .edit-form select,
  .edit-form textarea {
    position:relative;
    align-items: center;

    width: 222px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1em;
    background-color : #c3c3c3; 
  }

  .edit-form textarea {
    resize: vertical;
  }

  .save-btn, .cancel-btn {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .save-btn {
    background-color: #62c3fd;
    color: white;
  }

  .cancel-btn {
    background-color: #ffa077;
    color: white;
  }

  .save-btn:hover {
    background-color: #2f9cdb;
  }

  .cancel-btn:hover {
    background-color: #e59935;
  }
</style>