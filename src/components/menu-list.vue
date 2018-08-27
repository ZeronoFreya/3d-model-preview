<template>
    <li class="action_list"
        :class="{'action_expanded': index === secActive}">
        <div class="toggle"
            @click.prevent.stop="toggleSecMenu()">
            <span class="action_name">{{name}}</span>
        </div>
        <slot></slot>
    </li>
</template>
<script>
export default {
    props: ["secActive", "index", "name"],
    methods: {
        toggleSecMenu() {
            this.$emit("toggleSecMenu", this.index);
        }
    }
};
</script>
<style lang="scss" scoped>
.action_list {
    height: 80px;
    line-height: 1.2;
    text-align: center;
    overflow: hidden;
    font-size: 24px;
    padding: 10px 0;
}
.action_name {
    position: relative;
}
.toggle {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.action_expanded {
    height: auto;
    overflow: auto;
    .action_name {
        &::before {
            content: "[ ";
            position: absolute;
            top: 50%;
            left: -14px;
            transform: translateY(-50%);
        }

        &::after {
            content: " ]";
            position: absolute;
            top: 50%;
            right: -14px;
            transform: translateY(-50%);
        }
    }
}
</style>

