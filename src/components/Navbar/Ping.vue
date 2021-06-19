<template>
    <div class="ping">
        <span>12 ms</span>
    </div>
</template>

<style lang="scss" scoped>
.ping {
    display: flex;
    align-items: center;
    background-color: #e67e22; //orange
    // background-color: #27ae60; //green
    // background-color: #e74c3c; //red
    color: white;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 5px;
    span {
        font-size: 0.8rem;
    }
}
</style>
