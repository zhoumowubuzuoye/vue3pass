<!--
 * @Author: xiewenhao
 * @Date: 2023-02-15 14:21:01
 * @LastEditTime: 2023-02-17 15:31:37
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
  },
};
</script>
