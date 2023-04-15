<template>
    <div class="main__order-form order-form">
        <div class="order-form__container">
          <div class="order-form__body">
            <h2 class="order-form__title">Menu</h2>
            <div class="order-form__swiper swiper">
              <swiper
                :slides-per-view="1"
                :space-between="50"
              >
                <swiper-slide v-for="pizza in pizzaMenu" :key="pizza.id">
                  <div class="swiper__slide">
                    <div class="swiper__image">
                      <img :src="pizza.img" alt="Pizza image">
                    </div>
                    <div class="swiper__desc">
                      <div class="swiper__name">{{ pizza.name }}</div>
                      <ul class="swiper__ingredients">
                        <li v-for="(ingredient, idx) in pizza.ingredients" :key="idx">{{ ingredient }}</li>
                      </ul>
                      <div class="swiper__price">{{calcPizzaPrice(pizza.price)}}</div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <form action="#" @submit.prevent class="order-form__form form">
              <div class="form__pizza-select pizza-select">
                <div class="pizza-select__inputs">
                  <div class="pizza-select__input-block">
                    <input 
                        type="text" 
                        class="pizza-select__input" 
                        placeholder="choose your pizza..." 
                        v-model="pizzaName" 
                        @focus="showTips"
                        @blur="hideTips"
                    >
                    <div class="form__validation" v-if="isPizzaNameNotCorrect">Pizza not found</div>
                    <ul class="pizza-select__tips" v-if="isTipsVisible && filteredPizzaMenu.length > 0" :class="{tipsVisible: isTipsVisible}">
                        <li v-for="(tip, idx) in filteredPizzaMenu" :key="idx" class="pizza-select__tip">
                            <button class="pizza-select__button" @click="choosePizzaFromTips(tip.name)" >{{ tip.name }}</button>
                        </li>
                    </ul>
                  </div>
                  <div class="pizza-select__numbers">
                    <button class="pizza-select__numbers-button" @click="increasePizzaNumber" :disabled="numberOfPizza === 10">+</button>
                    <input type="number" class="pizza-select__numbers-input" max="10" min='1' v-model="numberOfPizza">
                    <button class="pizza-select__numbers-button" @click="decreasePizzaNumber" :disabled="numberOfPizza === 1">-</button>
                  </div>
                </div>
                <button class="form__add-btn" @click="addPizza">Add</button>
                <div class="pizza-select__size">
                    <button 
                      class="pizza-select__size-btn" 
                      @click="choosePizzaSize(30)"
                      :class="{'pizza-select__size-btn_active': pizzaSize === 30}"
                    >30cm</button>
                    <button 
                      class="pizza-select__size-btn" 
                      @click="choosePizzaSize(50)"
                      :class="{'pizza-select__size-btn_active': pizzaSize === 50}"
                    >50cm</button>
                    <button 
                      class="pizza-select__size-btn" 
                      @click="choosePizzaSize(70)"
                      :class="{'pizza-select__size-btn_active': pizzaSize === 70}"
                    >70cm</button>
                </div>
                <div class="pizza-select__toppings">
                  <div 
                    class="pizza-select__topping topping" 
                    v-for="topping in toppings" 
                    :key="topping.id"
                  >
                    <div class="topping__img">
                      <img :src="topping.img" :alt="topping.name">
                    </div>
                    <div class="topping__body">
                      <div class="topping__name">{{ topping.name }}</div>
                      <div class="topping__price">
                        {{topping.weight}} - {{ topping.price }}
                      </div>
                      <div class="topping__numbers">x{{ topping.numbers }}</div>
                      <div class="topping__buttons">
                        <button class="topping__button" @click="addTopping(topping)" :disabled="topping.numbers > 5">+</button>
                        <button class="topping__button" @click="removeTopping(topping)" :disabled="topping.numbers === 0">-</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form__user-info-block">
                <pizza-input 
                  class="form__user-info" 
                  placeholder="enter your name..." 
                  v-model="name"
                  @focus="isNameNotCorrect = false"
                />
                <div class="form__validation" v-if="isNameNotCorrect">Enter correct data!</div>
              </div>
              <div class="form__user-info-block">
                <pizza-input 
                  class="form__user-info" 
                  type="tel" 
                  placeholder="enter your telephone..." 
                  v-model="tel"
                  @focus="isTelNotCorrect = false"
                />
                <div class="form__validation" v-if="isTelNotCorrect">Enter correct data!</div>
              </div>
              <div class="form__user-info-block">
                <pizza-input 
                  class="form__user-info" 
                  placeholder="enter your email..." 
                  v-model="email" 
                  @focus="isEmailNotCorrect = false"
                />
                <div class="form__validation" v-if="isEmailNotCorrect">Enter correct data!</div>
              </div>
              <button class="form__order-btn" @click="orderPizza">Order</button>
            </form>
        </div>
        <div class="order-form__message-block" v-if="addedPizza.length > 0">
          <div class="order-form__message-body">
            <div class="order-form__message-menu"></div>
              <div class="order-form__message-button">
                <img src="@/assets/img/message.png" alt="Message">
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        pizzaMenu:{
            type: Array,
            required: true,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            currentPizza: null,
            pizzaName: '',
            numberOfPizza: 1,
            isTipsVisible: false,
            pizzaSize: 30,
            toppings: [
              {id: 0, name: 'Corn', price: '2$', numbers: 0, weight: '100g', img: 'img/topping/1.png'},
              {id: 1, name: 'Sausage', price: '3$', numbers: 0, weight: '100g', img: 'img/topping/2.png'},
              {id: 2, name: 'Mushrooms', price: '1$', numbers: 0, weight: '100g', img: 'img/topping/3.png'},
              {id: 3, name: 'Pineapple', price: '4$', numbers: 0, weight: '100g', img: 'img/topping/4.png'},
            ],
            name: '',
            tel: '',
            email: '',
            isPizzaNameNotCorrect: false,
            isNameNotCorrect: false,
            isTelNotCorrect: false,
            isEmailNotCorrect: false,
            addedToppings: {
              corn: 0,
              sausage: 0,
              mushrooms: 0,
              pineapple: 0
            },
            addedPizza: [],
            finalOrder: {}
        }
    },
    watch:{
      numberOfPizza(newValue){
        if(newValue > 10){
          this.numberOfPizza = 10;
        }
        if(newValue < 1){
          this.numberOfPizza = 1;
        }
      }
    },
    methods: {
        choosePizzaFromTips(value){
            this.pizzaName = value;
            this.isTipsVisible = false;
        },
        hideTips(){
          setTimeout(() => {
            this.isTipsVisible = false;
          }, 100)
        },
        showTips(){
          this.isPizzaNameNotCorrect = false;
          this.isTipsVisible = true;
        },
        increasePizzaNumber(){
            this.numberOfPizza++;
        },
        decreasePizzaNumber(){
            this.numberOfPizza--;
        },
        choosePizzaSize(value){
          this.pizzaSize = value;
        },
        calcPizzaPrice(price){
          if(this.pizzaSize === 30){
            return price
          }
          if(this.pizzaSize === 50){
            return parseFloat(price) + 5 + '$';
          }
          if(this.pizzaSize === 70){
            return parseFloat(price) + 15 + '$';
          }
        },
        addPizza(){
          const pizza = this.pizzaMenu.find(item => item.name == this.pizzaName);
          if(!pizza){
            this.isPizzaNameNotCorrect = true;
            return
          }
          const addedPizzaInfo = {
            name: pizza.name,
            numbers: this.numberOfPizza,
            size: this.pizzaSize
          }
          this.addedPizza.unshift(addedPizzaInfo);
          this.pizzaName = '';
          this.numberOfPizza = '';
        },
        addTopping(topping){
          if(topping.name === 'Corn'){
            topping.numbers++;
            this.addedToppings.corn++;
          }
          if(topping.name === 'Sausage'){
            topping.numbers++;
            this.addedToppings.sausage++;
          }
          if(topping.name === 'Mushrooms'){
            topping.numbers++;
            this.addedToppings.mushrooms++;
          }
          if(topping.name === 'Pineapple'){
            topping.numbers++;
            this.addedToppings.pineapple++;
          }
        },
        removeTopping(topping){
          if(topping.numbers > 0){
            topping.numbers--
          }
        },
        orderPizza(){
          const correctName = this.name.length > 0;
          const telRegex = /^(\+38)?\d{10}$/; 
          const correctTel = telRegex.test(this.tel);
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          const correctEmail = emailRegex.test(this.email);
          if(correctName && correctTel && correctEmail && this.addedPizza.length > 0){
            const order = {
              name: this.name,
              tel: this.tel,
              email: this.email,
              pizzaSize: this.pizzaSize,
            }
            this.finalOrder = order;
          }
          if(!correctName){
            this.isNameNotCorrect = true;
          }
          if(!correctTel){
            this.isTelNotCorrect = true;
          }
          if(!correctEmail){
            this.isEmailNotCorrect = true;
          }
          /* if(!this.addedPizza.length === 0){
            this.isPizzaNameNotCorrect = true;
          } */
        }
    },
    computed:{
        filteredPizzaMenu(){
            return this.pizzaMenu.filter(pizza => pizza.name.toLowerCase().includes(this.pizzaName.toLowerCase()));
        }
    }
}
</script>

