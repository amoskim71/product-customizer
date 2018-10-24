import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'vtex.styleguide/Button'
import { FormattedMessage } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

class AddToCart extends Component {
  static propTypes = {
    /* Total of current selected variations */
    total: PropTypes.number,
    /* Toggle the button state if there's not selected variations */
    isVariationSelected: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  render() {
    const {
      total,
      isVariationSelected,
      isModalOpen,
      onSubmit,
    } = this.props

    if (!isVariationSelected) return null

    return (
      <div className={`actions--add-to-cart tc pa5 ${isModalOpen ? 'fixed w-100 bg-white z-999 bottom-0 bt b--light-gray' : ''}`}>
        <Button type="submit" onClick={onSubmit} block>
          <FormattedMessage id="product-customizer.add-to-cart" />
          <ProductPrice
            showLabels={false}
            showListPrice={false}
            sellingPrice={total}
            listPrice={total}
          />
        </Button>
      </div>
    )
  }
}

export default AddToCart
