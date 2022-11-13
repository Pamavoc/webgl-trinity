<template>
</template>
<script setup>

onMounted(()=> {
    const emitter = useEmitter()
    emitter.emit('home')
})


</script>
<style lang="">
    
</style>