import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import {
   Input,
   TextButton,
   IconButton,
   Text,
   ButtonTile,
   Tunnels,
   Tunnel,
   useTunnel,
   Loader,
} from '@dailykit/ui'

import {
   SUPPLIERS,
   MASTER_PROCESSINGS,
   MASTER_ALLERGENS,
} from '../../../graphql'

// Tunnels
import {
   SuppliersTunnel,
   InfoTunnel,
   ProcessingTunnel,
   ConfigTunnel,
   AllergensTunnel,
   SelectDerivedProcessingTunnel,
   ConfigureDerivedProcessingTunnel,
   AllergensTunnelForDerivedProcessing,
   ConfigureSachetTunnel,
   NutritionTunnel,
} from './tunnels'

// Styled
import { StyledWrapper, FlexContainer, Flexible } from '../styled'
import {
   StyledHeader,
   StyledGrid,
   StyledMain,
   StyledInfo,
   StyledSupplier,
   ProcessingButton,
   TabContainer,
   ItemTab,
} from './styled'

import {
   ItemContext,
   state as initialState,
   reducer,
} from '../../../context/item'
import { ItemIcon, CaseIcon, TruckIcon, ClockIcon } from '../../../assets/icons'
import AddIcon from '../../../../../shared/assets/icons/Add'

