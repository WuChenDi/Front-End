const Ajv = require('ajv');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'email'
      format: 'test'
      // minLength: 10
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      },
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

const ajv = new Ajv();
ajv.addFormat('test', (data) => {
  console.log(data, '--------');
  return data === 'wcd'
})
const validate = ajv.compile(schema);
const valid = validate({
  name: 'wcd',
  // name: '996194720@qq.com',
  age: 25,
  pets: ['mimi', 'mama'],
  isWorker: true
});
if (!valid) console.log(validate.errors)
