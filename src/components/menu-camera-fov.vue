<template>
    <div class="contain">
        <input class="slider" type="range" min="10" max="120" 
          v-model="value"
          @input="change"/>
        <span>{{value}}</span>
    </div>
</template>
<script>
// import EventHub from "../../src/eventHub";
// import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            value: this.$bus.vertFOV,
        };
    },
    methods: {
        change() {            
            this.$bus.$emit("setVertFOV", this.value);
        },
    },
    created() {
        this.change();
    },
};
</script>
<style lang="scss" scoped>
.contain {
    background: rgba(0, 0, 0, 0.6);
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.slider {
    width: 80%;
    height: 40px;
    -webkit-appearance: none;
    overflow: hidden;
    outline: none;
    background: none;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        position: relative;
        width: 10px;
        height: 10px;
        background: #f22;
        border-radius: 50%;
        transition: 0.2s;
    }
    &::-moz-range-track {
        height: 4px;
        background: #edc;
        border: none;
    }
    &::-webkit-slider-runnable-track {
        height: 4px;
        background: #edc;
        border: none;
    }
    &::-moz-range-thumb {
        width: 10px;
        height: 10px;
        background: #f22;
        border: none;
        border-radius: 50%;
    }
    &::-webkit-slider-thumb{
        width: 10px;
        height: 10px;
        background: #f22;
        border: none;
        border-radius: 50%;
    }
    &::-moz-range-progress {
        height: 4px;
        background: #f22;
    }
    &::-moz-focus-outer {
        border: none; /* 去除 focus 時候的外框虛線 */
    }
    &::-moz-range-thumb:hover,
    &:active::-moz-range-thumb {
        width: 16px;
        height: 16px;
    }
}
</style>
