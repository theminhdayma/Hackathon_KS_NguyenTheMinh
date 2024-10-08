<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa người dùng</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Tên</label>
          <input
            ref="nameInput"
            v-model="formData.name"
            type="text"
            class="w-full p-2 border rounded-md"
          />
          <span v-if="formErrors.name" class="text-red-500 text-sm">{{ formErrors.name }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Giới tính</label>
          <div>
            <label><input v-model="formData.gender" type="radio" value="Male" /> Male</label>
            <label class="ml-4"><input v-model="formData.gender" type="radio" value="Female" /> Female</label>
            <label class="ml-4"><input v-model="formData.gender" type="radio" value="Other" /> Other</label>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Ngày sinh</label>
          <input v-model="formData.dateOfBirth" type="date" class="w-full p-2 border rounded-md" />
          <span v-if="formErrors.dateOfBirth" class="text-red-500 text-sm">{{ formErrors.dateOfBirth }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Email</label>
          <input v-model="formData.email" type="email" class="w-full p-2 border rounded-md" />
          <span v-if="formErrors.email" class="text-red-500 text-sm">{{ formErrors.email }}</span>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="bg-gray-300 py-2 px-4 rounded">Hủy</button>
          <button @click="updateUser" class="bg-blue-500 text-white py-2 px-4 rounded">Cập nhật</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onMounted } from "vue";
  import Swal from 'sweetalert2';
  
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits(['close', 'userUpdated']);
  
  const formData = ref({ ...props.user });
  const formErrors = ref({});
  const nameInput = ref(null);
  
  // Focus vào ô input đầu tiên
  onMounted(() => {
    if (nameInput.value) {
      nameInput.value.focus();
    }
  });
  
  // Hàm cập nhật người dùng
  const updateUser = () => {
    let valid = true;
    formErrors.value = {};
  
    if (!formData.value.name) {
      formErrors.value.name = "Tên là bắt buộc";
      valid = false;
    }
    if (!formData.value.email) {
      formErrors.value.email = "Email là bắt buộc";
      valid = false;
    }
  
    if (valid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const index = users.findIndex(user => user.id === props.user.id);
  
      const emailExists = users.some(user => user.email === formData.value.email && user.id !== props.user.id);
      if (emailExists) {
        formErrors.value.email = "Email đã được sử dụng bởi người dùng khác";
        valid = false;
      }
  
      if (valid && index !== -1) {
        users[index] = { ...formData.value };
        localStorage.setItem("users", JSON.stringify(users));
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Người dùng đã được cập nhật thành công!',
          confirmButtonText: 'OK'
        });
        emit('userUpdated');
        emit('close');
      }
    }
  };
  
  const closeModal = () => {
    emit('close');
  }
  </script>
  
  <style scoped>
  </style>
  