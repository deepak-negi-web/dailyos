import gql from 'graphql-tag'

export const CREATE_SUPPLIER_ITEM = gql`
   mutation CreateSupplierItem(
      $name: String!
      $supplierId: Int!
      $unit: String!
      $unitSize: Int!
      $leadTime: jsonb!
      $prices: jsonb!
   ) {
      createSupplierItem(
         objects: {
            name: $name
            supplierId: $supplierId
            unit: $unit
            unitSize: $unitSize
            leadTime: $leadTime
            prices: $prices
         }
      ) {
         returning {
            id
         }
      }
   }
`

export const ADD_BULK_ITEM = gql`
   mutation UpdateSupplierItem($bulkItemAsShippedId: Int!, $itemId: Int!) {
      updateSupplierItem(
         where: { id: { _eq: $itemId } }
         _set: { bulkItemAsShippedId: $bulkItemAsShippedId }
      ) {
         returning {
            id
         }
      }
   }
`

// yield: { value: state.processing.yield },
//             shelfLife: state.processing.shelf_life,
//             parLevel: +state.processing.par_level.value,
//             nutritionInfo: state.processing.nutrients || {},
//             maxLevel: +state.processing.max_inventory_level.value,
//             labor: state.processing.labor_time,
//             bulkDensity: +state.processing.bulk_density,
//             allergens: state.processing.allergens,

export const CREATE_BULK_ITEM = gql`
   mutation CreateBulkItem(
      $processingName: String!
      $itemId: Int!
      $unit: String!
      $yield: jsonb
      $shelfLife: jsonb
      $parLevel: numeric
      $nutritionInfo: jsonb
      $maxLevel: numeric
      $labor: jsonb
      $bulkDensity: numeric
      $allergens: jsonb
   ) {
      createBulkItem(
         objects: {
            processingName: $processingName
            supplierItemId: $itemId
            unit: $unit
            yield: $yield
            shelfLife: $shelfLife
            parLevel: $parLevel
            nutritionInfo: $nutritionInfo
            maxLevel: $maxLevel
            labor: $labor
            bulkDensity: $bulkDensity
            allergens: $allergens
         }
      ) {
         returning {
            id
            processing {
               id
               name
            }
         }
      }
   }
`
export const CREATE_SACHET_ITEM = gql`
   mutation CreateSachetItem(
      $unitSize: numeric!
      $bulkItemId: Int!
      $unit: String!
   ) {
      createSachetItem(
         objects: { unitSize: $unitSize, bulkItemId: $bulkItemId, unit: $unit }
      ) {
         returning {
            id
         }
      }
   }
`
