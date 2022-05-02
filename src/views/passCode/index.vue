<template>
  <div id="qrcode"></div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "passCode",
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 500,
        height: 500, // 高度
        text: "http://www.baidu.com", // 二维码内容
        image: "",
        render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: "#f00",
        foreground: "#ff0",
        colorDark: "#0000ff",
        colorLight: "#ffffff",
      });
    },
  },
  mounted() {
    this.qrcode();
  },
};
</script>

<style>
</style>