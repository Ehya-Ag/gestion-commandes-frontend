<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
  <div class="container mb-4">
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
            <button class="btn btn-link btn-sm me-2" @click="openEditModal(order)">
              <i class="fa fa-pen-to-square" style="color: gold;"></i>
            </button>
            <button class="btn btn-link btn-sm me-2" @click="openDetailsModal(order)" data-bs-toggle="modal" data-bs-target="#detailsOrderModal">
              <i class="fa fa-eye" style="color: blue;"></i>
            </button>
            <button class="btn btn-link btn-sm" @click="confirmDelete(order)">
              <i class="fa fa-trash" style="color: red;"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <DetailsOrder :order="selectedOrder" :product="selectedProduct" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DetailsOrder from './DetailOrder.vue';

const router = useRouter();

const orders = ref([
  {
    id: 1,
    date: '2024-07-25',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St, New York, NY',
    trackNumber: 'TN001',
    orderStatus: 'Shipped',
    product: {
      name: 'Laptop',
      price: 1200,
      description: 'High-end laptop with a 15-inch screen.',
      quantity: 5,
      category: 'Computers'
    }
  },
  {
    id: 2,
    date: '2024-07-26',
    customerName: 'Jane Smith',
    deliveryAddress: '456 Oak Ave, San Francisco, CA',
    trackNumber: 'TN002',
    orderStatus: 'Delivered',
    product: {
      name: 'Smartphone',
      price: 800,
      description: 'Latest generation smartphone with high-resolution camera.',
      quantity: 15,
      category: 'Electronics'
    }
  }
]);

const selectedOrder = ref(null);
const selectedProduct = ref(null);

const goToAddOrder = () => {
  router.push({ name: 'add-order' });
};

const openEditModal = (order) => {
  router.push({ name: 'edit-order', params: { id: order.id } });
};

const openDetailsModal = (order) => {
  selectedOrder.value = order;
  selectedProduct.value = order.product;
};

const deleteOrder = (order) => {
  const index = orders.value.findIndex(o => o.id === order.id);
  if (index !== -1) {
    orders.value.splice(index, 1);
    console.log('Order deleted:', order);
  }
};

const confirmDelete = (order) => {
  if (confirm(`Are you sure you want to delete the order for ${order.customerName}?`)) {
    deleteOrder(order);
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
