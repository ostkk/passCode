<template>
  <div v-show="show == true">
    <div class="timeBox">
      <p v-html="formateTimeStamp(date)"></p>
      <div id="qrcode">
        <img src="./backImg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { applyCode } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "passCode",
  data() {
    return {
      date: new Date().getTime(),
      show: false,
      colorList: ["red", "orange", "brown", "green", "blue", "black", "purple"],
    };
  },
  methods: {
    qrcode() {
      var date = new Date(this.date);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
      let qrcode = new QRCode("qrcode", {
        width: 300,
        height: 300,
        text: `姓名：${this.name.name}，学号：${this.name.number}，领取时间：${year}年${month}月${day}日，星期${week}，${hour}:${minute}:${second}`,
        render: "canvas",
        background: "#f00",
        foreground: "#ff0",
        colorDark: `${this.colorList[new Date().getDay()]}`,
        colorLight: "#ffffff",
      });
    },
    loadTime() {
      var _this = this;
      setInterval(() => {
        _this.date += 1000;
      }, 1000);
      setInterval(() => {
        var div = document.querySelector("#qrcode");
        let s = "";
        for (let i = 0; i < div.innerHTML.length; i++) {
          s += div.innerHTML[i];
          if (div.innerHTML[i] == ">") {
            break;
          }
        }
        div.innerHTML = s;
        this.qrcode();
      }, 5000);
    },
    formateTimeStamp(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
      return (
        `<div style="font-size: 66px; color:${
          this.colorList[new Date().getDay()]
        };text-align:center">` +
        hour +
        ":" +
        minute +
        ":" +
        second +
        "</div><br/>" +
        `<div style="font-size: 66px; color:${
          this.colorList[new Date().getDay()]
        };text-align:center">` +
        year +
        "." +
        month +
        "." +
        day +
        "星期" +
        week +
        "</div>"
      );
    },
  },
  computed: {
    ...mapGetters(["name"]),
  },
  async mounted() {
    let res = await applyCode(this.name.number);
    if (res.code == 200) {
      this.show = true;
      this.qrcode();
      this.loadTime();
    }
  },
};
</script>

<style scoped lang="scss">
.timeBox {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  #qrcode {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    img {
      position: absolute;
      width: 30%;
      height: 30%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>