<template>
  <div class="wrap">
    <div class="sidebar">
      <div class="menu">
        <div class="close">뒤로</div>
        <div class="title">우리동네 마스크</div>
        <div class="inputForm">
          <search-form @list="val => changeGeo(val)" />
        </div>
        <div class="footer">
          <a href="mailto:desktop@kakao.com"> Mail </a>
        </div>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
