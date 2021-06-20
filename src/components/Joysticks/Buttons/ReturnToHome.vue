<template>
    <button>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                class="start"
                fill="#ffffff"
                d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
            />
        </svg>
    </button>
    <button>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                class="stop"
                fill="#ffffff"
                d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
            />
        </svg>
    </button>
</template>

<style lang="scss" scoped>
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

.start {
    fill: #27ae60;
}
.stop {
    fill: #e74c3c;
}
</style>
