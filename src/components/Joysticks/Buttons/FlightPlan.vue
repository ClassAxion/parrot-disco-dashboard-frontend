<template>
    <div class="select" @click="show = !show">
        <span>{{ option ? option : 'Flight Plan' }}</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
        >
            <path
                fill="#FFFFFF"
                d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M17,14L12,9L7,14H17Z"
            />
        </svg>
        <ul class="options" v-if="show">
            <li
                v-for="option in options"
                :key="option"
                @click="setOption(option)"
            >
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            option: '',
            options: ['Test', 'Land'],
        };
    },
    methods: {
        setOption(option) {
            this.option = option;
        },
    },
};
</script>

<style lang="scss" scoped>
.select {
    background: #3d3d3d;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: 600;
    width: 130px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    border-radius: 5px;
    position: relative;
    font-size: 0.8rem;
    cursor: pointer;
    user-select: none;
    transition: 0.2s all ease-in-out;
    opacity: 0.4;
    span {
        width: calc(100% - 16px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
    .options {
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        list-style: none;
        li {
            background: rgba(#3d3d3d, 0.8);
            font-size: 0.8rem;
            line-height: 1.5rem;
            padding: 0 8px;
            transition: all 0.2s ease-in-out;
            text-align: left;
            cursor: pointer;
            &:hover {
                background: white;
                color: #3d3d3d;
            }
        }
    }
    &:hover {
        opacity: 1;
    }
}
</style>
