<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Management</a-breadcrumb-item>
          <a-breadcrumb-item>Users</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="content">
              <a-table :columns="columns"
                :rowKey="record => record.id"
                :dataSource="items"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
              >
                <template slot="operation" slot-scope="text, record">
                  <a href="">Edit</a>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    v-if="items.length"
                    title="Sure to delete?"
                    @confirm="() => deleteUser(record.key)">
                    <a href="javascript:;">Delete</a>
                  </a-popconfirm>
                </template>
              </a-table>
              <br/>
              <a-button @click="showModal" type="primary" icon="plus">New User</a-button>&nbsp;
              <collection-create-form
                ref="collectionForm"
                :visible="visible"
                @cancel="handleCancel"
                @create="handleCreate"
              />

        </div>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb, Table, Button, Modal, Form, Input, Popconfirm, Divider } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'

const columns = [
  {
    title: 'Username',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Admin',
    dataIndex: 'admin'
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  }
]

const CollectionCreateForm = {
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-modal': Modal
  },
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create a new record'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Username'>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: 'Please input a user name' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Password'>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: 'Please input password' }],
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item label='Email'>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: 'Please input a email address' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  `
}

export default {
  components: {
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-table': Table,
    'a-button': Button,
    'collection-create-form': CollectionCreateForm,
    'a-popconfirm': Popconfirm,
    'a-divider': Divider
  },

  data () {
    return {
      columns,
      visible: false
    }
  },

  computed: {
    ...mapState('global', [
      'loading'
    ]),
    ...mapState('user', [
      'items',
      'pagination',
      'params'
    ])
  },

  methods: {
    ...mapActions('user', [
      'getUsers',
      'handleTableChange',
      'newUser',
      'deleteUser'
    ]),

    showModal () {
      this.visible = true
    },

    handleCancel () {
      this.visible = false
    },

    handleCreate () {
      const form = this.$refs.collectionForm.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        // console.log('Received values of form: ', values)
        this.newUser({ app: this, params: values })
        form.resetFields()
        this.visible = false
      })
    }

  },

  mounted () {
    this.getUsers(this)
  }
}
</script>
