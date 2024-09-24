<template>
    <div>
        <h3 class="text-start">List of Products</h3>
        <div class="text-end mb-4">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="openAddModal">
                Add new product
            </button>
        </div>
    </div>
    <div>
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">
                            {{ isEditMode ? 'Edit Product' : displayMode === 'view' ? 'Product Details' : 'Create New Product' }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="isEditMode ? editProduct() : addProduct()">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="productName" class="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="productName" v-model="newProduct.name" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="category" class="form-label">Category</label>
                                    <input type="text" class="form-control" id="category" v-model="newProduct.category" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" step="0.01" min="0" class="form-control" id="price" v-model="newProduct.price" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="stock" class="form-label">Stock</label>
                                    <input type="number" min="0" class="form-control" id="stock" v-model="newProduct.stockQuantity" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="barcode" class="form-label">Barcode</label>
                                    <input type="text" class="form-control" id="barcode" v-model="newProduct.barcode" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-select" id="status" v-model="newProduct.status" :disabled="displayMode === 'view'">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id="description" v-model="newProduct.description" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" v-if="displayMode !== 'view'">{{ isEditMode ? 'Confirm' : 'Confirm' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Barcode</th>
                            <th>Status</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.barcode">
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.stockQuantity }}</td>
                            <td>{{ product.barcode }}</td>
                            <td>{{ product.status }}</td>
                            <td class="text-center">
                                <button class="btn btn-link me-2" @click="openEditModal(product)" data-bs-toggle="modal" data-bs-target="#productModal">
                                    <i class="fa fa-pen-to-square" style="color: gold"></i>
                                </button>
                                <button class="btn btn-link btn-sm me-2" @click="openDetailsModal(product)" data-bs-toggle="modal" data-bs-target="#productModal">
                                    <i class="fa fa-eye" style="color: blue;"></i>
                                </button>
                                <button class="btn btn-link" @click="deleteProduct(product)">
                                    <i class="fa fa-trash" style="color: red;"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const displayMode = ref('edit');
const isEditMode = ref(false);
const productIndexToEdit = ref(null);

const newProduct = ref({
  name: "",
  category: "",
  price: null,
  stockQuantity: null,
  barcode: "",
  status: "Active",
  description: "",
});

const products = ref([
  {
    name: "Product 001",
    category: "Electronics",
    price: 100,
    stockQuantity: 50,
    barcode: "123456789012",
    status: "Active",
    description: "High-quality product.",
  },
  {
    name: "Product 002",
    category: "Computing",
    price: 500,
    stockQuantity: 10,
    barcode: "123456789011",
    status: "Active",
    description: "High-quality product.",
  },
  {
    name: "Product 003",
    category: "Mechanical",
    price: 300,
    stockQuantity: 60,
    barcode: "123456789010",
    status: "Inactive",
    description: "High-quality product.",
  },
]);
const openAddModal = () => {
  displayMode.value = 'edit';
  isEditMode.value = false;
  newProduct.value = {
    name: "",
    category: "",
    price: null,
    stockQuantity: null,
    barcode: "",
    status: "Active",
    description: "",
  };
};

const openEditModal = (product) => {
  displayMode.value = 'edit';
  isEditMode.value = true;
  productIndexToEdit.value = products.value.indexOf(product);
  newProduct.value = { ...product };
};

const openDetailsModal = (product) => {
  displayMode.value = 'view';
  newProduct.value = { ...product };
};

const addProduct = () => {
  if (
    newProduct.value.name &&
    newProduct.value.category &&
    newProduct.value.price &&
    newProduct.value.stockQuantity &&
    newProduct.value.barcode
  ) {
    products.value.push({ ...newProduct.value });
    resetForm();
  }
};

const editProduct = () => {
  if (
    newProduct.value.name &&
    newProduct.value.category &&
    newProduct.value.price &&
    newProduct.value.stockQuantity &&
    newProduct.value.barcode
  ) {
    products.value[productIndexToEdit.value] = { ...newProduct.value };
    resetForm();
  }
};

const deleteProduct = (product) => {
  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
    products.value = products.value.filter((p) => p.barcode !== product.barcode);
  }
};

const resetForm = () => {
  newProduct.value = {
    name: "",
    category: "",
    price: null,
    stockQuantity: null,
    barcode: "",
    status: "Active",
    description: "",
  };
  closeModal();
};

const closeModal = () => {
  const modalElement = document.getElementById('productModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
};
</script>

<style scoped>
.modal-lg {
    max-width: 900px;
}

.modal-dialog-centered {
    display: flex;
    justify-content: center;
    align-items: center;
}

.float-end {
    float: right;
}
</style>