<style scoped lang="scss">
.order-form{
  border-top: 1px solid #fff;
  padding: 80px 0;
  background: #000;
  &__title{
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: rgb(255, 128, 0);
    text-transform: uppercase;
    margin-bottom: 50px;
  }
  &__body{
    max-width: 760px;
    margin: 0 auto;
  }
  &__message-body{
    position: relative;
  }
  &__message-menu{
    position: absolute;
    right: 60px;
    bottom: 60px;
    height: 400px;
    width: 300px;
    background: #fff;
    padding: 10px;
    border-radius: 10px;
  }
  &__message-block{
    position: fixed;
    right: 10%;
    bottom: 10%;
  }
  &__message-button{
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 50px;
      height: 50px;
    }
  }
}

.swiper{
  &__slide{
    display: flex;
    margin-bottom: 30px;
  }
  &__desc{
    padding-left: 40px;
  }
  &__name{
    font-size: 3.5rem;
    font-weight: 700;
  }
  &__image{
    width: 300px;
    height: 300px;
    img{
      max-width: 100%;
    }
  }
  &__ingredients{
    padding: 10px 0;
    font-size: 1rem;
    li{
      position: relative;
      padding-left: 15px;
      margin-bottom: 10px;
      &::before{
        content: '';
        position: absolute;
        left: 2px;
        top: 6px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #fff;
      }
    }
  }
  &__price{
    color: rgb(255, 128, 0);
    font-weight: 700;
    font-size: 1.5rem;
  }
}

