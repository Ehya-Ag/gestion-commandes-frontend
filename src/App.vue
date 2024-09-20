<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: activeRoute === 'customer' }"
                to="/customer"
                @click="setActiveRoute('customer')"
              >
                <i class="fas fa-users"></i> Customer
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: activeRoute === 'product' }"
                to="/product"
                @click="setActiveRoute('product')"
              >
                <i class="fas fa-box-open"></i> Product
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                :class="{ active: activeRoute === 'order' }"
                to="/order"
                @click="setActiveRoute('order')"
              >
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

<script setup>
import { ref } from 'vue';
const activeRoute = ref(''); 
const setActiveRoute = (route) => {
activeRoute.value = route;
};
</script>

<style scoped>
.navbar-nav .nav-link.active i {
  color: blue;
}
.navbar-nav .nav-link i {
  color: black; 
}
.navbar-nav .nav-link {
  margin-right: 15px;
}
</style>
