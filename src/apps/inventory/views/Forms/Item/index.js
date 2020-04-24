import React from 'react'

import {
   Input,
   TextButton,
   IconButton,
   Text,
   ButtonTile,
   Tunnels,
   Tunnel,
   useTunnel,
} from '@dailykit/ui'

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
   const [suppliers, setSuppliers] = React.useState([
      {
         id: 1,
         supplier: { title: 'Swiggy', img: '' },
         contact: { title: 'Ajay Singh', img: '' },
      },
      {
         id: 2,
         supplier: { title: 'Zomato', img: '' },
         contact: { title: 'Praveen Bisht', img: '' },
      },
      {
         id: 3,
         supplier: { title: 'Food Panda', img: '' },
         contact: { title: 'Sanjay Sharma', img: '' },
      },
      {
         id: 4,
         supplier: { title: 'Uber Eats', img: '' },
         contact: { title: 'Arjun Negi', img: '' },
      },
   ])
   const [processings, setProcessings] = React.useState([
      {
         id: 1,
         title: 'Chopped',
      },
      {
         id: 2,
         title: 'Mashed',
      },
      {
         id: 3,
         title: 'Raw',
      },
   ])
   const [allergens, setAllergens] = React.useState([
      {
         id: 1,
         title: 'ALG 1',
      },
      {
         id: 2,
         title: 'ALG 2',
      },
      {
         id: 3,
         title: 'ALG 3',
      },
   ])
   const [tunnels, openTunnel, closeTunnel] = useTunnel(8)

   return (
      <ItemContext.Provider value={{ state, dispatch }}>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <SuppliersTunnel
                  close={() => closeTunnel(1)}
                  next={() => openTunnel(2)}
                  suppliers={suppliers}
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
                  close={() => closeTunnel(3)}
                  next={() => openTunnel(4)}
                  processings={processings}
               />
            </Tunnel>
            <Tunnel style={{ overflowY: 'auto' }} layer={4} size="lg">
               <ConfigTunnel close={closeTunnel} open={openTunnel} />
            </Tunnel>
            <Tunnel layer={5}>
               <AllergensTunnel
                  close={() => closeTunnel(5)}
                  allergens={allergens}
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
                        <span>{state.supplier.supplier.title} </span>
                        <span>{state.supplier.contact.title} </span>
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
                           <Text as="title">Prcoessings</Text>
                           <IconButton
                              onClick={() => openTunnel(6)}
                              type="ghost"
                           >
                              <AddIcon />
                           </IconButton>
                        </FlexContainer>

                        {state.processing?.name?.title && (
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
                                 <h3>{state.processing.name.title}</h3>
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
                           {state.activeProcessing?.name?.title ? (
                              <ProcessingView />
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

function ProcessingView() {
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

         <FlexContainer>
            <Flexible width="4">
               {activeView === 'realtime' ? (
                  <RealTimeView />
               ) : (
                  <PlannedLotView />
               )}
            </Flexible>
            <Flexible width="1">{/* TODO: add card here */}</Flexible>
         </FlexContainer>
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

function PlannedLotView() {
   return <Text as="title">Planned Lot view</Text>
}
