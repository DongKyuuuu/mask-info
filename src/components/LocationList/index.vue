<template>
  <div class="list-wrap">
    <div class="list">
      <div class="list-title">
        <span id="title">판매중:</span> {{ lists.length }}
        <span id="sub">(현재위치 기준 3km)</span>
      </div>
      <hr />
      <div class="outputList">
        <div class="items" v-for="list in lists" :key="list.code">
          <div
            :class="list.remain_stat"
            class="items-wrap"
            @click="clickAction(list.lat, list.lng)"
          >
            <div class="items-title">
              {{ list.name }} / <span id="count">{{ list.state_text }}</span>
            </div>

            <div class="items-addr">{{ list.addr }}</div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css" scoped></style>
