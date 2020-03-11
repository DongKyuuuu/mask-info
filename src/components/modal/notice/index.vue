<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1>Notice</h1>
          </div>

          <div class="modal-body">
            <div class="noti1">
              <p> <b>공적 마스크 재고 알림 서비스</b> 입니다. </p>
            <p>베타테스트 서비스 기간 입니다.( ~2020-03-15)</p>
            <p>정식 서비스 오픈은 2020-03-11(수) 오전 8시 입니다.</p>
            <p>서비스 제공 시간은 08 ~ 23시 까지 입니다.</p>
            <p>
              제공 되는 정보는
              <b><u>실제 데이터보다 약 5분이상 지연된 정보</u></b> 입니다.
            </p>
            <p>
              코로나 사태로 현장에서 고생 하시는 많은 분들에 대해 감사한 마음을
              전합니다.
            </p>
            <p>
              <b><u>모바일은 최적화 진행중 입니다.</u></b>
            </p>
            </div>
          </div>

          <div class="modal-footer">
            <div class="footer-wrap">
              <div class="footer-text">
                지연된 정보임을 인지 하였고, 사용에 동의 하십니까?
              </div>
              <div class="footer-btn" @click="$emit('close')">
                <div>동의합니다</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./index.js" scoped></script>
<style src="./index.css" scoped></style>
