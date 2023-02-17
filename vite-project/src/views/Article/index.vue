<!--
 * @Author: xiewenhao
 * @Date: 2023-02-15 14:21:01
 * @LastEditTime: 2023-02-17 15:37:58
 * @Description: 
-->
<template>
  1
  <label class="text-reader">
    <input type="file" @change="loadTextFile" />
  </label>
  <pre>{{ fileContent }}</pre>
</template>

<script lang="ts">
export default {
  name: "upload",
  data() {
    return {
      fileContent: "文件内容",
    };
  },
  mounted(){
    this.downImg()
  },
  methods: {
    loadTextFile(e: any) {
      let self = this;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        self.fileContent = ev.target.result;
        console.log(self.fileContent);
      };
      reader.readAsText(file);
    },
    async downImg() {
      let url = "http://172.16.1.195:8080/autoinvest/tasks/335/xiaping/shenchabaogao.docx";
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          const aLink = document.createElement("a");
          aLink.href = URL.createObjectURL(blob);
          // 文件名字
          aLink.download = Date.now() + ".doc";
          document.body.appendChild(aLink);
          aLink.click();
          aLink.remove();
        });
    },
  },
};
</script>
