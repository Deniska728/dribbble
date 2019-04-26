<template>
  <div class="form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Login" prop="login">
          <el-input v-model="ruleForm.login"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            @click="submitForm('ruleForm')" 
            :disabled="loading"
          >{{loading ? 'Loading...' : 'Create'}}</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        ruleForm: {
          login: '',
          password: ''
        },
        rules: {
          login: [
            { required: true, message: 'Please input login', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { login, password } = this.ruleForm

            this.loading = true
            this.$store.dispatch('LOGIN', {password, login, grant_type: 'password'})
            .then(() => {
              this.loading = false
              this.$router.push('new')
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
.form-container {
  width: 40%;
  margin: auto;
  margin-top: 100px;
}
</style>
