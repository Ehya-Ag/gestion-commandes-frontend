<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
  
  <div>
    <h3>List of Customers</h3>
    <div class="text-end">
      <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#customerModal" @click="openAddModal">
        Add new customer
      </button>
    </div>
    <div class="modal fade" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customerModalLabel">
              {{ displayMode === 'view' ? 'Customer Details' : isEditMode ? 'Edit Customer' : 'Add Customer' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Customer Name</label>
                <input type="text" class="form-control" id="name" v-model="newCustomer.name" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" v-model="newCustomer.address" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="newCustomer.email" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" class="form-control" id="phone" v-model="newCustomer.phone" :readonly="displayMode === 'view'" :class="{ 'bg-light': displayMode === 'view' }" required />
              </div>
              <div class="text-end">
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
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.email">
              <td>{{ customer.name }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td class="text-center">
                <button class="btn btn-link btn-sm me-2" @click="openEditModal(customer)" data-bs-toggle="modal" data-bs-target="#customerModal">
                  <i class="fa fa-pen-to-square" style="color: gold;"></i>
                </button>
                <button class="btn btn-link btn-sm me-2" @click="openDetailModal(customer)" data-bs-toggle="modal" data-bs-target="#customerModal">
                  <i class="fa fa-eye" style="color: blue;"></i>
                </button>
                <button class="btn btn-link btn-sm" @click="deleteCustomer(customer)">
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
const customerToEditIndex = ref(null);
const newCustomer = ref({
  name: "",
  address: "",
  email: "",
  phone: "",
});

const customers = ref([
  { name: "John Doe", address: "123 Main St, New York, NY", email: "johndoe@example.com", phone: "123-456-7890" },
  { name: "Johny Frappe", address: "123 Main St, New York, NY", email: "johndoe@example5.com", phone: "123-456-7890" },
  { name: "John Wike", address: "123 Main St, New York, NY", email: "johndoe@example2.com", phone: "123-456-7890" },
]);

function openAddModal() {
  displayMode.value = 'edit';
  isEditMode.value = false;
  newCustomer.value = { name: "", address: "", email: "", phone: "" };
}

function openEditModal(customer) {
  displayMode.value = 'edit';
  isEditMode.value = true;
  customerToEditIndex.value = customers.value.indexOf(customer);
  newCustomer.value = { ...customer };
}

function openDetailModal(customer) {
  displayMode.value = 'view';
  newCustomer.value = { ...customer };
}

function submitForm() {
  if (displayMode.value === 'view') {
    closeModal();
    return;
  }
  if (isEditMode.value) {
    editCustomer();
  } else {
    addCustomer();
  }
}

function addCustomer() {
  if (newCustomer.value.name && newCustomer.value.address && newCustomer.value.email && newCustomer.value.phone) {
    customers.value.push({ ...newCustomer.value });
    resetForm();
  }
}

function editCustomer() {
  if (newCustomer.value.name && newCustomer.value.address && newCustomer.value.email && newCustomer.value.phone) {
    customers.value[customerToEditIndex.value] = { ...newCustomer.value };
    resetForm();
  }
}

function deleteCustomer(customer) {
  if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
    customers.value = customers.value.filter(c => c.email !== customer.email);
  }
}

function resetForm() {
  newCustomer.value = { name: "", address: "", email: "", phone: "" };
  closeModal();
}

function closeModal() {
  const modalElement = document.getElementById('customerModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}
</script>

<style scoped>
.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}
.bg-light {
  background-color: #f8f9fa !important;
}
</style>
