<template>
  <div class="search-wrap">
    <div class="search">
      <input
        type="text"
        placeholder="주소, 장소, 키워드"
        v-model="q"
        @keypress.enter="fetch()"
      />
      <i @click="fetch()" class="fas fa-search"></i>
    </div>
    <hr id="divLine" />
    <div class="addrResult">
      <div v-if="!lists">
        검색어를 입력해주세요
      </div>
      <div
        v-else
        class="list-item"
        v-for="list in showList"
        :key="list.id"
        @click="changeCenter(list.x, list.y)"
      >
        {{ list.place_name }}
      </div>
    </div>
    <hr id="divLine" />
    <div class="pageNation" v-if="page.total > 1">
      <div class="beforePage" @click="page.per -= 1">
        <
      </div>
      <div class="afterPage" @click="page.per += 1">
        >
      </div>
    </div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css"></style>
