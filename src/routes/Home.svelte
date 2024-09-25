
<!-- Home.svelte -->

<script>
  import { navigate } from 'svelte-routing';
  import { fade } from 'svelte/transition';
  import { forceRefresh } from '../lib/utils.js';
  import { onMount } from 'svelte';
  export let width = '100px';
  export let height = '100px';
  forceRefresh()


  let username = '';
  let password = '';
  let showError = false;
  let showMenu = false;
 

  function login()
  {
    if (username && password)
    {
      // Simulate a delay and transition
      setTimeout(() =>
      {
        navigate('/journal');
      }, 2000);
    }
    else
    {
      showError = true; // Show error message if fields are empty
    }
  }
  function showPopup()
  {
    alert("Sorry, feature not yet implemented!");
  }
  
</script>

<!-- ProgressPal Logo -->
<!-- ProgressPalLogo.svelte -->





<div transition:fade>
  
  <h1>Welcome to</h1>
  <div class="logo" style="width: {width}; height: {height};">
    <img src="ProgressPal3.png" alt="ProgressPal" />
    <style>
      .logo
      {
        position: absolute;
        top: 150px;
        left: 20px;
      }
    
      .logo img
      {
        width: 422px;
        
      }
    </style>
  </div>
  <div class="login-form">
    <label for="username"></label>
    <input id="username" bind:value={username} class="input-box" placeholder="USERNAME" />

    <label for="password"></label>
    <input id="password" bind:value={password} class="input-box" placeholder="PASSWORD" />

    <button on:click={login}>LOGIN</button>
    <button on:click={null}>CREATE ACCOUNT</button>
    {#if showError}
      <div class="error-message">Please enter both Username and Password.</div>
    {/if}

    <div class="options">
      <span on:click={showPopup}>Forgot your password? Click me!</span>
    </div>
  </div>
</div>

<style>

  h1
  {
    position: absolute;
    top: 60px;
    left: 105px;
    color: #62c3fd;
  }
  ::placeholder
  {
    color: #ffa077;
    
    font-size: large;
    opacity: 0.7;
    text-align: center;

  }
  .login-form
  {
    position: absolute;
    text-align: center;
    color-scheme: white;
    width: 400px;
    top: 330px;
    left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .login-form label
  {
    font-weight: bold;
  }

  .login-form input
  {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .login-form button
  {
    width: 88%;
    padding: 20px;
    background-color: #62c3fd;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .login-form button:hover
  {
    background-color: #569aec;
  }

  .options
  {
    width: 100%;
    margin-top: 10px;
    color: #a6a6a6;
  }

  .options span
  {
    cursor: pointer;
    text-decoration: underline;
  }

  .options span:hover
  {
    color: #545454;
  }

  .error-message
  {
    color: rgb(255, 125, 4);
    font-size: 0.9em;
    margin-top: 10px;
  }
</style>
