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
              <p><b>공적 마스크 재고 알림 서비스</b> 입니다.</p>
              <p>시범운영 기간 입니다.( ~2020-03-15)</p>
              <p>
                제공 되는 정보는
                <b><u>실제 데이터보다 약 5분이상 지연된 정보</u></b> 입니다.
              </p>
              <p>
                코로나 사태로 현장에서 고생 하시는 많은 분들에 대해 감사한
                마음을 전합니다.
              </p>
              <p>
                <b
                  >버그나 기능추가 건의는 메일로 해주시면 바로
                  반영하겠습니다.</b
                >
              </p>
              <hr />
              <p>
                <b>추가 기능(2020-03-15)</b>
              </p>
              <p>1. 모아 보기 메뉴를 통해 간단하게 재고 확인</p>
              <p>(현재위치 기준)</p>
            </div>
          </div>

          <div class="modal-footer">
            <div class="footer-wrap">
              <div class="footer-text">
                지연된 정보임을 인지 하였고, 사용에 동의 하십니까?
              </div>
              <div class="footer-btn" @click="changeSet()">
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
