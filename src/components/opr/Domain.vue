<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Monitoring</a-breadcrumb-item>
          <a-breadcrumb-item>SSL Expiration</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="content">
              <a-table :columns="columns"
                :rowKey="record => record.id"
                :dataSource="items"
                :pagination="pagination"
                :loading="loading"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                @change="handleTableChange"
              >
              </a-table>
              <br/>
              <a-button @click="showModal" type="primary" icon="plus">New Domain</a-button>&nbsp;
              <collection-create-form
                ref="collectionForm"
                :visible="visible"
                @cancel="handleCancel"
                @create="handleCreate"
              />
              <a-button @click="handleSelect" type="primary" icon="minus" :disabled="!hasSelected" >Delete Selected</a-button>&nbsp;
              <a-button @click="refreshAll" type="primary" icon="sync">Refresh All</a-button>&nbsp;

        </div>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb, Table, Button, Modal, Form, Input } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'

const columns = [
  {
    title: 'Domain Name',
    dataIndex: 'url'
  },
  {
    title: 'Remaining Days',
    dataIndex: 'remained_days'
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expire_date'
  },
  {
    title: 'Last Checked',
    dataIndex: 'updated_at'
  },
  {
    title: 'Notification',
    dataIndex: 'name'
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
        <a-form-item label='Domain Name'>
          <a-input
            v-decorator="[
              'domain',
              {
                rules: [{ required: true, message: 'Please input a domain name' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Receiver Group'>
          <a-input
            v-decorator="[
              'receiver_group_id',
              {
                rules: [{ required: true, message: 'Please select a receiver group' }],
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
    'collection-create-form': CollectionCreateForm
  },

  data () {
    return {
      columns,
      selectedRowKeys: [],
      visible: false
    }
  },

  computed: {
    ...mapState('global', [
      'loading'
    ]),
    ...mapState('domain', [
      'items',
      'pagination',
      'params'
    ]),
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },

  methods: {
    ...mapActions('domain', [
      'getDomains',
      'handleTableChange',
      'newDomain',
      'deleteSelected',
      'refreshAll'
    ]),

    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

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
        this.newDomain({ app: this, params: values })
        form.resetFields()
        this.visible = false
      })
    },

    handleSelect () {
      this.deleteSelected({ app: this, params: { domains: this.selectedRowKeys } })
      this.selectedRowKeys = []
    }

  },

  mounted () {
    this.getDomains(this)
  }
}
</script>
