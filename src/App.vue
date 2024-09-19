<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/clients">
                <i class="fas fa-users"></i> Customer
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/produits">
                <i class="fas fa-box-open"></i> Product
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/bon_de_commande">
                <i class="fas fa-cart-shopping"></i> Order
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
main {
  margin-top: 20px;
}

.navbar-nav .nav-link {
  margin-right: 15px;
}
</style>
