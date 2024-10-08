<template>
    <div>
      <div className="flex min-h-screen">
          <div className="w-1/5 bg-black text-white p-5">
              <div class="flex flex-col gap-4">
                <router-link active-class="active" to="/admin/dashboard"
                >
                    <p className=" block py-2 px-4 hover:bg-gray-700">Dashboard</p>
                </router-link>
                <router-link active-class="active" to="/admin/manager-user"
                >
                    <p className=" block py-2 px-4 hover:bg-gray-700">Manager User</p>
                </router-link>
                <router-link active-class="active" to="/admin/manager-product"
                >
                    <p className=" block py-2 px-4 hover:bg-gray-700">Manager Product</p>
                </router-link>
              </div>
          </div>
          <router-view></router-view>
        </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
    .active {
        background-color: gray;
    }
  </style>