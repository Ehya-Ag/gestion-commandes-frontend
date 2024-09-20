<template>
  <div class="container">
    <h3>Order Details</h3>
    <form>
      <fieldset disabled>
        <div v-if="order && product">
          <h4>Order Information</h4>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="order-date" class="form-label">Date:</label>
              <input type="text" id="order-date" class="form-control" :value="order.date" />
            </div>
            <div class="col-md-6">
              <label for="customer-name" class="form-label">Customer Name:</label>
              <input type="text" id="customer-name" class="form-control" :value="order.customerName" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="delivery-address" class="form-label">Delivery Address:</label>
              <input type="text" id="delivery-address" class="form-control" :value="order.deliveryAddress" />
            </div>
            <div class="col-md-6">
              <label for="track-number" class="form-label">Track Number:</label>
              <input type="text" id="track-number" class="form-control" :value="order.trackNumber" />
            </div>
          </div>
          <div class="row mb-3 ">
            <div class="col-md-6">
              <label for="order-status" class="form-label">Status:</label>
              <input type="text" id="order-status" class="form-control" :value="order.orderStatus" />
            </div>
          </div>

          <h4>Product Information</h4>
          <div class="row mb-3">
            <div class="col-md-4">
              <label for="product-name" class="form-label">Product Name:</label>
              <input type="text" id="product-name" class="form-control" :value="product.name" />
            </div>
            <div class="col-md-4">
              <label for="product-price" class="form-label">Price:</label>
              <input type="text" id="product-price" class="form-control" :value="product.price" />
            </div>
            <div class="col-md-4">
              <label for="product-quantity" class="form-label">Quantity:</label>
              <input type="text" id="product-quantity" class="form-control" :value="product.quantity" />
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading order details...</p>
        </div>
      </fieldset>
    </form>
    <button class="btn btn-secondary mt-3" @click="goBack">Back to Orders List</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const order = ref(null);
const product = ref(null);

onMounted(() => {
  const orderId = route.params.id;
  const orders = [
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
        quantity: 5,
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
        quantity: 15,
      }
    }
  ];

  const selectedOrder = orders.find(o => o.id === Number(orderId));
  if (selectedOrder) {
    order.value = selectedOrder;
    product.value = selectedOrder.product;
  }
});
const goBack = () => {
  router.push({ name: 'order' });
};
</script>

<style scoped>
h3, h4 {
  margin-top: 20px;
}
.form-label {
  font-weight: bold;
}
</style>
