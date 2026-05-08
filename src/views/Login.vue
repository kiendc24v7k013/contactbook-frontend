<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <i class="fas fa-address-book login-icon"></i>
        <h2>{{ showRegister ? 'Đăng ký' : 'Đăng nhập' }}</h2>
        <p>Ứng dụng Quản lý Danh bạ</p>
      </div>

      <!-- Form đăng nhập -->
      <form v-if="!showRegister" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">
            <i class="fas fa-envelope"></i> E-mail
          </label>
          <input
            id="email"
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Nhập email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i> Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <p v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </p>
        <button type="submit" class="btn btn-primary btn-login" :disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-spin"></i> Đang xử lý...
          </span>
          <span v-else>
            <i class="fas fa-sign-in-alt"></i> Đăng nhập
          </span>
        </button>
      </form>

      <!-- Form đăng ký -->
      <form v-else @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="regName">
            <i class="fas fa-user"></i> Họ tên
          </label>
          <input
            id="regName"
            type="text"
            class="form-control"
            v-model="regName"
            placeholder="Nhập họ tên"
            required
          />
        </div>
        <div class="form-group">
          <label for="regEmail">
            <i class="fas fa-envelope"></i> E-mail
          </label>
          <input
            id="regEmail"
            type="email"
            class="form-control"
            v-model="regEmail"
            placeholder="Nhập email"
            required
          />
        </div>
        <div class="form-group">
          <label for="regPassword">
            <i class="fas fa-lock"></i> Mật khẩu
          </label>
          <input
            id="regPassword"
            type="password"
            class="form-control"
            v-model="regPassword"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <p v-if="regMessage" :class="regSuccess ? 'success-message' : 'error-message'">
          <i :class="regSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
          {{ regMessage }}
        </p>
        <button type="submit" class="btn btn-success btn-login" :disabled="regLoading">
          <span v-if="regLoading">
            <i class="fas fa-spinner fa-spin"></i> Đang xử lý...
          </span>
          <span v-else>
            <i class="fas fa-user-plus"></i> Đăng ký
          </span>
        </button>
      </form>

      <div class="register-link">
        {{ showRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?' }}
        <a href="#" @click.prevent="showRegister = !showRegister">
          {{ showRegister ? 'Đăng nhập' : 'Đăng ký' }}
        </a>
      </div>


    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
      showRegister: false,
      regName: "",
      regEmail: "",
      regPassword: "",
      regMessage: "",
      regSuccess: false,
      regLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      this.loading = true;
      try {
        await AuthService.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Đăng nhập thất bại";
      } finally {
        this.loading = false;
      }
    },
    async handleRegister() {
      this.regMessage = "";
      this.regSuccess = false;
      this.regLoading = true;
      try {
        await AuthService.register({
          name: this.regName,
          email: this.regEmail,
          password: this.regPassword,
        });
        this.regSuccess = true;
        this.regMessage = "Đăng ký thành công! Bạn có thể đăng nhập.";
        this.regName = "";
        this.regEmail = "";
        this.regPassword = "";
      } catch (error) {
        this.regMessage =
          error.response?.data?.message || "Đăng ký thất bại";
      } finally {
        this.regLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.login-icon {
  font-size: 48px;
  color: #007bff;
  margin-bottom: 12px;
}

.login-header h2 {
  margin: 0;
  color: #333;
  font-weight: 700;
}

.login-header p {
  color: #888;
  margin-top: 4px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

.form-group .form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;
}

.form-group .form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.btn-login {
  width: 100%;
  padding: 11px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 6px;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-bottom: 8px;
}

.success-message {
  color: #28a745;
  font-size: 14px;
  margin-bottom: 8px;
}

.register-link {
  text-align: center;
  margin-top: 18px;
  color: #666;
}

.register-link a {
  color: #007bff;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.register-form {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.register-form h4 {
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}
</style>
