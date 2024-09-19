import { createRouter, createWebHistory } from "vue-router";

import Customer from "../components/customer/Customer.vue";
import Product from "../components/product/Product.vue";
import PurchaseOrder from "../components/purchaseOrder/PurchaseOrder.vue";
import AddOrder from "../components/purchaseOrder/AddOrder.vue";
import NotFound from "../components/NotFound.vue";

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
        path: "/AddOrder",
        name: "add-order",
        component: AddOrder
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