export default function ItemForm() {
   const [state, dispatch] = React.useReducer(reducer, initialState)
   const [active, setActive] = React.useState(false)

   const [tunnels, openTunnel, closeTunnel] = useTunnel(10)

   const { loading: supplierLoading, data: supplierData } = useQuery(SUPPLIERS)

   const { loading: processingsLoading, data: processingData } = useQuery(
      MASTER_PROCESSINGS
   )

   const { loading: allergensLoading, data: allergensData } = useQuery(
      MASTER_ALLERGENS
   )

   if (supplierLoading || processingsLoading || allergensLoading)
      return <Loader />
   return (
      <ItemContext.Provider value={{ state, dispatch }}>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <SuppliersTunnel
                  close={closeTunnel}
                  open={openTunnel}
                  suppliers={supplierData?.suppliers?.map(supplier => ({
                     id: supplier.id,
                     title: supplier.name,
                     description: `${supplier.contactPerson?.firstName} ${supplier.contactPerson?.lastName} (${supplier.contactPerson?.countryCode} ${supplier.contactPerson?.phoneNumber})`,
                  }))}
                  rawSuppliers={supplierData.suppliers}
               />
            </Tunnel>
            <Tunnel layer={2}>
               <InfoTunnel
                  close={() => closeTunnel(2)}
                  next={() => openTunnel(3)}
               />
            </Tunnel>
            <Tunnel layer={3}>
               <ProcessingTunnel
                  close={closeTunnel}
                  open={openTunnel}
                  processings={processingData?.masterProcessings?.map(
                     processing => ({
                        id: processing.id,
                        title: processing.name,
                     })
                  )}
                  rawProcessings={processingData?.masterProcessings}
               />
            </Tunnel>
            <Tunnel style={{ overflowY: 'auto' }} layer={4} size="lg">
               <ConfigTunnel close={closeTunnel} open={openTunnel} />
            </Tunnel>
            <Tunnel layer={5}>
               <AllergensTunnel
                  close={() => closeTunnel(5)}
                  allergens={allergensData?.masterAllergens?.map(allergen => ({
                     id: allergen.id,
                     title: allergen.name,
                  }))}
               />
            </Tunnel>
            <Tunnel layer={6}>
               <SelectDerivedProcessingTunnel
                  next={openTunnel}
                  close={closeTunnel}
               />
            </Tunnel>
            <Tunnel style={{ overflowY: 'auto' }} size="lg" layer={7}>
               <ConfigureDerivedProcessingTunnel
                  open={openTunnel}
                  close={closeTunnel}
               />
            </Tunnel>

            <Tunnel layer={8}>
               <AllergensTunnelForDerivedProcessing
                  open={openTunnel}
                  close={closeTunnel}
               />
            </Tunnel>
            <Tunnel layer={9}>
               <ConfigureSachetTunnel open={openTunnel} close={closeTunnel} />
            </Tunnel>
            <Tunnel style={{ overflowY: 'auto' }} layer={10}>
               <NutritionTunnel open={openTunnel} close={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <StyledWrapper>
            <StyledHeader>
               {state.title && (
                  <>
                     <StyledInfo>
                        <h1> {state.title} </h1>
                        <span> {state.sku} </span>
                     </StyledInfo>
                     <StyledSupplier>
                        <span>{state.supplier.name} </span>
                        <span>
                           {`${state.supplier.contactPerson.firstName} ${state.supplier.contactPerson.lastName} (${state.supplier.contactPerson?.countryCode} ${state.supplier.contactPerson?.phoneNumber})`}
                        </span>
                     </StyledSupplier>
                  </>
               )}
            </StyledHeader>
         </StyledWrapper>
         <StyledMain>
            {!state.title ? (
               <StyledWrapper>
                  <ButtonTile
                     type="primary"
                     size="lg"
                     text="Add Item Information"
                     onClick={() => openTunnel(1)}
                  />
               </StyledWrapper>
            ) : (
               <>
                  <StyledGrid>
                     <div>
                        <div>
                           <ItemIcon />
                        </div>
                        <div>
                           <span>Unit qty</span>
                           <div>
                              <span>
                                 {state.unit_quantity.value +
                                    state.unit_quantity.unit}
                              </span>
                              <span>${state.unit_price.value || 0}</span>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div>
                           <CaseIcon />
                        </div>
                        <div>
                           <span>Case qty</span>
                           <div>
                              <span>
                                 {state.case_quantity.value +
                                    state.case_quantity.unit}
                              </span>
                              <span>
                                 $
                                 {+state.unit_price.value *
                                    +state.case_quantity.value}
                              </span>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div>
                           <TruckIcon />
                        </div>
                        <div>
                           <span>Min order value</span>
                           <div>
                              <span>
                                 {state.min_order_value.value +
                                    state.min_order_value.unit}
                              </span>
                              <span>
                                 $
                                 {+state.unit_price.value *
                                    +state.min_order_value.value}
                              </span>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div>
                           <ClockIcon />
                        </div>
                        <div>
                           <span>Lead time</span>
                           <div>
                              <span>
                                 {state.lead_time.value + state.lead_time.unit}
                              </span>
                           </div>
                        </div>
                     </div>
                  </StyledGrid>

                  <FlexContainer
                     style={{ marginTop: '30px', padding: '0 30px' }}
                  >
                     <Flexible width="1">
                        <FlexContainer
                           style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                           }}
                        >
                           <Text as="title">Processings</Text>
                           <IconButton
                              onClick={() => openTunnel(6)}
                              type="ghost"
                           >
                              <AddIcon />
                           </IconButton>
                        </FlexContainer>

                        {state.processing?.name && (
                           <>
                              <br />
                              <Text as="subtitle">
                                 As received from supplier.
                              </Text>

                              <ProcessingButton
                                 active={active}
                                 onClick={() => {
                                    setActive(true)
                                    dispatch({
                                       type: 'SET_ACTIVE_PROCESSING',
                                       payload: state.processing,
                                    })
                                 }}
                              >
                                 <h3>{state.processing.name}</h3>
                                 <Text as="subtitle">on hand: 0gm</Text>
                                 <Text as="subtitle">
                                    shelf life:{' '}
                                    {`${state.processing?.shelf_life?.value} ${state.processing?.shelf_life?.unit}`}
                                 </Text>
                              </ProcessingButton>
                           </>
                        )}

                        {state.derivedProcessings.length > 0 && (
                           <>
                              <br />
                              <Text as="subtitle">
                                 Derived from received processing
                              </Text>

                              {state.derivedProcessings.map(procs => (
                                 <ProcessingButton
                                    active={
                                       state.activeProcessing.id === procs.id
                                    }
                                    onClick={() => {
                                       setActive(false)
                                       dispatch({
                                          type: 'SET_ACTIVE_PROCESSING',
                                          payload: procs,
                                       })
                                    }}
                                 >
                                    <h3>{procs.name.title}</h3>
                                    <Text as="subtitle">on hand: 0gm</Text>
                                    <Text as="subtitle">
                                       shelf life:{' '}
                                       {`${procs?.shelf_life?.value} ${procs?.shelf_life?.unit}`}
                                    </Text>
                                 </ProcessingButton>
                              ))}
                           </>
                        )}
                     </Flexible>
                     <Flexible style={{ marginTop: '16vh' }} width="4">
                        <div
                           style={{
                              padding: '15px',
                              backgroundColor: '#fff',
                              minHeight: '500px',
                           }}
                        >
                           {state.activeProcessing?.name ? (
                              <ProcessingView open={openTunnel} />
                           ) : (
                              <Text as="title">
                                 Select any Processing from left menu to get
                                 started!
                              </Text>
                           )}
                        </div>
                     </Flexible>
                  </FlexContainer>
               </>
            )}
            <br />
            <br />
         </StyledMain>
      </ItemContext.Provider>
   )
}

