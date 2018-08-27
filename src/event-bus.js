import Vue from "vue";
import { Vector3 } from "three";

export default new Vue({
    data() {
        return {
            loading: true,
            control: "orbit",
            facedPlane: "",
            rateApparentHorizon: 0.0, // 视平线的比率（-100% ~ 100%）
            camera: {
                lookat: new Vector3(),
                pos: new Vector3(),
                up: new Vector3(0, 1, 0)
            },
            rme: null // renderer & material & effect
        };
    },
    created() {
        console.log(0, this.control);
        // 绑定监听
        this.$on("toggleLoading", status => {
            status = status === undefined ? !this.loading : status;
            this.loading = status;
        });
        this.$on("switchCtrl", c => {
            if (c === undefined) {
                c = this.control == "orbit" ? "trackball" : "orbit";
            } else {
                c = c !== "orbit" ? (c !== "trackball" ? "orbit" : c) : c;
            }
            this.control = c;
        });
        this.$on("setFacedPlane", (v = "") => {
            this.facedPlane = v;
        });
        this.$on("setRME", mtl => {
            this.rme = mtl;
        });
        this.$on("setViewPoint", camera => {
            this.camera = camera;
        });
        this.$on("setRateApparentHorizon", v => {
            this.rateApparentHorizon = parseFloat(v);
        });
    }
});