<template>
    <div id="app">
        <view-layer 
            @on-load="onLoad"></view-layer>
        <MenuIndex></MenuIndex>
        <div class="loading" v-show="loading"></div>
    </div>
</template>

<script>
import ViewLayer from "./components/view-layer";
import MenuIndex from "./components/menu-index";

export default {
    name: "app",
    data() {
        return {
            loading: false
        };
    },
    methods: {
        onLoad() {
            // this.$store.commit('toggleLoading');
        }
    },
    components: {
        MenuIndex,
        ViewLayer
    }
};
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background-image: linear-gradient(#7d8fa3, #1b1c1e); */
    background-color: #1b1c1e;
}
</style>
