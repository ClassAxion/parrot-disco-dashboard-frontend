<template>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    overflow: hidden;
    box-sizing: border-box;
}

.Vue-Toastification__toast--error.myToast {
    background-color: #e74c3c;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: white;
    box-sizing: border-box;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Vue-Toastification__toast--success.myToast {
    background-color: #27ae60;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: white;
    box-sizing: border-box;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.disabled {
    opacity: 0.4 !important;
    cursor: default !important;
}
</style>
