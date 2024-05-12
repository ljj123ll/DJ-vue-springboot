<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="党建活动名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="党建会议地点">
        <el-select v-model="form.region" placeholder="请选择地点">
          <el-option label="会议室" value="shanghai" />
          <el-option label="人民大会堂" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="党建时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择一个日期" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="确定时间" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="是否通知团员">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动形式">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="线上会议" name="type" />
          <el-checkbox label="线下会议" name="type" />
          <el-checkbox label="非正式会议" name="type" />
          <el-checkbox label="正式会议" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="有无领导和嘉宾">
        <el-radio-group v-model="form.resource">
          <el-radio label="有" />
          <el-radio label="无" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动内容">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('提交成功!')
    },
    onCancel() {
      this.$message({
        message: '已取消!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

