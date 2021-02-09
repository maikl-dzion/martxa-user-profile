<template>
<header class="header-area">

   <HeaderTop/>
   <HeaderMiddle/>
   <HeaderMenu/>

</header>
</template>

<script>

import HeaderTop from '../../components/app/HeaderTop'
import HeaderMiddle from '../../components/app/HeaderMiddle'
import HeaderMenu from '../../components/app/HeaderMenu'

export default {
  name: "HeaderPanel",
  components: {
    HeaderTop, HeaderMiddle, HeaderMenu
  }
}
</script>

<style scoped>

</style>
