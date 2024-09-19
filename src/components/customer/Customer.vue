<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
  
  <div>
    <h3>List of Customers</h3>
    <div class="text-end">
      <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#clientModal" @click="ouvrirModalAjout">
        Add new customer
      </button>
    </div>
    <div class="modal fade" id="clientModal" tabindex="-1" aria-labelledby="clientModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm"> <!-- Smaller and centered modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="clientModalLabel">
              {{ modeAffichage === 'view' ? 'Détails du client' : estEnModeModification ? 'Modifier le client' : 'Ajouter un client' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Customer Name</label>
                <input type="text" class="form-control" id="name" v-model="nouveauClient.nom" :readonly="modeAffichage === 'view'" :class="{ 'bg-light': modeAffichage === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" v-model="nouveauClient.adresse" :readonly="modeAffichage === 'view'" :class="{ 'bg-light': modeAffichage === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="nouveauClient.email" :readonly="modeAffichage === 'view'" :class="{ 'bg-light': modeAffichage === 'view' }" required />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" class="form-control" id="phone" v-model="nouveauClient.telephone" :readonly="modeAffichage === 'view'" :class="{ 'bg-light': modeAffichage === 'view' }" required />
              </div>
              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary " v-if="modeAffichage !== 'view'">{{ estEnModeModification ? 'Confirm' : 'Confirm' }}</button>
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
            <tr v-for="client in clients" :key="client.email">
              <td>{{ client.nom }}</td>
              <td>{{ client.adresse }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.telephone }}</td>
              <td class="text-center">
                <button class="btn btn-link btn-sm me-2" @click="ouvrirModalModification(client)" data-bs-toggle="modal" data-bs-target="#clientModal">
                  <i class="fa fa-pen-to-square" style="color: gold;"></i>
                </button>
                <button class="btn btn-link btn-sm me-2" @click="ouvrirModalDetails(client)" data-bs-toggle="modal" data-bs-target="#clientModal">
                  <i class="fa fa-eye" style="color: blue;"></i>
                </button>
                <button class="btn btn-link btn-sm" @click="supprimerClient(client)">
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

// Define reactive variables
const modeAffichage = ref('edit');
const estEnModeModification = ref(false);
const indexClientAModifier = ref(null);
const nouveauClient = ref({
  nom: "",
  adresse: "",
  email: "",
  telephone: "",
});

// Initialize the client list
const clients = ref([
  { nom: "John Doe", adresse: "123 Main St, New York, NY", email: "johndoe@example.com", telephone: "123-456-7890" },
  { nom: "Johny Frappe", adresse: "123 Main St, New York, NY", email: "johndoe@example5.com", telephone: "123-456-7890" },
  { nom: "John Wike", adresse: "123 Main St, New York, NY", email: "johndoe@example2.com", telephone: "123-456-7890" },
]);

// Define methods
function ouvrirModalAjout() {
  modeAffichage.value = 'edit';
  estEnModeModification.value = false;
  nouveauClient.value = { nom: "", adresse: "", email: "", telephone: "" };
}

function ouvrirModalModification(client) {
  modeAffichage.value = 'edit';
  estEnModeModification.value = true;
  indexClientAModifier.value = clients.value.indexOf(client);
  nouveauClient.value = { ...client };
}

function ouvrirModalDetails(client) {
  modeAffichage.value = 'view';
  nouveauClient.value = { ...client };
}

function submitForm() {
  if (modeAffichage.value === 'view') {
    closeModal();
    return;
  }
  if (estEnModeModification.value) {
    modifierClient();
  } else {
    ajouterClient();
  }
}

function ajouterClient() {
  if (nouveauClient.value.nom && nouveauClient.value.adresse && nouveauClient.value.email && nouveauClient.value.telephone) {
    clients.value.push({ ...nouveauClient.value });
    reinitialiserFormulaire();
  }
}

function modifierClient() {
  if (nouveauClient.value.nom && nouveauClient.value.adresse && nouveauClient.value.email && nouveauClient.value.telephone) {
    clients.value[indexClientAModifier.value] = { ...nouveauClient.value };
    reinitialiserFormulaire();
  }
}

function supprimerClient(client) {
  if (confirm(`Are you sure you want to delete ${client.nom}?`)) {
    clients.value = clients.value.filter(c => c.email !== client.email);
  }
}

function reinitialiserFormulaire() {
  nouveauClient.value = { nom: "", adresse: "", email: "", telephone: "" };
  closeModal();
}

function closeModal() {
  const modalElement = document.getElementById('clientModal');
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
