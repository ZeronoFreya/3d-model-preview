<script>
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
import { addResizeListener, removeResizeListener } from "../utils/resize-event";
import scrollbarWidth from "../utils/scrollbar-width";
import { toObject } from "../utils/util";
import Bar from "./bar";

/* istanbul ignore next */
export default {
    name: "ElScrollbar",

    components: { Bar },

    props: {
        native: Boolean,
        wrapStyle: {},
        wrapClass: {},
        viewClass: {},
        viewStyle: {},
        noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        tag: {
            type: String,
            default: "div",
        },
    },

    data() {
        return {
            sizeWidth: "0",
            sizeHeight: "0",
            moveX: 0,
            moveY: 0,
            style: "",
        };
    },
    computed: {
        wrap() {
            return this.$refs.wrap;
        },
    },

    render(h) {
        let gutter = scrollbarWidth();
        let style = this.wrapStyle;

        if (gutter) {
            const gutterWith = `${gutter}px`;
            const gutterStyle = `width: calc(100% + ${gutterWith}); height: calc(100% + ${gutterWith});`;

            if (Array.isArray(this.wrapStyle)) {
                style = toObject(this.wrapStyle);
                style.marginRight = style.marginBottom = gutterWith;
            } else if (typeof this.wrapStyle === "string") {
                style += gutterStyle;
            } else {
                style = gutterStyle;
            }
        }
        const view = h(
            this.tag,
            {
                class: ["el-scrollbar__view", this.viewClass],
                style: this.viewStyle,
                ref: "resize",
            },
            this.$slots.default,
        );
        const wrap = (
            <div
                ref="wrap"
                style={style}
                onScroll={this.handleScroll}
                class={[
                    "el-scrollbar__wrap",
                    gutter ? "" : "el-scrollbar__wrap--hidden-default",
                ]}
            >
                {[view]}
            </div>
        );
        let nodes;

        if (!this.native) {
            nodes = [
                wrap,
                <Bar move={this.moveX} size={this.sizeWidth} />,
                <Bar vertical move={this.moveY} size={this.sizeHeight} />,
            ];
        } else {
            nodes = [
                <div
                    ref="wrap"
                    class="el-scrollbar__wrap"
                    style={style}
                >
                    {[view]}
                </div>,
            ];
        }
        return h("div", { class: [this.wrapClass, "el-scrollbar"] }, nodes);
    },

    methods: {
        handleScroll() {
            const wrap = this.wrap;

            this.moveY = wrap.scrollTop * 100 / wrap.clientHeight;
            this.moveX = wrap.scrollLeft * 100 / wrap.clientWidth;
        },

        update() {
            let heightPercentage, widthPercentage;
            const wrap = this.wrap;
            if (!wrap) return;

            heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
            widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

            this.sizeHeight =
                heightPercentage < 100 ? heightPercentage + "%" : "";
            this.sizeWidth = widthPercentage < 100 ? widthPercentage + "%" : "";
        },
    },

    mounted() {
        if (this.native) return;
        this.$nextTick(this.update);
        !this.noresize && addResizeListener(this.$refs.resize, this.update);
    },

    beforeDestroy() {
        if (this.native) return;
        !this.noresize && removeResizeListener(this.$refs.resize, this.update);
    },
};
</script>
<style>
.el-scrollbar {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}
.el-scrollbar:active > .el-scrollbar__bar,
.el-scrollbar:focus > .el-scrollbar__bar,
.el-scrollbar:hover > .el-scrollbar__bar {
    opacity: 1;
    -webkit-transition: opacity 340ms ease-out;
    transition: opacity 340ms ease-out;
}
.el-scrollbar__wrap {
    overflow: scroll;
    width: 100%;
    height: 100%;
}
.el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
    width: 0;
    height: 0;
}
.el-scrollbar__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(144, 147, 153, 0.3);
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
}
.el-scrollbar__thumb:hover {
    background-color: rgba(144, 147, 153, 0.5);
}
.el-scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: opacity 120ms ease-out;
    transition: opacity 120ms ease-out;
}
.el-scrollbar__bar.is-vertical {
    width: 6px;
    top: 2px;
}
.el-scrollbar__bar.is-vertical > div {
    width: 100%;
}
.el-scrollbar__bar.is-horizontal {
    height: 6px;
    left: 2px;
}
.el-scrollbar__bar.is-horizontal > div {
    height: 100%;
}

</style>