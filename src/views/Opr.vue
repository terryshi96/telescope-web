<template>
    <div id="opr">
        <TopNav></TopNav>
        <SideBar></SideBar>
        <router-view/>
    </div>
</template>
<script>
import TopNav from '@/components/TopNav.vue'
import SideBar from '@/components/SideBar.vue'
export default {
    components: {
        TopNav,
        SideBar
    }
}
</script>
