<template>
  <div class="wrap">
    <div class="loading" v-if="load">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <noti-modal v-if="$store.state.check.show" />
    <div class="map-top">
      <div class="map-top-left">
        <div
          class="sidebarHide"
          @click="showSidebar = true"
          v-if="!showSidebar"
        >
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="map-top-right">
        <div class="refreshIcon" @click="changeGeo(nowCenter)">
          <i class="fas fa-sync-alt"></i>
        </div>
        <div
          class="showIcon"
          :class="{ activeShowIcon: noShow }"
          @click="showControl"
        >
          <i class="fas fa-eye-slash"> </i>
        </div>
        <div class="locateNow" @click="geoInfo()">
          <i class="fas fa-map-marker-alt"></i>
        </div>
      </div>
    </div>
    <transition name="sidefade">
      <div class="sidebar" v-if="showSidebar">
        <div class="menu">
          <div class="close" @click="showSidebar = false">
            <i class="fas fa-bars"></i>
          </div>
          <div class="title">우리동네 마스크</div>
          <div class="menuList">
            <div class="listItem" @click="changeMenu('showGeo')">
              <span> 지도 검색 </span>
            </div>
            <div class="listItem" @click="changeMenu('showList')">
              <span> 모아 보기 </span>
            </div>
            <!-- <div class="listItem" @click="changeMenu('showNews')">
              <span> 관련 소식 </span>
            </div> -->
          </div>
          <div class="inputForm" v-if="showGeo">
            <search-form @list="val => changeGeo(val)" />
          </div>
          <div class="inputForm" v-if="showList">
            <location-list
              :location="nowCenter"
              :refreshList="refreshList"
              :info="deniedLocation"
              @geo="val => changeGeo(val)"
            />
          </div>
          <div class="inputForm" v-if="showNews">
            뉴스 확인
          </div>
          <div class="footer">
            <div class="introduce">
              <p>Developer : DongKyu</p>
              <p>
                Contact :
                <a href="mailTo:rnfh1223@gmail.com"> rnfh1223@gmail.com </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div id="map"></div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
