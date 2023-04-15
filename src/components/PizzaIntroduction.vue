<template>
    <div class="main__introduction introduction">
        <div class="introduction__container">
          <div class="introduction__body">
            <h2 class="introduction__title">Make your order</h2>
            <div class="introduction__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quis, voluptate, 
              tempore aliquid reiciendis commodi quas, illum excepturi obcaecati 
              animi voluptatibus nesciunt! Reiciendis perferendis ipsam saepe, ad laboriosam ratione perspiciatis.
            </div>
          </div>
        </div>
        <div class="introduction__arrow">
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.introduction{
  padding: 250px 0 50px ;
  position: relative;
  min-height: 100vh;
  background: url('@/assets/img/MainBg.jpg') center / cover fixed no-repeat;
  @media all and (max-width: 768px) {
    padding-top: 180px;
  }
  &::before{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: #00000095;
  }
  &__container{
    position: relative;
    z-index: 2;
  }
  &__body{
    max-width: 650px;
  }
  &__title{
    font-size: 3rem;
    line-height: 120%;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
    @media all and (max-width: 768px) {
      font-size: 2rem;
    }
  }
  &__text{
    font-size: 1.2rem;
    line-height: 140%;
    @media all and (max-width: 768px) {
      font-size: 1rem;
    }
  }
  &__arrow{
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    width: 45px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      animation: arrow-anim 1.5s ease 0s infinite alternate;
      background: none;
      border-bottom: 3px solid #fff;
      border-left: 3px solid #fff;
      margin-bottom: 5px;
      &:nth-child(1){
        animation-delay: 0.3s;
        width: 21px;
        height: 21px;
      }
      &:nth-child(2){
        animation-delay: 0.2s;
        width: 19px;
        height: 19px;
      }
      &:nth-child(3){
        animation-delay: 0.1s;
        width: 17px;
        height: 17px;
      }
    }
  }
}

@keyframes arrow-anim {
  0%{
    transform: translateY(0px)  rotate(-45deg);
  }
  100%{
    transform: translateY(20px) rotate(-45deg);
  }
}
</style>