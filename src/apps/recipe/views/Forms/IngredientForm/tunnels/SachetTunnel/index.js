import React from 'react'
import { Text, TextButton, Input, Toggle, Checkbox } from '@dailykit/ui'

import { CloseIcon } from '../../../../../assets/icons'

import { IngredientContext } from '../../../../../context/ingredient'

import {
   TunnelHeader,
   TunnelBody,
   StyledInputWrapper,
   StyledRow,
} from '../styled'

import { StyledTable } from './styled'

const SachetTunnel = ({ state, closeTunnel, openTunnel, units }) => {
   const { ingredientState, ingredientDispatch } = React.useContext(
      IngredientContext
   )

   // State
   const [busy, setBusy] = React.useState(false)
   const [quantity, setQuantity] = React.useState('')
   const [unit, setUnit] = React.useState(units[0]?.title || '')
   const [tracking, setTracking] = React.useState(true)

   // Handlers
   const close = () => {
      // clear sachet state
      closeTunnel(2)
   }
   const add = () => {
      if (busy) return
      setBusy(true)
   }
   const propagate = (type, val) => {
      if (
         val &&
         !(ingredientState[type].sachetItem || ingredientState[type].bulkItem)
      ) {
         ingredientDispatch({
            type: 'CURRENT_MODE',
            payload: type,
         })
         openTunnel(3)
      }
      ingredientDispatch({
         type: 'MODE',
         payload: {
            mode: type,
            name: 'isLive',
            value: val,
         },
      })
   }

   return (
      <React.Fragment>
         <TunnelHeader>
            <div>
               <span onClick={() => closeTunnel(2)}>
                  <CloseIcon color="#888D9D" size="20" />
               </span>
               <Text as="title">Add Sachet</Text>
            </div>
            <div>
               <TextButton type="solid" onClick={add}>
                  {busy ? 'Adding...' : 'Add'}
               </TextButton>
            </div>
         </TunnelHeader>
         <TunnelBody>
            <StyledRow>
               <StyledInputWrapper width="300">
                  <Input
                     type="text"
                     label="Quantity"
                     value={quantity}
                     onChange={e => setQuantity(e.target.value)}
                  />
                  <select onChange={e => setUnit(e.target.value)}>
                     {units.map(unit => (
                        <option key={unit.id} value={unit.title}>
                           {unit.title}
                        </option>
                     ))}
                  </select>
               </StyledInputWrapper>
            </StyledRow>
            <StyledRow>
               <StyledInputWrapper width="300">
                  <Toggle
                     label="Track Inventory"
                     checked={tracking}
                     setChecked={val => setTracking(val)}
                  />
               </StyledInputWrapper>
            </StyledRow>
            <StyledTable cellSpacing={0}>
               <thead>
                  <tr>
                     <th>Mode of Fulfillment</th>
                     <th>Priority</th>
                     <th>Station</th>
                     <th>Item</th>
                     <th>Accuracy</th>
                     <th>Packaging</th>
                     <th>Label</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <Checkbox
                           checked={ingredientState.realTime.isLive}
                           onChange={val => propagate('realTime', val)}
                        />
                        Real Time
                     </td>
                     <td>
                        <StyledInputWrapper width="50">
                           <Input
                              type="text"
                              value={ingredientState.realTime.priority}
                              onChange={e =>
                                 ingredientDispatch({
                                    type: 'MODE',
                                    payload: {
                                       mode: 'realTime',
                                       name: 'priority',
                                       value: e.target.value,
                                    },
                                 })
                              }
                           />
                        </StyledInputWrapper>
                     </td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                  </tr>
                  <tr>
                     <td>
                        <Checkbox
                           checked={ingredientState.plannedLot.isLive}
                           onChange={val => propagate('plannedLot', val)}
                        />
                        Planned Lot
                     </td>
                     <td>
                        <StyledInputWrapper width="50">
                           <Input
                              type="text"
                              value={ingredientState.plannedLot.priority}
                              onChange={e =>
                                 ingredientDispatch({
                                    type: 'MODE',
                                    payload: {
                                       mode: 'plannedLot',
                                       name: 'priority',
                                       value: e.target.value,
                                    },
                                 })
                              }
                           />
                        </StyledInputWrapper>
                     </td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                  </tr>
               </tbody>
            </StyledTable>
         </TunnelBody>
      </React.Fragment>
   )
}

export default SachetTunnel
