<template>
    <div class="mapWrapper">
        <p class="coordinate">Lat: 53.34912 Lng: 17.64003</p>
        <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[53.34912, 17.64003]"
            class="map"
        >
            <l-tile-layer
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                :subdomains="['mt0', 'mt1', 'mt2', 'mt3']"
                :maxZoom="20"
            ></l-tile-layer>

            <l-marker :lat-lng="[53.34912, 17.64003]">
                <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
            </l-marker>
        </l-map>
        <div class="locateHome">
            <img
                :src="arrowIcon"
                style="transform: rotate(100deg)"
                alt="arrow"
            />
        </div>
        <div
            class="centerCam"
            :style="{ background: setCenterCamColor }"
            @click="centerCam = !centerCam"
        >
            <img :src="centerIcon" alt="center" />
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LIcon, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import Marker from '@/assets/img/parrot.png';
import Arrow from '@/assets/img/arrow-bottom.svg';
import Center from '@/assets/img/center.svg';

export default {
    components: {
        LMap,
        LTileLayer,
        LIcon,
        LMarker,
    },
    data() {
        return {
            zoom: 15,
            centerCam: false,
        };
    },
    computed: {
        iconUrl() {
            return Marker;
        },
        iconSize() {
            return [50, 50];
        },
        arrowIcon() {
            return Arrow;
        },
        centerIcon() {
            return Center;
        },
        setCenterCamColor() {
            if (this.centerCam) return '#27ae60';
        },
    },
    methods: {},
    mounted() {
        setTimeout(() => {
            document.querySelector(
                '.leaflet-marker-icon',
            ).style.transform += ` rotate(${45}deg)`;
        }, 1000);
    },
};
</script>

<style lang="scss">
.mapWrapper {
    grid-column: 1/2;
    background-color: white;
    aspect-ratio: 1;
    margin-top: auto;
    opacity: 0.4;
    transition: 0.2s all ease-in-out;
    // z-index: 1;
    border-radius: 0 8px 0 0;
    // overflow: hidden;
    position: relative;
    &:hover {
        opacity: 1;
    }
}

.map {
    z-index: 0;
}

.coordinate {
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: 600;
}

.locateHome,
.centerCam {
    position: absolute;
    bottom: 10px;
    z-index: 5;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.locateHome {
    left: 10px;
    background: #3498db;
}

.centerCam {
    right: 10px;
    background: #3d3d3d;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    &::before {
        content: 'Follow disco position';
        color: #fff;
        position: absolute;
        top: -90%;
        background: #3d3d3d;
        padding: 4px 8px;
        width: auto;
        font-size: 0.8rem;
        font-weight: 600;
        border-radius: 5px;
        width: 150px;
        opacity: 0;
        transition: 0.2s all ease-in-out;
    }
    &:hover:before {
        opacity: 1;
    }
}
</style>
