<template>
  <div class="preloader">
    <div class="dots-container">
      <div class="dot-1"></div>
      <div class="dot-2"></div>
      <div class="dot-3"></div>
    </div>
    <p>Loading...</p>
  </div>
</template>

<style lang="scss">
@keyframes loading {
  0% {
    background-color: #31196D;
    transform: scale(1);
  }
  50% {
    background-color: #ED5992;
    transform: scale(1);
  }
  100% {
    background-color: #733CE2;
    transform: scale(0.1);
  }
}

.preloader {
  width: 60px;
  height: 30px;

  .dots-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dot-1, .dot-2, .dot-3 {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      animation: loading 1.2s infinite;
    }

    .dot-1 { animation-delay: 0s }
    .dot-2 { animation-delay: 0.2s }
    .dot-3 { animation-delay: 0.4s }
  }

  p {
    margin: 0;
    margin-top: 5px;
    font-size: 14px;
    text-align: left;
  }
}
</style>
