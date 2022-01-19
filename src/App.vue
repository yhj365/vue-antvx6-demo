<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.flex{
  display: flex;
}
.flex-direction{
  flex-direction: column;
}
.margin-bottom{
  margin-bottom: 20px;
}
</style>
