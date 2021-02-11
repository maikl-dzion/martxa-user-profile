<template>
  <PageTemplate>
       Главная
  </PageTemplate>
</template>
<script>
import UserProfile from "@/pages/UserProfile"
import PageTemplate from "@/components/app/PageTemplate";
export default {
  name: 'Home',
  components : {
    PageTemplate, UserProfile
  }
}
</script>
