const Ajv = require('ajv');
const localize = require("ajv-i18n")

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // test: false,
      // errorMessage: '这是不对的',
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10'
      },
      // format: 'email'
      // format: 'test'
      minLength: 10
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

const ajv = new Ajv({allErrors: true});
require('ajv-errors')(ajv)
// ajv.addFormat('test', (data) => {
//   console.log(data, '--------');
//   return data === 'wcd'
// })
ajv.addKeyword('test', {
  // validate(schema, data) {
  //   console.log(schema, data)
  //   if (schema === true) {
  //     return true
  //   } else {
  //     return schema.length === 6
  //   }
  // }
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   // return true
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean'
  // }
  macro() {
    return {
      minLength: 10
    }
  }
})
const validate = ajv.compile(schema);
const valid = validate({
  name: 'wcd',
  // name: '996194720@qq.com',
  age: 25,
  pets: ['mimi', 'mama'],
  isWorker: true
});
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}


// const Ajv = require("ajv").default
// const ajv = new Ajv({allErrors: true})
// require("ajv-errors")(ajv)
// const schema = {
//   type: "object",
//   required: ["foo"],
//   properties: {
//     foo: {type: "integer"},
//   },
//   additionalProperties: false,
//   errorMessage: "should be an object with an integer property foo only",
// }
//
// const validate = ajv.compile(schema)
// console.log(validate({foo: "a", bar: 2}))
// console.log(validate.errors)
