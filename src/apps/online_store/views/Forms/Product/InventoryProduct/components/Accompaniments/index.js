import React from 'react'
import { ButtonTile, Tunnels, Tunnel, useTunnel } from '@dailykit/ui'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line import/no-cycle
import { Products } from '..'
import { InventoryProductContext } from '../../../../../../context/product/inventoryProduct'
import { StyledTab, StyledTabs, StyledTabView } from './styled'
import { AccompanimentTypeTunnel } from '../../tunnels'

const address =
   'apps.online_store.views.forms.product.inventoryproduct.components.accompaniments.'

const Accompaniments = ({ state }) => {
   const { t } = useTranslation()
   const { productState, productDispatch } = React.useContext(
      InventoryProductContext
   )

   const [tunnels, openTunnel, closeTunnel] = useTunnel(1)

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <AccompanimentTypeTunnel state={state} close={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <>
            {state.accompaniments?.length ? (
               <>
                  <StyledTabs>
                     {state.accompaniments.map((el, i) => (
                        <StyledTab
                           key={el.type}
                           onClick={() =>
                              productDispatch({
                                 type: 'META',
                                 payload: {
                                    name: 'accompanimentTabIndex',
                                    value: i,
                                 },
                              })
                           }
                           active={
                              productState.meta.accompanimentTabIndex === i
                           }
                        >
                           {el.type}
                        </StyledTab>
                     ))}
                  </StyledTabs>
                  <StyledTabView>
                     <Products state={state} />
                  </StyledTabView>
               </>
            ) : (
               <ButtonTile
                  type="secondary"
                  text={t(address.concat('add accompaniment types'))}
                  onClick={() => openTunnel(1)}
               />
            )}
         </>
      </>
   )
}

export default Accompaniments
