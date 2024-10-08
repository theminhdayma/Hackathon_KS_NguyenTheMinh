<template>
    <div class="w-4/5 bg-gray-100 p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Manager User</h1>
        <button @click="handleShowFromAdd" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Add New User
        </button>
      </div>
      <div class="mb-6 flex justify-end">
        <input
          v-model="searchQuery"
          class="w-1/3 p-2 border rounded-md"
          placeholder="Tìm kiếm theo tên hoặc email"
          type="text"
        />
      </div>
      <table class="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr class="text-left border-b">
            <th class="py-3 px-4 font-medium">STT</th>
            <th class="py-3 px-4 font-medium">Name</th>
            <th class="py-3 px-4 font-medium">Gender</th>
            <th class="py-3 px-4 font-medium">Date Of Birth</th>
            <th class="py-3 px-4 font-medium">Email</th>
            <th class="py-3 px-4 font-medium">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in searchUser" :key="user.email" class="border-b">
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4">{{ user.name }}</td>
            <td class="py-3 px-4">{{ user.gender }}</td>
            <td class="py-3 px-4">{{ user.dateOfBirth }}</td>
            <td class="py-3 px-4">{{ user.email }}</td>
            <td class="py-3 px-4">
              <button @click="() => handleEdit(user)" class="bg-orange-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button @click="() => deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <FromAddUser v-if="showFromAdd" @close="closeFromAddUser" @userAdded="loadUsers" />
      <FromEditUser
        v-if="showFromEdit"
        @close="closeFromEditUser"
        :user="selectedUser"
        @userUpdated="loadUsers"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import FromAddUser from "../components/FromAddUser.vue";
  import FromEditUser from "@/components/FromEditUser.vue";
  import Swal from 'sweetalert2';
  
  const showFromAdd = ref(false);
  const showFromEdit = ref(false);
  const selectedUser = ref(null);
  const users = ref([]);
  const searchQuery = ref("");
  
  // Hiển thị form thêm người dùng
  const handleShowFromAdd = () => {
    showFromAdd.value = true;
  };
  
  // Đóng form thêm người dùng
  const closeFromAddUser = () => {
    showFromAdd.value = false;
  };
  
  // Hiển thị form chỉnh sửa
  const handleEdit = (user) => {
    selectedUser.value = user;
    showFromEdit.value = true;
  };
  
  // Đóng form chỉnh sửa
  const closeFromEditUser = () => {
    showFromEdit.value = false;
  };
  
  // Lấy mảng người dùng từ local
  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    users.value = storedUsers;
  };
  
  // tìm kiếm người dùng
  const searchUser = computed(() => {
    return users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Xóa người dùng
  const deleteUser = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Không, quay lại!',
      confirmButtonText: 'Có, xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        users.value = users.value.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users.value));
        Swal.fire(
          'Đã xóa!',
          'Người dùng đã được xóa.',
          'success'
        );
      }
    });
  };
  
  // Load giao diện
  onMounted(() => {
    loadUsers();
  });
  </script>
  
  <style scoped>
  </style>
  