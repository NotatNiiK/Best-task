<template>
    <input type="text" class="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
    name: 'PizzaInput',
    props: {
        modelValue:{
            type: String,
            required: true,
            default: ''
        },
        emits: {
            'update:modelValue': null
        }
    }
}
</script>

<style scoped lang="scss">
.input{
    padding: 15px;
    background: none;
    border-bottom: 1px solid #fff;
    font-size: 1.2rem;
}
</style>