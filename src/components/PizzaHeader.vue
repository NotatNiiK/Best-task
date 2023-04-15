<template>
 <header class="header" :class="{'header-active': isHeaderActive}">
  <div class="header__container">
    <a href="" class="header__logo">PIZZA</a>
  </div>
 </header>
</template>

<script>
export default {
    data(){
        return {
            isHeaderActive: false,
        }
    },
    methods: {
        changeHeaderBg(){
            if(pageYOffset > 40){
                this.isHeaderActive = true;
            }
            else{
                this.isHeaderActive = false;
            }
        }
    },
    mounted(){
        window.addEventListener('scroll', this.changeHeaderBg)
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.changeHeaderBg)
    }
}
</script>

<style scoped lang="scss">
.header{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 18px 0;
  min-height: 60px;
  transition: all .3s ease 0s;
  &__logo{
    line-height: 120%;
    font-size: 2rem;
    font-weight: 700;
    font-style: italic;
    transition: all .4s ease 0s;
    &:hover{
      color: #b7b4b4;
    }
  }
}
.header-active{
  background: #000;
  border-bottom: 1px solid #fff;
}
</style>
