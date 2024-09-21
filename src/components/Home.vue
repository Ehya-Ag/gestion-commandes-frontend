<template>
    <div class="home-container">
      <h1 class="welcome-message">Bienvenue sur l'application de gestion des commandes</h1>
      <p class="description">
        Cette application vous permet de gérer vos clients, vos produits, et vos commandes de manière efficace et intuitive. 
        Utilisez le menu de navigation pour accéder aux différentes sections de l'application.
      </p>
      <div class="features">
        <h2>Fonctionnalités principales :</h2>
        <ul>
          <li>Gestion des clients</li>
          <li>Gestion des produits</li>
          <li>Gestion des commandes</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  .home-container {
    text-align: center;
    padding: 50px;
    background-color: #f9f9f9;
  }
  
  .welcome-message {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #343a40;
  }
  
  .description {
    font-size: 1.2rem;
    color: #6c757d;
    margin-bottom: 30px;
  }
  
  .features {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #495057;
  }
  
  .features ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  .features li {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #212529;
  }
  </style>
  