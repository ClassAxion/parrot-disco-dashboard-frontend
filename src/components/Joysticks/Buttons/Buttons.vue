<template>
    <div class="buttons">
        <Record />
        <TakePicture />
        <Centering />
        <CircleLeft />
        <CircleRight />
        <ReturnToHome />
        <Tests />
        <FlightPlan />
        <Throttle />
    </div>
</template>

<script>
import Record from './Record.vue';
import TakePicture from './TakePicture.vue';
import Centering from './Centering.vue';
import CircleLeft from './CircleLeft.vue';
import CircleRight from './CircleRight.vue';
import ReturnToHome from './ReturnToHome.vue';
import FlightPlan from './FlightPlan.vue';
import Tests from './Tests.vue';
import Throttle from './Throttle.vue';
export default {
    components: {
        CircleLeft,
        CircleRight,
        ReturnToHome,
        Centering,
        Tests,
        FlightPlan,
        Throttle,
        Record,
        TakePicture,
    },
};
</script>

<style lang="scss" scoped>
.buttons {
    grid-column: 1/5;
    height: 50px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-right: 13px;

    button {
        all: unset;
        background-color: #3d3d3d;
        position: relative;
        height: 30px;
        width: 30px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.2s all ease-in-out;
        opacity: 0.4;
        &:hover {
            opacity: 1;
        }
    }
}
</style>
