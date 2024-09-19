<template>
    <div class="container mt-4">
      <div class="d-flex justify-content-end">
      <button @click="goToOrderList" class="btn btn-secondary me-4">Orders List</button>
      <button @click="submitOrder" class="btn btn-primary">Update</button>
    </div>
      <form @submit.prevent="submitOrder" class="">
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
            <input type="text" v-model="order.trackNumber" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3"></div>
          <div class="col-md-6 mb-3">
            <label for="orderStatus" class="form-label">Order status</label>
            <select v-model="order.orderStatus" class="form-select">
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
              <td>{{ detail.product }}</td>
              <td>{{ detail.quantity }}</td>
              <td>{{ detail.price }}</td>
              <td>
                <button type="button" @click="removeDetail(index)" class="btn btn-danger btn-sm">
                  Remove
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <select v-model="newDetail.product" class="form-select mb-2">
                  <option value="">Select product</option>
                  <option v-for="product in products" :key="product.id" :value="product.name">
                    {{ product.name }}
                  </option>
                </select>
              </td>
              <td>
                <input type="number" v-model.number="newDetail.quantity" min="1" class="form-control" />
              </td>
              <td>
                <input type="number" v-model.number="newDetail.price" min="0" class="form-control" />
              </td>
              <td>
                <button type="button" @click="removeNewDetail()" class="btn btn-danger btn-sm">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-start">
          <button type="button" @click="addDetail" class="btn btn-success">Update new detail</button>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const products = ref([
    { id: 1, name: 'Produit A' },
    { id: 2, name: 'Produit B' },
    { id: 3, name: 'Produit C' },
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
    if (newDetail.value.product && newDetail.value.quantity && newDetail.value.price >= 0) {
      order.value.details.push({ ...newDetail.value });
      newDetail.value = { product: '', quantity: 1, price: 0 }; 
    }
  };
  const removeDetail = (index) => {
    order.value.details.splice(index, 1);
  };
  const removeNewDetail = () => {
    newDetail.value = { product: '', quantity: 1, price: 0 };
  };
  const submitOrder = () => {
    console.log('Order submitted:', order.value);
  };
  const router = useRouter();
  const goToOrderList = () => {
    router.push({ name: 'bon-de-commande' });
  };
  </script>
  