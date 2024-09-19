<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
  <div class="container mt-5 mb-4 pt-4">
    <h3 class="text-start">List of Orders</h3>
    <div class="col-12 d-flex justify-content-end">
     <button class="btn btn-primary mb-3 ext-end" @click="goToAddOrder">Add New Order</button>   
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Delivery Address</th>
          <th>Track Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.date }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.deliveryAddress }}</td>
          <td>{{ order.trackNumber }}</td>
          <td>{{ order.orderStatus }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="ouvrirModalModification(produit)" data-bs-toggle="modal" data-bs-target="#productModal">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-info btn-sm me-2">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" @click="supprimerProduit(produit)">
                                    <i class="bi bi-trash"></i>
                                </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const orders = ref([
  {
    id: 1,
    date: '2024-07-25',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St, New York, NY',
    trackNumber: 'TN001',
    orderStatus: 'Shipped',
  },
  {
    id: 2,
    date: '2024-07-26',
    customerName: 'Jane Smith',
    deliveryAddress: '456 Oak Ave, San Francisco, CA',
    trackNumber: 'TN002',
    orderStatus: 'Delivered',
  },
]);

const goToAddOrder = () => {
  router.push({ name: 'add-order' });
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
