import Vue from "vue";
import App from "./App.vue";

import fastclick from "fastclick";


import "./utils/rem";
import "./css/base.scss";

Vue.config.productionTip = false;

new Vue({
    created: () => {
        fastclick.attach(document.body);
    },
    render: h => h(App)
}).$mount("#app");
