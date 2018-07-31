import { Component } from 'react'
import {
  Row,
  Col,
  Icon,
  Button,
  Form,
  Input,
  DatePicker,
  Select
} from 'antd'
import styles from './less/styles.less'

const { RangePicker } = DatePicker
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 18 }
  }
}

@Form.create()
class Search extends Component {
  constructor(props, context) {
    super(props, context)
  }

  getValues() {
    const { form } = this.props
    const { getFieldsValue } = form
    const values = getFieldsValue()

    // YYYY-MM-DD HH:mm:ss
    if (values.range) {
      values.start = values.range[0].format('YYYY-MM-DD')
      values.end = values.range[1].format('YYYY-MM-DD')
      delete values.range
    }

    for (let i in values) {
      if (typeof values[i] === 'undefined') {
        delete values[i]
      }
    }

    return values
  }

  onSearch() {
    const { onSearch } = this.props

    if (onSearch) {
      onSearch(this.getValues())
    }
  }

  onReset() {
    const { resetFields } = this.props.form
    resetFields()
  }

  render() {
    const { form, loading } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <Form>
          <Row gutter={20}>
            <Col span={8}>
              <FormItem {...formItemLayout} label="名称">
              {
                getFieldDecorator('name')(
                  <Input />
                )
              }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="描述">
              {
                getFieldDecorator('desc')(
                  <Input />
                )
              }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="时间">
              {
                getFieldDecorator('range', {
                  rules: [{ type: 'array'}]
                })(
                  <RangePicker />
                )
              }
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div styleName="search-actions">
          <Button type="primary" onClick={this.onSearch.bind(this)} loading={loading}>查询</Button>
          <Button onClick={this.onReset.bind(this)}>重置</Button>
        </div>
      </div>
    )
  }
}

export default Search
