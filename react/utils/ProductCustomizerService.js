
/**
* @class' ProductCustomizerService
* @description Handle all business rules from ProductCustomizer Component.
*/
class ProductCustomizerService {
  constructor(schema) {
    this.schema = schema
    this.items = schema.items
    this.properties = schema.properties
  }

  /**
  * serializeData
  * Serialize schema data to component pattern.
  * @return Object
  */
  serializeData() {
    this.parseProperties()

    return Object.keys(this.properties).map(index => {
      const property = this.getProperty(index)

      return {
        option: index,
        choiceType: property.choiceType,
        description: property.description,
        items: property.items,
        isTopping: property.isTopping,
        minItems: property.minItems,
        maxItems: property.maxItems,
        required: property.required,
        uniqueItems: property.uniqueItems,
      }
    })
  }

  /**
  * parseProperties
  * Populates property fields with required values.
  * @return void
  */
  parseProperties() {
    const properties = this.properties

    for (const property of Object.keys(properties)) {
      const parsedItems = []
      const options = this.getEnumsByProperty(property)

      if (!options) {
        continue
      }

      options.forEach(enumerable => {
        if (this.enumHasItem(enumerable)) {
          this.getProperty(property)['isTopping'] = false
          return parsedItems.push(this.getItemByEnumerable(enumerable))
        }

        this.getProperty(property)['isTopping'] = true
        parsedItems.push(enumerable)
      })

      this.getProperty(property)['items'] = parsedItems
    }
  }

  /**
  * getEnumsByProperty
  * Get enumerable values by property type.
  * @param object property
  * @return mixed
  */
  getEnumsByProperty(property) {
    if (this.properties[property].type === 'string') {
      return this.properties[property].enum
    }

    if (this.properties[property].type === 'array') {
      return this.properties[property].items.enum
    }
  }

  /**
  * enumHasItem
  * Check if enumerable passed has items in  schema.
  * @param object enumerable
  * @return boolean
  */
  enumHasItem(enumerable) {
    let response = false

    this.items.forEach(item => {
      if (enumerable !== item.Id) {
        return true
      }

      response = true
    })

    return response
  }

  /**
  * getItemByEnumerable
  * Get equivalent item of enumerable.
  * @param object enumerable
  * @return object
  */
  getItemByEnumerable(enumerable) {
    const item = this.items.find(item => {
      return enumerable === item.Id
    })

    return item
  }

  /**
  * getProperty
  * Get property value from index name.
  * @param string index
  * @return object
  */
  getProperty(index) {
    return this.properties[index]
  }
}

export default ProductCustomizerService
