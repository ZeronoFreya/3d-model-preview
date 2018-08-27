<template>
<div class="menu" :class="{'menu_expanded': showMenu}">
    <button type="button" class="menu_button" @click.prevent.stop="toggleMenu">Menu</button>
    <i class="lock_menu" @click.prevent.stop="lockMenu">{{isLockMenu ? 'T':'N'}}</i>
    <ul class="panel">
        <li class="action_list action_expanded">
            <MenuStatus @closeMenu="closeMenu"/>
        </li>
        <template v-for="(item, index) in items">
            <MenuList
                :index="index" :name="item.text"
                :sec-active="secActive" @toggleSecMenu="toggleSecMenu">
                <component @closeMenu="closeMenu" :is="item.temp"></component>
            </MenuList>
        </template>
        <li class="space"></li>
    </ul>
</div>
</template>
<script>
import MenuList from "./menu-list";
import MenuMaterial from "./menu-material";
import MenuPerspective from "./menu-perspective";
import MenuStatus from "./menu-status";
// import MenuApparentHorizon from "./menu-apparent-horizon";
// import {scroller} from 'vue-scrollto/src/scrollTo'
export default {
    name: "Menu",
    data() {
        return {
            showMenu: false,
            isLockMenu: false,
            secActive: NaN,
            items: [
                {
                    text: "Material",
                    temp: MenuMaterial
                },
                {
                    text: "Camera",
                    temp: MenuPerspective
                }
            ]
        };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        lockMenu() {
            this.isLockMenu = !this.isLockMenu;
        },
        closeMenu() {
            if (!this.isLockMenu) {
                this.showMenu = false;
                this.secActive = NaN;
            }
        },
        toggleSecMenu(index) {
            this.secActive = this.secActive == index ? NaN : index;
        }
    },
    components: {
        MenuList,
        MenuStatus,
        // MenuApparentHorizon,
        MenuMaterial,
        MenuPerspective
    }
};
</script>
<style lang="scss" scoped>
.menu {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.6);
    width: 61px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    color: #fafafa;
    font-size: 40px;
}
.menu_button {
    background: transparent;
    padding: 0 60px;
    border: none;
    width: 100%;
    height: 60px;
    outline: none;
    color: #fafafa;
    font-size: 30px;
}
.lock_menu {
    display: none;
    position: absolute;
    top: 5px;
    right: 0;
    width: 60px;
    height: 50px;
    border-left: #7d8fa3 solid 1px;
    text-align: center;
    line-height: 2.2;
    font-size: 24px;
    cursor: pointer;
}
.menu_expanded {
    // width: 100%;
    // height: 40%;
    bottom: 0;
    right: 0;
    border-radius: 0;
    // max-height: 80vh;
    .menu_button {
        border-bottom: #7d8fa3 1px solid;
    }
    .lock_menu {
        display: block;
    }
}

.panel {
    width: 100%;
    height: calc(100% - 60px);
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 20px;
    overflow-y: auto;
}
.space {
    height: 40px;
}

@media screen and (orientation: portrait) {
    //竖屏
    .menu_expanded {
        width: 100%;
        height: 40%;
    }
}
@media screen and (orientation: landscape) {
    //横屏
    .menu_expanded {
        width: 40%;
        height: 100%;
    }
}
</style>



