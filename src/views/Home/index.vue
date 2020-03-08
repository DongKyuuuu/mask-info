<template>
  <div class="wrap">
    <div class="main-title">
      우리동네 마스크
    </div>
    <div class="inputForm">
      <search-form @list="val => saveMaskList(val)" />
    </div>
    <div class="outputForm">
      <output-form :list="maskList" />
    </div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
