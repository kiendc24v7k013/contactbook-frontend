<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div v-if="isLoggedIn" class="navbar-nav">
      <li class="nav-item">
        <span class="nav-link text-light">
          <i class="fas fa-user"></i> {{ userName }}
        </span>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="logout">
          <i class="fas fa-sign-out-alt"></i> Đăng xuất
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      isLoggedIn: AuthService.isLoggedIn(),
      userName: AuthService.getUser()?.name || "",
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = AuthService.isLoggedIn();
      const user = AuthService.getUser();
      this.userName = user ? user.name : "";
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.isLoggedIn = false;
      this.userName = "";
      this.$router.push({ name: "login" });
    },
  },
};
</script>
