<template>
</template>
<script setup>
onMounted(()=> {
    const emitter = useEmitter()
    emitter.emit('studio')
})

</script>
<style lang="">
    
</style>