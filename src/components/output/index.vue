<template>
  <div class="output">
    <div class="output-item" v-for="val in listData" :key="val.address_name">
      {{ val.address_name }}
    </div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
