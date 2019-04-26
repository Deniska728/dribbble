<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm upload-form">
    <el-form-item label="Image name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-upload
      class="upload-demo"
      action="https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/api/objects"
      :data="form.file"
      :auto-upload="false"
      accept="image"
      :multiple="false"
      :on-change="handleChange"
    >
      <el-button size="small" type="primary" v-model="form.file">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>  
    <el-form-item label="Activity type" prop="type">
      <el-checkbox label="New" name="type" v-model="form.new"></el-checkbox>
      <el-checkbox label="Popular" name="type" v-model="form.popular"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">Create</el-button>
      <el-button @click="resetForm('form')">Reset</el-button>
    </el-form-item>
  </el-form>  
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          description: '',
          popular: false,
          new: false,
          file: {}
        },
        rules: {
          name: [
            { required: true, message: 'Please input image name', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Please input image description', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      async submitForm(formName) {
        console.log(this.form);
        const { new: categoryNew, popular, file, name, description } = this.form

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(categoryNew === false && popular === false) {
              this.$message.error('Selected category')
              return false;
            }
            if(!file.raw) {
              this.$message.error('File is not loaded')
              return false;
            }

            this.$store.dispatch('CHECK_TOKEN')
            .then(response => {
              this.$store.dispatch('UPLOAD_FILE', { file, name, description, popular, categoryNew })
              .then(response => console.log(response))
              .catch(err => console.error(err))
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.form.file = {}
        this.form.new = false
        this.form.popular = false
      },
      handleChange(file) {
        this.form.file = file;
      }
    }
  }
</script>

<style lang="scss">
.upload-form {
  width: 70%;
  margin: auto;
  margin-top: 40px;
}
</style>
