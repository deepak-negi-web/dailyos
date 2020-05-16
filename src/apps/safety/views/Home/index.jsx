import React from 'react'
import { DashboardTile } from '@dailykit/ui'

// State
import { Context } from '../../context/tabs'

import { StyledHome, StyledCardList } from './styled'

import { useTranslation, Trans } from 'react-i18next'
import { useSubscription } from '@apollo/react-hooks'
import { SAFETY_CHECKS } from '../../graphql'

const Home = () => {
   const { t } = useTranslation()
   const { dispatch } = React.useContext(Context)

   const [safeyCheckCount, setSafetyCheckCount] = React.useState(0)

   // Queries
   useSubscription(SAFETY_CHECKS, {
      onSubscriptionData: data => {
         setSafetyCheckCount(
            data.subscriptionData.data.safety_safetyCheck.length
         )
      },
   })

   const addTab = (title, view) => {
      dispatch({ type: 'ADD_TAB', payload: { type: 'listings', title, view } })
   }
   return (
      <StyledHome>
         <h1>Safety and Precautions App</h1>
         <StyledCardList>
            <DashboardTile
               title="Safety Checks"
               count={safeyCheckCount}
               conf="All available"
               onClick={() => addTab('Safety Checks', 'checks')}
            />
         </StyledCardList>
      </StyledHome>
   )
}

export default Home
