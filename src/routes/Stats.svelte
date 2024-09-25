<!-- Logbook.svelte !Work in progress!-->
<script>
    import { Router, Link, Route, navigate } from "svelte-routing";
    import { fade } from 'svelte/transition';
    import { forceRefresh } from '../lib/utils.js';
    forceRefresh()

    function goToHome() {
      navigate('/');
    }
</script>
    
    

      
    
       
    