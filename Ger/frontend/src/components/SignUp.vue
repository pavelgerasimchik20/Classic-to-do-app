<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">Регистрация</v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="register">
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$refs.form.submit()">Зарегистрироваться</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">Авторизация</v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="login">
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$refs.form.submit()">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async register() {
        // отправляем данные на сервер для создания нового пользователя
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        if (response.ok) {
          // редирект на страницу авторизации
          this.$router.push('/login')
        } else {
          // выводим ошибку в консоль
          console.error('Ошибка регистрации')
        }
      },
      async login() {
        // отправляем данные на сервер для проверки подлинности пользователя
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        if (response.ok) {
          // получаем токен от Google
          const googleResponse = await fetch('/api/google/token')
          const { token } = await googleResponse.json()
          // сохраняем токен в локальном хранилище
          localStorage.setItem('token', token)
          // редирект на защищенную страницу
          this.$router.push('/dashboard')
        } else {
          // выводим ошибку в консоль
          console.error('Ошибка авторизизации')
}
}
}
}
</script>
  