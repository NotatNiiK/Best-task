<template>
  <div class="wrapper">
    <pizza-header />
    <main class="main">
      <pizza-introduction />
      <pizza-order-form :pizza-menu="pizzaMenu"/>
    </main>
  </div>
</template>

<script>
import PizzaHeader from '@/components/PizzaHeader.vue';
import PizzaIntroduction from '@/components/PizzaIntroduction.vue';
import PizzaOrderForm from '@/components/PizzaOrderForm.vue'
import pizzaData from './modules/pizzaData';

export default {
    components: {
      PizzaHeader,
      PizzaIntroduction,
      PizzaOrderForm
    },
    data(){
      return {
        pizzaMenu: pizzaData,
      }
    },
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
