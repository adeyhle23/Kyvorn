const MONEY_FRAGMENT = /* GraphQL */ `
  fragment moneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment imageFields on Image {
    url
    altText
    width
    height
  }
`;

const PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment variantFields on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      ...moneyFields
    }
    compareAtPrice {
      ...moneyFields
    }
    image {
      ...imageFields
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment productFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    productType
    availableForSale
    createdAt
    seo {
      title
      description
    }
    featuredImage {
      ...imageFields
    }
    images(first: 10) {
      edges {
        node {
          ...imageFields
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          ...variantFields
        }
      }
    }
    priceRange {
      minVariantPrice {
        ...moneyFields
      }
      maxVariantPrice {
        ...moneyFields
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products(
    $first: Int!
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      edges {
        node {
          ...productFields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first) {
        edges {
          node {
            ...productFields
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const CART_FRAGMENT = /* GraphQL */ `
  fragment cartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...moneyFields
      }
      totalAmount {
        ...moneyFields
      }
      totalTaxAmount {
        ...moneyFields
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              ...moneyFields
            }
          }
          merchandise {
            ... on ProductVariant {
              ...variantFields
              product {
                handle
                title
                featuredImage {
                  ...imageFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...cartFields
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;
