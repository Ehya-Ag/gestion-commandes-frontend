import { createRouter, createWebHistory } from "vue-router";

// Importation des composants
import Customer from "../components/Customer.vue";
import Product from "../components/Product.vue";
import PurchaseOrder from "../components/PurchaseOrder.vue";
import NotFound from "../components/NotFound.vue"; // Assurez-vous que ce fichier existe

const routes = [
    // {
    //     path: "/",
    //     name: "home",
    //     component: Home
    // },
    {
        path: "/clients",
        name: "clients",
        component: Customer
    },
    {
        path: "/produits",
        name: "produits",
        component: Product
    },
    {
        path: "/bon_de_commande",
        name: "bon-de-commande",
        component: PurchaseOrder
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
