import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import {
   List,
   ListItem,
   ListOptions,
   ListSearch,
   useSingleList,
   TunnelHeader,
   Loader,
} from '@dailykit/ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { InventoryProductContext } from '../../../../../../context/product/inventoryProduct'
import {
   UPDATE_INVENTORY_PRODUCT,
   SUPPLIER_ITEMS,
   SACHET_ITEMS,
} from '../../../../../../graphql'
import { TunnelBody } from '../styled'

const address =
   'apps.online_store.views.forms.product.inventoryproduct.tunnels.itemtunnel.'

export default function ItemTunnel({ state, close }) {
   const { t } = useTranslation()
   const { productState } = React.useContext(InventoryProductContext)

   const [busy, setBusy] = React.useState(false)
   const [search, setSearch] = React.useState('')
   const [items, setItems] = React.useState([])
   const [list, current, selectOption] = useSingleList(items)

   // Queries for fetching items
   const [fetchSupplierItems, { loading: supplierItemsLoading }] = useLazyQuery(
      SUPPLIER_ITEMS,
      {
         onCompleted: data => {
            const updatedItems = data.supplierItems.map(item => {
               return {
                  id: item.id,
                  title: `${item.name} - ${item.unitSize} ${item.unit}`,
               }
            })
            setItems([...updatedItems])
         },
         onError: error => {
            console.log(error)
         },
         fetchPolicy: 'cache-and-network',
      }
   )
   const [fetchSachetItems, { loading: sachetItemsLoading }] = useLazyQuery(
      SACHET_ITEMS,
      {
         onCompleted: data => {
            const updatedItems = data.sachetItems.map(item => {
               return {
                  id: item.id,
                  title: `${item.bulkItem.supplierItem.name} ${item.bulkItem.processingName} - ${item.unitSize} ${item.unit}`,
               }
            })
            setItems([...updatedItems])
         },
         onError: error => {
            console.log(error)
         },
         fetchPolicy: 'cache-and-network',
      }
   )

   const [updateProduct] = useMutation(UPDATE_INVENTORY_PRODUCT, {
      variables: {
         id: state.id,
         set: {
            supplierItemId:
               productState.meta.itemType === 'inventory' ? current.id : null,
            sachetItemId:
               productState.meta.itemType === 'sachet' ? current.id : null,
         },
      },
      onCompleted: () => {
         toast.success('Item added!')
         close(2)
         close(1)
      },
      onError: () => {
         toast.error('Error')
         setBusy(false)
      },
   })

   // Handlers
   const add = () => {
      if (busy) return
      setBusy(true)
      updateProduct()
   }

   React.useEffect(() => {
      if (productState.meta.itemType === 'inventory') {
         fetchSupplierItems()
      } else {
         fetchSachetItems()
      }
   }, [])

   return (
      <>
         <TunnelHeader
            title={t(address.concat('select an item'))}
            right={{
               action: add,
               title: busy
                  ? t(address.concat('adding'))
                  : t(address.concat('add')),
            }}
            close={() => close(2)}
         />
         <TunnelBody>
            {sachetItemsLoading || supplierItemsLoading ? (
               <Loader />
            ) : (
               <List>
                  {Object.keys(current).length > 0 ? (
                     <ListItem type="SSL1" title={current.title} />
                  ) : (
                     <ListSearch
                        onChange={value => setSearch(value)}
                        placeholder={t(
                           address.concat("type what you're looking for")
                        )}
                     />
                  )}
                  <ListOptions>
                     {list
                        .filter(option =>
                           option.title.toLowerCase().includes(search)
                        )
                        .map(option => (
                           <ListItem
                              type="SSL1"
                              key={option.id}
                              title={option.title}
                              isActive={option.id === current.id}
                              onClick={() => selectOption('id', option.id)}
                           />
                        ))}
                  </ListOptions>
               </List>
            )}
         </TunnelBody>
      </>
   )
}
