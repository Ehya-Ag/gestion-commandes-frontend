<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

    <div>
         <h3 class="text-start">List of Products</h3>
        <div class="text-end mb-4">
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="ouvrirModalAjout">
        Add new product
             </button>
    </div>
    </div>
    <div>
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">{{ estEnModeModification ? 'Modifier le produit' : 'Créer un nouveau produit' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="estEnModeModification ? modifierProduit() : ajouterProduit()">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="productName" class="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="productName" v-model="nouveauProduit.nom" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="category" class="form-label">Category</label>
                                    <input type="text" class="form-control" id="category" v-model="nouveauProduit.categorie" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="price" v-model="nouveauProduit.prix" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="stock" class="form-label">Stock</label>
                                    <input type="number" class="form-control" id="stock" v-model="nouveauProduit.quantiteStock" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="barcode" class="form-label">Barecode</label>
                                    <input type="text" class="form-control" id="barcode" v-model="nouveauProduit.codeBarres" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-select" id="status" v-model="nouveauProduit.statut">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id="description" v-model="nouveauProduit.description" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" class="btn btn-primary">{{ estEnModeModification ? 'Modifier' : 'Ajouter' }}</button>
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
                            <th>Barecode</th>
                            <th>Status</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="produit in produits" :key="produit.codeBarres">
                            <td>{{ produit.nom }}</td>
                            <td>{{ produit.description }}</td>
                            <td>{{ produit.categorie }}</td>
                            <td>{{ produit.prix }}</td>
                            <td>{{ produit.quantiteStock }}</td>
                            <td>{{ produit.codeBarres }}</td>
                            <td>{{ produit.statut }}</td>
                            <td class="text-center">
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            estEnModeModification: false,
            indexProduitAModifier: null,
            nouveauProduit: {
                nom: "",
                categorie: "",
                prix: null,
                quantiteStock: null,
                codeBarres: "",
                statut: "Active",
                description: "",
            },
            produits: [
                {
                    nom: "Produit 001",
                    categorie: "Electronics",
                    prix: 100,
                    quantiteStock: 50,
                    codeBarres: "123456789012",
                    statut: "Active",
                    description: "High-quality product.",
                },
            ],
        };
    },
    methods: {
        ouvrirModalAjout() {
            this.estEnModeModification = false;
            this.nouveauProduit = {
                nom: "",
                categorie: "",
                prix: null,
                quantiteStock: null,
                codeBarres: "",
                statut: "Active",
                description: "",
            };
        },
        ouvrirModalModification(produit) {
            this.estEnModeModification = true;
            this.indexProduitAModifier = this.produits.indexOf(produit);
            this.nouveauProduit = { ...produit };
        },
        ajouterProduit() {
            if (this.nouveauProduit.nom && this.nouveauProduit.categorie && this.nouveauProduit.prix && this.nouveauProduit.quantiteStock && this.nouveauProduit.codeBarres) {
                this.produits.push({ ...this.nouveauProduit });
                this.reinitialiserFormulaire();
            }
        },
        modifierProduit() {
            if (this.nouveauProduit.nom && this.nouveauProduit.categorie && this.nouveauProduit.prix && this.nouveauProduit.quantiteStock && this.nouveauProduit.codeBarres) {
                this.produits[this.indexProduitAModifier] = { ...this.nouveauProduit };
                this.reinitialiserFormulaire();
            }
        },
        supprimerProduit(produit) {
            if (confirm(`Êtes-vous sûr de vouloir supprimer ${produit.nom} ?`)) {
                this.produits = this.produits.filter(p => p.codeBarres !== produit.codeBarres);
            }
        },
        reinitialiserFormulaire() {
            this.nouveauProduit = { nom: "", categorie: "", prix: null, quantiteStock: null, codeBarres: "", statut: "Active", description: "" };
            const modalElement = document.getElementById('productModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        },
    },
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
