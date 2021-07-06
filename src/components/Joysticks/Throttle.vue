<template>
    <input type="range" class="slider" />
    <!-- <div class="throttle">
    </div> -->
</template>

<style lang="scss" scoped>
.slider {
    width: 128px;
    height: 10px;
    margin: 0;
    transform-origin: 64px 64px;
    transform: rotate(-90deg);
    -webkit-appearance: none;
    border-radius: 3px;
    margin-left: 7px;
    opacity: 0.2;
    transition: 0.2s all ease-in-out;
    position: relative;
    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #3d3d3d;
        border: 3px solid rgba(#3d3d3d, 0.4);
        cursor: pointer;
        border-radius: 50%;
    }
    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: #3d3d3d;
        border: 3px solid rgba(#3d3d3d, 0.4);
        cursor: pointer;
        border-radius: 50%;
        position: relative;
    }

    &:before:-moz-range-thumb {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100px;
        width: 100px;
        background: red;
    }
}
</style>
