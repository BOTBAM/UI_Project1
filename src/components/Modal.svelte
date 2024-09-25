<!-- Modal.svelte -->
<script>
    export let message = "";
    export let isOpen = false;
  
    function closeModal()
    {
      isOpen = false;
    }
  </script>
  
  {#if isOpen}
    <div class="modal-overlay" on:click={closeModal}>
      <div class="modal-content" on:click|stopPropagation>
        <p>{message}</p>
        <button on:click={closeModal}>Close</button>
      </div>
    </div>
  {/if}
  
  <style>
    .modal-overlay
    {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .modal-content
    {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      max-width: 400px;
      width: 80%;
      text-align: center;
    }
  
    button
    {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
  
    button:hover
    {
      background-color: #45a049;
    }
  </style>