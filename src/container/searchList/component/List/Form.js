import { Component } from 'react'
import {
  message,
  Button,
  Form,
  Input,
  Select
} from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 14 }
  }
}

@Form.create()
class AppForm extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      loading: false,
      detail: null
    }
  }

  componentDidMount() {
    const {
      pk,
      actions
    } = this.props

    if (pk) {
      actions.getItem({
        id: pk
      })
      .then(data => {
        this.setState({
          detail: data
        })
      })
      .catch(e => {
        message.error(e + '')
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const { form, actions, pk } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.setState({
        loading: true
      })

      if (pk) {
        values.id = pk
      }

      actions[pk ? 'editItem' : 'addItem'](values)
      .then(action => {
        message.success(pk ? '编辑成功' : '添加成功')
        this.setState({
          loading: false
        }, () => {
          this.props.onSuccess && this.props.onSuccess()
        })
      }).catch(e => {
        message.error(e + '')
        this.setState({
          loading: false
        })
      })
    })
  }

  getRows() {
    const { form } = this.props
    const { detail } = this.state
    const { getFieldDecorator } = form

    return (
      <div>
        <FormItem {...formItemLayout} label="名称" hasFeedback>
        {
          getFieldDecorator('applicationName', {
            initialValue: detail ? detail.name : '',
            rules: [
              {
                required: true,
                message: '请输入名称'
              }
            ]
          })(
            <Input />
          )
        }
        </FormItem>
      </div>
    )
  }

  render() {
    if (this.props.pk && !this.state.detail) {
      return null
    }

    const rows = this.getRows()
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        { rows }

        <FormItem wrapperCol={{
          xs: { span: 14, offset: 6 }
        }}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    )
  }
}

export default AppForm
