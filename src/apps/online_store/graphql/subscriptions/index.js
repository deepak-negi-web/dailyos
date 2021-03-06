import gql from 'graphql-tag'

export const S_ACCOMPANIMENT_TYPES = gql`
   subscription {
      accompaniments {
         id
         title: name
      }
   }
`

export const SRP_COUNT = gql`
   subscription {
      simpleRecipeProductsAggregate {
         aggregate {
            count
         }
      }
   }
`

export const S_SIMPLE_RECIPE_PRODUCTS = gql`
   subscription {
      simpleRecipeProducts {
         id
         name
         isValid
         isPublished
         simpleRecipe {
            id
            name
         }
      }
   }
`

export const S_SIMPLE_RECIPE_PRODUCT = gql`
   subscription SimpleRecipeProduct($id: Int!) {
      simpleRecipeProduct(id: $id) {
         id
         name
         assets
         isValid
         isPublished
         accompaniments
         tags
         description
         default
         simpleRecipe {
            id
            name
         }
         simpleRecipeProductOptions {
            id
            isActive
            price
            type
            simpleRecipeYield {
               id
               yield
            }
         }
      }
   }
`

export const IP_COUNT = gql`
   subscription {
      inventoryProductsAggregate {
         aggregate {
            count
         }
      }
   }
`

export const S_INVENTORY_PRODUCTS = gql`
   subscription {
      inventoryProducts {
         id
         name
         isValid
         isPublished
      }
   }
`

export const S_INVENTORY_PRODUCT = gql`
   subscription($id: Int!) {
      inventoryProduct(id: $id) {
         id
         name
         assets
         accompaniments
         isValid
         isPublished
         tags
         description
         supplierItem {
            id
            name
            unitSize
            unit
         }
         sachetItem {
            id
            unitSize
            unit
            bulkItem {
               processingName
               supplierItem {
                  name
               }
            }
         }
         inventoryProductOptions {
            id
            label
            price
            quantity
         }
      }
   }
`

export const CUP_COUNT = gql`
   subscription {
      customizableProductsAggregate {
         aggregate {
            count
         }
      }
   }
`

export const S_CUSTOMIZABLE_PRODUCTS = gql`
   subscription {
      customizableProducts {
         id
         name
         isValid
         isPublished
      }
   }
`

export const S_CUSTOMIZABLE_PRODUCT = gql`
   subscription CustomizableProduct($id: Int!) {
      customizableProduct(id: $id) {
         id
         name
         default
         isValid
         isPublished
         description
         tags
         customizableProductOptions {
            id
            inventoryProduct {
               id
               name
               inventoryProductOptions {
                  id
                  label
                  price
                  quantity
               }
            }
            simpleRecipeProduct {
               id
               name
               simpleRecipeProductOptions {
                  id
                  isActive
                  price
                  simpleRecipeYield {
                     yield
                  }
                  type
               }
            }
         }
      }
   }
`

export const COP_COUNT = gql`
   subscription {
      comboProductsAggregate {
         aggregate {
            count
         }
      }
   }
`

export const S_COMBO_PRODUCTS = gql`
   subscription {
      comboProducts {
         id
         name
         isValid
         isPublished
         comboProductComponents {
            id
            label
         }
      }
   }
`

export const S_COMBO_PRODUCT = gql`
   subscription ComboProduct($id: Int!) {
      comboProduct(id: $id) {
         id
         name
         description
         tags
         isValid
         isPublished
         comboProductComponents {
            id
            label
            customizableProduct {
               id
               name
            }
            inventoryProduct {
               id
               name
               inventoryProductOptions {
                  id
                  label
                  price
                  quantity
               }
            }
            simpleRecipeProduct {
               id
               name
               simpleRecipeProductOptions {
                  id
                  isActive
                  price
                  type
                  simpleRecipeYield {
                     yield
                  }
               }
            }
         }
      }
   }
`

export const COLLECTIONS_COUNT = gql`
   subscription CollectionsCount {
      menuCollectionsAggregate {
         aggregate {
            count
         }
      }
   }
`

export const S_COLLECTIONS = gql`
   subscription Collections {
      menuCollections {
         id
         name
         categories
         availability
      }
   }
`

export const S_COLLECTION = gql`
   subscription Collection($id: Int!) {
      menuCollection(id: $id) {
         id
         name
         isValid
         isPublished
         active
         availability
         categories
         store
      }
   }
`

export const STORE_SETTINGS = gql`
   subscription StoreSettings($type: String!) {
      storeSettings(where: { type: { _eq: $type } }) {
         value
         identifier
      }
   }
`

export const RECURRENCES = gql`
   subscription Recurrence($type: String!) {
      recurrences(where: { type: { _eq: $type } }) {
         id
         rrule
         type
         isActive
         timeSlots {
            id
            from
            to
            isActive
            pickUpLeadTime
            pickUpPrepTime
            mileRanges {
               id
               from
               to
               leadTime
               prepTime
               isActive
               charges {
                  id
                  charge
                  orderValueFrom
                  orderValueUpto
                  autoDeliverySelection
               }
            }
         }
      }
   }
`
