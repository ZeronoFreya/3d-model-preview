<template>
    <li>
        <div class="toggle"
            @click.prevent.stop="toggleSecMenu()">
            <span class="action_name">{{name}}</span>
        </div>
        <slot></slot>
    </li>
</template>
<script>
export default {
    props: ["index", "name"],
    methods: {
        toggleSecMenu() {
            this.$emit("toggleSecMenu", this.index);
        },
    },
};
</script>
<style lang="scss" scoped>
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

