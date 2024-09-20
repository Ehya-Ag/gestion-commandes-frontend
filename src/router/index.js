import { createRouter, createWebHistory } from "vue-router";

import Customer from "../components/customer/Customer.vue";
import Product from "../components/product/Product.vue";
import PurchaseOrder from "../components/purchaseOrder/PurchaseOrder.vue";
import AddOrder from "../components/purchaseOrder/AddOrder.vue";
import EditOrder from "../components/purchaseOrder/EditOrder.vue";
import OrderDetail from "../components/purchaseOrder/DetailOrder.vue";
import Home from "../components/Home.vue";
import NotFound from "../components/NotFound.vue";

const routes = [

    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/customer",
        name: "customer",
        component: Customer
    },
    {
        path: "/product",
        name: "product",
        component: Product
    },
    {
        path: "/order",
        name: "order",
        component: PurchaseOrder
    },
    {
        path: "/order/add-order",
        name: "add-order",
        component: AddOrder
    },
    {   path: "/order/edit-order/:id", 
        name: "edit-order", 
        component: EditOrder },
    {
        path: '/order/order-detail/:id',
        name: 'order-detail',
        component: OrderDetail, 
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
