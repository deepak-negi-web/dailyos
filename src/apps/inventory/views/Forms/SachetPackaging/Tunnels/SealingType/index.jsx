import React, { useState } from 'react'
import { Text, Input, Loader, TunnelHeader } from '@dailykit/ui'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'

import { UPDATE_PACKAGING } from '../../../../../graphql'

import { TunnelContainer } from '../../../../../components'

export default function SealingTypeTunnel({ close, state }) {
   const [sealingType, setSealingType] = useState(state.sealingType || '')

   const [updatePakcaging, { loading }] = useMutation(UPDATE_PACKAGING, {
      onError: error => {
         console.log(error)
         toast.error('Error, Please try again')
         close(1)
      },
      onCompleted: () => {
         close(1)
         toast.info('Information Added :)')
      },
   })

   const handleNext = async () => {
      updatePakcaging({
         variables: {
            id: state.id,
            object: {
               sealingType,
            },
         },
      })
   }

   if (loading) return <Loader />

   return (
      <>
         <TunnelHeader
            title="Select Sealing Type"
            close={() => close(1)}
            right={{ title: 'Next', action: handleNext }}
         />
         <TunnelContainer>
            <Text as="title">Enter Sealing type</Text>
            <br />

            <div style={{ width: '40%' }}>
               <Input
                  type="text"
                  name="sealing type"
                  label="Sealing Type"
                  value={sealingType}
                  onChange={e => setSealingType(e.target.value)}
               />
            </div>
         </TunnelContainer>
      </>
   )
}