function ProcessingView({ open }) {
   const [activeView, setActiveView] = React.useState('realtime') // realtime | plannedLot
   return (
      <>
         <TabContainer>
            <ItemTab
               active={activeView === 'realtime' ? true : false}
               onClick={() => setActiveView('realtime')}
            >
               <Text as="title">Real-Time</Text>
            </ItemTab>
            <ItemTab
               active={activeView === 'plannedLot' ? true : false}
               onClick={() => setActiveView('plannedLot')}
            >
               <Text as="title">Planned-Lot</Text>
            </ItemTab>
         </TabContainer>

         {activeView === 'realtime' && (
            <>
               <FlexContainer>
                  <Flexible width="4">
                     <RealTimeView />
                  </Flexible>
                  <Flexible width="1"></Flexible>
               </FlexContainer>
            </>
         )}

         {activeView === 'plannedLot' && (
            <>
               <PlannedLotView open={open} />
            </>
         )}
      </>
   )
}

function DataCard({ title, quantity, actionText }) {
   return (
      <div
         style={{
            margin: '0 20px',
            border: '1px solid #f3f3f3',
            padding: '10px',
            borderRadius: '4px',
         }}
      >
         <Text as="title">{title}</Text>

         <Text as="h2">{quantity}</Text>
         <hr style={{ border: '1px solid #f3f3f3' }} />
         <span style={{ color: '#00A7E1', marginTop: '5px' }}>
            {actionText}
         </span>
      </div>
   )
}

function RealTimeView() {
   return (
      <FlexContainer style={{ flexWrap: 'wrap' }}>
         <DataCard
            title="Awaiting"
            quantity="0gm"
            actionText="1 active purchase order"
         />
         <DataCard
            title="Commited"
            quantity="0gm"
            actionText="1 active purchase order"
         />
         <DataCard
            title="Consumed"
            quantity="0gm"
            actionText="1 active purchase order"
         />
      </FlexContainer>
   )
}

function PlannedLotView({ open }) {
   const {
      state: { activeProcessing },
      state,
      dispatch,
   } = useContext(ItemContext)

   return (
      <>
         <FlexContainer>
            <Flexible width="1">
               <Text as="h2">Sachets</Text>

               {activeProcessing.sachets.map(sachet => (
                  <ProcessingButton
                     active={sachet.id === state.activeSachet.id}
                     onClick={() =>
                        dispatch({ type: 'SET_ACTIVE_SACHET', payload: sachet })
                     }
                  >
                     <h3>
                        {sachet.quantity} {state.unit_quantity.unit}
                     </h3>

                     <Text as="subtitle">
                        Par: {sachet.parLevel} {state.unit_quantity.unit}
                     </Text>
                  </ProcessingButton>
               ))}

               <div style={{ width: '90%', marginTop: '10px' }}>
                  <ButtonTile
                     type="primary"
                     size="lg"
                     text="Add Sachets"
                     onClick={e => open(9)}
                  />
               </div>
            </Flexible>
            <Flexible width="4">
               {state.activeSachet?.quantity && (
                  <FlexContainer style={{ flexWrap: 'wrap' }}>
                     <DataCard
                        title="Awaiting"
                        quantity="0gm"
                        actionText="1 active purchase order"
                     />
                     <DataCard
                        title="Commited"
                        quantity="0gm"
                        actionText="1 active purchase order"
                     />
                     <DataCard
                        title="Consumed"
                        quantity="0gm"
                        actionText="1 active purchase order"
                     />
                  </FlexContainer>
               )}
            </Flexible>
         </FlexContainer>
      </>
   )
}
