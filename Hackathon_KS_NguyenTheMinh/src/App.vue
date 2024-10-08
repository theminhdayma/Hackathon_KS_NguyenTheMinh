<template>
  <div>
    <router-view v-slot="{Component}">
      <Suspense>
        <!-- Thành phần các component sử dụng cơ chế load  -->
        <template #default>
          <component :is="Component"></component>
        </template>
        <!-- Hiệu ứng loading trước khi tải trang  -->
        <template #falback>
          <div>loading...</div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style>

</style>