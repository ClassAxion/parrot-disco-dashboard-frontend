<template>
    <div class="buttons">
        <button class="disabled">Take off</button>
        <button>Connect</button>
        <button>Emergency</button>
    </div>
</template>

<style lang="scss" scoped>
.buttons {
    grid-column: 5/8;
    z-index: 10;
    position: relative;
    margin-top: auto;

    button {
        all: unset;
        background-color: #3d3d3d;
        color: white;
        font-weight: 600;
        padding: 12px 16px;
        border-radius: 5px;
        margin: 0 0.5rem;
        margin-bottom: 1rem;
        cursor: pointer;
        opacity: 0.4;
        transition: all 0.2s ease-in-out;
        &:hover {
            opacity: 1;
        }
    }

    .disabled {
        opacity: 0.4 !important;
        cursor: default;
    }
}
</style>
