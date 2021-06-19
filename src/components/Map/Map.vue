<template>
    <div class="map">
        <p class="coordinate">Lat: 53.34912 Lng: 17.64003</p>
        <l-map
            style=""
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[53.34912, 17.64003]"
        >
            <l-tile-layer
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                :subdomains="['mt0', 'mt1', 'mt2', 'mt3']"
                :maxZoom="20"
            ></l-tile-layer>

            <l-marker :lat-lng="[53.34912, 17.64003]" ref="test">
                <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
            </l-marker>
        </l-map>
    </div>
</template>
<script>
import { LMap, LTileLayer, LIcon, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import Marker from '@/assets/img/parrot.png';
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
            rotate: 45,
        };
    },
    computed: {
        cssVars() {
            return {
                '--rotate': this.rotate,
            };
        },
        iconUrl() {
            return Marker;
        },
        iconSize() {
            return [50, 50];
        },
    },
    methods: {},
    mounted() {
        setTimeout(() => {
            document.querySelector(
                '.leaflet-marker-icon',
            ).style.transform += ` rotate(${45}deg)`;
        }, 100);
    },
};
</script>

<style lang="scss">
.map {
    grid-column: 1/3;
    background-color: white;
    aspect-ratio: 1;
    margin-top: auto;
    opacity: 0.4;
    transition: 0.2s all ease-in-out;
    z-index: 1;
    border-radius: 0 8px 0 0;
    overflow: hidden;
    &:hover {
        opacity: 1;
    }
}

.coordinate {
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: 600;
}
</style>
