<template>
    <div class="modal fade" id="detailsOrderModal" tabindex="-1" aria-labelledby="detailsOrderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsOrderModalLabel">Order and Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="order && product">
            <h6>Order Information</h6>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="orderDate" class="form-label">Order Date</label>
                <input type="text" class="form-control" id="orderDate" :value="order.date" disabled>
              </div>
              <div class="col-md-6 mb-3">
                <label for="customerName" class="form-label">Customer Name</label>
                <input type="text" class="form-control" id="customerName" :value="order.customerName" disabled>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="deliveryAddress" class="form-label">Delivery Address</label>
                <input type="text" class="form-control" id="deliveryAddress" :value="order.deliveryAddress" disabled>
              </div>
              <div class="col-md-6 mb-3">
                <label for="trackNumber" class="form-label">Track Number</label>
                <input type="text" class="form-control" id="trackNumber" :value="order.trackNumber" disabled>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="orderStatus" class="form-label">Order Status</label>
                <input type="text" class="form-control" id="orderStatus" :value="order.orderStatus" disabled>
              </div>
            </div>
  
            <h6>Product Information</h6>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="productName" :value="product.name" disabled>
              </div>
              <div class="col-md-6 mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input type="text" class="form-control" id="productPrice" :value="product.price" disabled>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <input type="text" class="form-control" id="productDescription" :value="product.description" disabled>
              </div>
              <div class="col-md-6 mb-3">
                <label for="productQuantity" class="form-label">Quantity</label>
                <input type="text" class="form-control" id="productQuantity" :value="product.quantity" disabled>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="productCategory" class="form-label">Category</label>
                <input type="text" class="form-control" id="productCategory" :value="product.category" disabled>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DetailsOrder",
    props: {
      order: {
        type: Object,
        required: true
      },
      product: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-body {
    font-size: 1.1rem;
  }
  
  h6 {
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  