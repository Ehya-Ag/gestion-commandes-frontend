<template>
  <div class="container mt-4">
    <h3>Add order</h3>
    <div class="d-flex justify-content-end">
      <button @click="goToOrderList" class="btn btn-secondary me-4">Orders List</button>
      <button @click="submitOrder" class="btn btn-primary" :disabled="order.details.length === 0">Submit</button>
    </div>
    <form @submit.prevent="submitOrder">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="date" class="form-label">Date</label>
          <input type="date" v-model="order.date" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label for="deliveryAddress" class="form-label">Delivery Address</label>
          <input type="text" v-model="order.deliveryAddress" class="form-control" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="customerName" class="form-label">Customer Name</label>
          <input type="text" v-model="order.customerName" class="form-control" required />
        </div>
        <div class="col-md-6 mb-3">
          <label for="trackNumber" class="form-label">Track Number</label>
          <input type="text" v-model="order.trackNumber" class="form-control" required />
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-6 mb-3">
          <label for="orderStatus" class="form-label">Order Status</label>
          <select v-model="order.orderStatus" class="form-select" required>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    </form>

    <h3>Order Details</h3>
    <div class="mt-5 border">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in order.details" :key="index">
            <td>
              <select v-model="detail.product" class="form-select">
                <option value="">Select product</option>
                <option v-for="product in products" :key="product.id" :value="product.name">{{ product.name }}</option>
              </select>
            </td>
            <td>
              <input type="number" v-model.number="detail.quantity" min="1" class="form-control" />
            </td>
            <td>
              <input type="number" v-model.number="detail.price" min="0" class="form-control" />
            </td>
            <td>
              <button type="button" @click="removeDetail(index)" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
          <tr>
            <td>
              <select v-model="newDetail.product" class="form-select">
                <option value="">Select product</option>
                <option v-for="product in products" :key="product.id" :value="product.name">{{ product.name }}</option>
              </select>
            </td>
            <td>
              <input type="number" v-model.number="newDetail.quantity" min="1" class="form-control" />
            </td>
            <td>
              <input type="number" v-model.number="newDetail.price" min="0" class="form-control" />
            </td>
            <td>
              <button type="button" @click="removeDetail()" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-start">
        <button type="button" @click="addDetail" class="btn btn-success">Add new detail</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const products = ref([
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
]);
const order = ref({
  date: '',
  customerName: '',
  deliveryAddress: '',
  trackNumber: '',
  orderStatus: 'Processing',
  details: [],
});

const newDetail = ref({
  product: '',
  quantity: 1,
  price: 0,
});
const addDetail = () => {
  order.value.details.push({ ...newDetail.value });
  newDetail.value = { product: '', quantity: 1, price: 0 };
};
const removeDetail = (index) => {
  if (order.value.details.length > 0) {
    order.value.details.splice(index, 1);
  } else {
    alert("At least one item must be present.");
  }
};
const submitOrder = () => {
  if (order.value.details.length === 0) {
    alert('You must add at least one product detail.');
    return;
  }
  console.log('Order submitted:', order.value);
};

// Redirection vers la liste des commandes
const router = useRouter();
const goToOrderList = () => {
  router.push({ name: 'order' });
};
</script>