.form{
    &__user-info{
        width: 100%;
    }
    &__add-btn{
        margin-top: 10px;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 15px 30px;
        transition: all .4s ease 0s;
        font-size: 1rem;
        font-weight: 700;
        &:hover{
          background: #fff;
          color: #000;
        }
    }
    &__user-info-block{
      margin-bottom: 70px;
    }
    &__validation{
      padding: 10px 0;
      color: red;
    }
    &__order-btn{
      width: 100%;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #fff;
      text-align: center;
      font-weight: 700;
      font-size: 1.5rem;
      text-transform: uppercase;
      transition: all .3s ease 0s;
      &:hover{
        background: #fff;
        color: #000;
      }
    }
}

.pizza-select{
  margin-bottom: 70px;
  &__inputs{
    display: flex;
    align-items: flex-end;
  }
  &__input-block{
    position: relative;
    flex: 1 1 auto;
  }
  &__input{
    width: 100%;
    font-size: 1.2rem;
    padding: 15px;
    border-bottom: 1px solid #fff;
  }
  &__numbers{
    display: flex;
    margin-left: 5px;
  }
  &__numbers-input{
    width: 40px;
    text-align: center;
  }
  &__numbers-button{
    width: 30px;
    height: 30px;
    padding: 8px;
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    background: rgb(255, 128, 0);
    &:disabled{
      background: rgb(148, 83, 18);
    }
  }
  &__tips{
    position: absolute;
    left: 0;
    bottom: -105%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    background: #fff;
    color: #000;
  }
  &__tip{
    margin-right: 15px;
    &:last-child{
      margin-right: 0;
    }
  }
  &__button{
    padding: 8px;
    border: 1px solid #000;
    border-radius: 5px;
    transition: all ease .4s 0s;
    &:hover{
        background: #000;
        color: #fff;
    }
  }
  &__size{
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__size-btn{
    flex: 0 0 30%;
    padding: 15px;
    border: 1px solid #fff;
    border-radius: 5px;
    transition: all .4s ease 0s;
    &_active{
      background: #fff;
      color: #000;
      &:hover{
        background: #fff !important;
      }
    }
    &:hover{
        background: #f9f8f84b;
    }
  }
  &__toppings{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.topping{
  cursor: pointer;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  &__img{
    width: 150px;
    height: 150px;
    img{
      max-width: 100%;
    }
  }
  &__body{
    text-align: center;    
  }
  &__name{
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  &__price{
    margin-bottom: 10px;
  }
  &__buttons{
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  &__button{
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    padding: 10px;
    font-size: 1rem;
    background: rgb(255, 128, 0);
    &:disabled{
      background: rgb(176, 95, 13);
    }
  }
}

</style>