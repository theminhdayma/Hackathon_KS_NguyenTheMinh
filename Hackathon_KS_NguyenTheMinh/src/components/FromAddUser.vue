<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-semibold mb-6">Thêm Người Dùng</h2>
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
          <label class="block text-gray-700 font-medium">Giới Tính</label>
          <div>
            <label><input v-model="formData.gender" type="radio" value="Male" /> Male</label>
            <label class="ml-4"><input v-model="formData.gender" type="radio" value="Female" /> Female</label>
            <label class="ml-4"><input v-model="formData.gender" type="radio" value="Other" /> Other</label>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Ngày Sinh</label>
          <input v-model="formData.dateOfBirth" type="date" class="w-full p-2 border rounded-md" />
          <span v-if="formErrors.dateOfBirth" class="text-red-500 text-sm">{{ formErrors.dateOfBirth }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium">Email</label>
          <input v-model="formData.email" type="email" class="w-full p-2 border rounded-md" />
          <span v-if="formErrors.email" class="text-red-500 text-sm">{{ formErrors.email }}</span>
        </div>
        <div class="flex justify-end">
          <button 
            @click="closeModal" 
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded mr-2">
            Đóng
          </button>
          <button 
            @click="addUser"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  
  const emit = defineEmits(['close', 'userAdded']);
  
  const formData = ref({
    id: Math.floor(Math.random() * 1000000) + Date.now(),
    name: '',
    email: '',
    gender: 'Male',
    dateOfBirth: ''
  });
  
  const formErrors = ref({
    name: '',
    email: '',
    dateOfBirth: ''
  });

  const nameInput = ref(null);
  
  // Focus vào ô input đầu tiên
  onMounted(() => {
    nameInput.value.focus();
  });
  
  // Đóng modal và reset form
  const closeModal = () => {
    formData.value = {
      id: Math.floor(Math.random() * 1000000) + Date.now(),
      name: '',
      email: '',
      gender: 'Male',
      dateOfBirth: ''
    };
    formErrors.value = {
      name: '',
      email: '',
      dateOfBirth: ''
    };
    emit('close');
  };
  
  // Validate dữ liệu
  const validateInputs = () => {
    let isValid = true;
    formErrors.value = {
      name: '',
      email: '',
      dateOfBirth: ''
    };
  
    if (!formData.value.name) {
      formErrors.value.name = 'Tên là bắt buộc';
      isValid = false;
    }
  
    if (!formData.value.email) {
      formErrors.value.email = 'Email là bắt buộc';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
      formErrors.value.email = 'Định dạng email không hợp lệ';
      isValid = false;
    }
  
    if (new Date(formData.value.dateOfBirth) >= new Date()) {
      formErrors.value.dateOfBirth = 'Ngày sinh không tồn t';
      isValid = false;
    }
  
    return isValid;
  };
  
  // Hàm thêm người dùng
  const addUser = async () => {
    if (validateInputs()) {
      const newUser = { ...formData.value };
  
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      // Kiểm tra xem email đã tồn tại chưa
      const emailExists = storedUsers.some(user => user.email === newUser.email);
      if (emailExists) {
        formErrors.value.email = 'Email đã tồn tại';
        return;
      }
  
      // Thêm người dùng mới
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
  
      closeModal();
      emit('userAdded');
      await Swal.fire({
        title: 'Thành công!',
        text: 'Người dùng đã được thêm thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };
  </script>
  
  <style scoped>
  </style>
  