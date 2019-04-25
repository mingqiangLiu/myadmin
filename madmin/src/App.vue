<template>
<div id="app">
    <img src="./assets/logo.png" class="logo">
    <router-view></router-view>
	我就试试好使不
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 120px;
}

.logo {
    position: relative;
    width: 30%;
    margin-bottom: 40px;
}
</style>
