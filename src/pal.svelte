<!-- pal.svelte (Main page)-->
<script>
  import { Router, Route, Link, navigate} from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Journal from './routes/Journal.svelte';
  import Logbook from './routes/Logbook.svelte';
  import Stats from './routes/Stats.svelte';
  import ProgressPal from './components/ProgressPalLogo.svelte';
    
  let loggedIn = true;
  let showMenu = false; // State to control the visibility of the menu
  
  
  function toggleMenu()
  {
    showMenu = !showMenu;
  }
</script>

<Router>
  <div class="container">
    

    <!-- Settings Menu (not visible on Home page) -->
    {#if location.pathname != "/"}
    <!-- ProgressPal Logo -->
    <ProgressPal />
      <div class="settings-menu">
        <button on:click={toggleMenu} class="settings-btn">⚙️</button>
        {#if showMenu}
          <div class="dropdown-menu">
            <Link to="/journal" on:click={() => showMenu = false}>Journal</Link>
            <Link to="/logbook" on:click={() => showMenu = false}>Logbook</Link>
            <!-- <Link to="/stats" on:click={() => showMenu = false}>Stats</Link>-->
            <Link to="/" on:click={() => showMenu = false}>Logout</Link>
            
          </div>
        {/if}
      </div>
    {/if}

    <!-- Route container for different pages -->
    <div class="route-container">
      <Route path="journal" component={Journal} />
      <Route path="logbook" component={Logbook} />
      <!-- <Route path="stats" component={Stats} />-->
      <Route path="/" component={Home} />
    </div>
  </div>
</Router>

<style>

  .container
  {
    width: 60%;
    min-width: 422px;
    max-width: 422px;
    min-height: 666px;
    max-height: 666px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff9f1;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  /* Settings menu styles */
  .settings-menu {
    position: absolute;
    size: 88%;
    top: 20px;
    right: 10px;
  }

  .settings-btn
  {
    background-color: transparent;
    border: transparent;
    border-color: transparent;
    outline-width: 0;
    padding: 10px 15px;
    border-radius: 1px;
    cursor: pointer;
    font-size: 2.7em;
  }

  .settings-btn:hover
  {
    background-color: transparent;
    border: transparent;
    border-color: transparent;
    outline-width: 0;
  }

  .dropdown-menu
  {
    position: absolute;
    top: 65px;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    z-index: 10;
  }


  /* Routed container styles */
  .route-container
  {
    padding: 20px;
  }
</style>