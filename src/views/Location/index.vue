<template>
  <div class="wrap">
    <div class="loading" v-if="load">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <noti-modal @close="modal.show = false" v-if="modal.show" />
    <div class="sidebarHide" @click="showSidebar = true" v-if="!showSidebar">
      <i class="fas fa-bars"></i>
    </div>
    <transition name="sidefade">
      <div class="sidebar" v-if="showSidebar">
        <div class="menu">
          <div class="close" @click="showSidebar = false">
            <i class="fas fa-bars"></i>
          </div>
          <div class="title">우리동네 마스크</div>
          <div class="inputForm">
            <search-form @list="val => changeGeo(val)" />
          </div>
          <div class="footer"></div>
        </div>
      </div>
    </transition>
    <div id="map"></div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
